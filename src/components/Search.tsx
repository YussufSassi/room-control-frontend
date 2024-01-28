import { useAtom } from "jotai";
import { apiOptionsAtom } from "../atoms/requestOptions";
import { useQuery } from "react-query";

import { ApiOptions } from "../models/ApiOptions";
import { getAllSensorData } from "../api";
import { FormEvent, useEffect, useRef } from "react";
import { sensorDataAtom } from "../atoms/sensorData";

export default function Search() {
  const [apiOptions, setApiOptions] = useAtom(apiOptionsAtom);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSensorData] = useAtom(sensorDataAtom);
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const query = useQuery([apiOptions], () => getAllSensorData(apiOptions));

  useEffect(() => {
    if (query.data?.length) {
      setSensorData(query.data);
    }
  }, [query.data, setSensorData]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const options: ApiOptions = {
      limitAmount: apiOptions.limitAmount,
      filterByDate: {
        startDate: new Date(startDateRef.current!.value).getTime() / 1000,
        endDate: new Date(endDateRef.current!.value).getTime() / 1000,
      },
    };

    setApiOptions(options);
    query.refetch();
  };

  return (
    <>
      <select
        className="select w-full max-w-xs bg-base-200"
        onChange={(e) => {
          setApiOptions({
            limitAmount: parseInt(e.target.value),
            filterByDate: apiOptions.filterByDate,
          });
        }}
      >
        <option disabled selected>
          Choose no. of data points
        </option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="75">75</option>
        <option value="100">100</option>
        <option value="1">1</option>
      </select>
      <div className="form mt-4">
        {" "}
        <form className="p-4" onSubmit={onSubmit}>
          <label htmlFor="start">Start date</label>
          <input
            type="date"
            id="start"
            className="input input-bordered ml-4 mr-4"
            placeholder="Start date"
            ref={startDateRef}
            required
          />
          <label htmlFor="end">End date</label>
          <input
            type="date"
            id="end"
            placeholder="end date"
            className="input input-bordered ml-4"
            ref={endDateRef}
            required
          />
          <input
            type="submit"
            value="Filter"
            className="btn text-white hover:bg-[#8D1445] bg-[#9d174d] ml-4"
          />
        </form>
      </div>
    </>
  );
}

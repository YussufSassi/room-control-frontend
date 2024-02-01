import { getAllSensorData } from "../api";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { sensorDataAtom } from "../atoms/sensorData";
import SensorDataCard from "../components/SensorDataCard";

import { Histogram } from "./Histogram";
import { MdDashboard } from "react-icons/md";
import { apiOptionsAtom } from "../atoms/requestOptions";
import { useQuery } from "react-query";
import Search from "./Search";
import TrafficLights from "./TrafficLights";

export default function Index() {
  const [apiOptions] = useAtom(apiOptionsAtom);
  const [sensorData, setSensorData] = useAtom(sensorDataAtom);

  const query = useQuery("getSensorData", () => getAllSensorData(apiOptions), {
    refetchInterval: 5000,
    cacheTime: 0,
    staleTime: 0,
  });

  useEffect(() => {
    if (query.data?.length) {
      setSensorData(query.data);
    }
  }, [query.data, setSensorData]);

  const co2DataArray = sensorData.map((s) => s.co2).sort((a, b) => b - a);
  const tempDataArray = sensorData.map((s) => s.temperature).sort((a, b) => b - a);
  const humidityDataArray = sensorData.map((s) => s.humidity).sort((a, b) => b - a);
  const dustDataArray = sensorData.map((s) => s.dust).sort((a, b) => b - a);
  const pressureDataArray = sensorData.map((s) => s.pressure).sort((a, b) => b - a);

  if (query.isLoading && !query.isError) {
    return (
      <div className="w-screen">
        <div className="loading loading-spinner loading-lg absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"></div>
      </div>
    );
  }
  if (query.isError) {
    return (
      <div className="w-screen">
        <div className=" absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
          {query.isError}
        </div>
      </div>
    );
  }
  return (
    <div className="m-4">
      <div className="title flex justify-center">
        <h1 className="inline-flex items-center text-5xl font-bold gap-4 pb-4 md:pb-12">
          Room control
          <MdDashboard size={"64px"} />
        </h1>
      </div>

      {sensorData.length && <TrafficLights data={sensorData[0]} />}

      <Search />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
        <div className="container max-h-[80vh] overflow-y-auto w-full md:w-max">
          {sensorData.map((s) => (
            <SensorDataCard data={s} key={s.id}></SensorDataCard>
          ))}
        </div>
        <div className="w-full">
          <Histogram
            title="CO2"
            data={co2DataArray}
            width={600}
            height={400}
            domain={[800, 1500]}
          />
          <Histogram
            title="Temperature"
            data={tempDataArray}
            width={600}
            height={400}
            domain={[5, 36]}
          />
          <Histogram
            title="Humidity"
            data={humidityDataArray}
            width={600}
            height={400}
            domain={[0, 100]}
          />
          <Histogram
            title="Dust"
            data={dustDataArray}
            width={600}
            height={400}
            domain={[0, 11]}
          />
          <Histogram
            title="Pressure"
            data={pressureDataArray}
            width={600}
            height={400}
            domain={[500, 2000]}
          />
        </div>
      </div>
    </div>
  );
}

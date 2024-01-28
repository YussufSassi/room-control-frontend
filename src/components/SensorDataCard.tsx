import { MdCo2 } from "react-icons/md";
import { SensorData } from "../models/Response";
import { WiDust, WiHumidity } from "react-icons/wi";
import { PiGaugeBold } from "react-icons/pi";
import {
  FaTemperatureEmpty,
  FaTemperatureFull,
  FaTemperatureHalf,
} from "react-icons/fa6";

export default function SensorDataCard({ data }: { data: SensorData }) {
  return (
    <div className="card w-96 bg-base-200 shadow-xl m-12">
      <div className="card-body">
        <p>
          <small className="badge badge-sm bg-[#9d174d] text-white absolute top-3 left-3 mb-2">
            no. {data.id}
          </small>
          Sensor data from{" "}
          <strong>{new Date(data.created_at).toLocaleDateString()}</strong> at{" "}
          <strong>{new Date(data.created_at).toLocaleTimeString()}</strong>
        </p>
        <div className="flex flex-col gap-2">
          <span className="inline-flex items-center gap-1">
            <MdCo2 size={"32px"} />
            {data.co2} ppm{" "}
          </span>

          <span className="inline-flex items-center gap-1">
            <WiDust size={"32px"} />
            {data.dust.toFixed(2)} mg/m³
          </span>
          <span className="inline-flex items-center gap-1">
            <WiHumidity size={"32px"} />
            {data.humidity.toFixed(2)} %
          </span>
          <span className="inline-flex items-center gap-1 ml-1">
            <PiGaugeBold size={"24px"} />
            {data.pressure} hPa
          </span>
          <span className="inline-flex items-center gap-1 ">
            {data.temperature >= 25 && <FaTemperatureFull size={"32px"} />}
            {data.temperature >= 20 && data.temperature < 25 && (
              <FaTemperatureHalf size={"32px"} />
            )}
            {data.temperature < 20 && <FaTemperatureEmpty size={"32px"} />}
            {data.temperature.toFixed(2)} °C
          </span>
        </div>
      </div>
    </div>
  );
}

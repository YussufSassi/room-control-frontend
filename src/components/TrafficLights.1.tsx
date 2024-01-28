import { useEffect, useState } from "react";
import { SensorData } from "../models/Response";

export default function TrafficLights({ data }: { data: SensorData }) {
  const [tLight, setTlight] = useState<{
    red: boolean;
    yellow: boolean;
    green: boolean;
  }>();
  function checkTrafficLights() {
    let red = false;
    let yellow = false;
    let green = false;
    if (
      data.co2 > 800 ||
      (data.dust > 60 && data.co2 < 1500) ||
      data.dust < 91
    ) {
      yellow = true;
      red = false;
      green = false;
    } else if (data.co2 > 1500 || data.dust > 91) {
      yellow = false;
      red = true;
      green = false;
    } else {
      yellow = false;
      red = false;
      green = true;
    }

    return { red, yellow, green };
  }

  useEffect(() => {
    checkTrafficLights();
  }, [data]);

  return (
    <div className="container flex flex-row bg-base-200 gap-1">
      <div
        className={`red rounded-full bg-red-${
          tLight.red ? "500" : "900"
        } w-32 h-32`}
      ></div>
      <div
        className={`yellow rounded-full bg-yellow-${
          tLight.yellow ? "500" : "900"
        } w-32 h-32`}
      ></div>
      <div
        className={`green rounded-full bg-green-${
          tLight.green ? "500" : "900"
        } w-32 h-32`}
      ></div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { SensorData } from "../models/Response";

export default function TrafficLights({ data }: { data: SensorData }) {
  const [tLight, setTlight] = useState<{
    red: boolean;
    yellow: boolean;
    green: boolean;
  }>({ red: false, yellow: false, green: false });

  function checkTrafficLights(roomData: SensorData) {
    let red = false;
    let yellow = false;
    let green = false;
    if (
      (roomData.co2 > 800 || roomData.dust > 60) &&
      (roomData.co2 < 1500 || roomData.dust < 91)
    ) {
      yellow = true;
      red = false;
      green = false;
    } else if (roomData.co2 > 1500 || roomData.dust > 91) {
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
    setTlight(checkTrafficLights(data));
  }, [data]);

  return (
    <div className="container flex flex-col bg-base-300 gap-1 w-max rounded-md p-3">
      {tLight.red ? (
        <div className={`red rounded-full bg-red-500 w-8 h-8`}></div>
      ) : (
        <div className={`red rounded-full bg-red-950 w-8 h-8`}></div>
      )}
      {tLight.yellow ? (
        <div className={`yellow rounded-full bg-yellow-500 w-8 h-8`}></div>
      ) : (
        <div className={`yellow rounded-full bg-yellow-950 w-8 h-8`}></div>
      )}
      {tLight.green ? (
        <div className={`green rounded-full bg-green-500 w-8 h-8`}></div>
      ) : (
        <div className={`green rounded-full bg-green-950 w-8 h-8`}></div>
      )}
    </div>
  );
}

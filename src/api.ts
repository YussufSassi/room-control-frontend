import { ApiResponse } from "./models/Response";

import { ApiOptions } from "./models/ApiOptions";

export async function getAllSensorData(
  options: ApiOptions
): Promise<ApiResponse> {
  if (
    options.filterByDate?.startDate &&
    options.filterByDate?.endDate &&
    options.limitAmount
  ) {
    const response = await fetch(
      `/api/all?start=${options.filterByDate.startDate}&end=${options.filterByDate.endDate}&limit=${options.limitAmount}`
    );
    const data: ApiResponse = await response.json();

    return data;
  }

  if (options.limitAmount) {
    const response = await fetch(`/api/all?limit=${options.limitAmount}`);
    const data: ApiResponse = await response.json();

    return data;
  }

  if (options.filterByDate?.startDate && options.filterByDate?.endDate) {
    const response = await fetch(
      `/api/all?start=${options.filterByDate.startDate}&end=${options.filterByDate.endDate}`
    );
    const data: ApiResponse = await response.json();

    return data;
  }
  const response = await fetch(`/api/all`);
  const data: ApiResponse = await response.json();

  return data;
}

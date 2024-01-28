export interface SensorData {
  id: number;
  co2: number;
  created_at: string;
  dust: number;
  humidity: number;
  pressure: number;
  temperature: number;
}

export type ApiResponse = SensorData[];

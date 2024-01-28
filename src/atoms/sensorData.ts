import { atom } from "jotai";
import { ApiResponse } from "../models/Response";

export const sensorDataAtom = atom<ApiResponse>([]);

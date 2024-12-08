import {
  IElectricityMeterQuery,
  IHeadquarterQuery,
  IRoomQuery,
} from "../interfaces";
import { delay } from "../utils";
import { axiosClient } from "./axios.service";

export const ApiService = {
  getHeadquarters: async (query: IHeadquarterQuery) => {
    await delay(3000);
    return axiosClient.get("/headquarters", { params: query });
  },
  getRooms: async (query: IRoomQuery) => {
    await delay(3000);
    return axiosClient.get("/rooms", { params: query });
  },
  getElectricityMeters: async (query: IElectricityMeterQuery) => {
    await delay(3000);
    return axiosClient.get("/electricityMeters", { params: query });
  },
  getTimeSeries: async (query: IRoomQuery) => {
    await delay(3000);
    return axiosClient.get("/timeSeries", { params: query });
  },
  getRoomById: async (id?: string) => {
    await delay(3000);
    return axiosClient.get(`/rooms/${id}`);
  },
  getElectricityMeterById: async (id?: string) => {
    await delay(3000);
    return axiosClient.get(`/electricityMeters/${id}`);
  },
  getTimeSeriesById: async (id?: string) => {
    await delay(3000);
    return axiosClient.get(`/timeSeries/${id}`);
  },
};

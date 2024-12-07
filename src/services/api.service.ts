import {
  IElectricityMeterQuery,
  IHeadquarterQuery,
  IRoomQuery,
} from "../interfaces";
import { axiosClient } from "./axios.service";

export const ApiService = {
  getHeadquarters: async (query: IHeadquarterQuery) => {
    return axiosClient.get("/headquarters", { params: query });
  },
  getRooms: async (query: IRoomQuery) => {
    return axiosClient.get("/rooms", { params: query });
  },
  getElectricityMeters: async (query: IElectricityMeterQuery) => {
    return axiosClient.get("/electricityMeters", { params: query });
  },
  getRoomById: async (id?: string) => {
    return axiosClient.get(`/rooms/${id}`);
  },
  getElectricityMeterById: async (id?: string) => {
    return axiosClient.get(`/electricityMeters/${id}`);
  },
};

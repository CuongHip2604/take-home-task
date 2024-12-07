import { IPagination } from "./common.interface";

export interface IElectricityMeterQuery {
  name?: string;
  _page?: number;
  _per_page?: number;
  headquarterId?: string;
}

export interface IElectricityMeterData {
  timestamp: string;
  energyConsumption: number;
  cost: number;
}

export interface IElectricityMeter {
  id: string;
  headquarterId: string;
  name: string;
  data: IElectricityMeterData[];
}

export interface IGetElectricityMetersResponse extends IPagination {
  data: IElectricityMeter[];
}

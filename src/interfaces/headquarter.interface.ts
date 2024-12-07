import { IPagination } from "./common.interface";

export interface IHeadquarterQuery {
  name?: string;
  _page?: number;
  _per_page?: number;
}

export interface IHeadquarter {
  id: string;
  timestamp: string;
  name: string;
}

export interface IGetHeadquartersResponse extends IPagination {
  data: IHeadquarter[];
}

import { IPagination } from "./common.interface";

export interface IRoomQuery {
  name?: string;
  _page?: number;
  _per_page?: number;
  headquarterId?: string;
}

export interface IRoomData {
  timestamp: string;
  humidity: number;
  temperature: number;
}

export interface IRoom {
  id: string;
  headquarterId: string;
  name: string;
  data: IRoomData[];
}

export interface IGetRoomsResponse extends IPagination {
  data: IRoom[];
}

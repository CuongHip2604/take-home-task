export interface ITimeSeriesQuery {
  name?: string;
  _page?: number;
  _per_page?: number;
  roomId?: string;
  electricityMeterId?: string;
}

export interface ITimestampData {
  timestamp: string;
  temperature: string;
  humidity: string;
  energyConsumption: string;
  cost: string;
}

export interface ITimeSeries {
  id: string;
  roomId: string;
  name: string;
  data: ITimestampData[];
}

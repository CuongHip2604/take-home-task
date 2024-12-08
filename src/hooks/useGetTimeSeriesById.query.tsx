import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import dayjs, { Dayjs } from "dayjs";
import { useMemo } from "react";
import { ITimeSeries } from "../interfaces";
import { ApiService } from "../services/api.service";

type Props = {
  id?: string;
  startDate?: Dayjs;
  endDate?: Dayjs;
};

const useGetTimeSeriesByIdQuery = ({ id, startDate, endDate }: Props) => {
  const { data: timeSeriesDetailResponse, isFetching } = useQuery<
    AxiosResponse<ITimeSeries>
  >({
    queryKey: ["QK_GET_TIME_SERIES_BY_ID", id],
    queryFn: () => ApiService.getTimeSeriesById(id),
    enabled: !!id,
  });

  const timeSeriesDetail = useMemo(() => {
    if (!timeSeriesDetailResponse) return;

    if (startDate && endDate) {
      const filteredData = timeSeriesDetailResponse.data.data.filter((item) => {
        const timestamp = dayjs(item.timestamp);

        return (
          (timestamp.isAfter(startDate.startOf("day"), "day") &&
            timestamp.isBefore(endDate.endOf("day"), "day")) ||
          timestamp.isSame(startDate.startOf("day"), "day") ||
          timestamp.isSame(endDate.endOf("day"), "day")
        );
      });

      return {
        ...timeSeriesDetailResponse.data,
        data: filteredData,
      };
    }

    return timeSeriesDetailResponse.data;
  }, [timeSeriesDetailResponse, startDate, endDate]);

  return {
    timeSeriesDetail,
    isFetching,
  };
};

export { useGetTimeSeriesByIdQuery };

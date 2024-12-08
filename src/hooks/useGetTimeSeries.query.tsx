import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useMemo } from "react";
import { IGetRoomsResponse, ITimeSeriesQuery } from "../interfaces";
import { ApiService } from "../services/api.service";

type Props = {
  query: ITimeSeriesQuery;
};

const useGetTimeSeriesQuery = ({ query }: Props) => {
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery<AxiosResponse<IGetRoomsResponse>>({
      queryKey: ["QK_GET_TIME_SERIES", query],
      queryFn: (props) =>
        ApiService.getTimeSeries({
          ...query,
          _page: props.pageParam as number,
        }),
      initialPageParam: query._page,
      getNextPageParam: (lastPage) => {
        return lastPage.data.next;
      },
      enabled: !!query.roomId || !!query.electricityMeterId,
    });

  const onPopupScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const bottom =
      target.scrollHeight === target.scrollTop + target.clientHeight;
    if (bottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const timeSeries = useMemo(
    () => data?.pages.flatMap((page) => page.data.data) || [],
    [data]
  );

  return {
    timeSeries,
    onPopupScroll,
    isFetching,
  };
};

export { useGetTimeSeriesQuery };

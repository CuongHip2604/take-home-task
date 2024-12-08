import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useMemo } from "react";
import {
  IElectricityMeterQuery,
  IGetElectricityMetersResponse,
} from "../interfaces";
import { ApiService } from "../services/api.service";

type Props = {
  query: IElectricityMeterQuery;
};

const useGetElectricityMetersQuery = ({ query }: Props) => {
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery<AxiosResponse<IGetElectricityMetersResponse>>({
      queryKey: ["QK_GET_ELECTRICITY_METERS", query],
      queryFn: (props) =>
        ApiService.getElectricityMeters({
          ...query,
          _page: props.pageParam as number,
        }),
      initialPageParam: query._page,
      getNextPageParam: (lastPage) => {
        return lastPage.data.next;
      },
      enabled: !!query.headquarterId,
    });

  const onPopupScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const bottom =
      target.scrollHeight === target.scrollTop + target.clientHeight;
    if (bottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const electricityMeters = useMemo(
    () => data?.pages.flatMap((page) => page.data.data) || [],
    [data]
  );

  return {
    electricityMeters,
    onPopupScroll,
    isFetching,
  };
};

export { useGetElectricityMetersQuery };

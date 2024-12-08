import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useMemo } from "react";
import { IGetRoomsResponse, IRoomQuery } from "../interfaces";
import { ApiService } from "../services/api.service";

type Props = {
  query: IRoomQuery;
};

const useGetRoomsQuery = ({ query }: Props) => {
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery<AxiosResponse<IGetRoomsResponse>>({
      queryKey: ["QK_GET_ROOMS", query],
      queryFn: (props) =>
        ApiService.getRooms({ ...query, _page: props.pageParam as number }),
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

  const rooms = useMemo(
    () => data?.pages.flatMap((page) => page.data.data) || [],
    [data]
  );

  return {
    rooms,
    onPopupScroll,
    isFetching,
  };
};

export { useGetRoomsQuery };

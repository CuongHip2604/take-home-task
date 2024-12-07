import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useMemo } from "react";
import { IGetHeadquartersResponse, IHeadquarterQuery } from "../interfaces";
import { ApiService } from "../services/api.service";

type Props = {
  query: IHeadquarterQuery;
};

const useGetHeadquartersQuery = ({ query }: Props) => {
  const {
    data,
    // error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    // status,
  } = useInfiniteQuery<AxiosResponse<IGetHeadquartersResponse>>({
    queryKey: ["QK_GET_HEADQUARTERS", query],
    queryFn: () => ApiService.getHeadquarters(query),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.data.next;
    },
  });

  const onPopupScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const bottom =
      target.scrollHeight === target.scrollTop + target.clientHeight;
    if (bottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const headquarters = useMemo(
    () => data?.pages.flatMap((page) => page.data.data) || [],
    [data]
  );

  return {
    headquarters,
    onPopupScroll,
    isFetching,
  };
};

export { useGetHeadquartersQuery };

import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useMemo } from "react";
import { IRoom } from "../interfaces";
import { ApiService } from "../services/api.service";

type Props = {
  id?: string;
};

const useGetRoomByIdQuery = ({ id }: Props) => {
  const { data, isFetching } = useQuery<AxiosResponse<IRoom>>({
    queryKey: ["QK_GET_ROOM_BY_ID", id],
    queryFn: () => ApiService.getRoomById(id),
    enabled: !!id,
  });

  const room = useMemo(() => data?.data, [data]);

  return {
    room,
    isFetching,
  };
};

export { useGetRoomByIdQuery };

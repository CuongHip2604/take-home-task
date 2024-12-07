import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useMemo } from "react";
import { IElectricityMeter } from "../interfaces";
import { ApiService } from "../services/api.service";

type Props = {
  id?: string;
};

const useGetElectricityMeterByIdQuery = ({ id }: Props) => {
  const { data, isFetching } = useQuery<AxiosResponse<IElectricityMeter>>({
    queryKey: ["QK_GET_ELECTRICITY_METER_BY_ID", id],
    queryFn: () => ApiService.getElectricityMeterById(id),
    enabled: !!id,
  });

  const electricityMeter = useMemo(() => data?.data, [data]);

  return {
    electricityMeter,
    isFetching,
  };
};

export { useGetElectricityMeterByIdQuery };

/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { UseQueryOptions } from "@tanstack/react-query";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { API } from "../service/api";

function GetData<FetchingT, QueryT = {}>(
  url: string,
  key: Array<string | number | undefined | unknown>,
  params?: QueryT,
  initialData?: FetchingT,
  enabled?: boolean,
  otherQueryOptions?: Omit<UseQueryOptions<FetchingT>, "queryKey" | "queryFn">
) {
  const fetchData = async () => {
    // try {
    const res: AxiosResponse<FetchingT | any> = await API.get(url, {
      params,
    });

    return res.data;

    // } catch (error: any) {
    //   const message = error.response?.data.message

    //   toast.error(message ?? 'something when wrong')
    // }
  };

  return useQuery({
    queryKey: key,
    queryFn: fetchData,
    initialData,
    placeholderData: keepPreviousData,
    enabled,
    ...otherQueryOptions,
  });
}

export default GetData;

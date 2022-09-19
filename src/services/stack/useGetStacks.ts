import axios, { AxiosResponse } from "axios";
import useSWR, { Fetcher, Key } from "swr";
import { Stack } from "types/api";
import { useAuthContext } from "../../contexts/AuthContext";

type GetStacksType = {
  data: Stack[];
  error: Error;
  isLoading: boolean;
};

export const useGetStacks = (): GetStacksType => {
  // tokenは非同期に取得されるので、最初はnull
  const { token } = useAuthContext();

  // const context = "http://localhost:5000"
  const context = process.env.REACT_APP_API_BASE_URL;
  if (!context) {
    throw new Error("Not Found Context");
  }
  const key: Key = "/api/stack";
  const fetcher: Fetcher<Stack[]> = () => getStacks(token);

  const getStacks = async (token: string | null): Promise<any> => {
    if (token === null) return;
    try {
      const headers = {
        headers: {
          token: token,
        },
      };
      const response: AxiosResponse<Stack[]> = await axios.get(
        `${context}/stacks`,
        headers,
      );
      return response.data;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  };

  const { data, error } = useSWR<Stack[]>(
    // keyがnullだと実行されない
    token !== null ? key : null,
    fetcher,
  );

  const isLoading = !data && !error;

  return {
    data: data ?? [],
    error: error,
    isLoading: isLoading,
  };
};

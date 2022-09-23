import axios, { AxiosResponse } from "axios";
import { useAuthContext } from "contexts/AuthContext";
import { useCallback, useState } from "react";
import useSWR, { Fetcher, Key } from "swr";
import { Stack } from "types/api";

type useStackType = {
  stacks: Stack[] | undefined;
  postStack: (isbn: number) => Promise<Stack>;
  deleteStack: (isbn: number) => Promise<null>;
  reloadStacks: (isbn: number) => Promise<void>;
  isLoading: boolean;
  registerLoading: boolean;
  isError: boolean;
  error: any;
};

export const useStack = (): useStackType => {
  // tokenは非同期に取得されるので、最初はnull
  const { token } = useAuthContext();

  //   const context = "http://localhost:5000";
  const context = process.env.REACT_APP_API_BASE_URL;
  if (!context) {
    throw new Error("Not Found Context");
  }

  const [registerLoading, setRegisterLoading] = useState<boolean>(false);

  const key: Key = "/api/stack";

  const fetcher: Fetcher<Stack[]> = () => getStacks();

  const getStacks = useCallback(async () => {
    if (token === null) return [];
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
  }, [token]);

  const { data, error, mutate } = useSWR(
    // keyがnullだと実行されない
    token !== null ? `${key}/get` : null,
    fetcher,
    {
      // ms
      dedupingInterval: 3600 * 1000,
    },
  );

  const reloadStacks = useCallback(async () => {
    await mutate();
  }, [mutate]);

  const postStack = useCallback(
    async (isbn: number) => {
      setRegisterLoading(true);
      if (token === null) return [];

      try {
        const data = {
          isbn: isbn,
        };
        const headers = {
          headers: {
            token: token,
          },
        };
        const response = await axios.post(`${context}/stack`, data, headers);
        const result = response.data;
        await mutate();
        return result;
      } catch (error: any) {
        console.error(error.message);
        throw error;
      } finally {
        setRegisterLoading(false);
      }
    },
    [token, mutate],
  );

  const deleteStack = useCallback(
    async (isbn: number) => {
      setRegisterLoading(true);
      if (token === null) return null;
      try {
        const params = {
          headers: {
            token: token,
          },
          data: {
            isbn: isbn,
          },
        };
        const response: AxiosResponse<null> = await axios.delete(
          `${context}/stack`,
          params,
        );
        const result = response.data;
        await mutate();
        return result;
      } catch (error: any) {
        console.error(error.message);
        throw error;
      } finally {
        setRegisterLoading(false);
      }
    },
    [token, mutate],
  );

  return {
    stacks: data,
    postStack: postStack,
    deleteStack: deleteStack,
    reloadStacks: reloadStacks,
    isLoading: !error && data === undefined,
    registerLoading: registerLoading,
    isError: !!error,
    error: error,
  };
};

import axios, { AxiosResponse } from "axios";
import { useAuthContext } from "contexts/AuthContext";
import { useCallback, useState } from "react";
import { useBook } from "services/book/useBook";
import useSWR, { Fetcher, Key } from "swr";
import { Stack } from "types/api";
import { pageSize, timeout } from "utils/config";

type useStackType = {
  stacks: Stack[] | undefined;
  postStack: (isbn: number) => Promise<null>;
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

  const { mutateBook } = useBook({
    offset: 0,
    pageSize: pageSize,
  });

  const isLocal = process.env.REACT_APP_ISLOCAL;
  const context = isLocal
    ? "http://localhost:5000"
    : process.env.REACT_APP_API_BASE_URL;
  if (!context) {
    throw new Error("Not Found Context");
  }

  const [registerLoading, setRegisterLoading] = useState<boolean>(false);

  const key: Key = "/api/stack";

  const fetcher: Fetcher<Stack[]> = () => getStacks();

  const getStacks = useCallback(async () => {
    if (token === null) return [];
    try {
      const settings = {
        headers: {
          token: token,
        },
        timeout: timeout,
      };
      const response: AxiosResponse<Stack[]> = await axios.get(
        `${context}/stacks`,
        settings,
      );
      return response.data;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  }, [context, token]);

  const { data, error, mutate } = useSWR(
    // keyがnullだと実行されない
    token !== null ? `${key}/get` : null,
    fetcher,
    {
      // ms
      dedupingInterval: 100 * 1000,
      errorRetryCount: 3,
    },
  );

  const reloadStacks = useCallback(async () => {
    await mutate();
    await mutateBook();
  }, [mutate, mutateBook]);


  const postStack = useCallback(
    async (isbn: number) => {
      setRegisterLoading(true);
      if (token === null) return [];

      try {
        const data = {
          isbn: isbn,
        };
        const settings = {
          headers: {
            token: token,
          },
          timeout: timeout,
        };
        const response  = await axios.post(`${context}/stack`, data, settings);
        const result = response.data;
        await mutate();
        await mutateBook();
        return result;
      } catch (error: any) {
        console.error(error.message);
        throw error;
      } finally {
        setRegisterLoading(false);
      }
    },
    [context, token, mutate, mutateBook],
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
          timeout: timeout,
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
        await mutateBook();
        return result;
      } catch (error: any) {
        console.error(error.message);
        throw error;
        // return error;
      } finally {
        setRegisterLoading(false);
      }
    },
    [context, token, mutate, mutateBook],
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

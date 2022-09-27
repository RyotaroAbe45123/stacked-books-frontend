import axios, { AxiosResponse } from "axios";
import { useAuthContext } from "contexts/AuthContext";
import { useCallback } from "react";
import useSWR, { Fetcher, Key, KeyedMutator } from "swr";
import { Book } from "types/api";

type useBookType = {
  books: Book[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: any;
  mutateBook: KeyedMutator<Book[]>;
};

export const useBook = (): useBookType => {
  // tokenは非同期に取得されるので、最初はnull
  const { token } = useAuthContext();

  // const context = "http://localhost:5000";
  const context = process.env.REACT_APP_API_BASE_URL;
  if (!context) {
    throw new Error("Not Found Context");
  }

  const key: Key = "/api/book";

  const fetcher: Fetcher<Book[]> = () => getBooks();

  const getBooks = useCallback(async () => {
    if (token === null) return [];
    try {
      const settings = {
        headers: {
          token: token,
        },
        timeout: 5000,
      };
      const response: AxiosResponse<Book[]> = await axios.get(
        `${context}/books`,
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
      dedupingInterval: 3600 * 1000,
      errorRetryCount: 3,
    },
  );

  return {
    books: data,
    isLoading: !error && data === undefined,
    isError: !!error,
    error: error,
    mutateBook: mutate,
  };
};

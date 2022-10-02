import axios, { AxiosResponse } from "axios";
import { useAuthContext } from "contexts/AuthContext";
import { useCallback } from "react";
import useSWR, { Fetcher, Key, KeyedMutator } from "swr";
import { AllBooks, Book } from "types/api";

type useBookType = {
  books: Book[] | undefined;
  count: number;
  isLoading: boolean;
  isError: boolean;
  error: any;
  mutateBook: KeyedMutator<AllBooks | null>;
};

type Props = {
  offset: number;
  pageSize: number;
};

const timeout = 100 * 1000;

export const useBook = ({ offset, pageSize }: Props): useBookType => {
  // tokenは非同期に取得されるので、最初はnull
  const { token } = useAuthContext();

  const isLocal = process.env.REACT_APP_ISLOCAL;
  const context = isLocal
    ? "http://localhost:5000"
    : process.env.REACT_APP_API_BASE_URL;
  if (!context) {
    throw new Error("Not Found Context");
  }

  const key: Key = `/api/book${offset}${pageSize}`;

  const fetcher: Fetcher<AllBooks | null> = () => getBooks();

  const getBooks = useCallback(async (): Promise<AllBooks | null> => {
    if (token === null) return null;
    try {
      const settings = {
        headers: {
          token: token,
        },
        params: {
          offset: offset * pageSize,
          pageSize: pageSize,
        },
        timeout: timeout,
      };
      const response: AxiosResponse<AllBooks> = await axios.get(
        `${context}/books`,
        settings,
      );
      return response.data;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  }, [context, token, offset, pageSize]);

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
    books: data?.data.books,
    count: data ? data.data.allBooks : 0,
    isLoading: !error && data === undefined,
    isError: !!error,
    error: error,
    mutateBook: mutate,
  };
};

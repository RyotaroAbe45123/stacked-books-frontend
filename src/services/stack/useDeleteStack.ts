import axios, { AxiosResponse } from "axios";
import { useAuthContext } from "contexts/AuthContext";
import { Dispatch, SetStateAction, useState } from "react";
import useSWR, { Key } from "swr";
import { Stack } from "types/api";

type DeleteStackType = {
  data: Stack | null;
  error: Error;
  isDeleteLoading: boolean;
  doDelete: Dispatch<SetStateAction<number | null>>;
};

export const useDeleteStack = (): DeleteStackType => {
  // tokenは非同期に取得されるので、最初はnull
  const { token } = useAuthContext();

  const [isbn, setIsbn] = useState<number | null>(null);

  const context = "http://localhost:5000";
  // const context = process.env.REACT_APP_API_BASE_URL
  if (!context) {
    throw new Error("Not Found Context");
  }
  const key: Key = "/api/stack";

  const deleteStack = async (token: string | null) => {
    if (token === null || isbn === null) return;
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
      return response.data;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    } finally {
      setIsbn(null);
    }
  };

  const { data, error } = useSWR(
    // keyがnullだと実行されない
    token !== null && isbn !== null ? key : null,
    () => deleteStack(token),
  );

  const isLoading = data !== undefined && !error;

  return {
    data: null,
    error: error,
    isDeleteLoading: isLoading,
    doDelete: setIsbn,
  };
};

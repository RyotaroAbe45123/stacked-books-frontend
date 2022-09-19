import axios, { AxiosResponse } from "axios";
import { useAuthContext } from "contexts/AuthContext";
import { Dispatch, SetStateAction, useState } from "react";
import useSWR, { Key } from "swr";
import { Stack } from "types/api";

// type PostStackProps = {
//     isbn: string | null,
// }

type PostStackType = {
  data: Stack | null;
  error: Error;
  isPostLoading: boolean;
  doPost: Dispatch<SetStateAction<number | null>>;
};

export const usePostStack = (): PostStackType => {
  // tokenは非同期に取得されるので、最初はnull
  const { token } = useAuthContext();

  const [isbn, setIsbn] = useState<number | null>(null);

  const context = "http://localhost:5000";
  // const context = process.env.REACT_APP_API_BASE_URL
  if (!context) {
    throw new Error("Not Found Context");
  }
  const key: Key = "/api/stack";

  const postStack = async (token: string | null) => {
    // console.log(`post: ${isbn}: ${token}`)
    if (token === null || isbn === null) return;
    try {
      const data = {
        isbn: isbn,
      };
      const headers = {
        headers: {
          token: token,
        },
      };
      const response: AxiosResponse<Stack[]> = await axios.post(
        `${context}/stack`,
        data,
        headers,
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
    () => postStack(token),
  );

  const isLoading = data !== undefined && !error;
  console.log(`d: ${data}`);
  console.log(`e: ${error}`);

  return {
    data: null,
    error: error,
    isPostLoading: isLoading,
    doPost: setIsbn,
  };
};

import { useAuth0 } from "@auth0/auth0-react";
import { createContext, PropsWithChildren, useContext } from "react";
import useSWR from "swr";

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: false,
  token: null,
});

export const useAuthContext = (): AuthContextType =>
  useContext<AuthContextType>(AuthContext);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const fetcher = async () => {
    console.log("get token from api");
    const domain = process.env.REACT_APP_DOMAIN
      ? process.env.REACT_APP_DOMAIN
      : "";

    try {
      const response = await getAccessTokenSilently({
        audience: `https://${domain}/api/v2/`,
        scope: "read:current_user",
      });
      return response;
    } catch (error: any) {
      console.log(error.message);
      throw error;
    }
  };

  const { data, error } = useSWR("/api/auth", fetcher);

  const isLoading = !data && !error;

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isAuthenticated,
        isLoading: isLoading,
        token: data ?? null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

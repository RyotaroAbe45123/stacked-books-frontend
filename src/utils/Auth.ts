import { useAuthContext } from "contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuthGuard = (): void => {
  const { token, isLoading } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    // ユーザーが取得できない場合はサインインページにリダイレクト
    if (!token && !isLoading) {
      navigate("/login");
    }
  }, [navigate, token, isLoading]);
};

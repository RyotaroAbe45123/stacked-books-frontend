import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = process.env.REACT_APP_DOMAIN
        ? process.env.REACT_APP_DOMAIN
        : "";

      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        });
        // console.log(`a: ${accessToken}`);

        const url = "http://localhost:5000/stacks";
        // const data = {
        //   isbn: 11223344,
        // };
        const headers = {
          headers: {
            token: accessToken,
          },
        };
        const r = await axios.get(url, headers);
        console.log(r.data);
      } catch (e: any) {
        console.log(e.message);
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);

  return isAuthenticated ? (
    <div>
      <img src={user?.picture} alt={user?.name} />
      <h2>{user?.name}</h2>
      <p>{user?.email}</p>
    </div>
  ) : (
    <div>un auth</div>
  );
};

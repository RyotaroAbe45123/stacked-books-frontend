import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const domain = process.env.REACT_APP_DOMAIN ? process.env.REACT_APP_DOMAIN : "";
const clientId = process.env.REACT_APP_CLIENT_ID
  ? process.env.REACT_APP_CLIENT_ID
  : "";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      // domain={process.env.REACT_APP_DOMAIN ? process.env.REACT_APP_DOMAIN : ""}
      // clientId={
      //   process.env.REACT_APP_CLIENT_ID ? process.env.REACT_APP_CLIENT_ID : ""
      // }
      redirectUri={window.location.origin}
      audience={`https://${domain}/api/v2/`}
      scope="read:current_user update:current_user_metadata"
    >
      <ChakraProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </Auth0Provider>{" "}
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

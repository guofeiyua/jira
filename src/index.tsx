import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Login } from "./pages/login";
import reportWebVitals from "./reportWebVitals";
import { loadDevTools } from "jira-dev-tool";
import { AppProviders } from "./context";
loadDevTools(() =>
  ReactDOM.render(
    <React.StrictMode>
      <AppProviders>
        <Login />
      </AppProviders>
    </React.StrictMode>,
    document.getElementById("root")
  )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

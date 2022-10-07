import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = document.getElementById("root");
console.log("HYDRATED")
ReactDOM.hydrateRoot(root, <App />, {
  onRecoverableError: (err) => {
    console.log("HYDRATION ERR ", err)
  },
});

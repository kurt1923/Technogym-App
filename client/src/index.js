import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { MyProvider } from "./MyContext.js";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <MyProvider>
        <App />
      </MyProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

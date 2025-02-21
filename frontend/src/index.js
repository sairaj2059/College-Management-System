import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { StyledEngineProvider } from "@mui/material/styles";
import "antd/dist/reset.css";  // For Ant Design v5+


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

    <StyledEngineProvider injectFirst>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </StyledEngineProvider>
);

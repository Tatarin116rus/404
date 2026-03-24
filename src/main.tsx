import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { MantineProvider } from "@mantine/core";
import App from "./App";
import { store } from "./store/store";
import { theme } from "./theme";
import "./index.css";
import { BrowserRouter } from 'react-router-dom'; // импорт для работы react router. 

// hh-frontend это я так назвал Base в vite Congig)
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider theme={theme}>
       <BrowserRouter basename="/hh-frontend">
          <App />
        </BrowserRouter>
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);
 
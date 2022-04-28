import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { QueryClient, QueryClientProvider } from "react-query";
import { SnackbarProvider } from "notistack";
import AppProviders from "./context";
import Grow from "@material-ui/core/Grow";
const queryClient = new QueryClient();

ReactDOM.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AppProviders>
        <Provider store={store}>
          <SnackbarProvider
            maxSnack={1}
            autoHideDuration={2500}
            TransitionComponent={Grow}
          >
            <App />
          </SnackbarProvider>
        </Provider>
      </AppProviders>
    </QueryClientProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

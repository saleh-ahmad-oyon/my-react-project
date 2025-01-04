import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ToastContainer } from 'react-toastify';
import { Provider } from "react-redux";
import { store } from "./redux";

import "@/assets/css/main.css";

const rootEl = document.getElementById("root");
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
        <ToastContainer autoClose={2000} />
      </Provider>
    </React.StrictMode>
  );
}
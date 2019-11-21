import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./Containers/App/App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import appReducer from "./Store/reducers";

let store = createStore(appReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

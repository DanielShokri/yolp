import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { RestaurantsContextProvider } from "./context/RestaruantsContext";
import { AlertContextProvider } from "./context/AlertContext";
import { Provider } from "react-redux";
import store from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import "./index.css";

const theme = createMuiTheme();
theme.typography.h3 = {
  fontSize: "1.4rem",
  "@media (min-width:600px)": {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2.4rem",
  },
};

let persistor = persistStore(store);

ReactDOM.render(
  // <React.StrictMode>
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RestaurantsContextProvider>
            <AlertContextProvider>
              <App />
            </AlertContextProvider>
          </RestaurantsContextProvider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </MuiPickersUtilsProvider>,

  // </React.StrictMode>,
  document.getElementById("root")
);

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { UsersContextProvider } from "./context/userContext";
import { RestaurantsContextProvider } from "./context/RestaruantsContext";
import { AlertContextProvider } from "./context/AlertContext";
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

ReactDOM.render(
  // <React.StrictMode>
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <ThemeProvider theme={theme}>
      <RestaurantsContextProvider>
        <AlertContextProvider>
          <UsersContextProvider>
            <App />
          </UsersContextProvider>
        </AlertContextProvider>
      </RestaurantsContextProvider>
    </ThemeProvider>
  </MuiPickersUtilsProvider>,

  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

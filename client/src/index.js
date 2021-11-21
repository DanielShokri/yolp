import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import ilLocal from "date-fns/locale/he";
import {AlertContextProvider} from "./context/AlertContext";
import {Provider} from "react-redux";
import store from "./store/store";
import {PersistGate} from "redux-persist/integration/react";
import {persistStore} from "redux-persist";
import "./index.css";

// theme.typography.h3 = {
//   fontSize: "1.4rem",
//   "@media (min-width:600px)": {
//     fontSize: "1.5rem",
//   },
//   [theme.breakpoints.up("md")]: {
//     fontSize: "2.4rem",
//   },
// };

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

let persistor = persistStore(store);

ReactDOM.render(
  // <React.StrictMode>
  <LocalizationProvider dateAdapter={AdapterDateFns} locale={ilLocal}>
    <ThemeProvider theme={darkTheme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AlertContextProvider>
            <App />
          </AlertContextProvider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </LocalizationProvider>,

  // </React.StrictMode>,
  document.getElementById("root")
);

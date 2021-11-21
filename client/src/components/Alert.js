import React, {useContext, useEffect} from "react";
import {AlertContext} from "./../context/AlertContext";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const AlertRegular = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AlertError = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AlertInfos = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const AlertSuccess = ({ children }) => {
  const { open, setOpen } = useContext(AlertContext);

  useEffect(() => {
    return () => {
      setOpen(false);
    };
  }, [setOpen]);

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      TransitionComponent={SlideTransition}
      open={open}
      autoHideDuration={6000}
      onClose={() => setOpen(false)}
    >
      <AlertRegular onClose={() => setOpen(false)} severity="success">
        {children}
      </AlertRegular>
    </Snackbar>
  );
};

export const AlertFail = ({ children }) => {
  const { openError, setOpenError } = useContext(AlertContext);

  useEffect(() => {
    return () => {
      setOpenError(false);
    };
  }, [setOpenError]);

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      TransitionComponent={SlideTransition}
      open={openError}
      autoHideDuration={6000}
      onClose={() => setOpenError(false)}
    >
      <AlertError onClose={() => setOpenError(false)} severity="error">
        {children ? children : "Something went wrong!"}
      </AlertError>
    </Snackbar>
  );
};

export const AlertInfo = ({ children }) => {
  const { openInfo, setOpenInfo } = useContext(AlertContext);

  useEffect(() => {
    return () => {
      setOpenInfo(false);
    };
  }, [setOpenInfo]);

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      TransitionComponent={SlideTransition}
      open={openInfo}
      autoHideDuration={6000}
      onClose={() => setOpenInfo(false)}
    >
      <AlertInfos onClose={() => setOpenInfo(false)} severity="info">
        {children}
      </AlertInfos>
    </Snackbar>
  );
};

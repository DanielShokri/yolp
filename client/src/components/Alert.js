import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";
import { AlertContext } from "./../context/AlertContext";
import { useContext, useEffect } from "react";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function AlertError(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const AlertSuccsess = ({ children }) => {
  const { open, setOpen } = useContext(AlertContext);

  useEffect(() => {
    return () => {
      setOpen(false);
    };
  }, [setOpen]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={() => setOpen(false)}
    >
      <Alert onClose={() => setOpen(false)} severity="success">
        {children}
      </Alert>
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

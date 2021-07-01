import { React, useState, createContext } from "react";

export const AlertContext = createContext();

export const AlertContextProvider = (props) => {
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);

  return (
    <AlertContext.Provider
      value={{ open, setOpen, openError, setOpenError, openInfo, setOpenInfo }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

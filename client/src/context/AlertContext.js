import { React, useState, createContext } from "react";

export const AlertContext = createContext();

export const AlertContextProvider = (props) => {
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);

  return (
    <AlertContext.Provider value={{ open, setOpen, openError, setOpenError }}>
      {props.children}
    </AlertContext.Provider>
  );
};

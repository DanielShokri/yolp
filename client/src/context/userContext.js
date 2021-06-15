import { React, useState, createContext } from "react";

export const usersContext = createContext();

export const UsersContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  return (
    <usersContext.Provider
      value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
    >
      {props.children}
    </usersContext.Provider>
  );
};

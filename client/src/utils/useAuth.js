import {useDispatch, useSelector} from "react-redux";
import {AlertContext} from "./../context/AlertContext";
import {useContext, useEffect} from "react";
import authApi from "../api/authApi";
import {setIsAuthenticated, userLogout} from "../features/users/usersSlice";

export const useAuth = () => {
  const { user } = useSelector((state) => state.users);
  const { setOpenInfo } = useContext(AlertContext);
  const dispatch = useDispatch();
  //   const INTERVAL_TIME = 30000 * 60;
  const INTERVAL_TIME = 1000;
  let authInterval;

  return useEffect(() => {
    async function checkIfAuth() {
      try {
        const res = await authApi.get("/is-verify", {
          headers: { Authorization: user?.token },
        });
        dispatch(setIsAuthenticated(res.data));
      } catch (error) {
        setOpenInfo(true);
        dispatch(userLogout());
      }
    }


    if (!authInterval) {
      checkIfAuth();
    } else {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      authInterval = setInterval(() => checkIfAuth(), INTERVAL_TIME);
    }

    return () => clearInterval(authInterval);
  }, [user?.token]);
};

import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
} from "react";
import * as authHelper from "./AuthHelpers";
import { getJobs, getUserByToken } from "../requests/Auth";
import { LayoutSplashScreen } from "./SplashScreen";
import SocketProvider from "./socketIoContext/socketProvider";

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => {},
  currentUser: undefined,
  setCurrentUser: () => {},
  logout: () => {},
};

const AuthContext = createContext(initAuthContextPropsState);

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(authHelper.getAuth());
  const [currentUser, setCurrentUser] = useState();
  const saveAuth = (auth) => {
    setAuth(auth);
    if (auth) {
      authHelper.setAuth(auth);
    } else {
      authHelper.removeAuth();
    }
  };

  const logout = () => {
    saveAuth(undefined);
    setCurrentUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{ auth, saveAuth, currentUser, setCurrentUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const AuthInit = ({ children }) => {
  const { auth, logout, setCurrentUser } = useAuth();
  const didRequest = useRef(false);
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
  useEffect(() => {
    const requestUser = async (apiToken) => {
      try {
        if (!didRequest.current) {
          const { data } = await getUserByToken(apiToken);
          if (data) {
            setCurrentUser(data);
          }
        }
      } catch (error) {
        if (!didRequest.current) {
          logout();
        }
      } finally {
        setShowSplashScreen(false);
      }

      return () => (didRequest.current = true);
    };

    const requestJobs = async () => {
      const jobs = await getJobs();
      if (jobs.data?.data?.rows) {
        authHelper.setJobsInfo(jobs.data.data.rows);
      }
    };

    if (auth && auth.api_token) {
      requestUser(auth.api_token);
      requestJobs();
    } else {
      logout();
      setShowSplashScreen(false);
    }
    // eslint-disable-next-line
  }, []);

  return showSplashScreen ? (
    <LayoutSplashScreen />
  ) : (
    <>
      <SocketProvider>{children}</SocketProvider>
    </>
  );
};

export { AuthProvider, AuthInit, useAuth };

import { useEffect } from "react";

import axios from "axios";
import useAuth from "../hooks/useAuth";

const AppProvider = ({ children }) => {
  const { logOutHandler } = useAuth();

  const getCsrfToken = async () => {
    const { data } = await axios.get("/api/csrf");
    axios.defaults.headers["X-CSRF-TOKEN"] = data.csrfToken;
  };

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      const res = error.response;
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        return new Promise((resolve, reject) => {
          logOutHandler();
        });
      }
      return Promise.reject(error.response);
    }
  );

  useEffect(() => {
    getCsrfToken();
  }, []);

  return <>{children}</>;
};

export default AppProvider;

import { useState } from "react";
import axios from "axios";
import { useLogout, useLogin } from "../store";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const useAuth = () => {
  const router = useRouter();
  const logout = useLogout();
  const login = useLogin();
  const [loading, setLoading] = useState(false);
  const [check, setCheck] = useState(false);

  const registerHandler = async (userName, email, password) => {
    setLoading(true);
    try {
      const { data, status } = await axios.post(`/api/register`, {
        userName,
        email,
        password,
      });
      console.log(status);
      toast.success(data.message);
      setLoading(false);
    } catch (error) {
      console.log(error?.response?.data);
      toast.error(error?.response?.data);
      setLoading(false);
    }
  };

  const loginHandler = async (email, password) => {
    setLoading(true);

    try {
      const { data } = await axios.post(`/api/login`, {
        email,
        password,
      });

      toast.success(data.message);

      login(data.user);

      setLoading(false);

      return router.push("/");
    } catch (error) {
      setLoading(false);
      console.log(error.response);
      return toast.error(error.response?.data);
    }
  };

  const logOutHandler = async () => {
    router.push("/login");
    window.localStorage.removeItem("user");
    const { data } = await axios.post("/api/logout");

    toast(data);

    logout();
  };

  const checkAndSetUser = async () => {
    setCheck(false);
    const localUser = await JSON.parse(window.localStorage.getItem("user"));
    await login(localUser);
    setCheck(true);
  };

  return { registerHandler, logOutHandler, loginHandler, loading, checkAndSetUser, check };
};

export default useAuth;

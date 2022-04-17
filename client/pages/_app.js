import Header from "../component/Header";
import "../styles/globals.css";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useLogin, useUser } from "../store";
import { SyncOutlined } from "@ant-design/icons";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  const login = useLogin();
  const user = useUser();

  useEffect(() => {
    console.log("I am Running on _app");
    gettingUser();
  }, []);

  const gettingUser = () => {
    setLoading(true);
    const localUser = JSON.parse(window.localStorage.getItem("user"));
    login(localUser);
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <SyncOutlined spin size="large" />
      ) : (
        <>
          <Header />
          <Component {...pageProps} />
          <ToastContainer />
        </>
      )}
    </>
  );
}

export default MyApp;

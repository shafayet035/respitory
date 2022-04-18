import Header from "../component/Header";
import "../styles/globals.css";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { SyncOutlined } from "@ant-design/icons";
import useAuth from "../hooks/useAuth";

function MyApp({ Component, pageProps }) {
  const { check, checkAndSetUser, verifyToken } = useAuth();

  verifyToken();

  useEffect(() => {
    checkAndSetUser();
  }, []);

  return (
    <>
      {!check ? (
        <SyncOutlined spin className="w-100 text-center display-1 p-5" />
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

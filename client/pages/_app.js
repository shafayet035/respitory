import Header from "../component/Header";
import "../styles/globals.css";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { SyncOutlined } from "@ant-design/icons";
import useAuth from "../hooks/useAuth";
import AppProvider from "../View/AppProvider";

function MyApp({ Component, pageProps }) {
  const { check, checkAndSetUser } = useAuth();

  useEffect(() => {
    checkAndSetUser();
  }, []);

  return (
    <AppProvider>
      {!check ? (
        <SyncOutlined spin className="w-100 text-center display-1 p-5" />
      ) : (
        <>
          <Header />
          <Component {...pageProps} />
          <ToastContainer position="bottom-right" />
        </>
      )}
    </AppProvider>
  );
}

export default MyApp;

import Header from "../component/Header";
import "../styles/globals.css";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}

export default MyApp;

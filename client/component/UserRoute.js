import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const UserRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  const router = useRouter();

  const getUser = async () => {
    try {
      const { data } = await axios.get("/api/current-user");

      if (data.isAuthorized === false) return router.push("/login");

      return setIsAuthorized(true);
    } catch (error) {
      if (error) {
        console.log(error.reponse);
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!isAuthorized) return "";

  return <> {children} </>;
};

export default UserRoute;

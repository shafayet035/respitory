import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useUser } from "../store";

const UserRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  const user = useUser();

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
    if (!user) {
      router.push("/login");
    } else {
      getUser();
    }
  }, []);

  if (!isAuthorized) return "";

  return <> {children} </>;
};

export default UserRoute;

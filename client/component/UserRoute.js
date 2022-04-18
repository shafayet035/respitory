import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const UserRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsAuthorized(true);
    axios
      .get("/api/current-user")
      .then(({ data }) => {
        console.log(data);
        if (!data.isAuthorized) router.push("/login");
        setIsAuthorized(data.isAuthorized);
      })
      .catch((err) => console.log(err.response));
  }, []);

  return <>{isAuthorized ? <>{children}</> : ""}</>;
};

export default UserRoute;

import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useUser } from "../store";

const InstructorRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  const user = useUser();

  const router = useRouter();

  const getUser = async () => {
    try {
      const { data } = await axios.get("/api/get-instructor");

      if (data.isAuthorized === false) return router.push("/login");

      return setIsAuthorized(true);
    } catch (error) {
      if (error) {
        toast.error(error.response.data);
        router.push("/user/profile");
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

  if (!isAuthorized) return null;

  return <> {children} </>;
};

export default InstructorRoute;

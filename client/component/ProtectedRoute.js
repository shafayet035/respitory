import { useEffect } from "react";
import { useUser } from "../store";
import { useRouter } from "next/router";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  if (user !== null) return null;

  return <>{children}</>;
};

export default ProtectedRoute;

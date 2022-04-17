import { useEffect, useState } from "react";

import { Button, Input } from "antd";
import { LockOutlined, MailOutlined, SyncOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import axios from "axios";
import { useLogin, useUser } from "../store";
import { useRouter } from "next/router";
import ProtectedRoute from "../component/ProtectedRoute";

const login = () => {
  const [email, setEmail] = useState("ashchorjo@bakahar.com");
  const [password, setPassword] = useState("biddot.har.ashchorjo!");
  const [loading, setLoading] = useState(false);

  const login = useLogin();

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      // requesting api
      const { data } = await axios.post(`/api/login`, {
        email,
        password,
      });

      // Showing Toast on Success
      toast.success(data.message);

      // Setting User Data to Store
      login(data.user);

      // Setting user to localstorage
      window.localStorage.setItem("user", JSON.stringify(data.user));

      setLoading(false);

      router.push("/");
    } catch (error) {
      // Toast Error Message
      toast.error(error.response.data);
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="container col-md-4 py-5">
        <h4 className="mb-5 text-center">Login</h4>
        <div className="shadow-sm p-4 bg-white rounded">
          <form onSubmit={handleSubmit}>
            <label className="form-label">E-mail Address</label>
            <Input
              className="mb-3"
              size="large"
              required
              placeholder="Enter your Email"
              prefix={<MailOutlined />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />{" "}
            <label className="form-label">Passsword</label>
            <Input.Password
              className="mb-3"
              size="large"
              required
              placeholder="User password"
              prefix={<LockOutlined />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button className="w-100" htmlType="submit" type="primary" disabled={loading || !email || !password}>
              {loading ? <SyncOutlined spin /> : "Submit"}
            </Button>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default login;

import { useState } from "react";

import { Button, Input } from "antd";
import { LockOutlined, MailOutlined, SyncOutlined } from "@ant-design/icons";

import LoggedOutRoute from "../component/LoggedOutRoute";
import useAuth from "../hooks/useAuth";

const login = () => {
  const [email, setEmail] = useState("ashchorjo@bakahar.com");
  const [password, setPassword] = useState("biddot.har.ashchorjo!");

  const { loginHandler, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginHandler(email, password);
  };

  return (
    <LoggedOutRoute>
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
    </LoggedOutRoute>
  );
};

export default login;

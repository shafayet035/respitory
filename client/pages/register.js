import { useState } from "react";

import { Button, Input } from "antd";
import { LockOutlined, MailOutlined, UserOutlined, SyncOutlined } from "@ant-design/icons";

import Link from "next/link";
import ProtectedRoute from "../component/ProtectedRoute";
import useAuth from "../hooks/useAuth";

const register = () => {
  const [userName, setUserName] = useState("Biddot Ashchorjo");
  const [email, setEmail] = useState("ashchorjo@bakahar.com");
  const [password, setPassword] = useState("biddot.har.ashchorjo!");

  const { registerHandler, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    registerHandler(userName, email, password);
  };

  return (
    <ProtectedRoute>
      <h4 className="mb-3 text-center pt-5">Register An Account</h4>
      <div className="container col-md-4">
        <div className="shadow-sm p-4 bg-white rounded">
          <form onSubmit={handleSubmit}>
            <label className="form-label">User Name</label>
            <Input
              className="mb-3"
              size="large"
              required
              placeholder="Enter your username"
              prefix={<UserOutlined />}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <label className="form-label">E-mail Address</label>
            <Input
              className="mb-3"
              size="large"
              required
              placeholder="Enter your Email"
              prefix={<MailOutlined />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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
            <Button
              className="w-100"
              htmlType="submit"
              type="primary"
              disabled={loading || !userName || !email || !password}
            >
              {loading ? <SyncOutlined spin /> : "Submit"}
            </Button>
          </form>
        </div>
      </div>
      <p className="text-center py-3">
        Already an user? <Link href="/login">Login</Link>
      </p>
    </ProtectedRoute>
  );
};

export default register;

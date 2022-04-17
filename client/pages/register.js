import { useState } from "react";

import { Button, Input } from "antd";
import { LockOutlined, MailOutlined, UserOutlined, SyncOutlined } from "@ant-design/icons";

import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";

const register = () => {
  const [userName, setUserName] = useState("Biddot Ashchorjo");
  const [email, setEmail] = useState("ashchorjo@bakahar.com");
  const [password, setPassword] = useState("biddot.har.ashchorjo!");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post(`/api/register`, {
        userName,
        email,
        password,
      });

      toast.success(response.data.message);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data);
      setLoading(false);
    }
  };

  return (
    <>
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
    </>
  );
};

export default register;

import { useState } from "react";

import { Button, Input } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";

import axios from "axios";

const register = () => {
  const [userName, setUserName] = useState("Biddot");
  const [email, setEmail] = useState("ashchorjo@bakahar.com");
  const [password, setPassword] = useState("biddot.har.ashchorjo!");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitting");
    try {
      const response = await axios.post("http://localhost:8000/v1/api/register", {
        userName,
        email,
        password,
      });

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container col-md-4 py-5">
      <h4 className="mb-5 text-center">Register as a Instructor or Student</h4>
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
          <Button className="w-100" htmlType="submit" type="primary">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default register;

import { FontSizeOutlined, LockOutlined, MailOutlined, SyncOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import LoggedOutRoute from "../component/LoggedOutRoute";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(false);

  const router = useRouter();

  const sendRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("/api/forgot-password", {
        email,
      });
      toast.success(data.message);
      setLoading(false);
      setStep(true);
    } catch (error) {
      console.log(error.response);
      toast.error(error.response?.data);
      setLoading(false);
    }
  };

  const VerifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("/api/reset-password", {
        email,
        password,
        code,
      });
      toast.success(data.message);
      setLoading(false);
      router.push("/login");
    } catch (error) {
      console.log(error.response);
      toast.error(error.response?.data);
      setLoading(false);
    }
  };

  return (
    <LoggedOutRoute>
      <div className="container col-md-7 col-lg-4 py-5">
        <h4 className="mb-4 text-center">Reset Your Password</h4>
        <div className="shadow-sm p-4 bg-white rounded">
          <form onSubmit={step ? VerifyCode : sendRequest}>
            <label className="form-label">Your Email</label>
            <Input
              className="mb-3"
              size="large"
              required
              placeholder="Enter your Email"
              prefix={<MailOutlined />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />{" "}
            {step && (
              <>
                <label className="form-label">Code</label>
                <Input
                  className="mb-3"
                  size="large"
                  required
                  placeholder="Check Your Email For Code"
                  prefix={<FontSizeOutlined />}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />{" "}
                <label className="form-label">New Password</label>
                <Input.Password
                  className="mb-3"
                  size="large"
                  required
                  placeholder="New Password"
                  prefix={<LockOutlined />}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />{" "}
              </>
            )}
            <Button className="w-100" htmlType="submit" type="primary" disabled={!email}>
              {loading ? (
                <>
                  <SyncOutlined spin /> Please Wait
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </div>
        <p className="mt-4 text-center">
          Don't Have an account? <Link href="/register">Register</Link>
        </p>
      </div>
    </LoggedOutRoute>
  );
};

export default PasswordReset;

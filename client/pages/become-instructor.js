import { Button, Input, Select } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserRoute from "../component/UserRoute";
import { useLogin, useUser } from "../store";

const BecomeInstructor = () => {
  const [loading, setLoading] = useState(false);
  const login = useLogin();

  const [formData, setFormData] = useState({
    contact_number: "",
    billing_address: "",
    payment_gateway: "",
    topic: "",
  });

  const user = useUser();

  const router = useRouter();

  useEffect(() => {
    if (user.role.includes("instructor")) router.push("/user/profile");
  }, []);

  const instructorHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post("/api/create-instructor", { formData });
      toast.success(data.message);
      console.log(data);
      login(data.user);
      setLoading(false);
      window.location.href = "/user/profile";
    } catch (error) {
      toast.error(error.response?.data);
      setLoading(false);
    }
  };

  const onChangeInput = (name, value) => {
    const oldData = { ...formData, [name]: value };

    setFormData(oldData);
  };

  return (
    <UserRoute>
      <div className="py-5 d-flex align-items-center" style={{ backgroundColor: "#fff", height: "80vh" }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2 className="display-4 ">Become an Instructor Today!</h2>
              <p className="lead mb-4">
                Add a Billing Information to Receive Payment and the Following information to be an Instructor
              </p>
              <form onSubmit={instructorHandler}>
                <div className="mb-3">
                  <label className="form-label">Contact Number</label>
                  <Input
                    onChange={(e) => onChangeInput(e.target.name, e.target.value)}
                    type="number"
                    size="large"
                    name="contact_number"
                    placeholder="Billing Contact Number"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Billing Address</label>
                  <Input
                    onChange={(e) => onChangeInput(e.target.name, e.target.value)}
                    size="large"
                    name="billing_address"
                    placeholder="Billing Address"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Payment Gateway</label>
                  <Select
                    onChange={(value) => onChangeInput("payment_gateway", value)}
                    placeholder="Your Profession"
                    name="payment_gateway"
                    className="w-100"
                  >
                    <Select.Option value="Paypal">Paypal</Select.Option>
                    <Select.Option value="Payoneer">Payoneer</Select.Option>
                    <Select.Option value="Direct to Bank">Direct to Bank</Select.Option>
                  </Select>
                </div>
                <div className="mb-3">
                  <label className="form-label">What you will teach?</label>
                  <Select
                    onChange={(value) => onChangeInput("topic", value)}
                    placeholder="In Which Topic you will teach"
                    name="profession"
                    className="w-100"
                  >
                    <Select.Option value="Backend Developer">Backend Development</Select.Option>
                    <Select.Option value="Frontend Developer">Frontend Development</Select.Option>
                    <Select.Option value="Blockchain Developer">Blockchain Technology</Select.Option>
                    <Select.Option value="Human Resources">Digital Marketing</Select.Option>
                  </Select>
                </div>
                <Button htmlType="submit" disabled={loading || !user} type="primary" size="large">
                  Setup Payment
                </Button>
              </form>
            </div>

            <div className="col-md-6">
              <img className="img-fluid" src="/bg.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </UserRoute>
  );
};

export default BecomeInstructor;

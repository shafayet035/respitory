import { Button, Input, Select } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useUser } from "../store";

const BecomeInstructor = () => {
  const [loading, setLoading] = useState(false);

  const user = useUser();

  const instructorHandler = async () => {
    setLoading(true);

    try {
      const { data } = await axios.post("/api/create-instructor");

      setLoading(false);
    } catch (error) {
      console.log(error.response);
      toast.error(error.response?.statusText);
      setLoading(false);
    }
  };

  return (
    <div className="py-5 d-flex align-items-center" style={{ backgroundColor: "#fff", height: "80vh" }}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h2 className="display-4">Become an Instructor Today!</h2>
            <p className="lead">
              Add a Billing Information to Receive Payment and the Following information to be an Instructor
            </p>
            <form>
              <div className="mb-3">
                <label className="form-label">Contact Number</label>
                <Input size="large" required name="contact_number" placeholder="Billing Contact Number" />
              </div>
              <div className="mb-3">
                <label className="form-label">Billing Address</label>
                <Input size="large" required name="billing_address" placeholder="Billing Address" />
              </div>
              <div className="mb-3">
                <label className="form-label">Payment Gateway</label>
                <Select placeholder="Your Profession" className="w-100">
                  <Select.Option value="Paypal">Paypal</Select.Option>
                  <Select.Option value="Payoneer">Payoneer</Select.Option>
                  <Select.Option value="Direct to Bank">Direct to Bank</Select.Option>
                </Select>
              </div>
              <div className="mb-3">
                <label className="form-label">Your Profession</label>
                <Select placeholder="Your Profession" className="w-100">
                  <Select.Option value="Backend Developer">Backend Developer</Select.Option>
                  <Select.Option value="Frontend Developer">Frontend Developer</Select.Option>
                  <Select.Option value="Human Resources">Human Resources</Select.Option>
                  <Select.Option value="Blockchain Developer">Blockchain Developer</Select.Option>
                </Select>
              </div>
              <Button onClick={instructorHandler} disabled={loading || !user} type="primary" size="large">
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
  );
};

export default BecomeInstructor;

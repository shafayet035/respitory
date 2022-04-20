import { Button } from "antd";
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
            <h2 className="display-2">Become an Instructor Today!</h2>
            <p className="lead">Add a Billing Information to Receive Payment and You will be an Instructor</p>
            <Button onClick={instructorHandler} disabled={loading || !user} type="primary" size="large">
              Setup Payment
            </Button>
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

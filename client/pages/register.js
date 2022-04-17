import React from "react";
import { Form, Input, Button } from "antd";

const register = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="container col-md-4 py-5">
      <h4 className="mb-5 text-center">Register as a Instructor or Student</h4>
      <div className="shadow-sm p-4 pb-2 bg-white">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Username" required tooltip="This is a required field">
            <Input required type="text" placeholder="Username" />
          </Form.Item>
          <Form.Item label="E-mail Address" required tooltip="This is a required field">
            <Input required type="email" placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" required tooltip="This is a required field">
            <Input required type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default register;

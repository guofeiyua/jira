import { useAuth } from "context/auth-context";
import React from "react";
import { Form } from "antd";
import Input from "antd/es/input";
import { LongButton } from "unauthenticated-app/index";
export const RegisterScreen = () => {
  const { register } = useAuth();
  const handleSubmit = (values: {username: string, password: string}) => {
    register(values);
  };
  return (
    <Form onFinish={handleSubmit}
    >
      <Form.Item 
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}>
        <Input placeholder="用户名" type="text" name="username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input type="password" name="password" />
      </Form.Item>
      <Form.Item>
        <LongButton type="primary" htmlType="submit">
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};

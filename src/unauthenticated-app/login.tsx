import { Form } from "antd";
import Input from "antd/es/input";
import { useAuth } from "context/auth-context";
import React from "react";
import { LongButton } from "unauthenticated-app/index";
export const Login = () => {
  const { login } = useAuth();
  const handleSubmit = (values: {username: string, password: string}) => {
    login(values);
  };
  return (
    <Form onFinish={handleSubmit}
    >
      <Form.Item 
        name="username"
        rules={[{ required: true, message: '请输入用户名!' }]}>
        <Input placeholder="用户名" autoComplete="true" type="text" name="username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入密码!' }]}>
        <Input type="password" autoComplete="true" name="password" />
      </Form.Item>
      <Form.Item>
        <LongButton type="primary" htmlType="submit">
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};

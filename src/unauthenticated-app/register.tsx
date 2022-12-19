import { useAuth } from "context/auth-context";
import React, { FormEvent } from "react";
const url = process.env.REACT_APP_API_URL;
export const RegisterScreen = () => {
  const { user, register } = useAuth();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    register({ username, password });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <span>用户名：</span>
        <input type="text" name="username" />
      </div>
      <div>
        <span>密码：</span>
        <input type="password" name="password" />
      </div>
      <button type="submit">注册</button>
    </form>
  );
};

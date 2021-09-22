import React, { FormEvent } from "react";
const url = process.env.REACT_APP_API_BASE;
export const Login = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    fetch(`${url}/login`, {
      body: JSON.stringify({ username, password }), // must match 'Content-Type' header
      headers: {
        "content-type": "application/json",
      },
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // *client, no-referrer
    }).then(async (response) => console.log(response));
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
      <button type="submit">登录</button>
    </form>
  );
};

import { useState } from "react";
import { useMount, useMountedRef } from "utils";
import { useHttp } from "./http";
export const useUsers = () => {
  const mountedRef = useMountedRef();
  const [users, setUsers] = useState([]);
  const client = useHttp();
  useMount(() => {
    client("users").then((data) => {
      if (mountedRef.current) {
        setUsers(data);
      }
    });
  });
  return users;
};

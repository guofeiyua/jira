import React from "react";
import { IdSelect } from "./id-select";
import { useUsers } from "utils/user";

export const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const users = useUsers();
  return <IdSelect options={users || []} {...props}></IdSelect>;
};

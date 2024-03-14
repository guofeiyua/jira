import React, { ChangeEvent } from "react";
import { Form, Input } from "antd";
import { User } from "models/user";
import { Project } from "./list";
import { UserSelect } from "components/user-select";

interface SearchPanelProps {
  users: User[];
  param: Partial<Pick<Project, "name" | "personId">>;
  setParam: (param: SearchPanelProps["param"]) => void;
}
export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return (
    <Form layout="inline" style={{ marginBottom: "2rem" }}>
      <Form.Item style={{ display: "flex" }}>
        <Input
          placeholder={"项目名"}
          type="text"
          value={param.name}
          onChange={(evt: ChangeEvent<HTMLInputElement>) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName="负责人"
          onChange={(value) => {
            console.log(value, typeof value);
            setParam({
              ...param,
              personId: value,
            });
          }}
          value={param.personId}
        ></UserSelect>
      </Form.Item>
    </Form>
  );
};

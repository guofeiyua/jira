import React, { ChangeEvent } from "react";
import { Input, Select } from "antd";
import { User } from 'models/user';

interface SearchPanelProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: SearchPanelProps["param"]) => void;
}
export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return (
    <form>
      <div style={{display:'flex'}}>
        <Input
            type="text"
            value={param.name}
            onChange={(evt: ChangeEvent<HTMLInputElement>) => 
              setParam({
                ...param,
                name: evt.target.value
              })
            }
          />
          <Select
            value={param.personId}
            onChange={(value) =>
              setParam({
                ...param,
                personId: value,
              })
            }
          >
            <Select.Option value={""}>负责人</Select.Option>
            {users.map((user) => (
              <Select.Option key={user.id} value={user.id}>
                {user.name}
              </Select.Option>
            ))}
          </Select>
      </div>

    </form>
  )
}
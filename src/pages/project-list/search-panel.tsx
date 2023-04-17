import React, { ChangeEvent } from "react";
import { Form, Input, Select } from "antd";
import { User } from 'models/user';
import { Project } from "./list";

interface SearchPanelProps {
  users: User[];
  param: Pick<Project, 'name' | 'personId'>;
  setParam: (param: SearchPanelProps["param"]) => void;
}
export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return (
    <Form layout="inline" style={{marginBottom: '2rem'}}>
      <Form.Item style={{display:'flex'}}>
        <Input
          placeholder={'项目名'}
          type="text"
          value={param.name}
          onChange={(evt: ChangeEvent<HTMLInputElement>) => 
              setParam({
                ...param,
                name: evt.target.value
              })
            }
          />
      </Form.Item>
      <Form.Item>
        <Select
            value={param.personId}
            onChange={(value) =>
              {
                console.log(param.personId, '=========')
                setParam({
                  ...param,
                  personId: value,
                })
              }
            }
          >
            <Select.Option value={" "}>负责人</Select.Option>
            {users.map((user) => (
              <Select.Option key={user.id} value={String(user.id)}>
                {user.name}
              </Select.Option>
            ))}
          </Select>
      </Form.Item>      
    </Form>
  )
}
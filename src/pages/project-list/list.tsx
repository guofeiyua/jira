import React from "react";
import { Table, TableProps } from "antd";
import { User } from 'models/user'
import dayjs from 'dayjs'
export interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
  key?: string;
}
interface ListProps extends TableProps<Project> {
  users: User[];
}

export const List = ({ users, ...props }: ListProps) => {
  return (    <Table
    pagination={false}
    rowKey={'id'}
    columns={[
      {
        title: "名称",
        dataIndex: "name",
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
      },
      {
        title: "部门",
        key: 'organization',
        dataIndex: "organization",
      },
      {
        title: "负责人",
        key: 'personId',
        render(value, project) {
          return (
            <span>
              {users.find((user) => user.id === project.personId)?.name ||
                "未知"}
            </span>
          );
        },
      },
      {
        title: "创建时间",
        key: 'created',
        render(value, project) {

          return (
            <span>
              {project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无' }
            </span>
          );
        },
      },
    ]}
    {...props}
  />
);
};
import React, { useState } from "react";
import { SearchPanel } from "pages/project-list/search-panel";
import { List } from "pages/project-list/list";
import styled from '@emotion/styled';
import { useDebounce } from "utils";
import { Typography } from "antd";
import { useProject } from "utils/project";
import { useUsers } from "utils/user";
export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''   })
  const users = useUsers()
  const debouncedParam = useDebounce(param, 200)
  const {error, data: list, isLoading } = useProject(debouncedParam)
  
  return (
    <Container>
      {error ? <Typography.Text type='danger'>{error.message}</Typography.Text> : ''}
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      <List users={users || []} dataSource={list || []} loading={isLoading} />
    </Container>
  )
}
const Container = styled.div`
  padding: 3.2rem;
  height: 100%;
`
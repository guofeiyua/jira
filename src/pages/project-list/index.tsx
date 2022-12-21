import React, { useEffect, useState } from "react";
import { SearchPanel } from "pages/project-list/search-panel";
import { List } from "pages/project-list/list";
import styled from '@emotion/styled';
const apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {
  const [list, setList] = useState([])
  const [param, setParam] = useState({
    name: '',
    personId: ''   })
  const [users, setUsers] = useState([])
  useEffect(() => {
    fetch(`${apiUrl}/projects`).then(async response => {
      if (response.ok) {
        setList(await response.json())
      }
    })
  }, [])
  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async response => {
      if (response.ok) {
        setUsers(await response.json())
      }
    })
  }, [])
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      <List users={users || []} list={list || []} />
    </Container>
  )
}
const Container = styled.div`
  padding: 3.2rem;
  height: 100%;
`
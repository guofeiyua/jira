import React, { useEffect, useState } from "react";
import { SearchPanel } from "pages/project-list/search-panel";
import { List } from "pages/project-list/list";
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
  })
  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async response => {
      if (response.ok) {
        setUsers(await response.json())
      }
    })
  }, [])
  return (
    <div>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      <List users={users || []} list={list || []} />
    </div>
  )
}
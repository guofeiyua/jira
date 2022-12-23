import { useState } from 'react';
import { useMount } from 'utils';
import { useHttp } from './http';
export const useUsers = () => {
  const [users, setUsers] = useState([])
  const client = useHttp();
  useMount(() => {
    client('users').then(setUsers)
  })
  return users;
}
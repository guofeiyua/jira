import React from 'react';
import { useAuth } from 'context/auth-context';
import { ProjectListScreen } from 'pages/project-list';
export const AuthenticatedApp = () => {
  const { logout } = useAuth() 
  return <div>
    <ProjectListScreen></ProjectListScreen>
    <button onClick={logout}>登出</button>
  </div>
}
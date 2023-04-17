import { EpicScreen } from "pages/epic";
import { KanbanScreen } from "pages/kanban";
import React from "react";
import { Link, Route, Routes, Navigate } from "react-router-dom";

export const ProjectScreen = () => {
  return <div>
    <h1>Project Screen</h1>
    <Link to={'kanban'}>看板</Link>
    <Link to={'epic'}>任务组</Link>
    <Routes>
      <Route path={'/kanban'} element={<KanbanScreen></KanbanScreen>}></Route>
      <Route path={'/epic'} element={<EpicScreen></EpicScreen>}></Route>
      <Route path='/' element={<Navigate to={window.location.pathname + '/kanban'}></Navigate>}></Route>
      
    </Routes>
  </div>
}
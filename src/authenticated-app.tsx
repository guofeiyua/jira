/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "pages/project-list";
import { ProjectScreen } from "pages/project";
import styled from "@emotion/styled";
import { Row } from "components/lib";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Button, Dropdown, Menu, MenuProps } from "antd";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { resetRoute } from "utils";
import { ProjectModel } from "pages/project-list/project-model";
import { ProjectPopover } from "./components/project-popover";

export const AuthenticatedApp = () => {
  const { logout, user } = useAuth();
  const [modelVisible, setModelVisible] = useState(false);
  const items: MenuProps["items"] = [
    {
      key: "logout",
      label: (
        <Menu.Item key={"logout"}>
          <Button type="link" onClick={logout}>
            登出
          </Button>
        </Menu.Item>
      ),
    },
  ];
  return (
    <div>
      <PageHeader>
        <HeaderLeft gap={true}>
          <Button type="link" onClick={resetRoute}>
            <SoftwareLogo width={"18rem"} color="rgb(38, 132, 255)" />
          </Button>

          <ProjectPopover
            openModel={() => setModelVisible(true)}
          ></ProjectPopover>
          <span>用户</span>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown menu={{ items }}>
            <Button type={"link"} onClick={(e) => e.preventDefault()}>
              Hi,{user?.name}
            </Button>
          </Dropdown>
        </HeaderRight>
      </PageHeader>
      <Main>
        <Router>
          <Routes>
            <Route
              path={"/projects"}
              element={
                <ProjectListScreen openModel={() => setModelVisible(true)} />
              }
            />
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            />
            <Route path="*" element={<Navigate to={"/projects"} />}></Route>
          </Routes>
        </Router>
        <ProjectModel
          open={modelVisible}
          onClose={setModelVisible}
        ></ProjectModel>
      </Main>
    </div>
  );
};
const HeaderLeft = styled(Row)`
  padding: 3.2rem;
`;
const HeaderRight = styled.div``;
const PageHeader = styled.header`
  height: 6rem;
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1;
`;
const Main = styled.main`
  height: calc(100vh - 6rem);
`;

AuthenticatedApp.whyDidYouRender = true;

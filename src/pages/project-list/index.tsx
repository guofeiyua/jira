import React from "react";
import { SearchPanel } from "pages/project-list/search-panel";
import { List } from "pages/project-list/list";
import styled from "@emotion/styled";
import { useDebounce, useDocumentTitle } from "utils";
import { Button, Typography } from "antd";
import { useProject } from "utils/project";
import { useUsers } from "utils/user";
import { useProjectsSearchParams } from "./util";
import { Row } from "components/lib";
import { useDispatch } from "react-redux";
import { openProjectModel } from "store/project-list.slice";

export const ProjectListScreen = () => {
  // 基本类型可以放到依赖里，组件状态可以放到依赖里，非组件状态的对象不可以放到依赖里，会导致无限循环
  const [param, setParam] = useProjectsSearchParams();
  const users = useUsers();
  const debouncedParam = useDebounce(param, 200);
  const { error, data: list, isLoading, retry } = useProject(debouncedParam);
  const dispatch = useDispatch();
  useDocumentTitle("项目列表", false);

  return (
    <Container>
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : (
        ""
      )}
      <Row between={true}>
        <h1>项目列表</h1>
        <Button onClick={() => dispatch(openProjectModel())}>创建项目</Button>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      <List
        refresh={retry}
        users={users || []}
        dataSource={list || []}
        loading={isLoading}
      />
    </Container>
  );
};
const Container = styled.div`
  padding: 3.2rem;
  height: 100%;
`;

ProjectListScreen.whyDidYouRender = false;

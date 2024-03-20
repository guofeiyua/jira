import { Button, Drawer } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeProjectModel,
  selectorProjectOpenModel,
} from "store/project-list.slice";

export const ProjectModel = () => {
  const dispatch = useDispatch();
  const modelVisible = useSelector(selectorProjectOpenModel);
  return (
    <Drawer
      width={"100%"}
      title="Basic Drawer"
      onClose={() => dispatch(closeProjectModel())}
      open={modelVisible}
    >
      <Button onClick={() => dispatch(closeProjectModel())}>关闭</Button>
    </Drawer>
  );
};

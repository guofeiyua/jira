import { Button, Drawer } from "antd";
import React from "react";
import { useProjectModel } from "utils/project";
interface ProjectModelProps {
  open: boolean;
  onClose: (open: boolean) => void;
}
export const ProjectModel = () => {
  const { projectModelOpen, close } = useProjectModel();
  return (
    <Drawer
      width={"100%"}
      title="Basic Drawer"
      onClose={close}
      open={projectModelOpen}
    >
      <Button onClick={close}>关闭</Button>
    </Drawer>
  );
};

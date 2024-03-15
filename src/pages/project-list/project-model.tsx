import { Button, Drawer } from "antd";
import React from "react";
interface ProjectModelProps {
  open: boolean;
  onClose: (open: boolean) => void;
}
export const ProjectModel = (props: ProjectModelProps) => {
  return (
    <Drawer
      width={"100%"}
      title="Basic Drawer"
      onClose={() => props.onClose(false)}
      open={props.open}
    >
      <Button onClick={() => props.onClose(false)}>关闭</Button>
    </Drawer>
  );
};

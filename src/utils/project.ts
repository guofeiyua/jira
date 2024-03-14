import { Project } from "pages/project-list/list";
import { useCallback, useEffect } from "react";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useProject = (params: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>();
  const client = useHttp();
  const fetchProjects = useCallback(
    () => client("projects", { data: cleanObject(params || {}) }),
    [client, params]
  );
  useEffect(() => {
    // 因为想重新去执行请求，所以将请求的函数传递进去
    run(fetchProjects(), { retryFun: fetchProjects });
  }, [params, run, fetchProjects]);
  return result;
};
export const useEditProject = () => {
  const { run, ...asyncRes } = useAsync<Project[]>();
  const client = useHttp();
  const editProject = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, { data: params, method: "PATCH" })
    );
  };
  return {
    editProject,
    ...asyncRes,
  };
};

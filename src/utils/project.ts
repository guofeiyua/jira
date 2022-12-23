import { Project } from "pages/project-list/list";
import { useEffect } from "react"
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useProject = (params: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>()
  const client = useHttp();
  useEffect(() => {
    run(client('projects', {data: cleanObject(params)}))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])
  return result;
}


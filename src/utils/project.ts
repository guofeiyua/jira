import { Project } from "pages/project-list/list";
import { useCallback, useEffect } from "react"
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useProject = (params: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>()
  const client = useHttp();
  const fetchProjects = useCallback(() => client('projects', {data: cleanObject(params || {})}), [client, params])
  useEffect(() => {
    run(fetchProjects())
  }, [params, run, fetchProjects])
  return result;
}


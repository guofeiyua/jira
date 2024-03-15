import { useMountedRef } from "./index";
import { useCallback, useState } from "react";
interface State<D> {
  data: D | null;
  error: Error | null;
  stat: "idle" | "loading" | "error" | "success";
}
const defaultInitialState: State<null> = {
  error: null,
  data: null,
  stat: "idle",
};
export const useAsync = <D>(initState?: State<D>) => {
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initState,
  });
  const setData = useCallback(
    (data: D) =>
      setState({
        data,
        error: null,
        stat: "success",
      }),
    []
  );
  const setError = useCallback(
    (error: Error) =>
      setState({
        error,
        data: null,
        stat: "error",
      }),
    []
  );

  // retry保存下上次的网络请求，方便其他地方调用
  const [retry, setRetry] = useState(() => () => {});
  // 查看组件是否已被卸载，防止在卸载的组件赋值
  const mountedRef = useMountedRef();
  const run = useCallback(
    (promise: Promise<D>, config?: { retryFun: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error("请传入Promise类型数据");
      }
      setRetry(() => () => {
        if (config?.retryFun) {
          run(config?.retryFun(), config);
        }
      });

      // setState的函数式赋值
      setState((prevState) => ({
        ...prevState,
        stat: "loading",
      }));

      return promise
        .then((data) => {
          console.log(mountedRef.current, "mountedRef.current");
          if (mountedRef.current) {
            setData(data);
          }
          return data;
        })
        .catch((error) => {
          if (mountedRef.current) {
            setError(error);
          }
          return error;
        });
    },
    [setData, setError, mountedRef]
  );
  return {
    isIdle: state.stat === "idle",
    isError: state.stat === "error",
    isLoading: state.stat === "loading",
    isSuccess: state.stat === "success",
    setData,
    run,
    retry,
    setError,
    ...state,
  };
};

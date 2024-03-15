import { useMountedRef } from "./index";
import { useCallback, useReducer, useState } from "react";
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

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();
  return useCallback(
    (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch, mountedRef]
  );
};
export const useAsync = <D>(initState?: State<D>) => {
  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({
      ...state,
      ...action,
    }),
    {
      ...defaultInitialState,
      ...initState,
    }
  );
  const safeDispatch = useSafeDispatch(dispatch);
  const setData = useCallback(
    (data: D) =>
      safeDispatch({
        data,
        error: null,
        stat: "success",
      }),
    [safeDispatch]
  );
  const setError = useCallback(
    (error: Error) =>
      safeDispatch({
        error,
        data: null,
        stat: "error",
      }),
    [safeDispatch]
  );

  // retry保存下上次的网络请求，方便其他地方调用
  const [retry, setRetry] = useState(() => () => {});

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

      safeDispatch({
        stat: "loading",
      });

      return promise
        .then((data) => {
          setData(data);
          return data;
        })
        .catch((error) => {
          setError(error);
          return error;
        });
    },
    [setData, setError, safeDispatch]
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

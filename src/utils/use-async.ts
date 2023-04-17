import { useMountedRef } from './index';
import { useCallback, useState } from 'react';
interface State<D> {
  data: D | null;
  error: Error | null;
  stat: 'idle' | 'loading' | 'error' | 'success'
}
const defaultInitialState: State<null> = {
  error: null,
  data: null,
  stat: 'idle'
}
export const useAsync = <D>(initState?: State<D>) => {
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initState
  })
  const setData = useCallback((data: D) => setState({
    data,
    error: null,
    stat: 'success'
  }), [])
  const setError = useCallback((error: Error) => setState({
    error,
    data: null,
    stat: 'error'
  }), [])
  const mountedRef = useMountedRef()
  const run = useCallback((promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error('请传入Promise类型数据')
    }
    // setState的函数式赋值
    setState(prevState => ({
      ...prevState,
      stat: 'loading'
    }))
    return promise.then(data => {
      if (mountedRef.current)
      setData(data)
      return data
    }).catch(error => {
      setError(error)
      return error
    })
  }, [setData, setError, mountedRef])
  return {
    isIdle: state.stat === 'idle',
    isError: state.stat === 'error',
    isLoading: state.stat === 'loading',
    isSuccess: state.stat === 'success',
    setData,
    run,
    setError,
    ...state
  }
}
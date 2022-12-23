import { useState } from 'react';
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
  const setData = (data: D) => setState({
    data,
    error: null,
    stat: 'success'
  })
  const setError = (error: Error) => setState({
    error,
    data: null,
    stat: 'error'
  })
  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error('请传入Promise类型数据')
    }
    setState({
      ...state,
      stat: 'loading'
    })
    return promise.then(data => {
      setData(data)
      return data
    }).catch(error => {
      setError(error)
      return error
    })
  }
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
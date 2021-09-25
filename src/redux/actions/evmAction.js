import {EvmActionTypes as T} from "../constant/actionTypes";
import {connectToEvm, resetWeb3Provider} from "../../helpers/web3";

export const initEvm = () => async (dispatch) => {
  const data= await connectToEvm()
    dispatch({type:T.INIT_EVM,payload:data})
}
export const removeEvm = () => async (dispatch) => {
    const data=  await resetWeb3Provider();
    dispatch({type:T.REMOVE_EVM})
}
export const resetEvm = () => async (dispatch) => {
    dispatch({type:T.REMOVE_EVM})
}
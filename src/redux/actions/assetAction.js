import {AssetActionTypes as T} from "../constant/actionTypes";
import {getAccountAssets} from "../../helpers/web3";

export const initAsset = () => async (dispatch) => {
        const  data =  await getAccountAssets();

        dispatch({type:T.INIT_ASSET,payload:data})
}
export const removeAsset = () => async (dispatch) => {
    dispatch({type:T.INIT_ASSET})
}
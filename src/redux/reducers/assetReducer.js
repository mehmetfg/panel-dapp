import {AssetActionTypes as T} from "../constant/actionTypes";
const INITIAL_STATE = {
    asset:{
        ethBalance: 0.00,
        tokenBalance: 0.00,
    },
}
export  const assetReducer = (state= INITIAL_STATE, action) =>{
    switch (action.type){
        case T.INIT_ASSET  :
            return {...state, asset:action.payload};
        case T.REMOVE_ASSET :
            return {...state, asset: INITIAL_STATE};
        default:
            return state
    }
}
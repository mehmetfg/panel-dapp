import {EvmActionTypes as T} from "../constant/actionTypes";

const INITIAL_STATE = {
    evm:false
}

export  const evmReducer = (state= INITIAL_STATE, action) =>{
    switch (action.type){
        case T.INIT_EVM  :
            return {...state, evm:action.payload};
        case T.REMOVE_EVM :
            return {...state, evm: false};
        default:
            return state
    }
}
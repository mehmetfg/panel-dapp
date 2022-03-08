import {stakeTransactionActionTypes as T} from "./stakeTransactionActionTypes";

const INITIAL_STATE = {
    stakeTransaction:{},
    stakeTransactions:[],
}

export  const stakeTransactionReducer = (state= INITIAL_STATE, action) =>{
    switch (action.type){
        case T.INIT_STAKETRANSACTIONS  :
            return {...state, stakeTransactions:action.payload};
        case T.SELECT_STAKETRANSACTION :

            console.log(action.payload)
            return {...state, stakeTransaction:action.payload};
        case T.INSERT_STAKETRANSACTION :
            return {
                ...state,
                stakeTransactions: [...state.stakeTransactions, action.payload]
            };
        case T.UPDATE_STAKETRANSACTION :
            return{
                ...state,
                stakeTransactions:state.stakeTransactions.map(item => item.id===action.payload.id ? action.payload : item)
            };
        case T.DELETE_STAKETRANSACTION :
            return {
                ...state,
                stakeTransactions:state.stakeTransactions.filter(item => item.id != action.payload)
            };
        case T.REMOVE_SELECTED_STAKETRANSACTION :
            return {...state, stakeTransaction: {}};
        default:
            return state
    }

}

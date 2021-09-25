import {TransactionActionTypes as T} from "../constant/actionTypes";

const INITIAL_STATE = {
    transaction:{},
    transactions:[],
}

export  const transactionReducer = (state= INITIAL_STATE, action) =>{
    switch (action.type){
        case T.INIT_TRANSACTIONS  :
            return {...state, transactions:action.payload};
        case T.SELECT_TRANSACTION :

            console.log(action.payload)
            return {...state, transaction:action.payload};
        case T.INSERT_TRANSACTION :
            return {
                ...state,
                transactions: [...state.transactions, action.payload]
            };
        case T.UPDATE_TRANSACTION :
            return{
                ...state,
                transactions:state.transactions.map(item => item.id===action.payload.id ? action.payload : item)
            };
        case T.DELETE_TRANSACTION :
            return {
                ...state,
                transactions:state.transactions.filter(item => item.id != action.payload)
            };
        case T.REMOVE_SELECTED_TRANSACTION :
            return {...state, transaction: {}};
        default:
            return state
    }

}

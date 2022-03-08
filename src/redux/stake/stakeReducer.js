import {stakeActionTypes as T} from "./stakeActionTypes";

const INITIAL_STATE = {
    stake:{},
    stakes:[],
}

export  const stakeReducer = (state= INITIAL_STATE, action) =>{
    switch (action.type){
        case T.INIT_STAKES  :
            return {...state, stakes:action.payload};
        case T.SELECT_STAKE :
            return {...state, stake:action.payload};
        case T.INSERT_STAKE :
            return {
                ...state,
                stakes: [...state.stakes, action.payload]
            };
        case T.UPDATE_STAKE :
            return{
                ...state,
                stakes:state.stakes.map(item => item.id===action.payload.id ? action.payload : item)
            };
        case T.DELETE_STAKE :
            return {
                ...state,
                stakes:state.stakes.filter(item => item.id != action.payload)
            };
        case T.REMOVE_SELECTED_STAKE :
            return {...state, stake: {}};
        default:
            return state
    }

}

import {TokenActionTypes as T} from "../constant/actionTypes";

const INITIAL_STATE = {
    token:{},
    tokens:[],
}

export  const tokenReducer = (state= INITIAL_STATE, action) =>{
    switch (action.type){
        case T.INIT_TOKENS  :
            return {...state, tokens:action.payload};
        case T.SELECT_TOKEN :

            console.log(action.payload)
            return {...state, token:action.payload};
        case T.INSERT_TOKEN :
            return {
                ...state,
                tokens: [...state.tokens, action.payload]
            };
        case T.UPDATE_TOKEN :
            return{
                ...state,
                tokens:state.tokens.map(item => item.id===action.payload.id ? action.payload : item)
            };
        case T.DELETE_TOKEN :
            return {
                ...state,
                tokens:state.tokens.filter(item => item.id != action.payload)
            };
        case T.REMOVE_SELECTED_TOKEN :
            return {...state, token: {}};
        default:
            return state
    }

}

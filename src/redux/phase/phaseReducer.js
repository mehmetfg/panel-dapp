import {phaseActionTypes as T} from "./phaseActionTypes";

const INITIAL_STATE = {
    phase:{},
    phases:[],
}

export  const phaseReducer = (state= INITIAL_STATE, action) =>{
    switch (action.type){
        case T.INIT_PHASES  :
            return {...state, phases:action.payload};
        case T.SELECT_PHASE :

            return {...state, phase:action.payload};
        case T.INSERT_PHASE :
            return {
                ...state,
                phases: [...state.phases, action.payload]
            };
        case T.UPDATE_PHASE :
            return{
                ...state,
                phases:state.phases.map(item => item.id===action.payload.id ? action.payload : item)
            };
        case T.DELETE_PHASE :
            return {
                ...state,
                phases:state.phases.filter(item => item.id != action.payload)
            };
        case T.REMOVE_SELECTED_PHASE :
            return {...state, phase: {}};
        default:
            return state
    }

}

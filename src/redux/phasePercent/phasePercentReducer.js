import {phasePercentPercentActionTypes as T} from "./phasePercentActionTypes";

const INITIAL_STATE = {
    phasePercent:{},
    phasePercents:[],
}

export  const phasePercentReducer = (state= INITIAL_STATE, action) =>{
    switch (action.type){
        case T.INIT_PHASEPERCENTS  :

            return {...state, phasePercents:action.payload};

        case T.SELECT_PHASEPERCENT :

            return {...state, phasePercent:action.payload};
        case T.INSERT_PHASEPERCENT :
            return {
                ...state,
                phasePercents: [...state.phasePercents, action.payload]
            };
        case T.UPDATE_PHASEPERCENT :
            return{
                ...state,
                phasePercents:state.phasePercents.map(item => item.id===action.payload.id ? action.payload : item)
            };
        case T.DELETE_PHASEPERCENT :
            return {
                ...state,
                phasePercents:state.phasePercents.filter(item => item.id != action.payload)
            };
        case T.REMOVE_SELECTED_PHASEPERCENT :
            return {...state, phasePercent: {}};
        default:
            return state
    }

}

import {PowerStationActionTypes as T} from "../constant/actionTypes";

const INITIAL_STATE = {
    powerStation:{},
    powerStations:[],
}

export  const powerStationReducer = (state= INITIAL_STATE, action) =>{
    switch (action.type){
        case T.INIT_POWER_STATIONS  :
            return {...state, powerStations:action.payload};
        case T.SELECT_POWER_STATION :

            console.log(action.payload)
            return {...state, powerStation:action.payload};
        case T.INSERT_POWER_STATION :
            return {
                ...state,
                powerStations: [...state.powerStations, action.payload]
            };
        case T.UPDATE_POWER_STATION :
            return{
                ...state,
                powerStations:state.powerStations.map(item => item.id===action.payload.id ? action.payload : item)
            };
        case T.DELETE_POWER_STATION :
            return {
                ...state,
                powerStations:state.powerStations.filter(item => item.id != action.payload)
            };
        case T.REMOVE_SELECTED_POWER_STATION :
            return {...state, powerStation: {}};
        default:
            return state
    }

}

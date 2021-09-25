import {fetcher} from "../../lib/fetcher";
import {PowerStationActionTypes as T} from "../constant/actionTypes";
import {confirm, errorHandler} from "../../lib/responses";
import {successHandler} from "../../lib/responses";
import Swal from "sweetalert2";
const url='/powerStation/'
export const initPowerStations = () => async (dispatch) => {
        const res= await  fetcher.get(url)
        dispatch({type:T.INIT_POWER_STATIONS,payload:res.data})
}
export const selectPowerStation = (id) => async (dispatch) => {
    const response = await fetcher.get( url+id)
    dispatch({type:T.SELECT_POWER_STATION, payload:response.data})
}

export const insertPowerStation = (data, history) => async (dispatch) => {
    try {
    const response = await  fetcher.post(url, data)
    dispatch({type:T.INSERT_POWER_STATION, payload:data})
       await successHandler('insert')
        history.goBack()
    } catch (e) {
        await errorHandler(e)
    }
}
export const updatePowerStation = (data,history) => async (dispatch) => {

    try {
        const response = await fetcher.put(url + data.id, data)
        dispatch({type: T.INSERT_POWER_STATION, payload: data})
        await  successHandler('update')
        history.goBack();
    } catch (e) {
        await errorHandler(e)
    }

}
export const deletePowerStation = (id) => async (dispatch) => {

    var resultv=await confirm('silmek istediğinize eminmisiniz')
        if(resultv.isConfirmed) {
            try {
                const response = await fetcher.delete(url + id)
                dispatch({type: T.DELETE_POWER_STATION, payload: id})
                await successHandler('delete')
            } catch (e) {
                await errorHandler(e)
            }

}


}
export const removeSelectedPowerStation = () => async (dispatch) => {
    dispatch({type:T.REMOVE_SELECTED_POWER_STATION})
}

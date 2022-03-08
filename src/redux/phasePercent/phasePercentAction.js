import {fetcher} from "../../lib/fetcher";
import {phasePercentPercentActionTypes as T} from "./phasePercentActionTypes"
import {confirm, errorHandler} from "../../lib/responses";
import {successHandler} from "../../lib/responses";
import Swal from "sweetalert2";
const url='/phasePercents'
export const initPhasePercents = (id) => async (dispatch) => {
        const res= await  fetcher.get(url+'?phase_id='+id)
        dispatch({type:T.INIT_PHASEPERCENTS,payload:res.data})
}
export const selectPhasePercent = (id) => async (dispatch) => {
    const response = await fetcher.get( url+id)
    dispatch({type:T.SELECT_PHASEPERCENT, payload:response.data})
}

export const insertPhasePercent = (data, history) => async (dispatch) => {
    try {
    const response = await  fetcher.post(url, data)
    dispatch({type:T.INSERT_PHASEPERCENT, payload:data})
       await successHandler('insert')
        history.goBack()
    } catch (e) {
        await errorHandler(e)
    }
}
export const updatePhasePercent = (data,history) => async (dispatch) => {

    try {
        const response = await fetcher.put(url + data.id, data)
        dispatch({type: T.INSERT_PHASEPERCENT, payload: data})
        await  successHandler('update')
        history.goBack();
    } catch (e) {
        await errorHandler(e)
    }

}
export const deletePhasePercent = (id) => async (dispatch) => {

    var resultv=await confirm('silmek istediğinize eminmisiniz')
        if(resultv.isConfirmed) {
            try {
                const response = await fetcher.delete(url + id)
                dispatch({type: T.DELETE_PHASEPERCENT, payload: id})
                await successHandler('delete')
            } catch (e) {
                await errorHandler(e)
            }

}


}
export const removeSelectedPhasePercent = () => async (dispatch) => {
    dispatch({type:T.REMOVE_SELECTED_PHASEPERCENT})
}

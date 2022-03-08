import {fetcher} from "../../lib/fetcher";
import {phaseActionTypes as T} from "./phaseActionTypes"
import {confirm, errorHandler} from "../../lib/responses";
import {successHandler} from "../../lib/responses";
import Swal from "sweetalert2";
const url='/phases/'
export const initPhases = () => async (dispatch) => {
        const res= await  fetcher.get(url)
        dispatch({type:T.INIT_PHASES,payload:res.data})
}
export const selectPhase = (id) => async (dispatch) => {
    const response = await fetcher.get( url+id)
    dispatch({type:T.SELECT_PHASE, payload:response.data})
}

export const insertPhase = (data, history) => async (dispatch) => {
    try {
    const response = await  fetcher.post(url, data)
    dispatch({type:T.INSERT_PHASE, payload:data})
       await successHandler('insert')
        history.goBack()
    } catch (e) {
        await errorHandler(e)
    }
}
export const updatePhase = (data,history) => async (dispatch) => {

    try {
        const response = await fetcher.put(url + data.id, data)
        dispatch({type: T.INSERT_PHASE, payload: data})
        await  successHandler('update')
        history.goBack();
    } catch (e) {
        await errorHandler(e)
    }

}
export const deletePhase = (id) => async (dispatch) => {

    var resultv=await confirm('silmek istediğinize eminmisiniz')
        if(resultv.isConfirmed) {
            try {
                const response = await fetcher.delete(url + id)
                dispatch({type: T.DELETE_PHASE, payload: id})
                await successHandler('delete')
            } catch (e) {
                await errorHandler(e)
            }

}


}
export const removeSelectedPhase = () => async (dispatch) => {
    dispatch({type:T.REMOVE_SELECTED_PHASE})
}

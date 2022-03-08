import {fetcher} from "../../lib/fetcher";
import {stakeActionTypes as T} from "./stakeActionTypes";
import {confirm, errorHandler} from "../../lib/responses";
import {successHandler} from "../../lib/responses";
import Swal from "sweetalert2";
const url='/stakes/'
export const initStakes = () => async (dispatch) => {
        const res= await  fetcher.get(url)
        dispatch({type:T.INIT_STAKES,payload:res.data})
}
export const selectStake = (id) => async (dispatch) => {
    const response = await fetcher.get( url+id)
    dispatch({type:T.SELECT_STAKE, payload:response.data})
}

export const insertStake = (data, history) => async (dispatch) => {
    try {
    const response = await  fetcher.post(url, data)
    dispatch({type:T.INSERT_STAKE, payload:data})
       await successHandler('insert')
        history.goBack()
    } catch (e) {
        await errorHandler(e)
    }
}
export const updateStake = (data,history) => async (dispatch) => {

    try {
        const response = await fetcher.put(url + data.id, data)
        dispatch({type: T.INSERT_STAKE, payload: data})
        await  successHandler('update')
        history.goBack();
    } catch (e) {
        await errorHandler(e)
    }

}
export const deleteStake = (id) => async (dispatch) => {

    var resultv=await confirm('silmek istediğinize eminmisiniz')
        if(resultv.isConfirmed) {
            try {
                const response = await fetcher.delete(url + id)
                dispatch({type: T.DELETE_STAKE, payload: id})
                await successHandler('delete')
            } catch (e) {
                await errorHandler(e)
            }

}


}
export const removeSelectedStake = () => async (dispatch) => {
    dispatch({type:T.REMOVE_SELECTED_STAKE})
}

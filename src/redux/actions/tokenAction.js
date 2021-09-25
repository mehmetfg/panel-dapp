import {fetcher} from "../../lib/fetcher";
import {TokenActionTypes as T} from "../constant/actionTypes";
import {confirm, errorHandler} from "../../lib/responses";
import {successHandler} from "../../lib/responses";
import Swal from "sweetalert2";
const url='/tokens/'
export const initTokens = () => async (dispatch) => {
        const res= await  fetcher.get(url)
        dispatch({type:T.INIT_TOKENS,payload:res.data})
}
export const selectToken = (id) => async (dispatch) => {
    const response = await fetcher.get( url+id)
    dispatch({type:T.SELECT_TOKEN, payload:response.data})
}

export const insertToken = (data, history) => async (dispatch) => {
    try {
    const response = await  fetcher.post(url, data)
    dispatch({type:T.INSERT_TOKEN, payload:data})
       await successHandler('insert')
        history.goBack()
    } catch (e) {
        await errorHandler(e)
    }
}
export const updateToken = (data,history) => async (dispatch) => {

    try {
        const response = await fetcher.put(url + data.id, data)
        dispatch({type: T.INSERT_TOKEN, payload: data})
        await  successHandler('update')
        history.goBack();
    } catch (e) {
        await errorHandler(e)
    }

}
export const deleteToken = (id) => async (dispatch) => {

    var resultv=await confirm('silmek istediğinize eminmisiniz')
        if(resultv.isConfirmed) {
            try {
                const response = await fetcher.delete(url + id)
                dispatch({type: T.DELETE_TOKEN, payload: id})
                await successHandler('delete')
            } catch (e) {
                await errorHandler(e)
            }

}


}
export const removeSelectedToken = () => async (dispatch) => {
    dispatch({type:T.REMOVE_SELECTED_TOKEN})
}

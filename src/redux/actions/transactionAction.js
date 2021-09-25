import {fetcher} from "../../lib/fetcher";
import {TransactionActionTypes as T} from "../constant/actionTypes";
import {confirm, errorHandler} from "../../lib/responses";
import {successHandler} from "../../lib/responses";
import Swal from "sweetalert2";

const url='/transactions/'
export const initTransactions = (address) => async (dispatch) => {
        const res= await  fetcher.get(url+'power-station/'+address)
        dispatch({type:T.INIT_TRANSACTIONS,payload:res.data})
}
export const selectTransaction = (id) => async (dispatch) => {
    const response = await fetcher.get( url+id)
    dispatch({type:T.SELECT_TRANSACTION, payload:response.data})
}

export const insertTransaction = (data, history) => async (dispatch) => {
    try {
    const response = await  fetcher.post(url, data)
    dispatch({type:T.INSERT_TRANSACTION, payload:data})
       await successHandler('insert')
        history.goBack()
    } catch (e) {
        await errorHandler(e)
    }
}
export const updateTransaction = (data,history) => async (dispatch) => {
    try {
        const response = await fetcher.put(url + data.id, data)
        dispatch({type: T.UPDATE_TRANSACTION, payload: data})
        await  successHandler('update')
//        history.goBack();
    } catch (e) {
        await errorHandler(e)
    }

}
export const deleteTransaction = (id) => async (dispatch) => {

    var resultv=await confirm('silmek istediğinize eminmisiniz')
        if(resultv.isConfirmed) {
            try {
                const response = await fetcher.delete(url + id)
                dispatch({type: T.DELETE_TRANSACTION, payload: id})
                await successHandler('delete')
            } catch (e) {
                await errorHandler(e)
            }

}


}
export const removeSelectedTransaction = () => async (dispatch) => {
    dispatch({type:T.REMOVE_SELECTED_TRANSACTION})
}

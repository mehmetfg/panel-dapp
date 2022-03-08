import {fetcher} from "../../lib/fetcher";
import {stakeTransactionActionTypes as T} from "./stakeTransactionActionTypes";
import {confirm, errorHandler} from "../../lib/responses";
import {successHandler} from "../../lib/responses";
import Swal from "sweetalert2";
const url='/stakeTransactions/'
export const initStakeTransactions = () => async (dispatch) => {
        const res= await  fetcher.get(url)
        dispatch({type:T.INIT_STAKETRANSACTIONS,payload:res.data})
}
export const selectStakeTransaction = (id) => async (dispatch) => {
    const response = await fetcher.get( url+id)
    dispatch({type:T.SELECT_STAKETRANSACTION, payload:response.data})
}

export const insertStakeTransaction = (data, history) => async (dispatch) => {
    try {
    const response = await  fetcher.post(url, data)
    dispatch({type:T.INSERT_STAKETRANSACTION, payload:data})
       await successHandler('insert')
    } catch (e) {
        await errorHandler(e)
    }
}
export const updateStakeTransaction = (data,history) => async (dispatch) => {

    try {
        const response = await fetcher.put(url + data.id, data)
        dispatch({type: T.INSERT_STAKETRANSACTION, payload: data})
        await  successHandler('update')
        history.goBack();
    } catch (e) {
        await errorHandler(e)
    }

}
export const deleteStakeTransaction = (id) => async (dispatch) => {

    var resultv=await confirm('silmek istediğinize eminmisiniz')
        if(resultv.isConfirmed) {
            try {
                const response = await fetcher.delete(url + id)
                dispatch({type: T.DELETE_STAKETRANSACTION, payload: id})
                await successHandler('delete')
            } catch (e) {
                await errorHandler(e)
            }

}


}
export const removeSelectedStakeTransaction = () => async (dispatch) => {
    dispatch({type:T.REMOVE_SELECTED_STAKETRANSACTION})
}

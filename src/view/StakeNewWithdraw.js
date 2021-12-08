import {getInvesterInfo, getTokenBalance, stakeWithdraw} from "../helpers/web3";
import {ToastContainer, toast} from 'react-toastify';
import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {initEvm, removeEvm} from "../redux/actions/evmAction";
import {selectToken} from "../redux/actions/tokenAction";
import {now} from "moment";


const StakeNewWithdraw = () => {

    const evm = useSelector((state) => state.evmReducer.evm)
    const [tokenBalance, setTokenBalance] = useState(0);
    const [transferStatus, setTransferStatus] = useState(false);
    const [result, setResult] = useState({balances:[]});
    const dispatch = useDispatch();
    var totalAmount =0;
    var totalPercentAmount = 0;
    var totalPercentBalance =0;
    useEffect(() => {
        dispatch(selectToken(213))

        return () => {
        };
    }, []);

    const getBalance = async () => {
        await getTokenBalance().then(function (response) {
            console.log(response)
            setTokenBalance(parseInt(response)/1000000);


            setTransferStatus(true)
            toast.update({render: "İşlem Başarılı", type: "success", isLoading: false, autoClose: 3000});
        }).catch(error => {
            setTransferStatus(false)
            toast.update({
                render: "İşlem İptal Edildi",
                type: "error",
                isLoading: false,
                autoClose: 3000,
                position: 'top-left'
            });
        })

    }
    const withdraw = async (index) => {
        setTransferStatus({id: 1, status: true})
        const id = toast.loading("Lütfen Bekleyiniz..")


        await stakeWithdraw(index).then(function (response) {
            console.log(response)

            getBalance()
            setTransferStatus(true)
            toast.update(id, {render: "İşlem Başarılı", type: "success", isLoading: false, autoClose: 3000});
        }).catch(error => {
            setTransferStatus(false)
            toast.update(id, {
                render: "İşlem İptal Edildi",
                type: "error",
                isLoading: false,
                autoClose: 3000,
                position: 'top-left'
            });
        })


    }

    const getList = async () => {
        getBalance()
        setTransferStatus({id: 1, status: true})
        const id = toast.loading("Lütfen Bekleyiniz..")


        await getInvesterInfo().then(function (response) {
            console.log(response)
            setResult(response);
            console.log(result);

            setTransferStatus(true)
            toast.update(id, {render: "İşlem Başarılı", type: "success", isLoading: false, autoClose: 3000});
        }).catch(error => {
            setTransferStatus(false)
            toast.update(id, {
                render: "İşlem İptal Edildi",
                type: "error",
                isLoading: false,
                autoClose: 3000,
                position: 'top-left'
            });
        })
    }
    const initConnect = () => {
        dispatch(initEvm()).then(function (){

            getList();
        })

    }
    return (
        <div>
            <div className={"row"}>
                <div className={"col-md-6"}>
                    <ToastContainer/>

                    <div className="card">
                        <div className="card-block">
                            <div className="card-body">
                                {evm == false  ?
                                    <button onClick={initConnect}
                                            className={"btn btn-primary"}><i className="fa fa-stop-circle"></i>Cüzdana Bağlanmak İçin Tıklayınız
                                    </button> :
                                    <>

                                        <div className={"btn btn-primary"} >Bakiye {tokenBalance} </div>

                                        <button onClick={() => dispatch(removeEvm())}
                                                className={"btn btn-danger btn-block"}>Bağlantıyı Kes
                                        </button>    </>
                                }
<hr/>
                                <table className="table table-striped table-hover">
                                    <thead className="font-success">
                                    <tr className="">
                                        <th scope="col">#</th>
                                        <th scope="col">Oran</th>
                                        <th scope="col">Toplam Hakediş</th>
                                        <th scope="col">Çekilecek Tarih</th>
                                        <th scope="col">Çek</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                   {
                                        result.balances.map((item, index) => {
                                            let a =new Date(result['times'][index] * 1000);
                                           let  balance = parseInt(item) / 1000000
                                           totalAmount += balance
                                            let totalPercent = 10 * balance /100 * parseInt(result['percents'][index]);
                                            totalPercentAmount += (balance + totalPercent);
                                            totalPercentBalance += totalPercent
                                       return      <tr>
                                                <th scope="row">{balance}</th>
                                                <td>% {result['percents'][index]}0 ({totalPercent})</td>
                                                <td>{totalPercent+ balance}</td>
                                           <td>{a.toLocaleDateString()}</td>
                                           <td>{
                                               a <= now() ?   <div className={"btn btn-primary"} onClick={() => withdraw(index)}> Çek </div>
                                                   :null

                                           }
                                               </td>
                                            </tr>
                                        })}
                                    </tbody>
                                    <thead className="thead-light">
                                    <tr>
                                        <th scope="col"><strong>{totalAmount}</strong></th>
                                        <th scope="col"><strong>{totalPercentBalance}</strong></th>
                                        <th scope="col"><strong>{totalPercentAmount}</strong></th>
                                        <th scope="col"><strong>-----</strong></th>
                                        <th scope="col"></th>
                                    </tr>
                                    </thead>
                                </table>
                                <hr/>
                                {evm == false  ? <>
                                    </>
                                     :         <button type="submit" className="btn btn-primary btn-block btn-lg" onClick={getList}>Stake Yap!</button>

                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )


}
export default StakeNewWithdraw;
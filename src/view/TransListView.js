import {callTransfer, connectToEvm, watchTokenTransfers} from "../helpers/web3";
import { ToastContainer, toast } from 'react-toastify';

import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {initEvm, removeEvm} from "../redux/actions/evmAction";
import {initTransactions, updateTransaction} from "../redux/actions/transactionAction";
import AssetWidget from "../component/AssetWidget";
import {initTokens, selectToken} from "../redux/actions/tokenAction";
import {useParams} from "react-router";
import {initPowerStations, selectPowerStation} from "../redux/actions/powerStationAction";
import Moment from 'moment'
const TransListView = () => {
    const dispatch = useDispatch();

    const {id, address}= useParams();
    const evm =useSelector((state) => state.evmReducer.evm)
    const asset= useSelector((state) => state.assetReducer.asset)
    const transactions = useSelector((state)=> state.transactionReducer.transactions)
    const token = useSelector((state) => state.tokenReducer.token)

    const [transferStatus, setTransferStatus] = useState({id:1, status:false});
    const transfer = async (item) => {

    setTransferStatus({id:item.id, status: true})
        const id = toast.loading("Lütfen Bekleyiniz..")
//do something else

       await  callTransfer(item).then(function (response){
           dispatch(updateTransaction({...item, hash:response, status:1}))
           setTransferStatus({id:item.id, status: true})
           toast.update(id, { render: "İşlem Başarılı", type: "success", isLoading: false, autoClose:3000 });
       }).catch(error => {

           setTransferStatus({id:item.id, status: false})
           toast.update(id, { render: "İşlem İptal Edildi", type: "error", isLoading: false, autoClose:3000, position:'top-left'  });
        })
    }
    const [paid, setPaid] = useState([]);
    const [unpaid, setUnpaid] = useState([]);

    useEffect(() => {

        dispatch(selectPowerStation(id))
        dispatch(initTransactions(address));
        dispatch(selectToken(id))
        return () => {
            dispatch(initTransactions())
        };
    }, []);


    const [totalUnpaid, setTotalUnpaid] = useState();
    const [totalPaid, setTotalPaid] = useState();
    const [totalTransaction, setTotalTransaction] = useState();
    useEffect(() => {
        const sum = transactions.map(item => parseFloat(item.quentity)).reduce(function(prev, current) {
            return prev  + current
        }, 0);
        setPaid(transactions.filter(item => item.status==1))
        setUnpaid(transactions.filter(item => item.status==0))
        setTotalTransaction(sum)

    }, [transactions]);
    useEffect(() => {

        const sumPaid = paid.map(item => parseFloat(item.quentity)).reduce(function(prev, current) {
            return prev  + current
        }, 0);
        const sumUnPaid = unpaid.map(item => parseFloat(item.quentity)).reduce(function(prev, current) {
            return prev  + current
        }, 0);
        setTotalUnpaid(sumUnPaid)
        setTotalPaid(sumPaid)
    }, [paid, unpaid]);

    return (
        <div>
            <ToastContainer  />

                                <div className="card-header">

                                    <h5>Santral</h5><span>Toplam Hakediş </span>
                                    <h5>{totalTransaction} CYCE</h5>

                                    {/*{evm == false  ?
                                        <button onClick={() =>  dispatch(initEvm())}
                                                className={"btn btn-primary"}>Bağlan
                                        </button> :
                                        <button onClick={() => dispatch(removeEvm())}
                                                className={"btn btn-danger"}>Bağlantıyı Kes
                                        </button>
                                    }*/}
                                </div>
            <div className={"row g-2"}>
                <div className={"col-md-6"}>

                    <div className="card">
                        <div className="card-body">
                            <div className="media align-items-center">
                                <div className="media-body right-chart-content">
                                    <h4>{totalUnpaid} <span className="new-box"> CYCE</span></h4>
                                    <span>Toplam Ödenecek Miktar</span>
                                </div>
                                <div className="knob-block text-center">
                                    <div >
                                        <canvas width="65" height="65"></canvas>

                                    </div>
                                </div>
                            </div>
                        </div>

                                <div className={"card-body pt-0"}>
                                    <div className="apex-chart-container goal-status text-center row">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Dönemi</th>
                                            <th scope="col">Tarihi</th>
                                            <th scope="col">Miktarı</th>
                                            <th scope="col">Durumu</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {unpaid.map((item, index) => (
                                        <tr key={index}>
                                            <th scope="row">{item.id}</th>
                                            <td>{item.period}</td>
                                            <td>{Moment(item.date).format('D.M.y')}</td>

                                            <td>{item.quentity}</td>
                                            <td>{Date.parse(item.date)<=Date.now() ?
                                                evm == false ? <button
                                                        className={"btn btn-outline-primary"}>Ödeme Aşamasında
                                                    </button>
                                                    : (transferStatus.id == item.id ? transferStatus.status : false) ?
                                                    <button className={"btn btn-default"}>İşlem Devam
                                                        Ediyor...</button> :
                                                    <button onClick={() => transfer(item)}
                                                            className={"btn btn-primary"}>Transfer
                                                    </button>
                                                : <button
                                                    className={"btn btn-outline-secondary"}>Süresi Gelmedi
                                                </button>  }

                                            </td>
                                        </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                                    </div>
                                </div>

                </div>
            </div>
                <div className={"col-md-6"}>
                    <div className="card">
                        <div className="card-body">
                            <div className="media align-items-center">
                                <div className="media-body right-chart-content">
                                    <h4>{totalPaid}<span className="new-box"> CYCE</span></h4>
                                    <span>Toplam Ödenen Miktar</span>
                                </div>
                                <div className="knob-block text-center">
                                    <div >
                                        <canvas width="65" height="65"></canvas>

                                    </div>
                                </div>
                            </div>
                        </div>

                <div className={"card-body pt-0"}>
                    <div className="apex-chart-container goal-status text-center row">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Dönemi</th>
                                    <th scope="col">Tarihi</th>
                                    <th scope="col">Miktarı</th>
                                    <th scope="col">Durumu</th>
                                </tr>
                                </thead>
                                <tbody>
                                {paid.map((item, index) => (
                                    <tr key={index}>
                                        <th scope="row">{item.id}</th>
                                        <td>{item.period}</td>
                                        <td>{Moment(item.date).format('D.M.y')}</td>

                                        <td>{item.quentity}</td>
                                        <td><button
                                            className={"btn btn-danger"}>Ödendi
                                        </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            </div>

        </div>
    )
}
export default TransListView
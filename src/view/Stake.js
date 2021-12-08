import {callTransfer} from "../helpers/web3";
import { ToastContainer, toast } from 'react-toastify';

import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {initEvm, removeEvm} from "../redux/actions/evmAction";
import {initTransactions, updateTransaction} from "../redux/actions/transactionAction";
import AssetWidget from "../component/AssetWidget";
import {initTokens, selectPhaseStakeContractToken, selectToken} from "../redux/actions/tokenAction";
import {useParams} from "react-router";
import {initPowerStations, selectPowerStation} from "../redux/actions/powerStationAction";
import Moment from 'moment'
import {selectPhase} from "../redux/phase/phaseAction";
import {initPhasePercents} from "../redux/phasePercent/phasePercentAction";
import {selectStake} from "../redux/stake/stakeAction";
import {getEnvVariablesMap} from "hardhat/internal/core/params/env-variables";
import {insertStakeTransaction} from "../redux/stakeTransaction/stakeTransactionAction";
const Stake = () => {
    const dispatch = useDispatch();

    const {id, address} = useParams();
    const evm   =   useSelector((state) => state.evmReducer.evm)
    const stake =   useSelector((state) => state.stakeReducer.stake)
    const phase =   useSelector((state) => state.phaseReducer.phase)
    const phasePercents = useSelector((state)=> state.phasePercentReducer.phasePercents)
    const contract = useSelector((state)=>state.tokenReducer.token )

    const [transferStatus, setTransferStatus] = useState({id:1, status:false});
    const [values, setValues] = useState({totalAmount:0, totalReward:0});

    useEffect(() => {
            dispatch(selectStake(id))
            dispatch(selectPhase(id))
            dispatch(initPhasePercents(id));
            dispatch(selectPhaseStakeContractToken(id))
            return () => {
            };
        }, []);


    const transfer = async () => {

    setTransferStatus({id:1, status: true})
        const id = toast.loading("Lütfen Bekleyiniz..")


       await  callTransfer(stake.address, amount).then(function (response){
            console.log(response)
           dispatch(insertStakeTransaction({
               address:response.from,
               transaction_hash:response.transactionHash,
               status:1,
               amount:amount,
               stake_id: stake.id,
               phase_id:1,
               type:1

            }))


           setTransferStatus({id:1, status: true})
           toast.update(id, { render: "İşlem Başarılı", type: "success", isLoading: false, autoClose:3000 });
       }).catch(error => {
           setTransferStatus({id:1, status: false})
           toast.update(id, { render: "İşlem İptal Edildi", type: "error", isLoading: false, autoClose:3000, position:'top-left'  });
        })
    }

    const [amount, setAmount] = useState(0);
    const handleChange = (event) => {
        const { name, value } = event.target
        setAmount(value);
    }
    const [totalRewarddd, setTotalRewarddd] = useState(0);

    var rewardVal=0;
    const reward = (percent, totalReward) => {
        rewardVal=((totalAmount)*percent/100);
        return rewardVal
    }
    const reward1 = (percent, totalReward) => {
        rewardVal=((totalAmount1)*percent/100);
        return rewardVal
    }
    var totalRewardddd=0;
    var totalAmount=0;
    var totalAmount1=0;
    var total=0;
    var total1=0;
    const getTotalReward = (value) => {
            total+=parseFloat(value)
        return total
    }
    const getTotalReward1 = (value) => {
        total1+=parseFloat(value)
        return total1
    }
    const  getTotalAmount = (value) => {
        return   (parseFloat(amount)+parseFloat(value)).toFixed(3);

    }
    const  getTotalAmount1 = (value, amount) => {
        return   (parseFloat(amount)+parseFloat(value)).toFixed(3);

    }
    const getTotalRewardWithout = (amount) => {
        total1=0;
        totalAmount1=0;

        return  phasePercents.map((item, index) => {
            const rewardValue1 = reward1(item.percent)

            const totalReward1 = getTotalReward1(rewardValue1)
            totalAmount1 = getTotalAmount1(totalReward1, amount)

            if(phasePercents.length==index+1 && !isNaN(totalReward1))
                return totalAmount1

        })



    }


    return (
        <div>
            <ToastContainer  />
            <div className="card">
                                <div className="card-block">

                                    <h5> {contract.name} Stake İşlemi</h5>


                                            <label className={""}>Stake İçin Miktar Girin </label><br/>
                                            <div className="input-group"><span
                                                className="input-group-text">Değer Giriniz</span><span
                                                className="input-group-text">{contract.symbol}</span>
                                                <input type="text" className={"form-control"}
                                                       value={amount}
                                                       onChange={handleChange}></input>

                                                {evm == false  ?
                                                    <button onClick={() =>  dispatch(initEvm())}
                                                            className={"btn btn-primary"}><i className="fa fa-stop-circle"></i>Cüzdana Bağlanmak İçin Tıklayınız
                                                    </button> :
                                                    <>

                                                <button
                                                    className={"btn btn-primary "} onClick={transfer}> Stake Gönder
                                                </button>
                                                <button onClick={() => dispatch(removeEvm())}
                                                         className={"btn btn-danger btn-sm"}>Bağlantıyı Kes
                                                </button>    </>
                                                }
                                            </div>




                                            <hr/>



                                    <button

                                    className={"btn btn-outline-danger"}>{phase.name}
                                </button>   <button

                                    className={"btn btn-outline-primary"}> %{phase.percent}
                                </button>
                                </div>
            </div>
            <div className={"row g-2"}>
                <div className="">
                    <div className="alert progress-bar-animated bg-info" role="progressbar"
                         aria-valuenow="75" aria-valuemin="0"
                         aria-valuemax="100" style={{width: phasePercents.length/phasePercents.length*100+'%'}}>{phasePercents.length-1} Aylık Toplam Kazanç Miktarı:  <strong>{getTotalRewardWithout(amount)}
                    </strong> {contract.symbol} </div>
                </div>

                <div className={"col-md-12"}>
                    <div className="card">
                <div className={"card-body pt-0"}>
                    <div className="apex-chart-container goal-status text-center row">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">Dönemi</th>
                                    <th scope="col">Oranı</th>
                                    <th scope="col">Aylık Ödül</th>
                                    <th scope="col">Toplam Ödül</th>
                                    <th scope="col">Toplam Alacak</th>
                                    <th scope="col">Durum</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    phasePercents.map((item, index) => {
                                    const rewardValue=reward(item.percent)
                                    const totalReward = getTotalReward(rewardValue)
                                        totalAmount=getTotalAmount(totalReward)


                                  return (<tr key={index}>

                                        <td>{item.month}</td>
                                        <td>{item.percent}</td>

                                        <td>{!isNaN(rewardValue) ? rewardValue.toFixed(3) : '0.000'}</td>
                                        <td>{!isNaN(totalReward) ? totalReward.toFixed(3) : '0.000'}</td>

                                        <td><button
                                            className={"btn btn-danger"}>{totalAmount}
                                        </button>
                                        </td>
                                          <td></td>
                                    </tr>
                                    )
                                })}
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
export default Stake
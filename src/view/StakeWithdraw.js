import {callTransfer} from "../helpers/web3";
import { ToastContainer, toast } from 'react-toastify';
import Swal from "sweetalert2";
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
import {
    initStakeTransactions,
    insertStakeTransaction,
    selectStakeTransaction
} from "../redux/stakeTransaction/stakeTransactionAction";
const Stake = () => {
    const dispatch = useDispatch();

    const {id, address}= useParams();
    const evm   =   useSelector((state) => state.evmReducer.evm)
    const stake =   useSelector((state) => state.stakeReducer.stake)
    const phase =   useSelector((state) => state.phaseReducer.phase)
    const phasePercents = useSelector((state)=> state.phasePercentReducer.phasePercents)
    const stakeTransaction = useSelector((state)=> state.stakeTransactionReducer.stakeTransaction)
    const contract = useSelector((state)=>state.tokenReducer.token )
    const [withdrawAmount, setWithdrawAmount] = useState(0);
    const stakeTransactions = useSelector((state)=> state.stakeTransactionReducer.stakeTransactions);

    const [transferStatus, setTransferStatus] = useState({id:1, status:false});
    const [values, setValues] = useState({totalAmount:0, totalReward:0});

    useEffect(() => {
        dispatch(selectStake(id))
        dispatch(selectPhase(id))
        dispatch(initPhasePercents(id));
        dispatch(selectStakeTransaction(id));
        dispatch(initStakeTransactions());
        dispatch(selectPhaseStakeContractToken(id))
            return () => {

            };
        }, []);
    const [totalRewarddd, setTotalRewarddd] = useState(0);

    const transfer = async () => {

    setTransferStatus({id:1, status: true})
        Swal.fire({
            title: 'Çekmek İstediğinizden Emin misiniz?',

            showCancelButton: true,
            confirmButtonText: 'Evet',
            cancelButtonText : 'Vazgeç'

        }).then((result) => {
            setWithdrawInputStatus(true)
            dispatch(insertStakeTransaction({
                address: 'withdraw',
                transaction_hash: 'withdraw',
                status: 1,
                amount: withdrawAmount,
                stake_id: stake.id,
                phase_id: 1,
                type: 0,
                participation_month:numberOfPastMount,

            })).then(response => {
                setWithdrawInputStatus(false)
                toast('işleminiz Başarıyla gerçekleşti')
            })

        })
    }
    const [amount, setAmount] = useState(0);
    const [numberOfPastMount, setNumberOfPastMount] = useState(0);
    const [monthCount, setMonthCount] = useState(0);
    useEffect(() => {
        setAmount(parseFloat(stakeTransaction.amount))
        var admission = Moment(stakeTransaction.participation_date);
        var now =  Moment(new Date()) ;
        setMonthCount(now.diff(admission, 'month'));
        var stakeDate = Moment(stake.start_date)
        setNumberOfPastMount(now.diff(stakeDate, 'month'));
    }, [stakeTransaction])



    const [withdrawInputStatus, setWithdrawInputStatus] = useState(false);
    useEffect(() => {

        if(withdrawAmount>parseFloat(totalTop)){
            setWithdrawInputStatus(true)

        }else {
            setWithdrawInputStatus(false)

        }
    }, [withdrawAmount])
    const handleChange = (event) => {
        const { name, value } = event.target
        setWithdrawAmount(value);
    }

    var rewardVal=0;
    const reward = (percent, totalReward) => {
        rewardVal=((totalAmount)*percent/100);
        return rewardVal
    }
    var totalWithdraw =0;
    var totalWithdraw1 =0;
    var withdrawStatus= []
    var withdrawAmountLine = 0
    var totalAmount=0;
    var total=0;
    var totalAmount1=0;
    var totalTop=0;
    var total1=0;
    const getTotalReward = (value) => {
            total+=parseFloat(value)
        return total
    }

    const getTotalReward1 = (value) => {
        total1+=parseFloat(value)
        return total1
    }
    const  getTotalAmount = (value, withdraw) => {

           return (parseFloat(amount - withdraw) + parseFloat(value)).toFixed(3);


    }
    const  getTotalAmount1 = (value, withdraw) => {
        return (parseFloat(amount - withdraw) + parseFloat(value)).toFixed(3);

    }
    const reward1 = (percent, totalReward) => {
        rewardVal=((totalAmount1)*percent/100);
        return rewardVal
    }
    const getTotalRewardWithout = (amount) => {
        total1=0;
        totalAmount1=0;

        return  phasePercents.map((item, index) => {
            const rewardValue1 = reward1(item.percent)
            const totalReward1 = getTotalReward1(rewardValue1)
            if(stakeTransactions.length > 0) {
                stakeTransactions.map((item1, index1) => {
                    if(item.month ==  item1.participation_month) {
                        totalWithdraw1 += parseFloat(item1.amount)

                    }
                    totalAmount1 = getTotalAmount(totalReward1, totalWithdraw1)
                })
            }else {
                totalAmount1 = getTotalAmount(totalReward1, 0)
            }
            if(monthCount==item.month && !isNaN(totalReward1)) {
                totalTop=totalAmount1;
                return totalTop
            }

        })


    }
    return (
        <div>
            <ToastContainer  />
                                <div className="card-header">

                                    <h5> Stake Durumu</h5>


                                            <label className={""}>Çekme İşlemi İçin Bir Bedel Giriniz</label><br/>
                                        <input type="text" className={"form-controll"}
                                               value={withdrawAmount}
                                               onChange={handleChange}
                                           ></input><br/>
                                    {!withdrawInputStatus ? '' : <small className={" badge rounded-pill pill-badge-danger"}>Girilen Değer Bakiyeden Büyük Olamaz!</small>}
                                            <hr/>
                                            <button
                                                    className={"btn btn-primary"} onClick={transfer}  disabled={withdrawInputStatus}> Geri Çek
                                            </button>
                                            <br/>
                                            <br/>



                                </div>
            <div className={"row g-2"}>
                <div className="">
                    <div className="alert progress-bar-animated bg-info" role="progressbar"
                         aria-valuenow="75" aria-valuemin="0"
                         aria-valuemax="100" style={{width: phasePercents.length/phasePercents.length*100+'%'}}>Toplam Alacak Mitar: {getTotalRewardWithout(amount)}</div>
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
                                    <th >Çıkış</th>

                                </tr>
                                </thead>
                                <tbody>
                                {

                                    phasePercents.map((item, index) => {

                                        const rewardValue=reward(item.percent)
                                        const totalReward = getTotalReward(rewardValue)
                                        withdrawAmountLine=0;
                                        if(stakeTransactions.length>0) {
                                            stakeTransactions.map((item1, index1) => {
                                                if(item.month ==  item1.participation_month) {
                                                    totalWithdraw += parseFloat(item1.amount)
                                                    withdrawStatus[index] = true;
                                                    withdrawAmountLine += parseFloat(item1.amount)
                                                }
                                                totalAmount = getTotalAmount(totalReward, totalWithdraw)
                                            })
                                        }else {
                                            totalAmount = getTotalAmount(totalReward, 0)
                                        }

                                  return (<tr className={monthCount==item.month ? "bg-light-danger" :'' }  key={index}>

                                        <td >{item.month}</td>
                                        <td>{item.percent}</td>

                                        <td>{rewardValue.toFixed(3)}</td>
                                        <td>{totalReward.toFixed(3)}</td>

                                        <td><button
                                            className={"btn btn-danger"}>{totalAmount}
                                        </button>  </td>
                                      <td>    {withdrawStatus[index] ?<>
                                                <i className={"fa fa-arrow-circle-left"}></i><span className={"badge badge-primary"}> {withdrawAmountLine}</span></>
                                            : ''
                                            }
                                      </td>

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
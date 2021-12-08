import {setStakeToInvester} from "../helpers/web3";
import {ToastContainer, toast} from 'react-toastify';
import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {initEvm, removeEvm} from "../redux/actions/evmAction";
import {selectToken} from "../redux/actions/tokenAction";


const StakeNew = () => {
    const evm = useSelector((state) => state.evmReducer.evm)

    const [transferStatus, setTransferStatus] = useState(false);
    const [inputValue, setInputValue] = useState({address:"0x40C966D2eee8F03FFCD94F0cD72B9209906CFd4b", amount:10000000, day:0, percent:10});
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(selectToken(213))
        return () => {
        };
    }, []);
    const stake = async () => {

        setTransferStatus({id: 1, status: true})
        const id = toast.loading("Lütfen Bekleyiniz..")


        await setStakeToInvester(inputValue.address, inputValue.amount, inputValue.day, inputValue.percent).then(function (response) {
            console.log(response)


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
    const handleChange = (event) => {
        const { name, value } = event.target
        setInputValue({ ...inputValue, [name]: value });
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
                                    <button onClick={() =>  dispatch(initEvm())}
                                            className={"btn btn-primary"}><i className="fa fa-stop-circle"></i>Cüzdana Bağlanmak İçin Tıklayınız
                                    </button> :
                                    <>



                                        <button onClick={() => dispatch(removeEvm())}
                                                className={"btn btn-danger btn-block"}>Bağlantıyı Kes
                                        </button>    </>
                                }
<hr/>
                                <div className="input-group mb-2">
                                    <div className="input-group-append">

                                    </div>
                                    <div className="mb-5">
                                    </div>
                                    <input type="text" className="form-control form-control-lg"
                                           placeholder="Adres" disabled="" value={inputValue.address} name={"address"} onChange={handleChange}></input>
                                </div>
                                <div className="input-group mb-2">
                                    <div className="input-group-append">

                                    </div>
                                    <div className="mb-5">
                                    </div>

                                    <input type="text" className="form-control form-control-lg"
                                           value={inputValue.amount} name={"amount"} onChange={handleChange}   placeholder="Miktar" disabled=""></input>


                                </div>
                                <div className="input-group mb-2">
                                    <div className="input-group-append">

                                    </div>
                                    <div className="mb-5">
                                    </div>
                                    <input type="text" className="form-control form-control-lg"
                                           placeholder="Gün" disabled="" value={inputValue.day} name={"day"} onChange={handleChange}  ></input>


                                </div>
                                <div className="input-group mb-2">
                                    <div className="input-group-append">

                                    </div>
                                    <div className="mb-5">
                                    </div>
                                    <input type="text" className="form-control form-control-lg"
                                           placeholder="Yüzde" disabled="" value={inputValue.percent} name={"percent"} onChange={handleChange} ></input>


                                </div>

                                {evm == false  ? <>



                                    </>
                                     :         <button type="submit" className="btn btn-primary btn-block btn-lg" onClick={stake}>Stake Yap!</button>

                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )


}
export default StakeNew;
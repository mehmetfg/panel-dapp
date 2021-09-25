import React, {useState, useEffect} from "react";
import {fetcher} from "../lib/fetcher";
import {getGasPrice, getEthToUsdtExchangeRate} from "../helpers/api";
import {callBuyToken,
    addTokenToWallet,
    waitForReceipt,
} from "../helpers/web3";
import Swal from "sweetalert2";
import {useDispatch, useSelector} from "react-redux";
import {initEvm, removeEvm} from "../redux/actions/evmAction";

const PrivateSale = () => {

    const dispatch = useDispatch();
    const evm =useSelector((state) => state.evmReducer.evm)
    const asset =useSelector((state) => state.assetReducer.asset)
    ///web3 Modal kurulumu
    const [status, setStatus] = useState({
        fetching:false,
    });

    const [transaction, setTransaction] = useState(false)
    const [inputValue, setInputValue] = useState({
        price:0.00,
        mail : '',
        name :'',
        token: 0.00

    });

    /// güncel ethereum  gas bedelini getirme
    const [gasPrice, setGasPrice] = useState({})
    const [ethToUsdt, setEthToUsdt] = useState(0.00);
    useEffect( async () => {
        const gasPrice =await getGasPrice();
        setGasPrice(gasPrice);
        ///ethereumun güncel usdt kurunu getirme
        const ethToUsdt=await getEthToUsdtExchangeRate()
        setEthToUsdt(ethToUsdt) ;

    }, [])




    const tokenToCoin = () => {

        const ethereumValue = parseFloat(asset.tokenBalance)
    }
    const coinToToken = () => {
        const ethereumValue = parseFloat(asset.tokenBalance)
    }

    const buyToken = async () => {
        const {price , name, mail} = inputValue
        const {web3, address} = evm
        let netEth = 0;
        let ethResult = 0;
        let exchangeRate = parseFloat(ethToUsdt)

        //mail ve name alanı boş bırakmayınız
        if (!name || !mail) {
            Swal.fire({
                    title: ['Hata'],
                    html: ['Lüffen Email Adresi ve İsim Alanını  Boş Bırakmayınız'],
                    icon: 'error',
                }
            )
            return;
        }

        if ((isNaN(parseFloat(price)) && !isFinite(price)) || price == 0) {
            Swal.fire({
                title: ['Dikkat'],
                html: ['Lütfen Geçerli Bir Değer Giriniz!'],
                icon: 'error',
            })
            return;
        }

        if (parseFloat(asset.ethBalance) <= parseFloat(price)) {
            let ethGwei = parseFloat(gasPrice.fastest) * gasPrice / 1
            console.log(ethGwei)
            netEth = (parseFloat(asset.ethBalance) - ethGwei)

            ethResult = exchangeRate * netEth
            console.log(ethResult)
            if (ethResult > 0) {
                /* Swal.fire({
                     title: ethResult.toFixed(2),
                     html: ['Transfer Maliyeti Düştükten Sonra Alacağınız toplam CYCE miktarı'],
                     icon: 'success',
                     showConfirmButton: false,
                     timer: 2000

                 })*/
            } else {

                Swal.fire({
                    title: ['Dikkat'],
                    html: ['İşlem yapmak için Bakiyeniz Yetersizdir.'],
                    icon: 'error',
                })
                return;
            }

        } else {
            netEth = parseFloat(price)
            ethResult = exchangeRate * netEth
            /*Swal.fire({
                    title: ethResult.toFixed(2),
                    html: ['Alacağınız toplam CYCE miktarı'],
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000

                }
            )*/
        }

        try {
            setTransaction(true)
            const wei = web3.utils.toWei(netEth.toString(), 'ether')
            callBuyToken().on('transactionHash', function (hash) {
                Swal.fire("Başarılı ", "İşleminiz Başarılıdır<br/> CYCE Bakiyeniz <br/>", "success")
                waitForReceipt(hash, web3)

            }).on('error', function (error) {
                addTransaction('hata', 5);
            });

        } catch (error) {
            console.log(error)
        }

     //   await getAccountAssets();

    }

    const  addTransaction = (hash, type) => {
        //     await fetcher.post('http://127.0.0.1:8000/transactions/customer/store', inputValue)
        //  const response = await fetch('http://127.0.0.1:8000/transactions/customer/store', { body:JSON.stringify(inputValue) ,mode: 'cors', method:'post' });
        //const {price, address, mail, name} = this.state
        fetcher.post('/transactions/customer/store', inputValue)
        /*$.ajax({
            url: '/transactions/customer/store',
            method: 'POST',
            data: {quentity: price, type: type, address: address, description: mail, definition: name},
            success: function (data) {
                console.log(data)
            }
        })*/
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setInputValue({ ...inputValue, [name]: value });
    }

        return (
            <div>

                <div className="card-header text-center">
                    <h4 className="font-primary">{['Özel Satış(Private Sale)']} </h4>

                    <div className={status.fetching ? "loader-box " : "hidden"}>
                        <div className="loader-4"></div>
                    </div>
                </div>
                <div className={status.fetching ? "hidden" : "card-body"}>
                    <div className="row g-2">
                        <div className="col-md-12">
                            <div className="row">
                                <div className="container-fluid">
                                    <div className="page-title">
                                        <div className="row">

                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="card total-users">
                                        <div className="card-header card-no-border">

                                            <div className="card-header-right">
                                                <ul className="list-unstyled card-option">
                                                    <li><i className="fa fa-spin fa-cog"></i></li>
                                                    <li><i className="view-html fa fa-code"></i></li>
                                                    <li><i className="icofont icofont-maximize full-card"></i></li>
                                                    <li><i className="icofont icofont-minus minimize-card"></i></li>
                                                    <li><i className="icofont icofont-refresh reload-card"></i></li>
                                                    <li><i className="icofont icofont-error close-card"></i></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="card-body pt-0">
                                            <div className="apex-chart-container goal-status text-center row">

                                                <div className="row">
                                                    <ul>
                                                        <li className="mt-0 pt-0">
                                                            <h6 className="font-primary">{['CYCE Dönüştürme']}   </h6>

                                                        </li>

                                                    </ul>
                                                    <div className="mb-3 m-form__group col-md-12 text-center">

                                                        <br/>
                                                        <strong>{['Cüzdan Numaranız:']} </strong>
                                                        <span
                                                            id="account"></span><br/>
                                                        <strong>{['CYCE Sözleşme Adresi:']}  </strong>
                                                        <span>0xeadd9b69f96140283f9ff75da5fd33bcf54e6296</span>

                                                        <ul>
                                                            <li className="mt-0 pt-0">
                                                                <h6 className="font-primary">{['Özel Satış(Private Sale)']}</h6>
                                                                <h6 className="f-w-400">{['28 Mayıs 2021']} </h6>
                                                                {transaction ? <h1 className={'btun'} >
                                                                    <a
                                                                        className={transaction ? ' btn btn-warning' : ' hidden btn btn-warning'}
                                                                    >
                                                                        <i className={"fa fa-spin fa-cog"}></i> {['İşleminiz devam ediyor....']}
                                                                    </a>

                                                                </h1> :null}
                                                            </li>

                                                            <li>
                                                                <p>
                                                                    {['Lütfen almak istediğiniz CYCE miktarını girin(İşlem Ücretleri Mevcut Ethereum Bakiyenizden Düşecektir)']}

                                                                </p>

                                                                <div className="col-md-12 mb-3 d-flex">
                                                                    <input className={"form-control"} type="text" placeholder={['Adınızı Giriniz..']}
                                                                           name={"name"}
                                                                           value={inputValue.name}
                                                                           onChange={handleChange}
                                                                           disabled={!evm}
                                                                    ></input>
                                                                    <input className={"form-control"} type="text" placeholder={['Mail Adresinizi Giriniz..']}
                                                                           name={"mail"}
                                                                           value={inputValue.mail}
                                                                           onChange={handleChange}
                                                                           disabled={!evm}
                                                                    ></input>
                                                                </div>
                                                                <div className="col-md-12 mb-3 d-flex">


                                                                    <input className="form-control" type="text"
                                                                           name={"cyce"}
                                                                           onChange={handleChange}
                                                                           value={inputValue.token}
                                                                           onBlur={tokenToCoin}
                                                                           placeholder={['Alacağınız CYCE Miktarı']}
                                                                           disabled={!evm}
                                                                    ></input>

                                                                </div>
                                                                <div className="col-md-12">
                                                                    <i className="fa fa-exchange"
                                                                       aria-hidden="true"></i>
                                                                </div>
                                                                <br/>
                                                                <div className="col-md-12"
                                                                >

                                                                    <input className="form-control" type="text"
                                                                           name={"price"}
                                                                           disabled={!evm}
                                                                           onChange={handleChange}
                                                                           placeholder={['Ethereum Miktarını Giriniz.']}
                                                                           onBlur={coinToToken}
                                                                           value={inputValue.price}></input>
                                                                    <br/>
                                                                    {evm ==false ? null
                                                                        :

                                                                    <button
                                                                        className={'btn'}

                                                                        type="submit" id="buyToken" style={{
                                                                        background: '#61a93e',
                                                                        color: 'white',
                                                                        width: '175px',
                                                                    }}

                                                                        onClick={buyToken}>{['CYCE Al']}
                                                                    </button>
                                                                    }

                                                                </div>


                                                            </li>
                                                        </ul>
                                                        <div className="mb-3">

                                                        </div>


                                                    </div>
                                                </div>
                                                <div className="mb-3 m-form__group col-md-12 text-center">




                                                    <div className="mb-3 m-form__group col-md-12 text-center">


                                                        { evm == false?  <button type="submit" id="metaMaskConnect"
                                                                            style={{
                                                                                background: '#f5841f',
                                                                                color: 'white',
                                                                                width: '175px',
                                                                            }}
                                                                            onClick={() =>  dispatch(initEvm())}>{['Cüzdana Bağlan']}
                                                        </button>:<div>
                                                            <h1 className="">
                                                                <a className={'btn btn-primary'}
                                                                   onClick={() => {
                                                                       setInputValue({...inputValue, price: asset.ethBalance});
                                                                       coinToToken()
                                                                   }}>{['Ethereum Bakiyeniz']} {parseFloat(asset.ethBalance).toFixed(6)}

                                                                    <br/>{['Tüm Bakiyeniz İle CYCE Almak İçin Bu Butona Tıklayınız']}
                                                                </a>
                                                            </h1>

                                                            <h1 className="">
                                                            <a
                                                            className={!evm ? 'hidden btn btn-danger' : 'btn btn-danger'}

                                                            onClick= {() => addTokenToWallet(evm.provider)}>{['CYCE Bakiyeniz']}: {asset.tokenBalance}<br/>
                                                        {['Cüzdana Ekle']}
                                                            </a>
                                                            </h1>
                                                            <button
                                                            style={{
                                                            background: '#f5841f',
                                                            color: 'white',
                                                            width: '175px',
                                                        }}
                                                            onClick={() => dispatch(removeEvm() )}>{['Bağlantıyı Kes']}
                                                            </button>
                                                            </div>}
                                                        <br/>
                                                        <br/>

                                                    </div>


                                                </div>
                                                <div className="col-md-12 text-center">
                                                    <a href="https://cycecoin.com/"
                                                       className="btn btn-danger">{['Siteye Geri Dön']}</a>
                                                    <hr/>
                                                    {!window.ethereum ?
                                                        <a href="https://metamask.app.link/dapp/sale.cycecoin.com/"
                                                           target={"_blank"}
                                                           className={ "btn btn-warning"}>{['Metamask ile bağlanmak için tıklayınız']}</a>
                                                        : null
                                                    }



                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )




}

export default PrivateSale
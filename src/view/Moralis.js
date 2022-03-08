import {setStakeToInvester} from "../helpers/web3";
import {ToastContainer, toast} from 'react-toastify';
import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {initEvm, removeEvm} from "../redux/actions/evmAction";
import {selectToken} from "../redux/actions/tokenAction";
import { useMoralis } from "react-moralis";
import {Moralis} from 'moralis';

const MoralisWS = () => {
    const serverUrl = "https://gp7zqxpu9bgk.usemoralis.com:2053/server";
    const appId = "j1uMQxAaPwjUSVFeVpP4UHN2uJ0W7cqoIjbEDBRt";
    Moralis.start({ serverUrl, appId });
    const { authenticate, isAuthenticated, user } = useMoralis();
    const [erc20, setErc20] = useState({});
    const dispatch = useDispatch();
    const token = useSelector((state)=>state.tokenReducer.token )
    useEffect(() => {

        dispatch(selectToken(213))
    },[])
    useEffect(() => {

        listenToUpdates()
    },[token])
    const listenToUpdates =  async () => {
     /*   let query = new Moralis.Query("EthTransactions");
        let subscription = await  query.subscribe
        ();
        subscription.on("create", (object => {
        console.log("ner transaction !!");

        console.log(object);
        }))*/

    //    const address = user.get("ethAddress");
        const web3 = await Moralis.enableWeb3();
      //  const contract = new web3.eth.Contract(token.main_abi, token.contract_address);
        const options = { chain: "rinkeby", address: "0xC31D181dD24CA32cba0c0099E36D011FEe5CF857"}

        const price = await  Moralis.Web3API.token.getTokenPrice({address:"0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9"})
        const balances = await Moralis.Web3.getAllERC20(options);
        const transactions = await Moralis.Web3API.account.getTokenTransfers(options)
        console.log(price)
        setErc20(balances);
        console.log(transactions)

    }
    if (!isAuthenticated) {
        return (
            <div>
                <button onClick={() => authenticate()}>Authenticate</button>
            </div>
        );
    }

    return (
        <div>
            <h1>Hi {user.get("username")}</h1>

        </div>
    );
};
export default MoralisWS;
import {CYCE_CONTRACT} from "../constants/contract";
import Web3 from "web3";
import getWeb3Modal from "../lib/web3Modal";
import store from "../redux/store";
import {toast } from 'react-toastify';
import {initAsset} from "../redux/actions/assetAction";
import {initEvm, removeEvm, resetEvm} from "../redux/actions/evmAction";
import {evmReducer} from "../redux/reducers/evmReducer";
var web3={};
var address='';
var provider={}
export const connectToEvm  = async () => {
    const web3Modal = getWeb3Modal();
    provider = await  web3Modal.connect();
    web3= new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    address = accounts[0];
    const networkId = await  web3.eth.net.getId();
    const chainId   = await  web3.eth.getChainId()
    await subscribeProvider(provider,web3,address)
    store.dispatch(initAsset())
    toast('Cüzdan Bağlantısı Sağlandı')
    return {provider, web3, accounts, address, networkId, chainId};
}
function getTokenContract(web3, contractId) {
        const state= store.getState();
        const token = state.tokenReducer.token

    const contract = new web3.eth.Contract(
        token.main_abi,
        token.owner_address
    )

    return contract
}
function callBalanceOf(web3,address) {
    return new Promise(async(resolve, reject) => {
        const contract = getTokenContract(web3, 1)
        await contract.methods.balanceOf(address)
            .call(
                { from: address},
                (err, data) => {
                    if (err) {
                        reject(err)
                    }

                    resolve(data)
                }
            )
    })
}
export function callTransfer(item) {
    return new Promise(async(resolve, reject) => {
        const contract = getTokenContract(web3 ,1)
        await contract.methods
            .transfer(item.address, parseFloat(item.quentity))
            .send({ from: address }, (err, data) => {
                if (err) {

                    reject(err)
                }


            }).then(function (status){

                resolve(status.transactionHash)
            })
    })
}

export function callBuyToken(address, web3) {
    return new Promise(async(resolve, reject) => {
        const token = getTokenContract(web3)
        await token.methods
            .buyToken(address, '1')
            .send({ from: address }, (err, data) => {
                if (err) {
                    reject(err)
                }

                resolve(data)
            })
    })
}

export const addTokenToWallet = async (provider) => {
    provider.sendAsync({
        method: 'wallet_watchAsset',
        params: {
            "type": "ERC20",
            "options":CYCE_CONTRACT[1],
        },
        id: Math.round(Math.random() * 100000),
    }, (err, added) => {
        console.log('provider returned', err, added)
        if (err || 'error' in added) {
            //Swal.fire("Başarısız", err, "error")
            return
        }
        /*  if(added.result) {
              Swal.fire("Başarılı ", "CYCE Coin Cüzdana Ekleme İşleminiz Başarılı<br/> CYCE Bakiyeniz <br/>"+cyceBalance, "success")
          }else{
              Swal.fire("Başarısız", "CYCE Coin Vazgeçtiniz", "error")
          }*/
    })

}

export const getBalanceOfToken = async (web3, address) =>{

    if (!web3) {
        return;
    }
    if(address !== undefined && address !== '') {

        const contract = await callBalanceOf(web3, address)
       return (contract/10000000000000000000)

    }

    // const balance =  await web3.utils.fromWei(response);
    // setTokenBalance(balance);
    // console.log(tokenBalance)

}

export const getBalanceOfEth = async (web3, address) =>{
    if(address !== undefined && address !== '') {
        const response = await web3.eth.getBalance(address)
        const balance = await web3.utils.fromWei(response);
        return balance;
    }
}

export const  waitForReceipt = async (hash, web3) =>  {

    var sonuc= await web3.eth.getTransactionReceipt(hash)
    let  status=true;
    if (status) {
        window.setTimeout(function () {
            waitForReceipt(hash);
            if (sonuc !== null) {
                status=false;
              return true;
            }
        }, 2000);
    }

}
export  const resetWeb3Provider = async () =>{

  /*  if (web3 && web3.currentProvider && web3.currentProvider.close) {
        await web3.currentProvider.close();
    }*/



    const web3Modal = getWeb3Modal();
     await web3Modal.clearCachedProvider();
    toast('Cüzdan Bağlantısı Kesildi')
    store.dispatch(resetEvm())

}





const subscribeProvider = async (provider,web3, address) => {

    if (!provider.on) {
        return;
    }
    provider.on("close", async () =>{
        console.log("close")
        await resetWeb3Provider()});
    provider.on('disconnect', async () => {
        await resetWeb3Provider()
        console.log("disconnect")

    });
    provider.on("accountsChanged", async (accounts) => {
        console.log("accountsChanged")
        if(accounts[0]) {

             await getAccountAssets(web3, address);
        } else {
            await resetWeb3Provider()
        }
    });
    provider.on("chainChanged", async (chainId) => {
        /* const {web3} = state;
         const networkId = await web3.eth.net.getId();
         await setState({chainId, networkId});*/
        console.log("chainChanged adfasf")
        store.dispatch(initAsset())
    });

    provider.on("networkChanged", async (networkId) => {
        /*          const {web3} = state;
                  const chainId = await web3.eth.chainId();
                  await setState({chainId, networkId});*/
        console.log("networkChanged adfdasf")
        store.dispatch(initAsset())
    });
};

export const getAccountAssets = async () => {
    const  ethBalance    =  await getBalanceOfEth(web3, address);
    const tokenBalance   = 0// await  getBalanceOfToken(evm.web3, evm.address)

    return {ethBalance}
    //setEthBalance(ethBalance);
    //   setTokenBalance(tokenBalance)
}

export function watchTokenTransfers(from, to, amount, resolve, data1) {
    // Instantiate web3 with WebSocketProvider

    // Instantiate token contract object with JSON ABI and address
    const tokenContract = getTokenContract(web3,1)

    // Generate filter options
    const options = {
        filter: {
            _from:  from,
            _to:    to,
            _value: amount
        },
        fromBlock: 'latest'
    }

    // Subscribe to Transfer events matching filter criteria
    tokenContract.events.Transfer(options, async (error, event) => {
        if (error) {
            console.log(error)
            return
        }
       let data=store.getState()
      store.dispatch(initEvm({
          ...data.evmReducer.evm,
          status:true,
      }));


        // console.log('Found incoming Pluton transaction from ' + process.env.WALLET_FROM + ' to ' + process.env.WALLET_TO + '\n');
        // console.log('Transaction value is: ' + process.env.AMOUNT)
        // console.log('Transaction hash is: ' + txHash + '\n')

        // Initiate transaction confirmation
        //confirmEtherTransaction(event.transactionHash)

        resolve(data1)
    })
}

export function watchEtherTransfers() {

    // Instantiate subscription object
    const subscription = web3.eth.subscribe('pendingTransactions')

    // Subscribe to pending transactions
    subscription.subscribe((error, result) => {
        if (error) console.log(error)
    })
        .on('data', async (txHash) => {
            try {
                // Instantiate web3 with HttpProvider
                const web3Http = new Web3(process.env.INFURA_URL)

             /*   // Get transaction details
                const trx = await web3Http.eth.getTransaction(txHash)

                const valid = validateTransaction(trx)
                // If transaction is not valid, simply return
                if (!valid) return*/

                console.log('Found incoming Ether transaction from ' + process.env.WALLET_FROM + ' to ' + process.env.WALLET_TO);
                console.log('Transaction value is: ' + process.env.AMOUNT)
                console.log('Transaction hash is: ' + txHash + '\n')

                // Initiate transaction confirmation
                //confirmEtherTransaction(txHash)

                // Unsubscribe from pending transactions.
                subscription.unsubscribe()
            }
            catch (error) {
                console.log(error)
            }
        })
}
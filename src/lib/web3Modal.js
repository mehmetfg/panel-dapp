import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
const getWeb3Modal = () => {

        const web3ModalInstance = new Web3Modal({
            network: 'mainnet',
            cacheProvider: true,
            providerOptions: {
                walletconnect: {
                    package: WalletConnectProvider,
                    options: {
                        // Mikko's test key - don't copy as your mileage may vary
                        infuraId: "89a1a674afc246438074d9511e192823",
                    }
                },
                /*  fortmatic: {
                      package: Fortmatic,
                      options: {
                          // Mikko's TESTNET api key
                          key: "pk_test_391E26A3B43A3350"
                      }
                  }*/
            }

        })

    return web3ModalInstance;
}

export default getWeb3Modal;
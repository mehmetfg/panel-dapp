import {fetcher} from "../lib/fetcher";

export const getEthToUsdtExchangeRate = async () => {
    const response = await fetcher.get('https://ethereum-api.xyz/eth-prices');
    return response.data
}
export const getGasPrice = async () => {
    const response=  await fetcher.get('https://ethereum-api.xyz/gas-prices');
    return await response.data
}
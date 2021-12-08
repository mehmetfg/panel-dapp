import {combineReducers} from "redux";
import {tokenReducer} from "./reducers/tokenReducer";
import {evmReducer} from "./reducers/evmReducer";
import {assetReducer} from "./reducers/assetReducer";
import {transactionReducer} from "./reducers/transactionReducer";
import {powerStationReducer} from "./reducers/powerStationReducer";
import {stakeReducer} from "./stake/stakeReducer";
import {stakeTransactionReducer} from "./stakeTransaction/stakeTransactionReducer";
import {phaseReducer} from "./phase/phaseReducer";
import {phasePercentReducer} from "./phasePercent/phasePercentReducer";

const reducers = combineReducers({
    tokenReducer,
    evmReducer,
    assetReducer,
    transactionReducer,
    powerStationReducer,
    stakeReducer,
    stakeTransactionReducer,
    phaseReducer,
    phasePercentReducer
})

export default reducers;

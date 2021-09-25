import {combineReducers} from "redux";
import {tokenReducer} from "./reducers/tokenReducer";
import {evmReducer} from "./reducers/evmReducer";
import {assetReducer} from "./reducers/assetReducer";
import {transactionReducer} from "./reducers/transactionReducer";
import {powerStationReducer} from "./reducers/powerStationReducer";

const reducers = combineReducers({
    tokenReducer,
    evmReducer,
    assetReducer,
    transactionReducer,
    powerStationReducer
})

export default reducers;

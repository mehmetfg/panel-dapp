import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./component/Home";
import TransListView from "./view/TransListView";
import PrivateSale from "./view/PrivateSale";
import TransList from "./view/TransList";
import Stake from "./view/Stake"
import StakeWithdraw from "./view/StakeWithdraw";
import WithdrawConfirm from "./view/WithdrawConfirm";
import StakeNew from './view/StakeNew';
import StakeNewWithdraw from './view/StakeNewWithdraw';
import MoralisWS from "./view/Moralis";
const  Routes = () => {
    return (
    <Router>
    <Switch>
        <Route path={"/react/private-sale"} component={PrivateSale} exact></Route>
        <Route path={"/react/transfer-list/:id/:address"} component={TransList}></Route>
        <Route path={"/react/stake/:id/:address"} component={Stake}></Route>
        <Route path={"/react/stake-withdraw/:id/:address"} component={StakeWithdraw}></Route>
        <Route path={"/react/transfer-view/:id/:address"} component={TransListView}></Route>
        <Route path={"/react/withdraw-confirm/:id"} component={WithdrawConfirm}></Route>
        <Route path={"/react/stake-new"} component={StakeNew}></Route>
        <Route path={"/react/stake-new-withdraw"} component={StakeNewWithdraw}></Route>
        <Route path={"/react/moralis"} component={MoralisWS}></Route>
    </Switch>
    </Router>
    )

}

export default Routes
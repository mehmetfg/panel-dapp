import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./component/Home";
import TransListView from "./view/TransListView";
import PrivateSale from "./view/PrivateSale";
import TransList from "./view/TransList";
const  Routes = () => {
    return (
    <Router>

    <Switch>
        <Route path={"/react/private-sale"} component={PrivateSale} exact></Route>
        <Route path={"/react/transfer-list/:id/:address"} component={TransList}></Route>
        <Route path={"/react/transfer-view/:id/:address"} component={TransListView}></Route>
    </Switch>
    </Router>
    )

}

export default Routes
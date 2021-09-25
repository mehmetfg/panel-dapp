import logo from './logo.svg';
import './App.css';




import 'react-toastify/dist/ReactToastify.css';
import './assets/css/vendors/flag-icon.css'

import './assets/css/vendors/feather-icon.css'

import './assets/css/vendors/scrollbar.css'

import './assets/css/vendors/bootstrap.css'

import './assets/css/style.css'


import './assets/css/responsive.css'
import Home from "./component/Home";
import Routes from "./Routes";
import TransList from "./view/TransList";
import {Provider} from "react-redux";
import store from "./redux/store";
function App() {
  return (
    <div className="App">
        <Provider store={store}>
        <Routes>


        </Routes>
    </Provider>

    </div>
  );
}

export default App;

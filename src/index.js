import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import i18next from "i18next";
import common_tr from "./translations/tr/common.json";
import common_en from "./translations/en/common.json";
import { MoralisProvider } from "react-moralis";
i18next.init({
    interpolation: { escapeValue: false },  // React already does escaping
    lng: 'en',                              // language to use
    resources: {
        en: {
            common: common_en               // 'common' is our custom namespace
        },
        de: {
            common: common_tr
        },
    },
});
ReactDOM.render(
  <React.StrictMode>
      <MoralisProvider appId="j1uMQxAaPwjUSVFeVpP4UHN2uJ0W7cqoIjbEDBRt" serverUrl="https://gp7zqxpu9bgk.usemoralis.com:2053/server">
          <App />

    <App />
      </MoralisProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

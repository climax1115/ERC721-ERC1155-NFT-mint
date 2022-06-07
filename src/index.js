import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Providers from './Providers';
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./redux/store";
import Web3 from 'web3'
import Web3Provider from 'web3-react'
import { supportedNetworks } from './config/constants/constants';
import { InjectedConnector } from '@web3-react/injected-connector'
import { MetaMaskProvider } from './hooks/useMetamask';

const store = configureStore();

function getLibrary(provider, connector) {
  return new Web3(provider)
}

const MetaMask = new InjectedConnector({ supportedNetworks: supportedNetworks })

const connectors = { MetaMask }


ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <Providers >
        <Web3Provider connectors={connectors} getLibrary={getLibrary}>
          <MetaMaskProvider>
            <App />
          </MetaMaskProvider>
        </Web3Provider>
      </Providers>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react'
import ReactDOM from 'react-dom'
import { ChainId, Config, DAppProvider, MULTICALL_ADDRESSES } from '@usedapp/core'
import { App } from './App'
import 'bootstrap/dist/css/bootstrap.min.css';
import {store} from './store'
import { Provider } from 'react-redux'
import { ETH_MAINNET_KEY } from './global/apiKeys';

const config:Config = {
  readOnlyChainId: ChainId.Mainnet,
  readOnlyUrls: {
    [ChainId.Mainnet]: ETH_MAINNET_KEY,
    [ChainId.Hardhat]: 'http://127.0.0.1:8545/'
  },
  supportedChains:[ChainId.Mainnet, ChainId.Kovan, ChainId.Hardhat, ChainId.Polygon, ChainId.Mumbai],
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
    </Provider>,
  </React.StrictMode>,
  document.getElementById('root')
)

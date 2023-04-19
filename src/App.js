import { createContext, useState } from 'react';
import './App.scss';
import { WalletDashboard } from './Components/WalletDashboard';
import { WalletRecovery } from './Components/WalletRecovery';

export const WalletContext = createContext()

function App() {
  const [wallet, setWallet] = useState()
  const [subAddresses, setSubAddresses] = useState([])

  return (
    <WalletContext.Provider value={{ wallet, setWallet, subAddresses, setSubAddresses }}>
      <div className='App'>
        <h1>
          Monero Wallet
        </h1>
        <div className='container'>
          <div className='card'>
            {wallet ?
              <WalletDashboard />
              :
              <WalletRecovery />
            }
          </div>
        </div>
      </div>
    </WalletContext.Provider>

  );
}

export default App;

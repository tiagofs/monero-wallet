import React, { useContext, useState } from 'react'
import './../App.scss';
import monerojs, { MoneroNetworkType } from 'monero-javascript';
import { WalletContext } from '../App';
import styles from './WalletRecovery.module.scss';
import { LoadingSpinner } from './LoadingSpinner';


export const WalletRecovery = (props) => {
  const [seedphraseInput, setSeedphraseInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { setWallet } = useContext(WalletContext)


  const restoreWallet = async () => {
    if (seedphraseInput.split(' ').length === 25) {
      setIsLoading(true)
      let walletFull = await monerojs.createWalletFull({
        networkType: MoneroNetworkType.STAGENET,
        password: "supersecretpassword123",
        mnemonic: seedphraseInput
      });
      setWallet(walletFull)
      setIsLoading(false)
    } else {
      window.alert('The entered seedphrase does not contain 25 words.')
    }
  }

  return (
    <>
      {isLoading ?
        <div className='loading-container'>
          <LoadingSpinner />
          <p>Please wait...</p>
        </div>
        :
        <>
          <div className={styles['seedphrase-input-container']}>
            <label htmlFor='mnemonic'>Enter the 25 words mnemonic seed of the wallet you want to restore:</label>
            <textarea id='mnemonic' onChange={e => setSeedphraseInput(e.target.value)}></textarea>
            <button disabled={isLoading} className='button' onClick={() => restoreWallet()}>Restore</button>
          </div>
        </>
      }
    </>

  )
}

import React, { useContext, useState } from 'react'
import styles from './CreateSubAddress.module.scss';
import { WalletContext } from '../App';
import { PropTypes } from "prop-types";
import { LoadingSpinner } from './LoadingSpinner';


export const CreateSubAddress = (props) => {
  const { wallet, setSubAddresses } = useContext(WalletContext)
  const [isLoading, setIsLoading] = useState(false)
  const [subaddressLabel, setSubaddressLabel] = useState('')

  const createSubaddress = async () => {
    if (subaddressLabel.length > 0) {
      setIsLoading(true)

      const result = await wallet.createSubaddress(0, subaddressLabel)
      setSubAddresses(prevState => [...prevState, result])

      setIsLoading(false)
      props.setShowSubAddressCreateForm(false)
      props.onSuccess(result)
    } else {
      window.alert('Please enter a label for the new subaddress.')
    }
  }

  return (
    <>
      {
        isLoading ?
          <div className='loading-container'>
            <LoadingSpinner />
            <p>Please wait...</p>
          </div >
          :
          <div className={styles['create-subaddress-container']}>
            <div className={styles['form-input-container']}>
              <label htmlFor='subaddress-label'>Sub-address label: </label>
              <input id='subaddress-label' onChange={e => setSubaddressLabel(e.target.value)} autoFocus />
            </div>
            <div className={styles['form-buttons-container']}>
              <button onClick={() => createSubaddress()}>Create</button>
              <button onClick={() => props.setShowSubAddressCreateForm(false)}>Cancel</button>
            </div>
          </div>
      }
    </>
  )
}

CreateSubAddress.propTypes = {
  setShowSubAddressCreateForm: PropTypes.func,
  onSuccess: PropTypes.func
}

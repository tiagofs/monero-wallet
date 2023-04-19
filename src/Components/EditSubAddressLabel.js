import React, { useContext, useState } from 'react'
import { PropTypes } from "prop-types";
import styles from './EditSubAddressLabel.module.scss';
import { LoadingSpinner } from './LoadingSpinner'
import { WalletContext } from '../App';



export const EditSubAddressLabel = (props) => {
  const { subAddresses, setSubAddresses } = useContext(WalletContext)
  const [isLoading, setIsLoading] = useState(false)
  const [subaddressLabel, setSubaddressLabel] = useState(props.selectedSubAddress.state.label)

  const editSubaddress = async () => {
    if (subaddressLabel && subaddressLabel.length > 0) {
      setIsLoading(true)

      const result = await props.selectedSubAddress.setLabel(subaddressLabel)
      const updatedSubaddresses = subAddresses.map((item) => item.state.address === result.state.address ? result : item);
      setSubAddresses(updatedSubaddresses)
      
      setIsLoading(false)
      props.setShowEditSubAddressLabelForm(false)
      props.onSuccess()
    } else {
      window.alert('Please enter a label for the subaddress.')
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
          <div className={styles['edit-subaddress-label-container']}>
            <div className={styles['form-input-container']}>
              <label htmlFor='subaddress-label'>New sub-address label: </label>
              <input id='subaddress-label' defaultValue={props.selectedSubAddress.state.label} onChange={e => setSubaddressLabel(e.target.value)} />
            </div>
            <div className={styles['form-buttons-container']}>
              <button onClick={() => editSubaddress()}>Create</button>
              <button onClick={() => {props.setShowEditSubAddressLabelForm(false); props.onCancel(); }}>Cancel</button>
            </div>
          </div>
      }
    </>
  )
}

EditSubAddressLabel.propTypes = {
  setShowEditSubAddressLabelForm: PropTypes.func,
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
  selectedSubAddress: PropTypes.object
}
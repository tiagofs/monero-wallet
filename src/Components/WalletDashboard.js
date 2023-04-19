import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from './WalletDashboard.module.scss';
import { WalletContext } from '../App';
import { CreateSubAddress } from './CreateSubAddress';
import { LoadingSpinner } from './LoadingSpinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { EditSubAddressLabel } from './EditSubAddressLabel';



export const WalletDashboard = (props) => {
  const { wallet, subAddresses, setSubAddresses } = useContext(WalletContext)
  const [showCreateSubAddressForm, setShowCreateSubAddressForm] = useState(false)
  const [mainAddress, setMainAddress] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubaddressDetailsOpen, setIsSubaddressDetailsOpen] = useState(false)
  const [showEditSubAddressLabelForm, setShowEditSubAddressLabelForm] = useState(false)
  const selectedSubAddress = useRef()
  const [filteredAddresses, setFilteredAddresses] = useState()
  const [searchInput, setSearchInput] = useState('')


  useEffect(() => {
    const loadDashboard = async () => {
      setIsLoading(true)

      const walletMainAddress = await wallet.getAddress(0, 0)
      setMainAddress(walletMainAddress)

      const subaddresses = await wallet.getSubaddresses(0)
      console.log('subaddresses', subaddresses)
      setSubAddresses(subaddresses)
      setFilteredAddresses(subaddresses)

      setIsLoading(false)
    }

    loadDashboard()
  }, [])

  
  useEffect(() => {
    filterSubAddresses(searchInput)
  }, [subAddresses])
  
  const filterSubAddresses = (searchInput) => {
    if (searchInput.length === 0) {
      setFilteredAddresses(subAddresses)
    } else {
      setFilteredAddresses(subAddresses.filter(item => {
        if (String(item.state.address).toLowerCase().includes(searchInput.toLowerCase())
        || String(item.state.label).toLowerCase().includes(searchInput.toLowerCase())) {
          return true
        }
        return false
      }))
    }
  }

  const onCreateSubAddressSuccess = (newSubaddress) => {
    setSearchInput('')
    setFilteredAddresses([...subAddresses, newSubaddress]);
    setIsSubaddressDetailsOpen(true);
  }

  if (showCreateSubAddressForm) {
    return (
      <CreateSubAddress setShowSubAddressCreateForm={setShowCreateSubAddressForm} onSuccess={(newSubaddress) => onCreateSubAddressSuccess(newSubaddress)} />
    )
  }

  if (showEditSubAddressLabelForm) {
    return (
      <EditSubAddressLabel selectedSubAddress={selectedSubAddress.current} setShowEditSubAddressLabelForm={setShowEditSubAddressLabelForm} onSuccess={() => setIsSubaddressDetailsOpen(true)} onCancel={() => setIsSubaddressDetailsOpen(true) }/>
    )
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
          <div className={styles['dashboard-container']}>
            <h3 className={styles['mainaddress-header']}>Main Address</h3>
            <p>{mainAddress}</p>
            <div className={styles['subaddresses-container']}>
              <button onClick={() => setShowCreateSubAddressForm(true)}>New</button>
              <details open={isSubaddressDetailsOpen} onToggle={e => e.preventDefault()}>
                <summary>Sub Addresses</summary>
                <input className={styles['subaddress-search-input']} placeholder="Search by label or address" value={searchInput} onChange={e => { setSearchInput(e.target.value); filterSubAddresses(e.target.value); }} />
                {filteredAddresses?.map((v, k) => (
                  <div key={k} className={styles['subaddresses-contents-container']}>
                    <div className={styles['subaddress-label-container']}>
                      <strong>{v.state.label}</strong>
                      <FontAwesomeIcon icon={faPencil} className={styles['subaddress-label-edit-icon']} onClick={() => { selectedSubAddress.current = v; setShowEditSubAddressLabelForm(true); }} />
                    </div>
                    <div>{v.state.address}</div>
                  </div>
                ))
                }
              </details>
            </div>
          </div>
      }
    </>
  )
}

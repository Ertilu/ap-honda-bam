import React, { useState } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CNav,
  CNavItem,
  CNavLink,
} from '@coreui/react'
import PropTypes from 'prop-types'
import InStockTable from '../../components/InStockTable'
import OutStockTable from '../../components/OutStockTable'

function ModalDetail({ visible, onClose, dataInStock, dataOutStock }) {
  const [tab, setTab] = useState(0)

  return (
    <CModal
      alignment="center"
      fullscreen="sm"
      size="xl"
      scrollable
      visible={visible}
      onClose={onClose}
    >
      <CModalHeader>
        <CModalTitle>{'Detail Barang'}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CNav variant="tabs">
          <CNavItem>
            <CNavLink href="#" active={tab === 0} onClick={() => setTab(0)}>
              Riwayat Barang Masuk
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#" active={tab === 1} onClick={() => setTab(1)}>
              Riwayat Barang Keluar
            </CNavLink>
          </CNavItem>
        </CNav>
        {tab === 0 ? <InStockTable data={dataInStock} /> : <OutStockTable data={dataOutStock} />}
      </CModalBody>
    </CModal>
  )
}

ModalDetail.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  dataInStock: PropTypes.array,
  dataOutStock: PropTypes.array,
}

export default ModalDetail

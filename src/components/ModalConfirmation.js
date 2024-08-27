import React from 'react'
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react'
import PropTypes from 'prop-types'

function ModalConfirmation({ visible, title, description, onClose, onOk, cancelText, okText }) {
  return (
    <CModal alignment="center" visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>{title || 'Hapus Data'}</CModalTitle>
      </CModalHeader>
      <CModalBody>{description || 'Apakah anda yakin ingin menghapus data ini?'}</CModalBody>
      <CModalFooter>
        <CButton color="dark" variant="outline" onClick={onClose} style={{ width: 100 }}>
          {cancelText || 'Batal'}
        </CButton>
        <CButton color="primary" style={{ width: 100 }} onClick={onOk}>
          {okText || 'Ya, Hapus'}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

ModalConfirmation.propTypes = {
  visible: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
  onClose: PropTypes.func,
  onOk: PropTypes.func,
  cancelText: PropTypes.string,
  okText: PropTypes.string,
}

export default ModalConfirmation

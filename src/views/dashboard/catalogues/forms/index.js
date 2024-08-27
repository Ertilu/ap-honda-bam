import React, { useCallback, useMemo, useState } from 'react'
import {
  CForm,
  CCardBody,
  CContainer,
  CFormInput,
  CCardHeader,
  CFormLabel,
  CCard,
  CInputGroup,
  CInputGroupText,
  CButton,
} from '@coreui/react'
import { spacing } from 'src/shared/style.const'
import { useNavigate } from 'react-router-dom'
import './index.scss'
import inventoryService from 'src/services/inventory.service'
import { useDispatch, useSelector } from 'react-redux'
import { RESET_INVENTORY_FORM } from 'src/actionType'
import Loading from 'src/components/Loading'

const PageForms = () => {
  const navigate = useNavigate()
  const inventoryData = useSelector((state) => state.inventoryData)
  const formMode = useSelector((state) => state.formMode)
  const dispatch = useDispatch()
  const [data, setData] = useState(inventoryData)
  const [loading, setLoading] = useState(false)

  const _submit = useCallback(async () => {
    let result
    setLoading(true)
    if (formMode === 'add') {
      result = await inventoryService.create({
        ...data,
        price: parseInt(data.price, 10),
      })
    } else if (formMode === 'edit') {
      const payloadEdit = {
        ...data,
        price: parseInt(data.price, 10),
      }
      delete payloadEdit?.id
      delete payloadEdit?.remaining
      result = await inventoryService.update(data?.id, payloadEdit)
    }
    if (result?.id) {
      navigate(-1)
    }
    setLoading(false)
    dispatch({ type: RESET_INVENTORY_FORM })
  }, [data, navigate, formMode, dispatch])

  const onChangeText = useCallback(({ target: { value } }, propertyName) => {
    setData((prev) => ({
      ...prev,
      [propertyName]: value,
    }))
  }, [])

  const onCancel = useCallback(() => {
    navigate('/')
    dispatch({ type: 'reset_inventory_form' })
  }, [navigate, dispatch])

  const isButtonDisabled = useMemo(
    () => data?.name === '' || data?.price < 1 || loading,
    [data, loading],
  )

  const renderAsterisk = () => <span style={{ color: 'red' }}>*</span>

  return (
    <div
      className="bg-light d-flex flex-row align-items-center"
      style={{ marginBottom: spacing[32] }}
    >
      <Loading visible={loading} />
      <CContainer>
        <CCard>
          <CCardHeader>
            <strong>Tambah Data</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <CFormLabel htmlFor="input-name-label">Nama Barang {renderAsterisk()}</CFormLabel>
              <CFormInput
                type="text"
                id="input-name"
                placeholder="Masukkan Nama Barang"
                onChange={(e) => onChangeText(e, 'name')}
                value={data.name}
              />

              <CFormLabel htmlFor="input-harga-label" style={{ marginTop: spacing[16] }}>
                Harga {renderAsterisk()}
              </CFormLabel>
              <CInputGroup>
                <CInputGroupText>Rp</CInputGroupText>
                <CFormInput
                  type="number"
                  id="input-harga"
                  placeholder="Masukkan Harga"
                  min={1}
                  onChange={(e) => onChangeText(e, 'price')}
                  value={data.price}
                />
              </CInputGroup>
            </CForm>

            <div className="d-flex justify-content-end" style={{ marginTop: spacing[24] }}>
              <CButton
                type="submit"
                color="dark"
                variant="outline"
                style={{ marginRight: spacing[8], width: 80 }}
                onClick={onCancel}
              >
                Batal
              </CButton>
              <div style={{ width: 80, cursor: isButtonDisabled ? 'not-allowed' : 'pointer' }}>
                <CButton
                  type="submit"
                  onClick={_submit}
                  disabled={isButtonDisabled}
                  className="submit-button"
                >
                  Simpan
                </CButton>
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CContainer>
    </div>
  )
}

export default PageForms

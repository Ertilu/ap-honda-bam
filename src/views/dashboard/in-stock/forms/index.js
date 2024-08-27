/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useMemo, useState, useEffect } from 'react'
import {
  CForm,
  CCardBody,
  CContainer,
  CFormInput,
  CCardHeader,
  CFormLabel,
  CCard,
  CInputGroup,
  CButton,
  CFormSelect,
} from '@coreui/react'
import { spacing } from 'src/shared/style.const'
import { useNavigate } from 'react-router-dom'
import './index.scss'
import InventoryService from 'src/services/inventory.service'
import InStockService from 'src/services/in-stock.service'
import { useDispatch } from 'react-redux'
import { RESET_INVENTORY_FORM } from 'src/actionType'
import Loading from 'src/components/Loading'

const INITIAL_DROPDOWN_VALUE = 'Pilih Barang'

const InStockForms = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [data, setData] = useState({
    inventoryId: '',
    inStock: '',
    vendor: '',
  })
  const [listInventory, setListInventory] = useState([INITIAL_DROPDOWN_VALUE])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getListInventory()
  }, [])

  const _submit = useCallback(async () => {
    let result
    setLoading(true)
    result = await InStockService.create({
      ...data,
      inStock: parseInt(data.inStock, 10),
    })
    if (result?.id) {
      navigate(-1)
    }
    setLoading(false)
    dispatch({ type: RESET_INVENTORY_FORM })
  }, [data, navigate, dispatch])

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
    () => data?.inventoryId === '' || data?.inStock === '' || data?.vendor === '' || loading,
    [data, loading],
  )

  const renderAsterisk = () => <span style={{ color: 'red' }}>*</span>

  const getListInventory = useCallback(() => {
    InventoryService.getAllData({ search: '' }).then((res) => {
      setListInventory((currentList) => [
        ...currentList,
        ...res?.results?.map((item) => ({
          label: item?.name,
          value: item?.id,
        })),
      ])
    })
  }, [])

  const onChangeInventory = useCallback((evt) => {
    if (evt?.target?.value !== INITIAL_DROPDOWN_VALUE) {
      setData((prev) => ({
        ...prev,
        inventoryId: evt?.target?.value,
      }))
    }
  }, [])

  return (
    <div
      className="bg-light d-flex flex-row align-items-center"
      style={{ marginBottom: spacing[32] }}
    >
      <Loading visible={loading} />
      <CContainer>
        <CCard>
          <CCardHeader>
            <strong>Tambah Data Masuk</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <CFormLabel htmlFor="input-name-label">Nama Barang {renderAsterisk()}</CFormLabel>
              <CFormSelect
                aria-label="Pilih Barang"
                options={listInventory}
                style={{ cursor: 'pointer' }}
                onChange={onChangeInventory}
              />

              <CFormLabel htmlFor="input-harga-label" style={{ marginTop: spacing[16] }}>
                Stok Masuk {renderAsterisk()}
              </CFormLabel>
              <CInputGroup>
                <CFormInput
                  type="number"
                  id="input-harga"
                  placeholder="Masukkan Stok"
                  min={1}
                  onChange={(e) => onChangeText(e, 'inStock')}
                  value={data.inStock}
                />
              </CInputGroup>

              <CFormLabel htmlFor="input-harga-label" style={{ marginTop: spacing[16] }}>
                Supplier {renderAsterisk()}
              </CFormLabel>
              <CInputGroup>
                <CFormInput
                  type="text"
                  id="input-vendor"
                  placeholder="Masukkan Supplier"
                  min={1}
                  onChange={(e) => onChangeText(e, 'vendor')}
                  value={data.vendor}
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

export default InStockForms

import React, { useCallback, useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CInputGroup,
  CFormInput,
  CInputGroupText,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'
import Loading from 'src/components/Loading'
import ModalConfirmation from '../../../components/ModalConfirmation'
import { spacing } from 'src/shared/style.const'
import { useDebounce } from 'src/shared/utils/debounce'
import OutStockService from 'src/services/out-stock.service'
import OutStockTable from '../components/OutStockTable'
import './index.scss'

const Dashboard = (props) => {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const debouncedValue = useDebounce(search, 600)
  const [loading, setLoading] = useState(true)
  const [modalConfirmDelete, setModalConfirmDelete] = useState(false)
  const idToDelete = ''

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue])

  const getData = useCallback(() => {
    OutStockService.getAllData({ search: debouncedValue })
      .then((res) => {
        setLoading(false)
        setData(res?.results)
      })
      .catch(() => setLoading(false))
  }, [debouncedValue])

  const onSearch = useCallback(({ target: { value } }) => {
    setSearch(value)
  }, [])

  const onDelete = useCallback(async () => {
    setLoading(true)
    setModalConfirmDelete(false)
    await OutStockService.delete(idToDelete)
    getData()
  }, [idToDelete, getData])

  return (
    <>
      <CCard>
        <Loading visible={loading} />
        <ModalConfirmation
          visible={modalConfirmDelete}
          onClose={() => setModalConfirmDelete(false)}
          onOk={onDelete}
        />
        <CCardHeader>
          <div>
            <div className="d-flex justify-content-between align-items-center mt-2">
              <h4>Data Barang Keluar</h4>
              <CInputGroup style={{ width: 300, height: 30 }}>
                <CFormInput
                  placeholder="Cari Data"
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                  size="sm"
                  icon={cilSearch}
                  onChange={onSearch}
                />
                <CInputGroupText>
                  <CIcon icon={cilSearch} size="lg" />
                </CInputGroupText>
              </CInputGroup>
            </div>
            <CButton
              color="primary"
              style={{ margin: `${spacing[8]} 0` }}
              onClick={() => navigate('/dashboard/form-out-stock')}
            >
              Tambah Data
            </CButton>
          </div>
        </CCardHeader>
        <CCardBody>
          <OutStockTable data={data} />
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard

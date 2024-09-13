/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useCallback, useEffect, useState } from 'react'
import {
  CTable,
  CTableRow,
  CTableHeaderCell,
  CTableHead,
  CTableBody,
  CTableDataCell,
  CCard,
  CCardBody,
  CCardHeader,
  CInputGroup,
  CFormInput,
  CInputGroupText,
  CButton,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'
import { useDispatch } from 'react-redux'
import Loading from 'src/components/Loading'
import ModalConfirmation from '../../../components/ModalConfirmation'
import { formatRupiah } from 'src/shared/utils/formatter'
import { useDebounce } from 'src/shared/utils/debounce'
import PromoService from 'src/services/promo.service'
import './index.scss'
import 'react-datepicker/dist/react-datepicker.css'
import { spacing } from 'src/shared/style.const'
import * as moment from 'moment'

const Dashboard = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const debouncedValue = useDebounce(search, 600)
  const [loading, setLoading] = useState(true)
  const [modalConfirmDelete, setModalConfirmDelete] = useState(false)
  const [idToDelete, setIdToDelete] = useState('')
  const [modalDetail, setModalDetail] = useState(false)
  const [filter, setFilter] = useState({
    filterDate: new Date(),
  })

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue, filter])

  const getData = useCallback(() => {
    PromoService.getAllData({
      search: debouncedValue,
    })
      .then((res) => {
        setLoading(false)
        setData(res?.results)
      })
      .catch(() => setLoading(false))
  }, [debouncedValue, filter])

  const onSearch = useCallback(({ target: { value } }) => {
    setSearch(value)
  }, [])

  const onEdit = useCallback(
    async (id) => {
      setLoading(true)
      const res = await PromoService.getDetail(id)
      if (res?.id) {
        setLoading(false)
        dispatch({
          type: 'edit_inventory',
          inventoryData: {
            id: res?.id,
            name: res?.name,
            price: res?.price,
          },
        })
        navigate('/dashboard/forms')
      }
    },
    [dispatch, setLoading, navigate],
  )

  const onDelete = useCallback(async () => {
    setLoading(true)
    setModalConfirmDelete(false)
    await PromoService.delete(idToDelete)
    getData()
  }, [idToDelete, getData])

  const openModalDetail = useCallback((currentData) => {
    setModalDetail(true)
  }, [])

  const closeModalDetail = () => {
    setModalDetail(false)
  }

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
              <h4>Promos</h4>
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
              onClick={() => navigate('/dashboard/promos/forms')}
            >
              Add Data
            </CButton>
          </div>
        </CCardHeader>
        <CCardBody>
          <CTable hover striped responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col" width={500}>
                  Name
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" width={500}>
                  Images
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" width={150}>
                  Start Date
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" width={550}>
                  End Date
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {data?.map((d, idx) => {
                return (
                  <CTableRow key={idx.toString()}>
                    <CTableDataCell
                      scope="row"
                      align="middle"
                      onClick={() => openModalDetail(d)}
                      style={{ cursor: 'pointer' }}
                    >
                      {d?.name || '-'}
                    </CTableDataCell>
                    <CTableDataCell
                      align="middle"
                      onClick={() => openModalDetail(d)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'auto auto auto',
                          padding: '20px',
                        }}
                      >
                        {[...d?.images]?.map((i, idx) => {
                          return (
                            <div key={idx} style={{ margin: '20px' }}>
                              <img alt="images" src={i} width={100} />
                            </div>
                          )
                        })}
                      </div>
                    </CTableDataCell>

                    <CTableDataCell
                      align="middle"
                      onClick={() => openModalDetail(d)}
                      style={{ cursor: 'pointer' }}
                    >
                      {moment(d.startDate).format('DD-MM-YYYY HH:mm:ss')}
                    </CTableDataCell>
                    <CTableDataCell
                      align="middle"
                      onClick={() => openModalDetail(d)}
                      style={{ cursor: 'pointer' }}
                    >
                      {moment(d.endDate).format('DD-MM-YYYY HH:mm:ss')}
                    </CTableDataCell>
                  </CTableRow>
                )
              })}
            </CTableBody>
          </CTable>
          {data && !data?.length && (
            <div
              style={{
                textAlign: 'center',
                position: 'relative',
                width: '100px',
                margin: '0 auto',
              }}
            >
              Data Kosong
            </div>
          )}
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard

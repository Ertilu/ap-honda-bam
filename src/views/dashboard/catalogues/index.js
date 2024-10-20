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
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'
import { useDispatch } from 'react-redux'
import Loading from 'src/components/Loading'
import ModalConfirmation from '../../../components/ModalConfirmation'
import { formatRupiah } from 'src/shared/utils/formatter'
import { useDebounce } from 'src/shared/utils/debounce'
import CatalogueService from 'src/services/catalogue.service'
import './index.scss'
import 'react-datepicker/dist/react-datepicker.css'
import { spacing } from 'src/shared/style.const'
import { EDIT_CATALOGUE } from 'src/actionType'

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
    CatalogueService.getAllData({
      search: debouncedValue,
      filterStockYear: filter.filterDate.getFullYear(),
      filterStockMonth: filter.filterDate.getMonth(),
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
      navigate('/dashboard/catalogues/forms', {
        state: { id },
      })
    },
    [navigate],
  )

  const onDelete = useCallback(async () => {
    setLoading(true)
    setModalConfirmDelete(false)
    await CatalogueService.delete(idToDelete)
    getData()
  }, [idToDelete, getData])

  const openModalDetail = useCallback((currentData) => {
    setModalDetail(true)
  }, [])

  const closeModalDetail = () => {
    setModalDetail(false)
  }

  // console.log('dasawda', data)

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
              <h4>Catalogues</h4>
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
              onClick={() => navigate('/dashboard/catalogues/forms')}
            >
              Add Data
            </CButton>
          </div>
        </CCardHeader>
        <CCardBody>
          <CTable hover striped responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col" style={{ minWidth: '50px', maxWidth: '50px' }}>
                  No
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ minWidth: '150px', maxWidth: '150px' }}>
                  Name
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ minWidth: '150px', maxWidth: '150px' }}>
                  Price
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ minWidth: '150px', maxWidth: '150px' }}>
                  Down Payment (DP)
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ minWidth: '250px', maxWidth: '250px' }}>
                  Description
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ minWidth: '100px', maxWidth: '100px' }}>
                  Category
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ minWidth: '150px', maxWidth: '150px' }}>
                  Colors
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ minWidth: '150px', maxWidth: '150px' }}>
                  Logo
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ minWidth: '250px', maxWidth: '250px' }}>
                  Banners
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ minWidth: '150px', maxWidth: '150px' }}>
                  Images
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ minWidth: '150px', maxWidth: '150px' }}>
                  Feature Texts
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ minWidth: '150px', maxWidth: '150px' }}>
                  Feature Images
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ minWidth: '150px', maxWidth: '150px' }}>
                  Action
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {data?.map((d, idx, index) => {
                // const nomor = index + 1
                return (
                  <CTableRow key={idx.toString()}>
                    <CTableDataCell
                      align="top"
                      onClick={() => openModalDetail(d)}
                      style={{ cursor: 'pointer' }}
                    >
                      {idx + 1 || '-'}
                    </CTableDataCell>
                    <CTableDataCell
                      align="top"
                      onClick={() => openModalDetail(d)}
                      style={{ cursor: 'pointer' }}
                    >
                      {d?.name || '-'}
                    </CTableDataCell>
                    <CTableDataCell
                      align="top"
                      onClick={() => openModalDetail(d)}
                      style={{ cursor: 'pointer' }}
                    >
                      {formatRupiah(d?.price || 0)}
                    </CTableDataCell>
                    <CTableDataCell
                      align="top"
                      onClick={() => openModalDetail(d)}
                      style={{ cursor: 'pointer' }}
                    >
                      {formatRupiah(d?.downPayment || 0)}
                    </CTableDataCell>
                    <CTableDataCell
                      align="top"
                      onClick={() => openModalDetail(d)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div
                        style={{
                          display: 'block',
                          maxHeight: '6em',
                          textOverflow: 'ellipsis',
                          wordWrap: 'break-word',
                          overflow: 'hidden',
                          width: '450px',
                        }}
                      >
                        {d?.description || '-'}
                      </div>
                    </CTableDataCell>
                    <CTableDataCell
                      align="top"
                      onClick={() => openModalDetail(d)}
                      style={{ cursor: 'pointer' }}
                    >
                      {d?.category || '-'}
                    </CTableDataCell>
                    <CTableDataCell align="top" onClick={() => openModalDetail(d)}>
                      <ul>
                        {d?.colors?.map((c, idx) => {
                          return <li key={idx}>{c.name}</li>
                        })}
                      </ul>
                    </CTableDataCell>
                    <CTableDataCell
                      align="top"
                      onClick={() => openModalDetail(d)}
                      style={{ cursor: 'pointer' }}
                    >
                      <img
                        alt="logo-catalogue"
                        src={d?.logo}
                        style={{ width: '140px', height: 'auto' }}
                      />
                    </CTableDataCell>
                    <CTableDataCell
                      align="top"
                      onClick={() => openModalDetail(d)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'auto',
                          width: '100%',
                          height: 'auto',
                        }}
                      >
                        {d?.banners?.map((b, idx) => {
                          return (
                            <div
                              key={idx}
                              style={{ width: '100%', height: 'auto', marginBottom: '1em' }}
                            >
                              <img
                                alt="banners"
                                src={b}
                                style={{ width: '100%', height: 'auto' }}
                              />
                            </div>
                          )
                        })}
                      </div>
                    </CTableDataCell>
                    <CTableDataCell align="top">
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'auto ',
                          width: '100%',
                          height: 'auto',
                        }}
                      >
                        {d?.images?.map((b, idx) => {
                          return (
                            <div
                              key={idx}
                              style={{ width: '100%', height: 'auto', marginBottom: '1em' }}
                            >
                              <img
                                alt="logo-catalogue"
                                src={b}
                                style={{ width: '100%', height: 'auto' }}
                              />
                            </div>
                          )
                        })}
                      </div>
                    </CTableDataCell>
                    <CTableDataCell
                      align="top"
                      onClick={() => openModalDetail(d)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div style={{ width: '500px' }}>
                        <ul>
                          {d?.features?.map((c, idx) => {
                            return (
                              <li key={idx}>
                                {c.title} : {c.text}
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    </CTableDataCell>
                    <CTableDataCell align="top">
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'auto',
                          width: '100%',
                          height: 'auto',
                        }}
                      >
                        {d?.features?.map((b, idx) => {
                          return (
                            <div
                              key={idx}
                              style={{ width: '100%', height: 'auto', marginBottom: '1em' }}
                            >
                              <img
                                alt="logo-catalogue"
                                src={b.image}
                                style={{ width: '100%', height: 'auto' }}
                              />
                            </div>
                          )
                        })}
                      </div>
                    </CTableDataCell>
                    <CTableDataCell align="top">
                      {/* <CDropdown>
                        <CDropdownToggle color="transparent"></CDropdownToggle>
                        <CDropdownMenu className="dropdown-container">
                          <CDropdownItem href="#" onClick={() => onEdit(d?.id)}>
                            Edit
                          </CDropdownItem>
                          <CDropdownItem
                            href="#"
                            onClick={() => {
                              setIdToDelete(d?.id)
                              setModalConfirmDelete(true)
                            }}
                          >
                            Hapus
                          </CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown> */}
                      <button
                        className="button-action rounded-1 bg-warning text-white"
                        style={{ width: '60px', height: '30px' }}
                        onClick={() => onEdit(d?.id)}
                      >
                        Edit
                      </button>

                      <button
                        className="button-action rounded-1 mx-1 bg-danger text-white"
                        style={{ width: '60px', height: '30px' }}
                        onClick={() => {
                          setIdToDelete(d?.id)
                          setModalConfirmDelete(true)
                        }}
                      >
                        Hapus
                      </button>
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

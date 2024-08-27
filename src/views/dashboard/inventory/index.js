/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { forwardRef, useCallback, useEffect, useState } from 'react'
import {
  CTable,
  CTableRow,
  CTableHeaderCell,
  CTableHead,
  CTableBody,
  CTableDataCell,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CInputGroup,
  CFormInput,
  CInputGroupText,
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
import { spacing } from 'src/shared/style.const'
import { formatRupiah } from 'src/shared/utils/formatter'
import { useDebounce } from 'src/shared/utils/debounce'
import InventoryService from 'src/services/inventory.service'
import './index.scss'
import ModalDetail from './detail'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'

const CustomDatePickerButton = forwardRef(({ value, onClick }, ref) => {
  return (
    <CButton color="primary" style={{ margin: `${spacing[8]} 0` }} onClick={onClick} ref={ref}>
      {moment(value).format('MMMM YYYY')}
    </CButton>
  )
})

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
  const [dataInStock, setDataInStock] = useState([])
  const [dataOutStock, setDataOutStock] = useState([])
  const [filter, setFilter] = useState({
    filterDate: new Date(),
  })

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue, filter])

  const getData = useCallback(() => {
    InventoryService.getAllData({
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
      setLoading(true)
      const res = await InventoryService.getDetail(id)
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
    await InventoryService.delete(idToDelete)
    getData()
  }, [idToDelete, getData])

  const openModalDetail = useCallback((currentData) => {
    setModalDetail(true)

    setDataInStock(
      currentData?.inStocks?.map((inStock) => ({
        ...inStock,
        inventory: currentData,
      })),
    )

    setDataOutStock(
      currentData?.outStocks?.map((outStock) => ({
        ...outStock,
        inventory: currentData,
      })),
    )
  }, [])

  const closeModalDetail = () => {
    setModalDetail(false)

    setDataInStock([])
    setDataOutStock([])
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
        <ModalDetail
          visible={modalDetail}
          onClose={closeModalDetail}
          dataInStock={dataInStock}
          dataOutStock={dataOutStock}
        />
        <CCardHeader>
          <div>
            <div className="d-flex justify-content-between align-items-center mt-2">
              <h4>Data Barang</h4>
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
            <div className="d-flex justify-content-between align-items-center">
              <CButton
                color="primary"
                style={{ margin: `${spacing[8]} 0` }}
                onClick={() => navigate('/dashboard/forms')}
              >
                Tambah Data
              </CButton>
              <div>
                <DatePicker
                  selected={filter.filterDate}
                  className="datepicker"
                  customInput={<CustomDatePickerButton />}
                  showMonthYearPicker
                  onChange={(date) =>
                    setFilter((currentFilter) => ({ ...currentFilter, filterDate: date }))
                  }
                />
              </div>
            </div>
          </div>
        </CCardHeader>
        <CCardBody>
          <CTable hover striped responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Nama Barang</CTableHeaderCell>
                <CTableHeaderCell scope="col">Harga</CTableHeaderCell>
                <CTableHeaderCell scope="col" width={150}>
                  Stok Masuk {moment(filter.filterDate).format('MMMM YYYY')}
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" width={150}>
                  Stok Keluar {moment(filter.filterDate).format('MMMM YYYY')}
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" width={150}>
                  Sisa Stok {moment(filter.filterDate).format('MMMM YYYY')}
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" width={150}>
                  Total Stok Masuk
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" width={150}>
                  Total Stok Keluar
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" width={150}>
                  Total Sisa Stok
                </CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
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
                      {formatRupiah(d?.price || 0)}
                    </CTableDataCell>
                    <CTableDataCell
                      align="middle"
                      onClick={() => openModalDetail(d)}
                      style={{ cursor: 'pointer' }}
                    >
                      {d?.inStockCurrentMonth || 0}
                    </CTableDataCell>
                    <CTableDataCell
                      align="middle"
                      onClick={() => openModalDetail(d)}
                      style={{ cursor: 'pointer' }}
                    >
                      {d?.outStockCurrentMonth || 0}
                    </CTableDataCell>
                    <CTableDataCell
                      align="middle"
                      onClick={() => openModalDetail(d)}
                      style={{ cursor: 'pointer' }}
                    >
                      {d?.stockCurrentMonth || 0}
                    </CTableDataCell>
                    <CTableDataCell
                      align="middle"
                      onClick={() => openModalDetail(d)}
                      style={{ cursor: 'pointer' }}
                    >
                      {d?.in || 0}
                    </CTableDataCell>
                    <CTableDataCell
                      align="middle"
                      onClick={() => openModalDetail(d)}
                      style={{ cursor: 'pointer' }}
                    >
                      {d?.out || 0}
                    </CTableDataCell>
                    <CTableDataCell
                      align="middle"
                      onClick={() => openModalDetail(d)}
                      style={{ cursor: 'pointer' }}
                    >
                      {d?.remaining || 0}
                    </CTableDataCell>
                    <CTableDataCell align="middle">
                      <CDropdown>
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
                      </CDropdown>
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

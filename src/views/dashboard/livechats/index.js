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
import { BsPersonCircle } from 'react-icons/bs'
import { RiCheckDoubleFill } from 'react-icons/ri'

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
              <h4>Live Chats</h4>
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
          </div>
        </CCardHeader>
        <CCardBody>
          <div className="w-100 border-bottom row mx-auto py-3 userchat" style={{ height: '80px' }}>
            <div className="col-1 d-flex justify-content-end align-items-center">
              <BsPersonCircle size={50} />
            </div>
            <div className="col w-50 h-100" style={{ cursor: 'pointer' }}>
              <div className="h-50  row">
                <div className="col">
                  <p className="fw-semibold ">Mas Hengki</p>
                </div>
                <div className="col">
                  <p className="text-end" style={{ fontSize: '15px' }}>
                    04.20 PM
                  </p>
                </div>
              </div>
              <div className="w-100">
                <p
                  className="w-100"
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas aliquam erat
                  tempor elementum venenatis. Duis non lacus vestibulum, aliquet nisi eget, dictum
                  tellus. Sed in.
                </p>
              </div>
            </div>
            <div className="col-1 d-flex justify-content-center align-items-center h-100 ">
              {/* <div
                className="rounded-circle d-flex justify-content-center align-items-center bg-success"
                style={{ height: '15px', width: '15px' }}
              ></div> */}
              <RiCheckDoubleFill color="blue" size={25} />
            </div>
            <div className="col-1 d-flex justify-content-center align-items-center h-100 ">
              <button
                className="bg-danger text-white rounded-1"
                style={{ height: '30px', border: 'none' }}
              >
                Delete
              </button>
            </div>
          </div>
          <div className="w-100 border-bottom row mx-auto py-3 userchat" style={{ height: '80px' }}>
            <div className="col-1 d-flex justify-content-end align-items-center ">
              <BsPersonCircle size={50} />
            </div>
            <div className="col w-50 h-100" style={{ cursor: 'pointer' }}>
              <div className="h-50 row">
                <div className="col">
                  <p className="fw-semibold ">Mba Puput</p>
                </div>
                <div className="col">
                  <p className="text-end" style={{ fontSize: '15px' }}>
                    04.20 PM
                  </p>
                </div>
              </div>
              <div className="w-100">
                <p
                  className="w-100"
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas aliquam erat
                  tempor elementum venenatis. Duis non lacus vestibulum, aliquet nisi eget, dictum
                  tellus. Sed in.
                </p>
              </div>
            </div>
            <div className="col-1 d-flex justify-content-center align-items-center h-100 ">
              <div
                className="rounded-circle d-flex justify-content-center align-items-center bg-success"
                style={{ height: '15px', width: '15px' }}
              ></div>
              {/* <RiCheckDoubleFill color="blue" size={25} /> */}
            </div>
            <div className="col-1 d-flex justify-content-center align-items-center h-100 ">
              <button
                className="bg-danger text-white rounded-1"
                style={{ height: '30px', border: 'none' }}
              >
                Delete
              </button>
            </div>
          </div>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard

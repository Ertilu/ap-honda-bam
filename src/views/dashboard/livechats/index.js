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
import './index.scss'
import { cilSearch } from '@coreui/icons'
import { useDispatch } from 'react-redux'
import { BsPersonCircle } from 'react-icons/bs'
import 'react-datepicker/dist/react-datepicker.css'
import { RiCheckDoubleFill } from 'react-icons/ri'
import { PARTYKIT_HOST, PARTYKIT_URL, SINGLETON_ROOM_ID } from 'src/config'
import usePartySocket from 'partysocket/react'
import { removeDuplicates } from '../../../shared/utils'
import * as moment from 'moment'

const LiveChat = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [rooms, setRooms] = useState([])

  const socket = usePartySocket({
    host: PARTYKIT_HOST,
    party: 'chatrooms',
    room: SINGLETON_ROOM_ID,
  })

  useEffect(() => {
    if (socket) {
      const onMessage = (evt) => {
        const data = JSON.parse(evt.data)
        setRooms((state) => {
          return removeDuplicates([...state, ...data], 'id')
        })
      }
      socket.addEventListener('message', onMessage)

      return () => {
        // @ts-ignore
        socket.removeEventListener('message', onMessage)
      }
    }
  }, [socket])
  return (
    <>
      <CCard>
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
                  onChange={() => null}
                />
                <CInputGroupText>
                  <CIcon icon={cilSearch} size="lg" />
                </CInputGroupText>
              </CInputGroup>
            </div>
          </div>
        </CCardHeader>
        <CCardBody>
          {rooms?.map((r, idx) => {
            return (
              <div
                className="w-100 border-bottom row mx-auto py-3 userchat"
                style={{ height: '80px' }}
                onClick={() =>
                  navigate(`/dashboard/livechats/roomchat/${r?.id}`, { state: { roomData: r } })
                }
                key={idx}
              >
                <div className="col-1 d-flex justify-content-end align-items-center">
                  {/* <BsPersonCircle size={50} /> */}
                  <img
                    src={'https://cdn-icons-png.freepik.com/512/5045/5045878.png'}
                    alt="user-profile-pic"
                    style={{ width: 50 }}
                  />
                </div>
                <div className="col w-50 h-100" style={{ cursor: 'pointer' }}>
                  <div className="h-50  row">
                    <div className="col">
                      <p className="fw-semibold ">{r?.roomName}</p>
                    </div>
                    <div className="col">
                      <p className="text-end" style={{ fontSize: '15px' }}>
                        {moment(new Date(r?.lastMessage?.at)).format('DD/MM/YYYY, HH:mm')}
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
                      {r?.lastMessage?.from?.name}: {r?.lastMessage?.text}
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
            )
          })}
        </CCardBody>
      </CCard>
    </>
  )
}

export default LiveChat

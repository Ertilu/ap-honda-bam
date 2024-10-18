import React, { useState } from 'react'
import { CCardBody, CContainer, CCardHeader, CCard } from '@coreui/react'
import './index.scss'
import Loading from 'src/components/Loading'
import { useUtil, admin } from './index.util'
import { BsPersonCircle } from 'react-icons/bs'
import { IoMdSend } from 'react-icons/io'

const PageForms = () => {
  const {
    state: { loading, messages, roomData, message },
    event: { handleInput, sendMessage },
  } = useUtil()

  return (
    <div
      className="bg-light d-flex flex-row align-items-center"
      // style={{ marginBottom: spacing[32] }}
    >
      <Loading visible={loading} />
      <CContainer>
        <CCard>
          <CCardHeader style={{ backgroundColor: 'white' }}>
            <div className="d-flex gap-3 justify-content-start align-items-center">
              <img
                src={'https://cdn-icons-png.freepik.com/512/5045/5045878.png'}
                style={{ width: 30 }}
                alt="user-photo"
              />
              <p className="text-customer-name my-auto">{roomData?.roomName}</p>
            </div>
          </CCardHeader>

          <CCardBody className="p-0" style={{ backgroundColor: '#F8F8F9', height: '480px' }}>
            <div
              className="p-2 roomchat-body "
              id="chat-container"
              style={{ width: 'full', height: '420px' }}
            >
              {messages?.map((m, idx) => {
                if (m?.from?.id !== admin.id) {
                  return (
                    <div
                      className="d-flex gap-1 justify-content-start align-items-center mt-2"
                      key={idx}
                    >
                      <img src={m?.from?.image} style={{ width: 30 }} alt="user-photo" />
                      <div className=" box-chat-message rounded-2 border px-2 py-1">
                        <p className="text-chat-message my-auto">{m?.text}</p>
                      </div>
                    </div>
                  )
                }
                return (
                  <div
                    className="d-flex gap-1 justify-content-end align-items-center mt-2"
                    key={idx}
                  >
                    <div className="box-chat-message-admin rounded-2 border px-2 py-1">
                      <p className="text-chat-message my-auto text-white">{m?.text}</p>
                    </div>
                    <img src={m?.from?.image} style={{ width: 30 }} alt="user-photo" />
                  </div>
                )
              })}
            </div>
            <div
              className="border d-flex p-4 align-items-center gap-4"
              style={{ height: '60px', backgroundColor: 'white' }}
            >
              <input
                type="text"
                className="border rounded-1 input-text px-2"
                placeholder="Ketik Pesan...."
                style={{ height: '35px', width: '95%', backgroundColor: '#F8F8F9' }}
                onChange={handleInput}
                value={message}
                onKeyUp={(e) => {
                  var code = e.keyCode || e.which
                  if (code === 13) {
                    e.preventDefault()
                    sendMessage()
                  }
                }}
              />
              <IoMdSend size={25} className="kirim-pesan" color="#303C54" onClick={sendMessage} />
            </div>
          </CCardBody>
        </CCard>
      </CContainer>
    </div>
  )
}

export default PageForms

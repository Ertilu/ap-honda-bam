import React from 'react'
import { CCardBody, CContainer, CCardHeader, CCard } from '@coreui/react'
import './index.scss'
import Loading from 'src/components/Loading'
import { useUtil } from './index.util'
import { BsPersonCircle } from 'react-icons/bs'
import { IoMdSend } from 'react-icons/io'
import { useParams } from 'react-router-dom'

const PageForms = () => {
  const { id: roomId } = useParams()
  console.log('roomId', roomId)
  const {
    state: { isButtonDisabled, data, loading, loadingUpload, removeItems },
    event: { _submit, onCancel, onChangeText, onUploadImages },
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
              <BsPersonCircle size={30} />
              <p className="text-customer-name my-auto">Mas Hengki</p>
            </div>
          </CCardHeader>

          <CCardBody className="p-0" style={{ backgroundColor: '#F8F8F9', height: '480px' }}>
            <div className="p-2 roomchat-body " style={{ width: 'full', height: '420px' }}>
              <div className="d-flex gap-1 justify-content-start align-items-center mt-2">
                <BsPersonCircle size={30} />
                <div className=" box-chat-message rounded-2 border px-2 py-1">
                  <p className="text-chat-message my-auto">Jadi gini min</p>
                </div>
              </div>

              <div className="d-flex gap-1 justify-content-end align-items-center mt-2 ">
                <div className="box-chat-message-admin rounded-2 border px-2 py-1">
                  <p className="text-chat-message my-auto text-white">Gimana ka</p>
                </div>
                <BsPersonCircle size={30} />
              </div>
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
              />
              <IoMdSend size={25} className="kirim-pesan" color="#303C54" />
            </div>
          </CCardBody>
        </CCard>
      </CContainer>
    </div>
  )
}

export default PageForms

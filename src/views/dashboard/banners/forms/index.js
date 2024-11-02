import React, { useMemo, useRef } from 'react'
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
  CImage,
} from '@coreui/react'
import { spacing } from 'src/shared/style.const'
import './index.scss'
import Loading from 'src/components/Loading'
import { useUtil } from './index.util'
import { CDatePicker } from '@coreui/react-pro'

const PageForms = () => {
  const {
    state: { isButtonDisabled, data, loading, loadingUpload, removeItems },
    event: { _submit, onCancel, onChangeText, onUploadImages },
  } = useUtil()
  const imageUploadRef = useRef()

  const renderAsterisk = useMemo(() => <span style={{ color: 'red' }}>*</span>, [])

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
              <CFormLabel htmlFor="input-name-label">Name {renderAsterisk}</CFormLabel>
              <CFormInput
                type="text"
                id="input-name"
                placeholder="Input Name"
                onChange={(e) => onChangeText(e, 'name')}
                value={data.name}
              />

              <CFormLabel htmlFor="input-harga-label" style={{ marginTop: spacing[16] }}>
                Images
              </CFormLabel>
              <div className="d-grid">
                <CInputGroup>
                  {data?.images?.map((img, index) => {
                    return (
                      <div key={index} className="col-lg-4 col-sm-12 position-relative">
                        <CImage alt={`image-${index}`} fluid thumbnail src={img} height={'auto'} />
                        <div
                          style={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                          }}
                        >
                          <span
                            className="remove-image"
                            onClick={() => removeItems(index, 'images')}
                          >
                            &times;
                          </span>
                        </div>
                      </div>
                    )
                  })}
                  <div>
                    <CButton
                      color="primary"
                      onClick={() => imageUploadRef.current.click()}
                      className="m-2"
                      disabled={loadingUpload.images}
                    >
                      {loadingUpload.images ? 'Uploading...' : 'Upload Image'}
                    </CButton>
                  </div>
                  <input
                    type="file"
                    id="imagesFile"
                    accept="image/*"
                    onChange={(e) => onUploadImages(e, 'images')}
                    ref={imageUploadRef}
                    style={{ display: 'none' }}
                  ></input>
                </CInputGroup>
              </div>

              <CFormLabel htmlFor="input-harga-start-date" style={{ marginTop: spacing[16] }}>
                Start Date
              </CFormLabel>
              <div className="date-input-container">
                <input
                  type="datetime-local"
                  className="date-input form-control"
                  value={data?.startDate}
                  onChange={(e) => onChangeText(e, 'startDate')}
                />
              </div>

              <CFormLabel htmlFor="input-harga-start-date" style={{ marginTop: spacing[16] }}>
                End Date Date
              </CFormLabel>
              <div className="date-input-container">
                <input
                  type="datetime-local"
                  className="date-input form-control"
                  value={data?.endDate}
                  onChange={(e) => onChangeText(e, 'endDate')}
                />
              </div>
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

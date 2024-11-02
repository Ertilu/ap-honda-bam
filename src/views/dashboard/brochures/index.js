/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CButton, CImage } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import Loading from 'src/components/Loading'
import { useDebounce } from 'src/shared/utils/debounce'
import './index.scss'
import 'react-datepicker/dist/react-datepicker.css'
import { spacing } from 'src/shared/style.const'
import { ImageService } from 'src/services'
import { arrayBufferToBase64 } from 'src/shared/utils'

const Brochures = (props) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingUpload, setLoadingUpload] = useState(false)
  const brochureUploadRef = useRef()

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getData = useCallback(() => {
    ImageService.getBrochures({})
      .then((res) => {
        setLoading(false)
        setData(res?.data)
      })
      .catch(() => setLoading(false))
  }, [])

  const onChangeBrochure = useCallback(
    (e) => {
      const formData = new FormData()
      if (e?.target?.files?.length) {
        formData.append('image', e?.target?.files[0])

        const reader = new FileReader()
        reader.onload = function () {
          const arrayBuffer = this.result,
            array = new Uint8Array(arrayBuffer)

          setData({ data: array })
        }
        reader.readAsArrayBuffer(e.target.files[0])
      }
      setLoadingUpload(true)
      ImageService.changeBrochures(formData).finally(() => {
        setLoadingUpload(false)
      })
    },
    [getData],
  )
  console.log('data', data)
  return (
    <>
      <CCard>
        <Loading visible={loading} />
        <CCardHeader>
          <div>
            <div className="d-flex justify-content-between align-items-center mt-2">
              <h4>Brochures</h4>
            </div>
          </div>
          <CButton
            color="primary"
            style={{ margin: `${spacing[8]} 0` }}
            onClick={() => brochureUploadRef?.current?.click()}
            disabled={loadingUpload}
          >
            {loadingUpload ? 'Uploading...' : 'Change Brochure'}
          </CButton>
          <input
            type="file"
            id="brochuresFile"
            accept="image/*"
            onChange={onChangeBrochure}
            ref={brochureUploadRef}
            style={{ display: 'none' }}
          ></input>
        </CCardHeader>
        <CCardBody>
          <CImage src={data ? data : null} width={'100%'} alt="brochure" />
        </CCardBody>
      </CCard>
    </>
  )
}

export default Brochures

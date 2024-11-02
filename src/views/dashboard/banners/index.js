/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CButton, CImage } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import Loading from 'src/components/Loading'
import { useDebounce } from 'src/shared/utils/debounce'
import './index.scss'
import 'react-datepicker/dist/react-datepicker.css'
import { spacing } from 'src/shared/style.const'
import { ImageService } from 'src/services'
import { arrayBufferToBase64 } from 'src/shared/utils'

const Banners = (props) => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const [loadingUpload, setLoadingUpload] = useState(false)
  const [loadingLoadMore, setLoadingLoadMore] = useState(false)
  const [currentCursor, setCurrentCursor] = useState('')
  const bannerUploadRef = useRef()

  useEffect(() => {
    getData({})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getData = useCallback(({ nextCursor = '' }) => {
    setLoadingLoadMore(true)
    setLoading(true)
    setCurrentCursor(nextCursor)
    ImageService.getBanners({ nextCursor })
      .then((res) => {
        setLoading(false)
        setLoadingLoadMore(false)
        setData((prev) => {
          if (prev?.resources && res?.resources) {
            let newData = { ...prev }
            newData.resources = [...res?.resources, ...newData.resources]?.filter(
              (value, index, self) =>
                index === self.findIndex((t) => t.asset_id === value.asset_id),
            )

            return newData
          }

          return res
        })
      })
      .catch(() => {
        setLoading(false)
        setLoadingLoadMore(false)
      })
  }, [])

  const onAddBanner = useCallback(
    (e) => {
      const formData = new FormData()
      if (e?.target?.files?.length) {
        formData.append('image', e?.target?.files[0])
      }
      setLoadingUpload(true)
      ImageService.addBanner(formData).finally(() => {
        getData({ nextCursor: currentCursor })
        setLoadingUpload(false)
      })
    },
    [getData, currentCursor],
  )

  const onDeleteBanner = useCallback(
    ({ id }) => {
      ImageService.deleteBanner(id).finally(() => {
        setData((prev) => {
          if (prev?.resources) {
            let newData = { ...prev }
            newData.resources = newData.resources?.filter((r) => r?.public_id !== id)
            return newData
          }

          return prev
        })
      })
    },
    [getData, currentCursor],
  )

  const renderUploadBanner = useMemo(() => {
    return (
      <div className="col-md-4 p-2" style={{}}>
        <div style={{ width: '100%', height: '100%', cursor: 'pointer' }}>
          <div
            onClick={() => (loadingUpload ? null : bannerUploadRef.current.click())}
            className="bg-body-secondary rounded d-flex align-items-center justify-content-center"
            style={{
              width: '100%',
              height: '100%',
              cursor: loadingUpload ? 'not-allowed' : 'pointer',
            }}
            disabled={loadingUpload}
          >
            {loadingUpload ? 'Uploading...' : 'Upload Banner'}
          </div>
        </div>
        <input
          type="file"
          id="bannersFile"
          accept="image/*"
          onChange={onAddBanner}
          ref={bannerUploadRef}
          style={{ display: 'none' }}
        ></input>
      </div>
    )
  }, [bannerUploadRef, loadingUpload])

  return (
    <>
      <CCard>
        <CCardHeader>
          <div>
            <div className="d-flex justify-content-between align-items-center mt-2">
              <h4>Banners</h4>
            </div>
          </div>
        </CCardHeader>
        <CCardBody>
          <Loading visible={loading} />
          {data?.resources && data.resources?.length ? (
            <div className="conteiner">
              <div className="row">
                {data?.resources?.map((b, idx) => {
                  return (
                    <div key={b} className="d-flex col-md-4 p-2" style={{}}>
                      <CImage
                        alt={`banners`}
                        fluid
                        thumbnail
                        src={b?.secure_url}
                        width={'100%'}
                        style={{ objectFit: 'contain' }}
                      />
                      <div
                        style={{
                          position: 'relative',
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                          }}
                        >
                          <span
                            className="remove-image"
                            onClick={() => onDeleteBanner({ id: b?.public_id })}
                          >
                            &times;
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
                {data.resources.length > 0 && renderUploadBanner}

                {data?.next_cursor ? (
                  <div className="col-md-4 p-2">
                    <CButton
                      color="primary"
                      style={{ margin: `${spacing[8]} 0` }}
                      onClick={() => getData({ nextCursor: data.next_cursor })}
                      disabled={loadingLoadMore}
                    >
                      {loadingLoadMore ? 'Loading Data...' : 'Load More'}
                    </CButton>
                  </div>
                ) : null}
              </div>
            </div>
          ) : (
            renderUploadBanner
          )}
        </CCardBody>
      </CCard>
    </>
  )
}

export default Banners

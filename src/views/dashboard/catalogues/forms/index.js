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
  CInputGroupText,
  CButton,
  CFormTextarea,
  CFormSelect,
  CImage,
} from '@coreui/react'
import { spacing } from 'src/shared/style.const'
import './index.scss'
import Loading from 'src/components/Loading'
import { useUtil } from './index.util'

const PageForms = () => {
  const {
    state: { isButtonDisabled, data, loading, loadingUpload, loadingColorImage },
    event: {
      _submit,
      onCancel,
      onChangeColor,
      onChangeText,
      removeFeatureText,
      handleKeyDown,
      addColor,
      removeItems,
      onUploadImages,
      onUploadImage,
      removeItem,
      onUploadColorImages,
      onRemoveColorImage,
      onChangeType,
      addType,
    },
  } = useUtil()
  const bannerUploadRef = useRef()
  const imageUploadRef = useRef()
  const featureImageUploadRef = useRef()
  const logoUploadRef = useRef()
  const colorImageUploadRef = useRef()

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
                Price {renderAsterisk}
              </CFormLabel>
              <CInputGroup>
                <CInputGroupText>Rp</CInputGroupText>
                <CFormInput
                  type="number"
                  id="input-harga"
                  placeholder="Input Price"
                  min={1}
                  onChange={(e) => onChangeText(e, 'price')}
                  value={data.price}
                />
              </CInputGroup>

              <CFormLabel htmlFor="input-harga-label" style={{ marginTop: spacing[16] }}>
                Description {renderAsterisk}
              </CFormLabel>
              <CInputGroup>
                <CFormTextarea
                  id="description"
                  placeholder="Input Description"
                  rows={3}
                  onChange={(e) => onChangeText(e, 'description')}
                ></CFormTextarea>
              </CInputGroup>

              <CFormLabel htmlFor="input-harga-label" style={{ marginTop: spacing[16] }}>
                Category {renderAsterisk}
              </CFormLabel>
              <CInputGroup>
                <CFormSelect
                  aria-label="Select Category"
                  placeholder="Select Category"
                  options={[
                    'Select Category',
                    { label: 'Matic', value: 'matic' },
                    { label: 'Sport', value: 'sport' },
                    { label: 'Cub', value: 'cub' },
                  ]}
                  onChange={(e) =>
                    e.target.value === 'Select Category'
                      ? onChangeText({ target: { value: '' } }, 'category')
                      : onChangeText(e, 'category')
                  }
                />
              </CInputGroup>

              <CFormLabel htmlFor="input-harga-label" style={{ marginTop: spacing[16] }}>
                Colors {renderAsterisk}
              </CFormLabel>
              {data?.colors?.map((item, idx) => {
                return (
                  <CInputGroup key={idx} className="mb-2">
                    <CFormInput
                      type="text"
                      id="input-color-name"
                      placeholder="Color Name"
                      onChange={(e) => onChangeColor(e, 'name', idx)}
                      value={item.name}
                    />
                    <CFormInput
                      type="text"
                      id="input-hex"
                      placeholder="Color Hex"
                      onChange={(e) => onChangeColor(e, 'code', idx)}
                      value={item.code}
                    />
                    <CFormInput
                      type="text"
                      id="input-hex"
                      placeholder="Color Hex 2"
                      onChange={(e) => onChangeColor(e, 'code2', idx)}
                      value={item.code2}
                    />
                    <CFormInput
                      type="text"
                      id="input-hex"
                      placeholder="Color Hex 3"
                      onChange={(e) => onChangeColor(e, 'code3', idx)}
                      value={item.code3}
                    />
                    {item?.image && item?.image?.length ? (
                      <div className="col-lg-4 col-sm-12 position-relative">
                        <CImage alt={`logo}`} fluid thumbnail src={item?.image} height={'auto'} />
                        <div
                          style={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                          }}
                        >
                          <span className="remove-image" onClick={() => onRemoveColorImage(idx)}>
                            &times;
                          </span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div>
                          <CButton
                            color="primary"
                            onClick={() => colorImageUploadRef.current.click()}
                            className="m-2"
                            disabled={loadingColorImage[idx]}
                          >
                            {loadingColorImage[idx] ? 'Uploading...' : 'Upload Image'}
                          </CButton>
                        </div>
                        <input
                          type="file"
                          id="logoFile"
                          accept="image/*"
                          onChange={(e) => onUploadColorImages(e, idx)}
                          ref={colorImageUploadRef}
                          style={{ display: 'none' }}
                        ></input>
                      </>
                    )}
                    <div className="d-grid" style={{ width: '100px' }}>
                      {idx === data?.colors.length - 1 ? (
                        <CButton color="primary" onClick={addColor}>
                          Add
                        </CButton>
                      ) : (
                        <CButton color="danger" onClick={() => removeItems(idx, 'colors')}>
                          Remove
                        </CButton>
                      )}
                    </div>
                  </CInputGroup>
                )
              })}

              <CFormLabel htmlFor="input-harga-label" style={{ marginTop: spacing[16] }}>
                Logo {renderAsterisk}
              </CFormLabel>
              <div className="d-grid">
                <CInputGroup>
                  {data.logo && data.logo.length ? (
                    <div className="col-lg-4 col-sm-12 position-relative">
                      <CImage alt={`logo}`} fluid thumbnail src={data?.logo} height={'auto'} />
                      <div
                        style={{
                          position: 'absolute',
                          top: 10,
                          right: 10,
                        }}
                      >
                        <span className="remove-image" onClick={() => removeItem('logo')}>
                          &times;
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div>
                        <CButton
                          color="primary"
                          onClick={() => logoUploadRef.current.click()}
                          className="m-2"
                          disabled={loadingUpload.logo}
                        >
                          {loadingUpload.logo ? 'Uploading...' : 'Upload Logo'}
                        </CButton>
                      </div>
                      <input
                        type="file"
                        id="logoFile"
                        accept="image/*"
                        onChange={(e) => onUploadImage(e, 'logo')}
                        ref={logoUploadRef}
                        style={{ display: 'none' }}
                      ></input>
                    </>
                  )}
                </CInputGroup>
              </div>

              <CFormLabel htmlFor="input-harga-label" style={{ marginTop: spacing[16] }}>
                Banners {renderAsterisk}
              </CFormLabel>
              <div className="d-grid">
                <CInputGroup>
                  {data?.banners?.map((img, index) => {
                    return (
                      <div key={index} className="col-lg-4 col-sm-12 position-relative">
                        <CImage alt={`banner-${index}`} fluid thumbnail src={img} height={'auto'} />
                        <div
                          style={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                          }}
                        >
                          <span
                            className="remove-image"
                            onClick={() => removeItems(index, 'banners')}
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
                      onClick={() => bannerUploadRef.current.click()}
                      className="m-2"
                      disabled={loadingUpload.banners}
                    >
                      {loadingUpload.banners ? 'Uploading...' : 'Upload Banner'}
                    </CButton>
                  </div>
                  <input
                    type="file"
                    id="bannersFile"
                    accept="image/*"
                    onChange={(e) => onUploadImages(e, 'banners')}
                    ref={bannerUploadRef}
                    style={{ display: 'none' }}
                  ></input>
                </CInputGroup>
              </div>

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

              <div>
                <CFormLabel htmlFor="input-harga-label" style={{ marginTop: spacing[16] }}>
                  Feature Text
                </CFormLabel>
                <CInputGroup>
                  <div className="tags-input-container">
                    {data?.featureTexts?.map((f, index) => (
                      <div className="tag-item" key={index}>
                        <span className="text">{f}</span>
                        <span className="close" onClick={() => removeFeatureText(index)}>
                          &times;
                        </span>
                      </div>
                    ))}
                    <input
                      type="text"
                      className="tags-input form-control"
                      placeholder="Input Feature Texts"
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                </CInputGroup>
              </div>

              <CFormLabel htmlFor="input-harga-label" style={{ marginTop: spacing[16] }}>
                Feature Images {renderAsterisk}
              </CFormLabel>
              <div className="d-grid">
                <CInputGroup>
                  {data?.featureImages?.map((img, index) => {
                    return (
                      <div key={index} className="col-lg-4 col-sm-12 position-relative">
                        <CImage
                          alt={`featureImage-${index}`}
                          fluid
                          thumbnail
                          src={img}
                          height={'auto'}
                        />
                        <div
                          style={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                          }}
                        >
                          <span
                            className="remove-image"
                            onClick={() => removeItems(index, 'featureImages')}
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
                      onClick={() => featureImageUploadRef.current.click()}
                      className="m-2"
                      disabled={loadingUpload.featureImages}
                    >
                      {loadingUpload.featureImages ? 'Uploading...' : 'Upload Feature Image'}
                    </CButton>
                  </div>
                  <input
                    type="file"
                    id="featureImagesFile"
                    accept="image/*"
                    onChange={(e) => onUploadImages(e, 'featureImages')}
                    ref={featureImageUploadRef}
                    style={{ display: 'none' }}
                  ></input>
                </CInputGroup>
              </div>

              <CFormLabel htmlFor="input-harga-label" style={{ marginTop: spacing[16] }}>
                Types {renderAsterisk}
              </CFormLabel>
              {data?.types?.map((item, idx) => {
                return (
                  <CInputGroup key={idx} className="mb-2">
                    <CFormInput
                      type="text"
                      id="input-Type-name"
                      placeholder="Type Name"
                      onChange={(e) => onChangeType(e, 'name', idx)}
                      value={item.name}
                    />

                    <CInputGroupText>Rp</CInputGroupText>
                    <CFormInput
                      type="text"
                      id="input-Type-Price"
                      placeholder="Type Price"
                      onChange={(e) => onChangeType(e, 'price', idx)}
                      value={item.price}
                    />
                    <div className="d-grid" style={{ width: '100px' }}>
                      {idx === data?.types.length - 1 ? (
                        <CButton color="primary" onClick={addType}>
                          Add
                        </CButton>
                      ) : (
                        <CButton color="danger" onClick={() => removeItems(idx, 'types')}>
                          Remove
                        </CButton>
                      )}
                    </div>
                  </CInputGroup>
                )
              })}
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

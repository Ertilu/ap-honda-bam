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
      onChangeNestedText,
      onChangeText,
      removeFeatureText,
      handleKeyDown,
      addColor,
      removeItems,
      onUploadImages,
      onUploadImage,
      removeItem,
      onUploadColorImages,
      onRemoveNestedImage,
      onChangeType,
      addType,
      onUploadFeatureImages,
      addFeatures,
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
              <CFormLabel htmlFor="input-name-label">Nama Produk {renderAsterisk}</CFormLabel>
              <CFormInput
                type="text"
                id="input-name"
                placeholder="Masukan Nama Produk"
                onChange={(e) => onChangeText(e, 'name')}
                value={data.name}
              />

              <CFormLabel htmlFor="input-harga-label" style={{ marginTop: spacing[16] }}>
                Gambar Thumbnail {renderAsterisk}
              </CFormLabel>
              <div className="d-grid">
                <CInputGroup>
                  {data.images && data.images.length ? (
                    <div className="col-lg-4 col-sm-12 position-relative">
                      <CImage alt={`images`} fluid thumbnail src={data?.images} height={'auto'} />
                      <div
                        style={{
                          position: 'absolute',
                          top: 10,
                          right: 10,
                        }}
                      >
                        <span className="remove-image" onClick={() => removeItem('images')}>
                          &times;
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div>
                        <div
                          onClick={() => imageUploadRef.current.click()}
                          className="m-2 bg-body-secondary rounded d-flex align-items-center justify-content-center"
                          style={{ width: '10em', height: '10em', cursor: 'pointer' }}
                          disabled={loadingUpload.images}
                        >
                          {loadingUpload.images ? 'Uploading...' : '+ Upload Gambar'}
                        </div>
                      </div>
                      <input
                        type="file"
                        id="imagesFile"
                        accept="image/*"
                        onChange={(e) => onUploadImages(e, 'images')}
                        ref={imageUploadRef}
                        style={{ display: 'none' }}
                      ></input>
                    </>
                  )}
                </CInputGroup>
              </div>

              <CFormLabel htmlFor="input-harga-label" style={{ marginTop: spacing[16] }}>
                Harga {renderAsterisk}
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
                Tipe {renderAsterisk}
              </CFormLabel>
              {data?.types?.map((item, idx) => {
                return (
                  <CInputGroup
                    key={idx}
                    className="mb-2 row row-cols-1 row-cols-md-3 mx-auto py-3 border rounded gap-2 "
                  >
                    <div className="col-lg-10 d-flex flex-column w-sm-100 gap-2">
                      <CFormInput
                        type="text"
                        id="input-Type-name"
                        placeholder="Nama Tipe"
                        onChange={(e) => onChangeType(e, 'name', idx)}
                        value={item.name}
                      />

                      <CInputGroup>
                        <CInputGroupText>Rp</CInputGroupText>
                        <CFormInput
                          type="text"
                          id="input-Type-Price"
                          placeholder="Harga"
                          onChange={(e) => onChangeType(e, 'price', idx)}
                          value={item.price}
                        />
                      </CInputGroup>
                    </div>
                    <div className="d-grid col-1" style={{ width: '100px' }}>
                      {idx === data?.types.length - 1 ? (
                        <CButton
                          color="primary"
                          onClick={addType}
                          style={{ height: '40px', width: '100px' }}
                        >
                          Add
                        </CButton>
                      ) : (
                        <CButton
                          color="danger"
                          style={{ height: '40px', width: '100px' }}
                          onClick={() => removeItems(idx, 'types')}
                        >
                          hapus
                        </CButton>
                      )}
                    </div>
                  </CInputGroup>
                )
              })}

              <CFormLabel htmlFor="input-harga-label" style={{ marginTop: spacing[16] }}>
                Deskripsi {renderAsterisk}
              </CFormLabel>
              <CInputGroup>
                <CFormTextarea
                  id="description"
                  placeholder="Masukan Deskripsi"
                  rows={3}
                  onChange={(e) => onChangeText(e, 'description')}
                ></CFormTextarea>
              </CInputGroup>

              <CFormLabel htmlFor="input-harga-label" style={{ marginTop: spacing[16] }}>
                Kategori {renderAsterisk}
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
                        <div
                          onClick={() => logoUploadRef.current.click()}
                          className="m-2 bg-body-secondary rounded d-flex align-items-center justify-content-center"
                          style={{ width: '15em', height: '7em', cursor: 'pointer' }}
                          disabled={loadingUpload.logo}
                        >
                          {loadingUpload.logo ? 'Uploading...' : 'Upload Logo'}
                        </div>
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
                  {data.banners && data.banners.length ? (
                    <div className="col-lg-4 col-sm-12 position-relative">
                      <CImage alt={`banners`} fluid thumbnail src={data?.banners} height={'auto'} />
                      <div
                        style={{
                          position: 'absolute',
                          top: 10,
                          right: 10,
                        }}
                      >
                        <span className="remove-image" onClick={() => removeItem('banners')}>
                          &times;
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div>
                        <div
                          onClick={() => bannerUploadRef.current.click()}
                          className="m-2 bg-body-secondary rounded d-flex align-items-center justify-content-center"
                          style={{ width: '15em', height: '7em', cursor: 'pointer' }}
                          disabled={loadingUpload.banners}
                        >
                          {loadingUpload.banners ? 'Uploading...' : 'Upload Banner'}
                        </div>
                      </div>
                      <input
                        type="file"
                        id="bannersFile"
                        accept="image/*"
                        onChange={(e) => onUploadImages(e, 'banners')}
                        ref={bannerUploadRef}
                        style={{ display: 'none' }}
                      ></input>
                    </>
                  )}
                </CInputGroup>
              </div>

              <CFormLabel htmlFor="input-harga-label" style={{ marginTop: spacing[16] }}>
                Colors {renderAsterisk}
              </CFormLabel>
              {data?.colors?.map((item, idx) => {
                return (
                  <CInputGroup
                    key={idx}
                    className="mb-2 flex flex-column mx-auto p-3 border rounded gap-2 h-100"
                  >
                    <CFormInput
                      type="text"
                      id="input-color-name"
                      placeholder="Color Name"
                      style={{ width: '100%' }}
                      onChange={(e) => onChangeNestedText(e, 'name', idx, 'colors')}
                      value={item.name}
                    />
                    <div className="row row-cols-2 row-cols-md-3 gap-2" style={{ height: 'auto' }}>
                      {item?.image && item?.image?.length ? (
                        <div className="col-lg-2">
                          <CImage alt={`logo}`} fluid thumbnail src={item?.image} height={'auto'} />
                          <div
                            style={{
                              position: 'absolute',
                              top: 10,
                              right: 10,
                            }}
                          >
                            <span
                              className="remove-image"
                              onClick={() => onRemoveNestedImage(idx, 'colors')}
                            >
                              &times;
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="col-lg-2">
                          <div>
                            <CButton
                              onClick={() => colorImageUploadRef.current.click()}
                              className="m-2 bg-body-secondary rounded d-flex align-items-center justify-content-center"
                              style={{ width: '10em', height: '10em', cursor: 'pointer' }}
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
                        </div>
                      )}
                      <div className="d-flex flex-column gap-2 col-lg-8 col-12">
                        <CFormInput
                          type="text"
                          id="input-hex"
                          placeholder="Color Hex Cth: #ffffff"
                          onChange={(e) => onChangeNestedText(e, 'code', idx, 'colors')}
                          value={item.code}
                        />
                        <CFormInput
                          type="text"
                          id="input-hex"
                          placeholder="Color Hex Cth: #ffffff"
                          onChange={(e) => onChangeNestedText(e, 'code2', idx, 'colors')}
                          value={item.code2}
                        />
                        <CFormInput
                          type="text"
                          id="input-hex"
                          placeholder="Color Hex Cth: #ffffff"
                          onChange={(e) => onChangeNestedText(e, 'code3', idx, 'colors')}
                          value={item.code3}
                        />
                      </div>

                      <div className="d-grid col-auto" style={{ width: '100px', height: 'auto' }}>
                        {idx === data?.colors.length - 1 ? (
                          <CButton
                            color="primary"
                            style={{ width: '100px', height: '40px' }}
                            onClick={addColor}
                          >
                            Simpan
                          </CButton>
                        ) : (
                          <CButton
                            color="danger"
                            style={{ width: '100px', height: '40px' }}
                            onClick={() => removeItems(idx, 'colors')}
                          >
                            Hapus
                          </CButton>
                        )}
                      </div>
                    </div>
                  </CInputGroup>
                )
              })}

              {/* <div>
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
              </div> */}

              <CFormLabel htmlFor="input-harga-label" style={{ marginTop: spacing[16] }}>
                Fitur {renderAsterisk}
              </CFormLabel>
              {data?.features?.map((item, idx) => {
                return (
                  <CInputGroup
                    key={idx}
                    className="mb-2 row row-cols-3 row-cols-md-2 gap-2 border rounded mx-auto p-3"
                  >
                    {item?.image && item?.image?.length ? (
                      <div className="col-lg-2">
                        <CImage alt={`logo}`} fluid thumbnail src={item?.image} height={'auto'} />
                        <div
                          style={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                          }}
                        >
                          <span
                            className="remove-image"
                            onClick={() => onRemoveNestedImage(idx, 'features')}
                          >
                            &times;
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="col-lg-2">
                        <div>
                          <CButton
                            onClick={() => featureImageUploadRef.current.click()}
                            className="m-2 bg-body-secondary rounded d-flex align-items-center justify-content-center"
                            style={{ width: '10em', height: '10em', cursor: 'pointer' }}
                            disabled={loadingColorImage[idx]}
                          >
                            {loadingColorImage[idx] ? 'Uploading...' : 'Upload Image'}
                          </CButton>
                        </div>
                        <input
                          type="file"
                          id="logoFile"
                          accept="image/*"
                          onChange={(e) => onUploadFeatureImages(e, idx)}
                          ref={featureImageUploadRef}
                          style={{ display: 'none' }}
                        ></input>
                      </div>
                    )}
                    <div className="d-flex flex-column gap-2 col-lg-8 col-12">
                      <CFormInput
                        type="text"
                        id="input-feature-title"
                        placeholder="Masukan Nama Fitur"
                        onChange={(e) => onChangeNestedText(e, 'title', idx, 'features')}
                        value={item.title}
                      />
                      <CFormInput
                        type="text"
                        id="input-Text"
                        placeholder="Masukan Isi Fitur"
                        onChange={(e) => onChangeNestedText(e, 'text', idx, 'features')}
                        value={item.text}
                      />
                    </div>
                    <div className="d-grid col-2" style={{ width: '100px' }}>
                      {idx === data?.colors.length - 1 ? (
                        <CButton
                          color="primary"
                          onClick={addFeatures}
                          style={{ width: '100px', height: '40px' }}
                        >
                          Add
                        </CButton>
                      ) : (
                        <CButton
                          color="danger"
                          onClick={() => removeItems(idx, 'features')}
                          style={{ width: '100px', height: '40px' }}
                        >
                          Hapus
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

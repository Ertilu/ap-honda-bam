import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import PromoService from 'src/services/promo.service'
import { RESET_PROMO_FORM } from 'src/actionType'
import { ImageService } from 'src/services'
import * as moment from 'moment'
import { toLocalISOString } from 'src/shared/utils'

export const useUtil = () => {
  const navigate = useNavigate()
  const promoData = useSelector((state) => {
    return Object.assign({}, state.promoData)
  })
  const [formMode, setFormMode] = useState('add')
  const location = useLocation()
  const dispatch = useDispatch()
  const [data, setData] = useState(promoData)
  const [loading, setLoading] = useState(false)
  const [loadingUpload, setLoadingUpload] = useState({
    banners: false,
    images: false,
    featureImages: false,
    logo: false,
  })
  const [loadingColorImage, setLoadingColorImage] = useState({})

  const _submit = useCallback(async () => {
    let result
    setLoading(true)
    if (formMode === 'add') {
      result = await PromoService.create({
        ...data,
        startDate: moment(data?.startDate).toDate(),
        endDate: moment(data?.endDate).toDate(),
        content: encodeURIComponent(data?.content),
      })
    } else if (formMode === 'edit') {
      const payloadEdit = {
        ...data,
        startDate: moment(data?.startDate).toDate(),
        endDate: moment(data?.endDate).toDate(),
        content: encodeURIComponent(data?.content),
      }
      delete payloadEdit.id
      delete payloadEdit.createdAt
      delete payloadEdit.updatedAt
      result = await PromoService.update(data?.id, payloadEdit)
    }
    if (result?.id) {
      navigate(-1)
    }
    setLoading(false)
    dispatch({ type: RESET_PROMO_FORM })
  }, [data, navigate, formMode, dispatch])

  const onChangeText = useCallback(({ target: { value } }, propertyName) => {
    setData((prev) => ({
      ...prev,
      [propertyName]: value,
    }))
  }, [])

  const onCancel = useCallback(() => {
    navigate('/dashboard/promos')
    dispatch({ type: RESET_PROMO_FORM })
  }, [navigate, dispatch])

  const isButtonDisabled = useMemo(
    () =>
      data?.name === '' ||
      !data.images?.length ||
      data?.startDate === '' ||
      data?.endDate === '' ||
      data?.content === '' ||
      loading,
    [data, loading],
  )

  const onUploadImages = useCallback(async (e, fieldName) => {
    const formData = new FormData()
    if (e?.target?.files?.length) {
      formData.append('image', e?.target?.files[0])
    }
    setLoadingUpload((prev) => ({
      ...prev,
      [fieldName]: true,
    }))
    const result = await ImageService.upload(formData)

    setData((prev) => {
      const newData = {
        ...prev,
      }
      newData[fieldName].push(result.image.url)
      return newData
    })
    setLoadingUpload((prev) => ({
      ...prev,
      [fieldName]: false,
    }))

    e.target.value = ''
  }, [])

  const removeItem = useCallback((fieldName) => {
    setData((prev) => {
      const newData = {
        ...prev,
      }
      newData[fieldName] = ''
      return newData
    })
  }, [])

  const removeItems = useCallback((index, fieldName) => {
    setData((prev) => {
      const newData = {
        ...prev,
      }
      newData[fieldName] = newData[fieldName].filter((el, i) => i !== index)
      return newData
    })
  }, [])

  useEffect(() => {
    if (location.state?.id) {
      setFormMode('edit')
      setLoading(true)
      PromoService.getDetail(location.state.id)
        ?.then((res) => {
          setData((prev) => {
            return {
              ...prev,
              ...res,
              startDate: toLocalISOString(new Date(res?.startDate)),
              endDate: toLocalISOString(new Date(res?.endDate)),
              content: decodeURIComponent(res?.content),
            }
          })
        })
        .catch((err) => alert(err?.message))
        .finally(() => setLoading(false))
    }
  }, [location.state])
  console.log('data', data)

  return {
    state: {
      isButtonDisabled,
      loading,
      data,
      loadingUpload,
      loadingColorImage,
    },
    event: {
      _submit,
      onChangeText,
      onCancel,
      setLoading,
      setData,
      removeItem,
      removeItems,
      onUploadImages,
    },
  }
}

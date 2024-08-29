import { useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CatalogueService from 'src/services/catalogue.service'
import { RESET_CATALOGUE_FORM } from 'src/actionType'
import { ImageService } from 'src/services'

export const useUtil = () => {
  const navigate = useNavigate()
  const catalogueData = useSelector((state) => state.catalogueData)
  const formMode = useSelector((state) => state.formMode)
  const dispatch = useDispatch()
  const [data, setData] = useState(catalogueData)
  const [loading, setLoading] = useState(false)
  const [loadingUpload, setLoadingUpload] = useState({
    banners: false,
    images: false,
    featureImages: false,
    logo: false,
  })

  const _submit = useCallback(async () => {
    let result
    setLoading(true)
    if (formMode === 'add') {
      result = await CatalogueService.create({
        ...data,
        price: parseInt(data.price, 10),
      })
    } else if (formMode === 'edit') {
      const payloadEdit = {
        ...data,
        price: parseInt(data.price, 10),
      }
      delete payloadEdit?.id
      delete payloadEdit?.remaining
      result = await CatalogueService.update(data?.id, payloadEdit)
    }
    if (result?.id) {
      navigate(-1)
    }
    setLoading(false)
    dispatch({ type: RESET_CATALOGUE_FORM })
  }, [data, navigate, formMode, dispatch])

  const onChangeText = useCallback(({ target: { value } }, propertyName) => {
    setData((prev) => ({
      ...prev,
      [propertyName]: value,
    }))
  }, [])

  const onCancel = useCallback(() => {
    navigate('/')
    dispatch({ type: RESET_CATALOGUE_FORM })
  }, [navigate, dispatch])
  console.log('data', data)
  const isButtonDisabled = useMemo(
    () =>
      data?.name === '' ||
      data?.price < 1 ||
      data.colors[0].name === '' ||
      data.colors[0].code === '' ||
      data.description === '' ||
      !data.featureImages?.length ||
      !data.images?.length ||
      !data.banners?.length ||
      data?.type === '' ||
      data?.logo === '' ||
      loading,
    [data, loading],
  )

  const handleKeyDown = useCallback((e) => {
    // If user did not press enter key, return
    if (e.key !== 'Enter') return
    // Get the value of the input
    const value = e.target.value
    // If the value is empty, return
    if (!value.trim()) return
    // Add the value to the tags array
    setData((prev) => {
      const newData = { ...prev }
      const newFeatureTexts = [...prev?.featureTexts]
      newFeatureTexts.push(value)
      newData.featureTexts = newFeatureTexts

      return newData
    })
    // Clear the input
    e.target.value = ''
  }, [])

  const removeFeatureText = useCallback((index) => {
    setData((prev) => {
      const newData = { ...prev }
      const newFeatureTexts = [...prev?.featureTexts].filter((el, i) => i !== index)
      newData.featureTexts = newFeatureTexts

      return newData
    })
  }, [])

  const onChangeColor = useCallback(({ target: { value } }, propertyName, index) => {
    setData((prev) => {
      const newData = {
        ...prev,
      }
      newData.colors[index][propertyName] = value
      return newData
    })
  }, [])

  const addColor = useCallback(() => {
    setData((prev) => {
      const newData = {
        ...prev,
      }
      newData.colors.push({
        name: '',
        code: '',
      })
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

  const onUploadImage = useCallback(async (e, fieldName) => {
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
      newData[fieldName] = result.image.url
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

  return {
    state: {
      isButtonDisabled,
      loading,
      data,
      loadingUpload,
    },
    event: {
      _submit,
      onChangeText,
      onCancel,
      removeFeatureText,
      onChangeColor,
      handleKeyDown,
      setLoading,
      setData,
      addColor,
      removeItems,
      onUploadImages,
      onUploadImage,
      removeItem,
    },
  }
}

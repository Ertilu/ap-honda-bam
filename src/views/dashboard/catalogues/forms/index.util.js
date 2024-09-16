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
  const [loadingColorImage, setLoadingColorImage] = useState({})
  const [loadingFeatureImage, setLoadingFeatureImage] = useState({})

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

  const isButtonDisabled = useMemo(
    () =>
      data?.name === '' ||
      parseInt(data?.price) < 1 ||
      data?.colors[0].name === '' ||
      data?.colors[0].code === '' ||
      data?.description === '' ||
      !data.banners?.length ||
      data?.types[0].name === '' ||
      data?.types[0].price === '' ||
      data?.features[0].name === '' ||
      data?.features[0].text === '' ||
      data?.features[0].image === '' ||
      data?.category === '' ||
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

  const onChangeNestedText = useCallback(
    ({ target: { value } }, propertyName, index, parentKey) => {
      setData((prev) => {
        const newData = {
          ...prev,
        }
        newData[parentKey][index][propertyName] = value
        return newData
      })
    },
    [],
  )

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

  const addFeatures = useCallback(() => {
    setData((prev) => {
      const newData = {
        ...prev,
      }
      newData.features.push({
        title: '',
        text: '',
        image: '',
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

  const onUploadColorImages = useCallback(async (e, idx) => {
    const formData = new FormData()
    if (e?.target?.files?.length) {
      formData.append('image', e?.target?.files[0])
    }
    setLoadingColorImage((prev) => {
      const loading = { ...prev, [idx]: true }
      return loading
    })
    const result = await ImageService.upload(formData)

    setData((prev) => {
      const newData = {
        ...prev,
      }

      if (newData.colors[idx]) {
        newData.colors[idx].image = result.image.url
      }

      return newData
    })
    setLoadingColorImage((prev) => {
      const loading = { ...prev, [idx]: false }
      return loading
    })

    e.target.value = ''
  }, [])

  const onRemoveNestedImage = useCallback((idx, key) => {
    setData((prev) => {
      const newData = {
        ...prev,
      }
      newData[key][idx].image = ''
      return newData
    })
  }, [])

  const onChangeType = useCallback(({ target: { value } }, propertyName, index) => {
    setData((prev) => {
      const newData = {
        ...prev,
      }
      newData.types[index][propertyName] = value
      return newData
    })
  }, [])

  const addType = useCallback(() => {
    setData((prev) => {
      const newData = {
        ...prev,
      }
      newData.types.push({
        name: '',
        price: '',
      })
      return newData
    })
  }, [])

  const onUploadFeatureImages = useCallback(async (e, idx) => {
    const formData = new FormData()
    if (e?.target?.files?.length) {
      formData.append('image', e?.target?.files[0])
    }
    setLoadingFeatureImage((prev) => {
      const loading = { ...prev, [idx]: true }
      return loading
    })
    const result = await ImageService.upload(formData)

    setData((prev) => {
      const newData = {
        ...prev,
      }

      if (newData.features[idx]) {
        newData.features[idx].image = result.image.url
      }

      return newData
    })
    setLoadingFeatureImage((prev) => {
      const loading = { ...prev, [idx]: false }
      return loading
    })

    e.target.value = ''
  }, [])

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
      removeFeatureText,
      onChangeNestedText,
      handleKeyDown,
      setLoading,
      setData,
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
  }
}

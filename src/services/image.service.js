import api from './api'

class ImageService {
  upload(data) {
    return api
      .post(`/v1/images`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => res?.data)
      .catch((err) => alert(err?.response?.data?.message || err?.data?.message || err?.message))
  }

  getBrochures({}) {
    return api
      .get(`/v1/images/brochure`, { params: {} })
      .then((res) => res?.data)
      .catch((err) => alert(err?.response?.data?.message || err?.data?.message || err?.message))
  }

  changeBrochures(data) {
    return api
      .post(`/v1/images/brochure`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => res?.data)
      .catch((err) => alert(err?.response?.data?.message || err?.data?.message || err?.message))
  }

  getBanners({ nextCursor }) {
    return api
      .get(`/v1/images/banners`, { params: { nextCursor } })
      .then((res) => res?.data)
      .catch((err) => alert(err?.response?.data?.message || err?.data?.message || err?.message))
  }

  addBanner(data) {
    return api
      .post(`/v1/images/banners`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => res?.data)
      .catch((err) => alert(err?.response?.data?.message || err?.data?.message || err?.message))
  }

  deleteBanner(id) {
    return api
      .delete(`/v1/images/banners/${encodeURIComponent(id)}`)
      .then((res) => res?.data)
      .catch((err) => alert(err?.response?.data?.message || err?.data?.message || err?.message))
  }
}

const Service = new ImageService()
export default Service

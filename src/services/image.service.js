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
}

const Service = new ImageService()
export default Service

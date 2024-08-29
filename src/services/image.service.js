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
}

const Service = new ImageService()
export default Service

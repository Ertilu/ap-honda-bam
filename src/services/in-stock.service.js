import api from './api'

class InStockService {
  getAllData({ search }) {
    return api
      .get(`/v1/in-stock?search=${search}`)
      .then((res) => res?.data)
      .catch((err) => alert(err?.response?.data?.message || err?.data?.message || err?.message))
  }

  getDetail(id) {
    return api
      .get(`/v1/in-stock/${id}`)
      .then((res) => res?.data)
      .catch((err) => alert(err?.response?.data?.message || err?.data?.message || err?.message))
  }

  create(data) {
    return api
      .post('/v1/in-stock', data)
      .then((res) => res?.data)
      .catch((err) => alert(err?.response?.data?.message || err?.data?.message || err?.message))
  }

  update(id, data) {
    return api
      .patch(`/v1/in-stock/${id}`, data)
      .then((res) => res?.data)
      .catch((err) => alert(err?.response?.data?.message || err?.data?.message || err?.message))
  }

  delete(id, data) {
    return api
      .delete(`/v1/in-stock/${id}`)
      .then((res) => res?.data)
      .catch((err) => alert(err?.response?.data?.message || err?.data?.message || err?.message))
  }
}

const Service = new InStockService()
export default Service

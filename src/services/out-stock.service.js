import api from './api'

class OutStockService {
  getAllData({ search }) {
    return api
      .get(`/v1/out-stock?search=${search}`)
      .then((res) => res?.data)
      .catch((err) => alert(err?.response?.data?.message || err?.data?.message || err?.message))
  }

  getDetail(id) {
    return api
      .get(`/v1/out-stock/${id}`)
      .then((res) => res?.data)
      .catch((err) => alert(err?.response?.data?.message || err?.data?.message || err?.message))
  }

  create(data) {
    return api
      .post('/v1/out-stock', data)
      .then((res) => res?.data)
      .catch((err) => alert(err?.response?.data?.message || err?.data?.message || err?.message))
  }

  update(id, data) {
    return api
      .patch(`/v1/out-stock/${id}`, data)
      .then((res) => res?.data)
      .catch((err) => alert(err?.response?.data?.message || err?.data?.message || err?.message))
  }

  delete(id, data) {
    return api
      .delete(`/v1/out-stock/${id}`)
      .then((res) => res?.data)
      .catch((err) => alert(err?.response?.data?.message || err?.data?.message || err?.message))
  }
}

const Service = new OutStockService()
export default Service

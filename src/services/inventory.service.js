import api from './api'

class InventoryService {
  getAllData({ search = '', filterStockYear = '', filterStockMonth }) {
    return api
      .get(`/v1/inventory`, { params: { search, filterStockYear, filterStockMonth } })
      .then((res) => res?.data)
      .catch((err) => alert(err?.response?.data?.message || err?.data?.message || err?.message))
  }

  getDetail(id) {
    return api
      .get(`/v1/inventory/${id}`)
      .then((res) => res?.data)
      .catch((err) => alert(err?.response?.data?.message || err?.data?.message || err?.message))
  }

  create(data) {
    return api
      .post('/v1/inventory', data)
      .then((res) => res?.data)
      .catch((err) => alert(err?.response?.data?.message || err?.data?.message || err?.message))
  }

  update(id, data) {
    return api
      .patch(`/v1/inventory/${id}`, data)
      .then((res) => res?.data)
      .catch((err) => alert(err?.response?.data?.message || err?.data?.message || err?.message))
  }

  delete(id, data) {
    return api
      .delete(`/v1/inventory/${id}`)
      .then((res) => res?.data)
      .catch((err) => alert(err?.response?.data?.message || err?.data?.message || err?.message))
  }
}

const Service = new InventoryService()
export default Service

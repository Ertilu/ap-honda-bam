import api from './api'

class PromosService {
  getAllData({ search = '' }) {
    return api
      .get(`/v1/promos`, { params: { search } })
      .then((res) => res?.data)
      .catch((err) => alert(err?.response?.data?.message || err?.data?.message || err?.message))
  }

  getDetail(id) {
    return api
      .get(`/v1/promos/${id}`)
      .then((res) => res?.data)
      .catch((err) => alert(err?.response?.data?.message || err?.data?.message || err?.message))
  }

  create(data) {
    return api
      .post('/v1/promos', data)
      .then((res) => res?.data)
      .catch((err) => alert(err?.response?.data?.message || err?.data?.message || err?.message))
  }

  update(id, data) {
    return api
      .patch(`/v1/promos/${id}`, data)
      .then((res) => res?.data)
      .catch((err) => alert(err?.response?.data?.message || err?.data?.message || err?.message))
  }

  delete(id, data) {
    return api
      .delete(`/v1/promos/${id}`)
      .then((res) => res?.data)
      .catch((err) => alert(err?.response?.data?.message || err?.data?.message || err?.message))
  }
}

const Service = new PromosService()
export default Service

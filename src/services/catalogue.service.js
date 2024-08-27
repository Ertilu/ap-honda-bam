import api from './api'

class CatalogueService {
  getAllData({ search = '' }) {
    return api
      .get(`/v1/catalogues`, { params: { search } })
      .then((res) => res?.data)
      .catch((err) => alert(err?.response?.data?.message || err?.data?.message || err?.message))
  }

  getDetail(id) {
    return api
      .get(`/v1/catalogues/${id}`)
      .then((res) => res?.data)
      .catch((err) => alert(err?.response?.data?.message || err?.data?.message || err?.message))
  }

  create(data) {
    return api
      .post('/v1/catalogues', data)
      .then((res) => res?.data)
      .catch((err) => alert(err?.response?.data?.message || err?.data?.message || err?.message))
  }

  update(id, data) {
    return api
      .patch(`/v1/catalogues/${id}`, data)
      .then((res) => res?.data)
      .catch((err) => alert(err?.response?.data?.message || err?.data?.message || err?.message))
  }

  delete(id, data) {
    return api
      .delete(`/v1/catalogues/${id}`)
      .then((res) => res?.data)
      .catch((err) => alert(err?.response?.data?.message || err?.data?.message || err?.message))
  }
}

const Service = new CatalogueService()
export default Service

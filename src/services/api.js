import axios from 'axios'
import TokenService from './token.service'
import AuthService from './auth.service'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken()
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token // for Spring Boot back-end
      // config.headers['x-access-token'] = token // for Node.js Express back-end
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (res) => {
    return res
  },
  async (err) => {
    const counter = localStorage.getItem('counter-refresh')
    const originalConfig = err.config

    if (parseInt(counter, 10) > 10) {
      localStorage.setItem('counter-refresh', 0)
      AuthService.logout()
      window.location.reload()
    }

    if (originalConfig.url !== '/v1/auth/login' && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true

        localStorage.setItem('counter-refresh', (parseInt(counter || 0, 10) || 0) + 1)
        try {
          const rs = await instance.post('/v1/auth/refresh-tokens', {
            refreshToken: TokenService.getLocalRefreshToken(),
          })

          const { access, refresh } = rs.data
          TokenService.updateLocalAccessToken(access, refresh)

          return instance(originalConfig)
        } catch (_error) {
          return Promise.reject(_error)
        }
      }
    }

    return Promise.reject(err)
  },
)

export default instance

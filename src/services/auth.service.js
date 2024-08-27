import api from './api'
import TokenService from './token.service'

class AuthService {
  login(email, password) {
    return api
      .post('/v1/auth/login', {
        email,
        password,
      })
      .then((response) => {
        if (response.data) {
          TokenService.setUser(response.data)
        }

        return response.data
      })
      .catch((err) => {
        alert(err?.response?.data?.message || err?.data?.message || err?.message)
      })
  }

  logout() {
    const refreshToken = TokenService.getLocalRefreshToken()
    api.post('v1/auth/logout', {
      refreshToken: refreshToken?.token,
    })
    TokenService.removeUser()
  }

  register(username, email, password) {
    return api.post('/auth/signup', {
      username,
      email,
      password,
    })
  }

  getCurrentUser() {
    return TokenService.getUser()
  }
}

const Service = new AuthService()
export default Service

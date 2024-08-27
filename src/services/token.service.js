class TokenService {
  getLocalRefreshToken() {
    const tokens = JSON.parse(localStorage.getItem('tokens'))
    return tokens?.refresh?.token
  }

  getLocalAccessToken() {
    const tokens = JSON.parse(localStorage.getItem('tokens'))
    return tokens?.access?.token
  }

  updateLocalAccessToken(access, refresh) {
    let tokens = JSON.parse(localStorage.getItem('tokens'))
    tokens.access = access
    tokens.refresh = refresh
    localStorage.setItem('tokens', JSON.stringify(tokens))
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'))
  }

  setUser({ user, tokens }) {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('tokens', JSON.stringify(tokens))
  }

  removeUser() {
    localStorage.removeItem('user')
  }
}

const Service = new TokenService()
export default Service

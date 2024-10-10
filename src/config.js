export const PARTYKIT_HOST = process.env.REACT_APP_PUBLIC_PARTYKIT_HOST

export const PARTYKIT_PROTOCOL =
  PARTYKIT_HOST?.startsWith('localhost') || PARTYKIT_HOST?.startsWith('127.0.0.1')
    ? 'http'
    : 'https'

export const PARTYKIT_URL = `${PARTYKIT_PROTOCOL}://${PARTYKIT_HOST}`

export const SINGLETON_ROOM_ID = 'list'

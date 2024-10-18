import usePartySocket from 'partysocket/react'
import { useCallback, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { PARTYKIT_HOST, PARTYKIT_URL } from 'src/config'

const identify = async (socket, user, roomId) => {
  const splitUrl = socket.url.split('?_pk=')
  const pk = splitUrl[splitUrl.length - 1]

  // the ./auth route will authenticate the connection to the partykit room
  const url = `${PARTYKIT_URL}/parties/chatroom/${roomId}/auth?_pk=${pk}`
  const req = await fetch(url, { method: 'POST', body: JSON.stringify(user) })

  if (!req.ok) {
    const res = await req.text()
    console.error('Failed to authenticate connection to PartyKit room', res)
  }

  return req
}

export const admin = {
  id: 'admin',
  username: 'Admin Fauzan',
  joinedAt: new Date().toISOString(),
  image: 'https://cdn.pixabay.com/photo/2024/03/28/19/43/customer-service-8661577_640.png',
}

export const useUtil = () => {
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const {
    state: { roomData },
  } = useLocation()

  const { id: roomId } = useParams()
  const socket = usePartySocket({
    host: PARTYKIT_HOST,
    party: 'chatroom',
    room: roomId,
    async onOpen(e) {
      if (e.target) {
        const resFetch = await identify(e.target, admin, roomId)
        const res = await resFetch.json()

        if (res.ok) {
          setLoading(false)
        }
      }
    },
    onMessage(event) {
      const message = JSON.parse(event.data)

      if (message.type === 'sync') setMessages(message.messages)

      // after that, the server will send updates as they arrive
      if (message.type === 'new') setMessages((prev) => [...prev, message])
      if (message.type === 'clear') setMessages([])
      if (message.type === 'edit') {
        setMessages((prev) => prev.map((m) => (m.id === message.id ? message : m)))
      }
    },
  })

  const handleInput = useCallback((e) => {
    e.preventDefault()
    setMessage(e.target.value)
  }, [])

  const onSendMessage = useCallback(
    (body) => {
      socket.send(JSON.stringify(body))
    },
    [socket],
  )

  const sendMessage = useCallback(async () => {
    const body = {
      type: 'new',
      text: message,
    }
    onSendMessage(body)
    setMessage('')
  }, [socket, message])

  useEffect(() => {
    const container = document.getElementById('chat-container')

    if (container) {
      container?.scrollTo({
        top: container.scrollHeight,
        left: 0,
        behavior: 'smooth',
      })
    }
  }, [messages])

  return {
    state: { loading, messages, roomData, message },
    event: { handleInput, sendMessage },
  }
}

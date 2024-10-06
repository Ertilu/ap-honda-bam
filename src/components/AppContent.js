import React, { Suspense, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import usePartySocket from 'partysocket/react'

// routes config
import routes from '../routes'
import { PARTYKIT_HOST } from 'src/config'

const AppContent = () => {
  console.log('PARTYKIT_HOST', PARTYKIT_HOST)
  const socket = usePartySocket({
    host: PARTYKIT_HOST,
    party: 'messages',
    room: 'all-message',
  })
  console.log('socket', socket)
  useEffect(() => {
    if (socket) {
      const onMessage = (evt) => {
        console.log('evt onmessage', evt)
      }
      socket.addEventListener('message', onMessage)

      return () => {
        // @ts-ignore
        socket.removeEventListener('message', onMessage)
      }
    }
  }, [socket])

  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
          <Route path="/" element={<Navigate to="dashboard/catalogues" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)

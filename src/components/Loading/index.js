import React from 'react'
import ReactLoading from 'react-loading'
import PropTypes from 'prop-types'
import { CModal } from '@coreui/react'
import './index.scss'

function Loading({ visible }) {
  return (
    <div>
      <CModal
        visible={visible || false}
        fullscreen
        style={{
          backgroundColor: 'transparent',
          boxShadow: 'none',
          display: 'flex',
          alignItems: 'center',
        }}
        alignment="center"
      >
        <ReactLoading
          type={'spokes'}
          color={'#0d6efd'}
          height={'10%'}
          width={'10%'}
          className="loading-component"
        />
      </CModal>
    </div>
  )
}

Loading.propTypes = {
  visible: PropTypes.bool,
}

export default Loading

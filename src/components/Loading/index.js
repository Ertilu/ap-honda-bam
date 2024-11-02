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
        style={{
          backgroundColor: 'transparent',
          boxShadow: 'none',
          display: 'flex',
          alignItems: 'center',
        }}
        alignment="center"
      >
        <div style={{ width: '20vw', height: '20vw', backgroundColor: '#0d6efd' }}>
          <ReactLoading
            type={'bars'}
            color={'white'}
            height={'100%'}
            width={'100%'}
            className="loading-component"
          />
        </div>
      </CModal>
    </div>
  )
}

Loading.propTypes = {
  visible: PropTypes.bool,
}

export default Loading

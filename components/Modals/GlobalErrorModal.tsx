import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { hideErrorModal } from 'actions/errors'
import { getIsErrorModalVisible, getErrorMessage } from 'selectors/errors'

const GlobalErrorModal = () => {
  const isVisible = useSelector(getIsErrorModalVisible)
  const message = useSelector(getErrorMessage)

  const dispatch = useDispatch()

  const handleCloseModal = () => {
    dispatch(hideErrorModal())
  }

  if (!isVisible) {
    return null
  }

  const CLOSE_ICON = require('assets/images/x.svg')

  return (
    <div className="talent-form__alert-wrapper">
      <div className="talent-form__alert">
        <div className="talent-form__alert--x-wrap">
          <a className="btn" onClick={handleCloseModal}>
            <img src={CLOSE_ICON} />
          </a>
        </div>

        <h3>{message}</h3>

        <a
          className="talent-form__alert--okay btn2 btn2__filled"
          onClick={handleCloseModal}
        >
          Okay
        </a>
      </div>
    </div>
  )
}

export default GlobalErrorModal

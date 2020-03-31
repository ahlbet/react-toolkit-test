import React, { useState } from 'react'
import { useHistory } from 'react-router'

import Button from 'Elements/Button/Button'

interface FieldProps {
  error: any
  field: string
}

const ErrorModal = (props: FieldProps) => {
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(true)
  const { error, field } = props
  const history = useHistory()

  if (error && field && isErrorModalVisible) {
    return (
      <div className="talent-form__alert-wrapper">
        <div className="talent-form__alert">
          <div className="talent-form__alert--x-wrap">
            <a className="btn" href="/users/sign_in">
              <img alt="x" src={require('assets/images/x.svg')} />
            </a>
          </div>
          <h3>{error[field][1]}</h3>
          <a
            className="talent-form__alert--okay btn2 btn2__filled"
            href="/users/sign_in"
          >
            Okay
          </a>
        </div>
      </div>
    )
  } else {
    return null
  }
}

ErrorModal.defaultProps = {
  error: null,
  field: '',
}

export default ErrorModal

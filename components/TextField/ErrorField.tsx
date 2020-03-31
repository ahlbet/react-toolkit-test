import React from 'react'

interface FieldProps {
  error: any,
  field: string
}

const ErrorField = (props: FieldProps) => {
  const { error, field } = props

  if (error && error[field]) {
    return (
      <div className="talent-form__error">
        {error[field][1]}
      </div>)
  } else {
    return null
  }
}

ErrorField.defaultProps = {
  error: null,
  field: ''
}

export default ErrorField

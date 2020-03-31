import React from 'react'

interface FieldProps {
  children: React.ReactNode | string
  onChange: (newnum: any) => void
  customClass?: string
  placeholder: string
  disabled?: boolean
}

const CreditField = (props: FieldProps) => {
  const { children,
          onChange,
          customClass,
          placeholder,
          disabled
        } = props

  return (
      <div className="credit-field">
        {children}
        <input
           onChange={onChange}
           className={`credit-input ${customClass}`}
           placeholder={placeholder}
           disabled={disabled}>
        </input>
      </div>)
}

CreditField.defaultProps = {
  disabled: false,
}

export default CreditField

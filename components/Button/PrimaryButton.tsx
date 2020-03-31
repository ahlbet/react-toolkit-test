import React from 'react'

interface ButtonProps {
  children: React.ReactNode | string
  onClick: () => void
  customClass?: string
  disabled?: boolean
}

const PrimaryButton = (props: ButtonProps) => {
  const { children, onClick, customClass, disabled } = props

  return (
    <button
      onClick={onClick}
      className={`button custom-primary-button ${customClass}`}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

PrimaryButton.defaultProps = {
  disabled: false,
}

export default PrimaryButton

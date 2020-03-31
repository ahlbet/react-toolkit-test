import React from 'react'

interface ButtonProps {
  children: React.ReactNode | string
  onClick: () => void
  customClass?: string
  disabled?: boolean
}

const SecondaryButton = (props: ButtonProps) => {
  const { children, onClick, customClass, disabled } = props

  return (
    <button
      onClick={onClick}
      className={`button custom-secondary-button ${customClass}`}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

SecondaryButton.defaultProps = {
  disabled: false,
}

export default SecondaryButton

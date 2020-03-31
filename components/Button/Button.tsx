import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  onClick: (event: any) => void
  className: string
  disabled?: boolean
  type?: any
  style?: any
}

const Button = (props: ButtonProps) => {
  const { style, children, onClick, className, disabled, type } = props
  let buttonStyle = disabled
    ? { ...style, backgroundColor: '#424242' }
    : { ...style }
  return (
    <button
      onClick={onClick}
      className={className}
      disabled={disabled}
      type={type}
      style={buttonStyle}
    >
      {children}
    </button>
  )
}

Button.defaultProps = {
  disabled: false,
}

export default Button

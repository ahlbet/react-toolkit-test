import React, { useState } from 'react'

interface ProfileCheckboxProps {
  value: string
  label: string
  checked: boolean
  handleCheckboxChange: (event: any) => void
  disabled?: boolean
}

const ProfileCheckbox = (props: ProfileCheckboxProps) => {
  const { value, label, checked, disabled, handleCheckboxChange } = props

  const renderIcon = () => {
    return checked ? (
      <img
        className="profile-checkbox__icon"
        alt="Selected icon"
        src={require('assets/images/selected.svg')}
      />
    ) : (
      <img
        className="profile-checkbox__icon"
        alt="Selected icon"
        src={require('assets/images/unchecked.svg')}
      />
    )
  }

  return (
    <div
      className="profile-checkbox"
      // TODO: improve disabled function call
      onClick={!disabled ? handleCheckboxChange : () => {}}
    >
      <input type="checkbox" name="categories" value={value} />
      {renderIcon()}
      <label htmlFor={value}>{label}</label>
    </div>
  )
}

export default ProfileCheckbox

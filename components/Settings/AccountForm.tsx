import React, { useEffect, useState, useMemo } from 'react'
import { Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import usePutRequest from 'api/usePutRequest'
import useGetRequest from 'api/useGetRequest'
import TextField from 'Elements/TextField/TextField'
import Button from 'Elements/Button/Button'
import useAccountForm from 'helpers/settings/useAccountForm'
import TalentResponse from 'Elements/Registration/TalentResponse'
import { IMAGE_FILE_TYPES } from 'utils/file_utils'
import Thumbnail from 'Elements/Avatar/Thumbnail'
import { UserAccountForm } from 'types/UserData'

interface AccountFormProps {
  user: UserAccountForm
}

const AccountForm = (props: AccountFormProps) => {
  const { user } = props
  let inputRef
  const [pending, setPending] = useState(false)
  const [isSubmiting, setIsSubmiting] = useState(false)
  const [fieldErrors, setFieldErrors] = useState([])

  const {
    avatarImage,
    avatarFile,
    formData,
    handleInputChange,
    handleAvatarChange,
    inputs,
  } = useAccountForm(user, fieldErrors, setFieldErrors)

  console.log('user', user)

  const dispatch = useDispatch()

  const setTalentProfile = data => {
    window.location.reload()
  }
  const setError = data => {
    setErrorResponse(data)
  }

  useEffect(() => {
    if (isSubmiting) {
      postUser()
    }
  }, [isSubmiting])

  useEffect(() => {
    if (pending) checkIfValid()
  }, [pending])

  const stringIsInvalid = str => {
    return (
      // checking for string undefined because api will set as string undefined if empty
      str === '' ||
      str === 'undefined' ||
      str === undefined ||
      str === null ||
      str === 'null' ||
      str.trim().replace(/ /g, '') === ''
    )
  }

  const checkIfValid = () => {
    const invalid = []

    if (stringIsInvalid(formData.get('user[first_name]'))) {
      invalid.push('first_name')
    }

    if (stringIsInvalid(formData.get('user[last_name]'))) {
      invalid.push('last_name')
    }

    if (stringIsInvalid(formData.get('user[email]'))) {
      invalid.push('email')
    }

    if (invalid.length < 1) {
      setFieldErrors([])
    } else {
      setFieldErrors(invalid)
      setPending(false)
    }
  }

  const sectionClass = fieldName => {
    return fieldErrors.includes(fieldName)
      ? 'account-form__section account-form__section--error'
      : 'account-form__section'
  }

  useEffect(() => {
    if (fieldErrors.length < 1 && pending) {
      setIsSubmiting(true)
    } else {
      setPending(false)
    }
  }, [fieldErrors])

  const [talentProfile, setTalentResponse] = useState(0)
  const [error, setErrorResponse] = useState(undefined)

  const [postUser, isPostEventLoading] = usePutRequest({
    dispatch: dispatch,
    dispatchToStore: false,
    url: '/api/v1/users/' + user.id,
    body: formData,
    onSuccess: setTalentProfile,
    onFailure: setError,
    config: {
      'Content-Type': 'multipart/form-data',
    },
  })

  const avatarSrc = () => {
    if (avatarImage && avatarImage.length) {
      return avatarImage
    }

    if (user.avatarUrl) {
      return user.avatarUrl
    }

    return '/images/placeholder/avatar-placeholder.png'
  }

  const renderThumbnail = () => {
    if (!!avatarFile) {
      return (
        <div className="edit-profile-form__avatar-text">New Image Selected</div>
      )
    }

    return (
      <div className="edit-profile-form__avatar">
        <Thumbnail withBorder url={avatarSrc()} />
      </div>
    )
  }

  const handleOpenFileSelect = (event: React.SyntheticEvent) => {
    event.preventDefault()
    inputRef.click()
  }

  return (
    <div>
      <div className="btn settings-account-view__update-avatar">
        <input
          accept={IMAGE_FILE_TYPES}
          className="edit-profile-form__file-input"
          onChange={handleAvatarChange}
          ref={node => (inputRef = node)}
          type="file"
        />

        {renderThumbnail()}

        <Button
          className="btn settings-account-view__update-avatar"
          onClick={handleOpenFileSelect}
        >
          <span>Edit photo</span>
        </Button>
      </div>

      <h3 className="settings-account-view__form-header">My details</h3>

      <form className="account-form">
        <div className="account-form__names">
          <div
            className={`${sectionClass('first_name')} account-form__first-name`}
          >
            <label>First Name</label>
            <TextField
              onChange={handleInputChange}
              name="first_name"
              value={inputs.first_name}
              className="text-field"
              disabled={false}
            />
            {fieldErrors.includes('first_name') && (
              <p>This field is required</p>
            )}
          </div>
          <div className={sectionClass('last_name')}>
            <label>Last Name</label>
            <TextField
              onChange={handleInputChange}
              name="last_name"
              value={inputs.last_name}
              className="text-field"
              disabled={false}
            />
            {fieldErrors.includes('last_name') && <p>This field is required</p>}
          </div>
        </div>
        <div className={sectionClass('email')}>
          <label>Email</label>
          <TextField
            onChange={handleInputChange}
            name="email"
            value={inputs.email}
            className="text-field"
            disabled={false}
          />
          {fieldErrors.includes('email') && <p>This field is required</p>}
        </div>
        <button
          className="btn account-form__update"
          onClick={e => {
            e.preventDefault()
            setPending(true)
          }}
        >
          Update
        </button>
        <TalentResponse talent={talentProfile} error={error}>
          Account Updated
        </TalentResponse>
      </form>
    </div>
  )
}

export default AccountForm

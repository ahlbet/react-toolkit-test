import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

import axios, { AxiosInstance } from 'axios'

import * as FormUtils from 'utils/form_utils'
import TalentAcceptView from 'Contexts/Registration/Views/TalentAcceptView'
import TalentResponse from './TalentResponse'
import TextField from 'Elements/TextField/TextField'
import ErrorField from 'Elements/TextField/ErrorField'
import ErrorModal from 'Elements/Modals/ErrorModal'
import Button from 'Elements/Button/Button'
import Dropdown from 'Elements/Dropdown/Dropdown'
import usePostRequest from 'api/usePostRequest'
import VideoIssuesModal from 'Elements/Modals/VideoIssuesModal'
import useTalentForm, {
  socialMediaOptions,
} from 'helpers/registration/useTalentForm'

const TalentForm = props => {
  const timezone = require('jstimezonedetect');

  const { setIsSuccessModalVisible } = props

  let baseUrl = process.env.APIHOST
  let history = useHistory()

  const [isShowingTalentAccept, setIsShowingTalentAccept] = useState(false)

  let videoUrl = ''

  const dispatch = useDispatch()
  const onSubmit = () => {
    setPending(true)
    // postTalent()
    submitVideo(null)
  }

  console.log('timezone is', timezone.determine().name())


  const submitVideo = async data => {
    if (process.env.RAILS_ENV && process.env.RAILS_ENV == 'production') {
      const filename = video.name
      const payload = await fetch(
        `${baseUrl}/api/v1/aws/presigned_url?filename=${filename}`,
      ).then(res => res.json())

      const url = payload.url
      const formData = new FormData()
      videoUrl = url + '/' + payload.fields['key']

      Object.keys(payload.fields).forEach(key =>
        formData.append(key, payload.fields[key]),
      )
      formData.append('file', video)

      const xml = await fetch(url, {
        method: 'POST',
        body: formData,
      }).then(res => res.text())
    }

    const res = await fetch(`/api/v1/talents`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        talent: {
          first_name: textInputs.firstName,
          last_name: textInputs.lastName,
          email: textInputs.email,
          phone: textInputs.phoneNumber,
          time_zone: timezone.determine().name(),
          talent_profile_attributes: {
            social_media_profiles_attributes: formattedSocial,
            video_url: videoUrl,
          },
        },
      }),
    }).then(res => res.json())

    if (res.errors) {
      setError(res.errors)
    } else {
      setPending(false)
      setIsSuccessModalVisible(true)
    }

    setIsShowingTalentAccept(false)
  }

  const {
    formattedSocial,
    handleAddSocial,
    handleFollowersChange,
    handleRemoveSocial,
    handleSocialMediaChange,
    handleSubmit,
    handleTextInputChange,
    handleURLChange,
    handleVideoChange,
    socialMedia,
    textInputs,
    video,
  } = useTalentForm(onSubmit)

  const [pending, setPending] = useState(false)
  const [talent, setTalentResponse] = useState(0)
  const [error, setErrorResponse] = useState(undefined)
  const [validations, setValidations] = useState<string[]>([])

  const [videoIssuesModal, setVideoIssuesModal] = useState(false)

  const setError = data => {
    if (data && !data.email) {
      alert(data)
    }
    setIsShowingTalentAccept(false)
    setErrorResponse(data)
  }
  const setTalent = data => {
    setIsSuccessModalVisible(true)
    setIsShowingTalentAccept(false)
    // setTalentResponse(data)
  }

  // const [postTalent, isPostEventLoading] = usePostRequest({
  //   dispatch: dispatch,
  //   dispatchToStore: false,
  //   url: `/api/v1/talents`,
  //   body: {
  //     talent: {
  //       first_name: textInputs.firstName,
  //       last_name: textInputs.lastName,
  //       email: textInputs.email,
  //       talent_profile_attributes: {
  //         social_media_profiles_attributes: socialMedia,
  //         video_url: getUrl(),
  //       },
  //     },
  //   },
  //   onSuccess: setTalent,
  //   onFailure: setError,
  // })

  const secondSocialAccountNeeded = () => {
    return validations.find(validation =>
      validation.match(/^(?:followers|url)/),
    )
  }

  const handleClickSubmit = e => {
    e.preventDefault()
    const [isValid, validations] = validateFields()

    setValidations(validations)

    if (!isValid) {
      setIsShowingTalentAccept(false)
      return
    }

    setIsShowingTalentAccept(true)
  }

  const isInvalid = (field: string) => {
    return validations.indexOf(field) !== -1
  }

  const validateFields = (): [boolean, string[]] => {
    const invalidFields: string[] = []
    ;['firstName', 'lastName'].forEach(field => {
      if (textInputs[field] === '') {
        invalidFields.push(field)
      }
    })

    if (!FormUtils.validateEmailAddress(textInputs.email)) {
      invalidFields.push('email')
    }

    if (!FormUtils.validatePhoneNumber(textInputs.phoneNumber)) {
      invalidFields.push('phoneNumber')
    }

    ;['url', 'followers'].forEach((field: string) => {
      for (let i = 0; i < 1; ++i) {
        if (!socialMedia[i] || socialMedia[i][field] === '') {
          invalidFields.push(`${field}-${i}`)
        }
      }
    })

    if (!video) {
      invalidFields.push('video')
    }

    const isValid = invalidFields.length === 0

    return [isValid, invalidFields]
  }

  const renderSocialMedia = () => {
    let urlSectionClass = isInvalid('url')
      ? 'talent-form__social-section talent-form__social-section--error'
      : 'talent-form__social-section'

    let followersSectionClass = isInvalid('followers')
      ? 'talent-form__social-section talent-form__social-section--error'
      : 'talent-form__social-section'

    return socialMedia.map((social, index) => {
      return (
        <div className="talent-form__social" key={`${social.type}_${index}`}>
          <div className="talent-form__social-section">
            <div className="talent-form__social-top">
              <label className="talent-form__label">Social media type</label>
              {index !== 0 && (
                <Button
                  className="btn talent-form__social-remove"
                  onClick={event => handleRemoveSocial(event, index)}
                >
                  Remove
                </Button>
              )}
            </div>
            <Dropdown
              className="talent-form__dropdown"
              options={socialMediaOptions}
              value={social.type}
              handleChange={event => handleSocialMediaChange(event, index)}
            />
          </div>
          <div className={urlSectionClass}>
            <label className="talent-form__label">Your Handle</label>
            <TextField
              onChange={() => handleURLChange(event, index)}
              name="url"
              value={social.url}
              className={`text-field talent-form__text-input`}
              disabled={false}
              isRequired
              isInvalid={isInvalid(`url-${index}`)}
            />
          </div>
          <div className={followersSectionClass}>
            <label className="talent-form__label">Followers</label>
            <TextField
              onChange={() => handleFollowersChange(event, index)}
              name="followers"
              value={social.followers}
              className="text-field talent-form__text-input"
              disabled={false}
              isRequired
              isInvalid={isInvalid(`followers-${index}`)}
            />
          </div>
        </div>
      )
    })
  }

  const renderSectionClass = type => {
    return isInvalid(type)
      ? 'talent-form__section talent-form__section--error'
      : 'talent-form__section'
  }

  return isShowingTalentAccept ? (
    <TalentAcceptView acceptAgreement={onSubmit} pending={pending} />
  ) : (
    <div className="talent-form__wrap">
      <h2>Join Real Talk Live</h2>
      <TalentResponse talent={talent} error={error}>
        Thank You for Signing Up!
      </TalentResponse>
      <form className="talent-form">
        <div className="talent-form__info">
          <h3 className="talent-form__header">
            My information (all fields required)
          </h3>
          <div className={renderSectionClass('firstName')}>
            <label className="talent-form__label">First name</label>
            <TextField
              onChange={handleTextInputChange}
              name="firstName"
              value={textInputs.firstName}
              className="text-field talent-form__text-input"
              disabled={false}
              isRequired
              isInvalid={isInvalid('firstName')}
            />
          </div>
          <div className={renderSectionClass('lastName')}>
            <label className="talent-form__label">Last name</label>
            <TextField
              onChange={handleTextInputChange}
              name="lastName"
              value={textInputs.lastName}
              className="text-field talent-form__text-input"
              disabled={false}
              isRequired
              isInvalid={isInvalid('lastName')}
            />
          </div>
          <div className={renderSectionClass('email')}>
            <label className="talent-form__label">Email</label>
            <TextField
              onChange={handleTextInputChange}
              name="email"
              value={textInputs.email}
              className="text-field talent-form__text-input"
              disabled={false}
              isRequired
              type="email"
              isInvalid={isInvalid('email')}
              validationMessage="Please enter a valid email address"
            />
            <ErrorField error={error} field="email" />
            <ErrorModal error={error} field="email" />
            <p className="talent-form__text">
              Your email will be used for Real Talk Live communications only and
              will not be publicly visible.
            </p>
          </div>
          <div className={renderSectionClass('phoneNumber')}>
            <label className="talent-form__label">Phone number</label>
            <TextField
              onChange={handleTextInputChange}
              name="phoneNumber"
              value={textInputs.phoneNumber}
              className="text-field talent-form__text-input"
              disabled={false}
              isRequired
              type="tel"
              isInvalid={isInvalid('phoneNumber')}
              validationMessage="Please add a valid phone number"
            />
            <p className="talent-form__text">
              Your phone number will be used for Real Talk Live communications
              only and will not be publicly visible.
            </p>
          </div>
          <div className={renderSectionClass('video')}>
            <label className="talent-form__label">Video Upload</label>
            <input
              type="file"
              onChange={handleVideoChange}
              name="video"
              accept="video/mp4,video/x-m4v,video/*"
              className="text-field talent-form__text-input"
            />
            {isInvalid('video') && (
              <div className="talent-form__error">Video is required</div>
            )}

            <p className="talent-form__text">
              Introduce yourself and encourage your fans to check you out on
              Real Talk Live. We'll use this to help verify it's you. Be
              enthusiastic and fun!
            </p>

            <div className="talent-form__text">
              <span> Having issues? </span>
              <Button
                onClick={e => {
                  e.preventDefault()
                  setVideoIssuesModal(true)
                }}
                className="btn"
              >
                Click here
              </Button>
            </div>
            {videoIssuesModal && (
              <VideoIssuesModal
                onCloseClick={() => {
                  setVideoIssuesModal(false)
                }}
              />
            )}
          </div>
        </div>
        <div className="talent-form__social-wrap">
          <h3 className="talent-form__header">
            Social media (all fields required)
          </h3>
          <div className="talent-form__section">{renderSocialMedia()}</div>
          {socialMedia.length < 3 && (
            <React.Fragment>
              <Button
                className="btn talent-form__social-add"
                onClick={handleAddSocial}
              >
                <img
                  alt="Plus icon"
                  src={require('assets/images/plus-blue.svg')}
                />
                <span>Add social platform</span>
              </Button>
            </React.Fragment>
          )}
        </div>
        <button
          className="btn talent-form__submit -is-center"
          onClick={handleClickSubmit}
          onChange={() => {}}
          type="submit"
        >
          Send Request
        </button>
      </form>
      <div className="talent-registration-view__bottom">
        <p>By continuing, you agree to Real Talk Live’s</p>
        <p className="talent-registration-view__links">
          <Link to="/terms">Terms & Conditions</Link> and{' '}
          <Link to="/privacy">Privacy policy</Link>
        </p>
      </div>
    </div>
  )
}

export default TalentForm

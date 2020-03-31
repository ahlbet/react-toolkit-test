import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import AvatarEditor, { Crop } from 'Elements/Avatar/AvatarEditor';
import Button from 'Elements/Button/Button';
import ProfileCheckbox from 'Elements/Settings/ProfileCheckbox';
import TalentResponse from 'Elements/Registration/TalentResponse';
import TextField from 'Elements/TextField/TextField';
import useEditProfileForm from 'helpers/settings/useEditProfileForm';
import usePutRequest from 'api/usePutRequest';
import validateNumber from 'helpers/validateNumber';
import { IMAGE_FILE_TYPES } from 'utils/file_utils';
import { convertCreditsToDollars } from 'utils/currency_utils';

import Thumbnail from 'Elements/Avatar/Thumbnail';

const categoryData = [
  { name: 'Athletes', id: 1 },
  { name: 'Influencers', id: 2 },
  { name: 'Business Leaders', id: 3 },
  { name: 'Actors', id: 4 },
  { name: 'Musicians', id: 6 },
  { name: 'Television', id: 7 },
  { name: 'Youtubers', id: 8 },
  { name: 'Reality TV', id: 9 },
  { name: 'Beauty & Fashion', id: 10 },
  { name: 'Charity', id: 11 },
  { name: 'Media', id: 12 },
  { name: 'Lifestyle', id: 13 },
];

interface EditProfileFormProps {
  // TODO: match profile type with API typing
  profile: any;
}

const EditProfileForm = (props: EditProfileFormProps) => {
  let inputRef;
  const [pending, setPending] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);

  const onSubmit = () => {
    postTalent();
  };

  useEffect(() => {
    if (isSubmiting) {
      postTalent();
    }
  }, [isSubmiting]);

  useEffect(() => {
    if (pending) {
      checkIfValid();
    }
  }, [pending]);

  const { profile } = props;
  const {
    avatarCrop,
    avatarFile,
    avatarImage,
    creditRate,
    creditRateError,
    description,
    formData,
    handleAvatarChange,
    handleCheckboxChange,
    handleClickSaveCrop,
    handleCreditRateInput,
    handleDescriptionChange,
    handleHeadlineChange,
    handleMinusPressed,
    handlePlusPressed,
    handleSubmit,
    handleTextInputChange,
    headline,
    isAvatarEditorVisible,
    selectedCategories,
    setAvatarCrop,
    setImageSize,
    textInput,
  } = useEditProfileForm(profile, onSubmit);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleOpenFileSelect = (event: React.SyntheticEvent) => {
    event.preventDefault();
    inputRef.click();
  };

  const setTalentProfile = data => {
    setTalentResponse(data);
    window.location.href = '/settings/profile';
  };

  const setError = data => {
    setErrorResponse(data);
  };

  const stringIsInvalid = str => {
    return (
      // checking for string undefined because api will set as string undefined if empty
      str === '' ||
      str === 'undefined' ||
      str === undefined ||
      str === null ||
      str === 'null' ||
      str.trim().replace(/ /g, '') === ''
    );
  };

  const [fieldErrors, setFieldErrors] = useState([]);

  useEffect(() => {
    if (fieldErrors.length < 1 && pending) {
      setIsSubmiting(true);
    } else {
      setPending(false);
    }
  }, [fieldErrors]);

  const checkIfValid = () => {
    const invalid = [];

    if (stringIsInvalid(textInput.displayName)) {
      invalid.push('displayName');
    }

    if (stringIsInvalid(description)) {
      invalid.push('description');
    }

    if (selectedCategories.length === 0) {
      invalid.push('categories');
    }

    if (invalid.length < 1) {
      setFieldErrors([]);
    } else {
      setFieldErrors(invalid);
      setPending(false);
    }
  };

  const [talent, setTalent] = useState(0);
  const [talentProfile, setTalentResponse] = useState(0);
  const [error, setErrorResponse] = useState(undefined);

  const [postTalent, isPostEventLoading] = usePutRequest({
    dispatch,
    dispatchToStore: false,
    url: '/api/v1/talents/' + profile.data.id,
    body: formData,
    onSuccess: setTalentProfile,
    onFailure: setError,
    config: {
      'Content-Type': 'multipart/form-data',
    },
  });

  const avatarSrc = () => {
    if (avatarImage && avatarImage.length) {
      return avatarImage;
    }

    if (profile.data.attributes.avatar_url) {
      return profile.data.attributes.avatar_url;
    }

    return '/images/placeholder/avatar-placeholder.png';
  };

  const renderCategories = () => {
    return categoryData.map((category, index) => {
      const numberSelected = selectedCategories.length;

      return (
        <ProfileCheckbox
          key={category.id}
          value={category.id.toString()}
          label={category.name}
          handleCheckboxChange={e => {
            if (fieldErrors.length > 0) {
              setFieldErrors(fieldErrors.filter(type => type !== 'categories'));
            }
            handleCheckboxChange(e);
          }}
          checked={selectedCategories.indexOf(category.id.toString()) !== -1}
          disabled={
            numberSelected === 3 &&
            selectedCategories.indexOf(category.id.toString()) === -1
          }
        />
      );
    });
  };

  const renderThumbnail = () => {
    if (!!avatarFile) {
      return (
        <div className="edit-profile-form__avatar-text">New Image Selected</div>
      );
    }

    return (
      <div className="edit-profile-form__avatar">
        <Thumbnail url={avatarSrc()} />
      </div>
    );
  };

  const sectionClass = fieldName => {
    return fieldErrors.includes(fieldName)
      ? 'edit-profile-form__section edit-profile-form__section--error'
      : 'edit-profile-form__section';
  };

  return (
    <>
      <form className="edit-profile-form">
        <div className="edit-profile-form__wrap">
          <div className="edit-profile-form__section edit-profile-form__avatar-edit">
            <input
              accept={IMAGE_FILE_TYPES}
              className="edit-profile-form__file-input"
              onChange={handleAvatarChange}
              ref={node => (inputRef = node)}
              type="file"
            />

            {renderThumbnail()}

            <Button
              className="btn edit-profile-form__replace-avatar"
              onClick={handleOpenFileSelect}>
              Replace image
            </Button>
          </div>

          <div className={sectionClass('displayName')}>
            <h3 className="edit-profile-form__header">Name</h3>
            <label className="edit-profile-form__label">Display name</label>
            <TextField
              className="text-field"
              value={textInput.displayName}
              name="displayName"
              onChange={e => {
                if (fieldErrors.length > 0) {
                  setFieldErrors(
                    fieldErrors.filter(type => type !== 'displayName'),
                  );
                }
                handleTextInputChange(e);
              }}
              isRequired
            />
            {fieldErrors.includes('displayName') && <p>This field is required</p>}
          </div>
          <div className={sectionClass('headline')}>
            <h3 className="edit-profile-form__header">Headline</h3>
            <input
              className="edit-profile-form__headline"
              onChange={e => {
                if (fieldErrors.length > 0) {
                  setFieldErrors(fieldErrors.filter(type => type !== 'headline'));
                }
                handleHeadlineChange(e);
              }}
              value={headline}
            />
            <p className="edit-profile-form__headline--sub">
              {headline.length}/40 characters
            </p>
            {fieldErrors.includes('headline') && (
              <p style={{ textAlign: 'right' }}>This field is required</p>
            )}
          </div>
          <div className="edit-profile-form__section">
            <h3 className="edit-profile-form__header">Rate per minute</h3>
            <div className="edit-profile-form__credits">
              <div className="edit-profile-form__credits--left">
                <Button
                  className="btn edit-profile-form__credit-button"
                  onClick={handleMinusPressed}>
                  <img
                    src={require('assets/images/icons-custom-ui-minus-white.svg')}
                  />
                </Button>

                {/* <span>{creditRate}</span> Credits */}
                <div className="edit-profile-form__credit-input">
                  <input
                    value={creditRate.toString()}
                    onChange={handleCreditRateInput}
                    type="number"
                    onKeyPress={validateNumber}
                  />
                </div>

                <Button
                  className="btn edit-profile-form__credit-button"
                  onClick={handlePlusPressed}>
                  <img
                    src={require('assets/images/icons-custom-ui-plus-white.svg')}
                  />
                </Button>
              </div>

              <p className="edit-profile-form__credits--right">
                <span>
                  ${convertCreditsToDollars(creditRate ? creditRate : 0)}
                </span>{' '}
                / min
              </p>
            </div>
            <p className="edit-profile-form__text">
              Real Talk Live will only display credits per minute.
            </p>
          </div>
          <div className={sectionClass('categories')}>
            <div className="edit-profile-form__category-top">
              <h3 className="edit-profile-form__header">Category</h3>
              <span>(select up to 3)</span>
            </div>
            <div className="edit-profile-form__categories">
              {renderCategories()}
            </div>
            {fieldErrors.includes('categories') && <p>Must choose at least 1</p>}
          </div>
          <div className={sectionClass('description')}>
            <h3 className="edit-profile-form__header">Description</h3>
            <textarea
              className="edit-profile-form__description"
              value={description ? description : ''}
              onChange={e => {
                if (fieldErrors.length > 0) {
                  setFieldErrors(
                    fieldErrors.filter(type => type !== 'description'),
                  );
                }
                handleDescriptionChange(e);
              }}
            />
            {fieldErrors.includes('description') && <p>This field is required</p>}
          </div>
        </div>
        <div className="edit-profile-form__submit-wrap">
          {/* <Button className="btn edit-profile-form__submit" onClick={() => {}}>
            Submit
          </Button> */}
          <input
            className="btn edit-profile-form__submit"
            value="Submit"
            onClick={e => {
              e.preventDefault();
              setPending(true);
            }}
            onChange={() => {}}
            type="submit"
            disabled={creditRateError}
          />
          <TalentResponse talent={talentProfile} error={error}>
            Account Updated
          </TalentResponse>
        </div>
      </form>

      <AvatarEditor
        crop={avatarCrop}
        isVisible={isAvatarEditorVisible}
        onSaveCrop={handleClickSaveCrop}
        onUpdateCrop={(crop: Crop) => setAvatarCrop(crop)}
        onUpdateImageSize={setImageSize}
        source={avatarSrc()}
      />
    </>
  );
};

export default EditProfileForm;

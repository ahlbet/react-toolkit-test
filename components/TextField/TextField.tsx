import React, { Component } from 'react';

// TODO: add error to props and display error labels

interface TextFieldProps {
  className: string;
  disabled?: boolean;
  isInvalid?: boolean;
  isRequired?: boolean;
  isSearch?: boolean;
  name: string;
  onChange: (event: any) => void;
  onSearch?: VoidFunction;
  placeholder?: string;
  type?: string;
  validationMessage?: string;
  value: string;
}

const DEFAULT_INVALID_TEXT = 'Field is required';

class TextField extends Component<TextFieldProps, {}> {
  static defaultProps = {
    error: false,
  };

  constructor(props: TextFieldProps) {
    super(props);
  }

  render() {
    const {
      className,
      disabled,
      isInvalid,
      isRequired,
      isSearch,
      name,
      onChange,
      onSearch,
      placeholder,
      type,
      validationMessage,
      value,
    } = this.props;

    return isSearch ? (
      <div style={{ position: 'relative' }}>
        <input
          className={className}
          name={name}
          placeholder={placeholder}
          value={value}
          type={type ? type : 'text'}
          onChange={onChange}
          disabled={disabled}
          required={isRequired}
        />
        <button className="text-field__search" onClick={onSearch}>
          <img src={require('assets/images/icons-custom-ui-search.svg')} />
        </button>
      </div>
    ) : (
      <div style={{ position: 'relative' }}>
        <input
          className={className}
          name={name}
          placeholder={placeholder}
          value={value}
          type={type ? type : 'text'}
          onChange={onChange}
          disabled={disabled}
          required={isRequired}
        />
        {isInvalid && (
          <div className="talent-form__error">
            {validationMessage || DEFAULT_INVALID_TEXT}
          </div>
        )}
      </div>
    );
  }
}

export default TextField;

import React from 'react'
import Select from 'react-select'

// TODO: decide whether `react-select` is a necessary library for this

interface DropdownProps {
  options: Array<object>
  className: string
  value: Object
  handleChange: (SearchFilterType) => void
}

const customStyles = {
  option: provided => ({
    ...provided,
    // color: 'red',
  }),
  control: provided => ({
    ...provided,
    borderRadius: '1.25rem',
    paddingLeft: '5px',
    // width: "12.5rem",
    borderColor: '#2c3437',
    color: '#191919',
    fontFamily: 'Montserrat',
    fontSize: '16px',
  }),
  dropdownIndicator: provided => ({
    ...provided,
    color: '#2c3437',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
}

const Dropdown = (props: DropdownProps) => (
  <div className={props.className}>
    <Select
      value={props.value}
      options={props.options}
      styles={customStyles}
      onChange={props.handleChange}
    />
  </div>
)

export default Dropdown

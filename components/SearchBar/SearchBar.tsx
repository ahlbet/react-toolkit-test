import React from 'react'

import TextField from 'Elements/TextField/TextField'
import ToggleFilter from 'Elements/ToggleFilter/ToggleFilter'
import Dropdown from 'Elements/Dropdown/Dropdown'

interface SearchBarProps {
  category?: string
}

const SearchBar = (props: SearchBarProps) => {
  return (
    <div className="search__bar">
      <h1 className="search__title">
        {props.category ? props.category : 'Search'}
      </h1>
      <div className="columns search__wrap">
        <div className="column is-half search__field">
          <TextField
            onChange={() => {}}
            value=""
            className="text-field search-icon"
            disabled={false}
            placeholder="Search"
            name="Search"
          />
        </div>
        <div className="columns is-mobile is-vcentered search__options">
          <div className="column is-narrow">
            <ToggleFilter
              onChange={() => {}}
              className="toggle-filter"
              checked={false}
            >
              Live
            </ToggleFilter>
          </div>
          <Dropdown
            handleChange={() => {}}
            className="column is-narrow search__dropdown"
            options={[{ value: 'recommended', label: 'Recommended' }]}
            value={{ value: 'recommended', label: 'Recommended' }}
          />
        </div>
      </div>
    </div>
  )
}

export default SearchBar

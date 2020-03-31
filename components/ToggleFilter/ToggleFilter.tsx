import React from 'react';

export enum ToggleFilterType {
  Default,
  Bookings,
  TalentProfile,
}

interface ToggleFilterProps {
  onChange: () => void;
  className?: string;
  checked?: boolean;
  isColumn?: boolean;
  children: React.ReactChild;
  isDisabled?: boolean;
}

const ToggleFilter = (props: ToggleFilterProps) => {
  const {
    onChange,
    className,
    checked,
    isColumn,
    children,
    isDisabled,
  } = props;
  const columnClass = isColumn ? 'is-column' : '';
  const disabledClass = isDisabled ? ' is-disabled' : '';
  return (
    <div
      className={`toggle-filter-wrap ${columnClass} ${className}${disabledClass}`}>
      <span className="toggle-filter-text">{children}</span>
      <label className="toggle-filter">
        <input type="checkbox" onChange={onChange} checked={checked} />
        <span className={`slider${disabledClass}`}></span>
      </label>
    </div>
  );
};

export default ToggleFilter;

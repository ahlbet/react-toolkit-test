import React from 'react'

interface FieldProps {
  children?: React.ReactNode | string
  onChange: (newnum: any) => void
  customClass?: string
}

const selectYear = () => {
  const year = new Date().getFullYear()

  const years = [year, year + 1, year + 2, year + 3, year + 4, year + 5]

  return years.map((year, i) => (
    <option key={year.toString() + i} value={year}>
      {year}
    </option>
  ))
}

const CreditYear = (props: FieldProps) => {
  const { children, onChange, customClass } = props

  return (
    <select id="date" onChange={onChange}>
      {selectYear()}
    </select>
  )
}

CreditYear.defaultProps = {
  disabled: false,
}

export default CreditYear

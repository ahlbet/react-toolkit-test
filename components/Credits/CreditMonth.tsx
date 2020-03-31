import React from 'react'

interface CreditMonthProps {
  children?: React.ReactNode | string
  onChange: (newnum: any) => void
}

const selectMonth = () => {
  const days = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ]
  return days.map((day, i) => (
    <option key={day + i} value={day}>
      {day}
    </option>
  ))
}

const CreditMonth = (props: CreditMonthProps) => {
  const { children, onChange } = props

  return (
    <select id="date" className="credit-input" onChange={onChange}>
      {selectMonth()}
    </select>
  )
}

export default CreditMonth

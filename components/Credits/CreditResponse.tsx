import React from 'react'

interface ResponseProps {
  credit: any
  error: any
}

const CreditResponse = (
  props: ResponseProps) => {

  const {
    credit,
    error
  } = props

  if (credit) {
    if (credit.data) {
      return (
          <div className="credit-response">
          Purchased &nbsp;
            {credit.data.
              attributes.amount
            } credits.
          </div>)
    } else {
      return (
          <div className="credit-response">
            {credit['Charge Error'][0]}
          </div>)
    }
  }

  return null
}

export default CreditResponse

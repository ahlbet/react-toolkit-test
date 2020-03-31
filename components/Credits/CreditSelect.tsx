import React, { Component } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import validateNumber from 'helpers/validateNumber'

interface Props {
  title: string
  note: string
  credits: number
  decrementCredits: any
  incrementCredits: any
  onCreditsChange: any
}

interface State {}

class CreditSelect extends Component<Props, State> {
  render() {
    const {
      title,
      note,
      credits,
      decrementCredits,
      incrementCredits,
      onCreditsChange,
    } = this.props

    return (
      <div className="schedule-call-view__section">
        <div className="schedule-call-view__subtitle">{title}</div>
        <div className="schedule-call-view__duration-ticker-wrapper">
          <div className="schedule-call-view__duration-ticker">
            <div onClick={decrementCredits}>
              <FontAwesomeIcon
                className="schedule-call-view__duration-section__icon"
                icon={faMinusCircle}
                size={'2x'}
              />
            </div>

            <div className="schedule-call-view__duration-ticker__text">
              <input
                value={credits.toString()}
                onChange={onCreditsChange}
                type="number"
                onKeyPress={validateNumber}
              />
            </div>
            <div onClick={incrementCredits}>
              <FontAwesomeIcon
                className="schedule-call-view__duration-section__icon"
                icon={faPlusCircle}
                size={'2x'}
              />
            </div>
          </div>
          <div className="schedule-call-view__duration-credits">
            &nbsp;<b>${credits ? credits : 0}.00</b>&nbsp;
          </div>
        </div>
        <p className="credit-field__note">{note}</p>
      </div>
    )
  }
}

export default CreditSelect

import React from 'react'

import Button from 'Elements/Button/Button'

interface ScheduleCallErrorProps {
  onOkayClicked: () => void
  onCancelClicked?: () => void
  errorType: ErrorType
}

export enum ErrorType {
  Duration,
  Date,
  Video,
}

const ScheduleCallError = (props: ScheduleCallErrorProps) => {
  const { onOkayClicked, onCancelClicked, errorType } = props

  const renderText = () => {
    switch (errorType) {
      case ErrorType.Duration:
        return 'You have reached your credit limit. Would you like to buy more credits?'
      case ErrorType.Date:
        return 'You must select 3 unique dates and time options at least an hour apart.'
      case ErrorType.Video:
        return 'You must record a video before submitting a request.'
    }
  }

  const renderButtons = () => {
    return errorType === ErrorType.Duration ? (
      <div className="schedule-call-view__modal-main--buttons">
        <Button
          className="schedule-call-view__modal-main--okay schedule-call-view__modal-main--okay-half btn2 btn2__white"
          onClick={onCancelClicked}
        >
          Cancel
        </Button>
        <Button
          className="schedule-call-view__modal-main--okay schedule-call-view__modal-main--okay-half btn2 btn2__filled"
          onClick={onOkayClicked}
        >
          Okay
        </Button>
      </div>
    ) : (
      <div className="schedule-call-view__modal-main--okay-wrap">
        <Button
          className="schedule-call-view__modal-main--okay btn2 btn2__filled"
          onClick={onOkayClicked}
        >
          Okay
        </Button>
      </div>
    )
  }

  return (
    <div className="schedule-call-view__modal">
      <div className="schedule-call-view__modal-main">
        <div className="schedule-call-view__modal-main--x-wrap">
          <Button className="btn" onClick={onCancelClicked}>
            <img alt="x" src={require('assets/images/x.svg')} />
          </Button>
        </div>
        <h3>{renderText()}</h3>
        {renderButtons()}
      </div>
    </div>
  )
}

export default ScheduleCallError

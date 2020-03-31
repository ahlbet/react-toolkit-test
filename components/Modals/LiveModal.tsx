import React from 'react'

interface LiveModalProps {
  onCancelClick: () => void
  onOffClick: () => void
  onCloseClick: () => void
}

const LiveModal = (props: LiveModalProps) => {
  const { onCancelClick, onOffClick, onCloseClick } = props
  return (
    <div className="live-modal">
      <div className="live-modal__modal">
        <div className="live-modal__x">
          <img onClick={onCloseClick} src={require('assets/images/x.svg')} />
        </div>
        <div className="live-modal__text">
          Turning off Live will automatically decline any pending Live requests
        </div>

        <div className="live-modal__buttons">
          <button className="btn__cancel" onClick={onCancelClick}>
            Nevermind
          </button>
          <button className="btn__off" onClick={onOffClick}>
            Turn it off
          </button>
        </div>
      </div>
    </div>
  )
}

export default LiveModal

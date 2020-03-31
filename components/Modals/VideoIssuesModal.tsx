import React from 'react'

interface Props {
  onCloseClick: () => void
}

const VideoIssuesModal = (props: Props) => {
  const { onCloseClick } = props
  return (
    <div className="video-issues-modal">
      <div className="video-issues-modal__modal">
        <div className="video-issues-modal__x">
          <img onClick={onCloseClick} src={require('assets/images/x.svg')} />
        </div>
        <div className="video-issues-modal__text">
          <span>
            If you're having issues recording video make sure your web browser
            has both 'Camera' and 'Microphone' permissions in your privacy
            settings.
          </span>
          <br />
          <br />
          <span>
            Both of these need to be enabled to use Real Talk Live in your
            browser.
          </span>
        </div>

        <div className="video-issues-modal__buttons">
          <button className="btn__okay" onClick={onCloseClick}>
            Okay
          </button>
        </div>
      </div>
    </div>
  )
}

export default VideoIssuesModal

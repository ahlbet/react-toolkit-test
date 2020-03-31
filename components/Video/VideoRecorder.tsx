declare var videojs: any

import React, { useState, useEffect } from 'react'

import Button from 'Elements/Button/Button'
import ScrollToTop from 'helpers/ScrollToTop'

interface VideoRecorderProps {
  setIsShowingRecorder: () => void
  setRecordedVideoFile: () => void
  setVideoError: () => void
}

const VideoRecorder = props => {
  const { setIsShowingRecorder, setRecordedVideoFile, setVideoError } = props

  const [secondsRemaining, setSecondsRemaining] = useState(20)

  const VIDEO_CAPTURE_OPTIONS = {
    controls: true,
    width: 424,
    height: 754,
    fluid: true,
    controlBar: {
      // hide fullscreen and volume controls
      fullscreenToggle: false,
      volumePanel: false,
    },
    plugins: {
      record: {
        audio: true,
        video: true,
        maxLength: 20,
        timeSlice: 1000,
      },
    },
  }

  let inputNode, player

  useEffect(() => {
    window.scrollTo(0, 0)

    player = videojs(inputNode, VIDEO_CAPTURE_OPTIONS)

    player.on('finishRecord', () => {
      const file = player.recordedData
      setRecordedVideoFile(file)
      setIsShowingRecorder(false)
      setVideoError(false)
    })

    player.record().getDevice()

    const timer = setInterval(() => {
      const currentTime = Math.floor(player.record().getCurrentTime())
      setSecondsRemaining(20 - currentTime)
    }, 250)

    return () => {
      if (player) {
        player.dispose()
      }

      clearInterval(timer)
    }
  }, [])

  return (
    <div className="video-recorder">
      <Button
        onClick={() => setIsShowingRecorder(false)}
        className="btn btn__caret btn__caret--back video-recorder__back"
      >
        <img
          className="back"
          src={require('assets/images/icons-custom-ui-caret.svg')}
        />
        <span>Back</span>
      </Button>
      <div className="video-recorder__container">
        <video
          className="video-js vjs-9-16"
          ref={node => (inputNode = node)}
        ></video>
      </div>
      <div className="video-recorder__time-remaining">
        Time remaining: {secondsRemaining}
      </div>
    </div>
  )
}

export default VideoRecorder

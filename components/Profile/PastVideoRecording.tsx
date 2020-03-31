import React, { useState } from 'react';

interface PastVideoRecordingProps {
  thumbnailUrl: string;
  videoURL: string;
}

const PastVideoRecording = (props: PastVideoRecordingProps) => {
  const { thumbnailUrl, videoURL } = props;
  const [isFullScreen, setIsFullScreen] = useState(false);

  const renderPlayingVideo = () => {
    return (
      <div
        className="past-video-recording__playing-wrap"
        onClick={() => setIsFullScreen(false)}>
        <video autoPlay controls={isFullScreen}>
          <source src={videoURL} />
        </video>
      </div>
    );
  };

  const renderThumbnail = () => {
    return (
      <div
        className="past-video-recording__thumbnail-wrap"
        onClick={() => setIsFullScreen(true)}>
        {renderPlayButton()}
        <video poster={thumbnailUrl}>
          <source src={videoURL} />
        </video>
      </div>
    );
  };

  const renderPlayButton = () => {
    return (
      <div className="past-video-recording__thumbnail-play">
        <img src={require('assets/images/triangle.svg')} />
      </div>
    );
  };

  return (
    <div className="past-video-recording">
      {isFullScreen ? renderPlayingVideo() : renderThumbnail()}
    </div>
  );
};

export default PastVideoRecording;

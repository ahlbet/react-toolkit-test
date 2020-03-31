import React from 'react'

import { ScheduledEvent } from 'types/scheduled_event';

interface Props {
  call: ScheduledEvent;
}

const VideoPlayer = (props: Props) => {
  const { call } = props;

  return (
    <video
      controls
      src={call.attributes.converted_video_url || call.attributes.video_url}
    >
      Your browser does not support the video tag.
    </video>
  );
}

export default VideoPlayer;

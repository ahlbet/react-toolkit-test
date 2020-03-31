import React from 'react';

import { VideoArchive } from 'types/video_archive';
import PastVideoRecording from '../Profile/PastVideoRecording';

interface Props {
  emptyTitle?: string;
  videos: VideoArchive[];
}

const RecentVideos = (props: Props) => {
  const { emptyTitle, videos } = props;

  if (videos.length === 0) {
    return (
      <div className="bookings__empty">
        <h2>{emptyTitle || 'No bookings yet'}</h2>
        <p>
          After a call, it may take up to 24hrs for your video to be released.
        </p>
      </div>
    );
  }

  return (
    <>
      <h3>Recent Videos</h3>
      <div className="profile-video-list">
        <div className="columns is-mobile is-multiline">
          {videos.map((recentVideo: VideoArchive) => {
            return (
              <div
                className="column is-6-mobile is-3-tablet is-3-desktop"
                key={recentVideo.url}>
                <PastVideoRecording
                  thumbnailUrl={recentVideo.thumbnail_url}
                  videoURL={recentVideo.converted_video_url || recentVideo.url}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default RecentVideos;

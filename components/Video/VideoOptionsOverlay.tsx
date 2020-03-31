import React, { Component } from 'react'

class VideoOptionsOverlay extends Component {
  render() {
    return <div className="video_call_page__timer">{this.props.children}</div>
  }
}

export default VideoOptionsOverlay

import React from 'react'
import ExifOrientationImg from 'react-exif-orientation-img'
import PropTypes from 'prop-types'

import SquareFrame from './SquareFrame'
function Thumbnail(props) {
  const rotationStyle = () => {
    if (props.rotation) {
      return { transform: props.rotation }
    }
    return {}
  }

  const withBorderClass = () => {
    if (props.withBorder) {
      return ' avatar__with-border'
    } else {
      return ''
    }
  }

  return (
    <SquareFrame>
      <div className={`thumbnail${withBorderClass()}`}>
        <ExifOrientationImg src={props.url} className="thumbnail__image" />
      </div>
    </SquareFrame>
  )
}
Thumbnail.propTypes = {
  rotation: PropTypes.string,
  url: PropTypes.string.isRequired,
  withBorder: PropTypes.bool,
}
export default Thumbnail

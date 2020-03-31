import React from 'react'
import PropTypes from 'prop-types'
function SquareFrame(props) {
  return (
    <div className="square_frame">
      <div className="square_frame__face">{props.children}</div>
    </div>
  )
}
SquareFrame.propTypes = {
  children: PropTypes.element.isRequired,
}
export default SquareFrame

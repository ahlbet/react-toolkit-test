import React from 'react';

import Button from 'Elements/Button/Button';

function GoBack(props) {
  const CARET_ICON = require('assets/images/icons-custom-ui-caret.svg');

  return (
    <Button
      onClick={() => props.history.goBack()}
      className="btn btn__caret btn__caret--back schedule-call-view__back">
      <img className="back" src={CARET_ICON} />
      <span>Back</span>
    </Button>
  );
}

export default GoBack;

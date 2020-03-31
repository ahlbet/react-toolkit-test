import React from 'react';

import Button from 'Elements/Button/Button';

interface Props {
  isVisible: boolean;
  onCloseModal: VoidFunction;
}

const CallErrorModal = (props: Props) => {
  const { isVisible, onCloseModal } = props;

  if (!isVisible) {
    return null;
  }

  return (
    <div className="call-detail-view__cancel-modal-wrap">
      <div className="call-detail-view__cancel-modal -error-modal">
        <div className="call-detail-view__cancel-modal--x-wrap">
          <Button
            className="call-detail-view__cancel-modal--x"
            onClick={onCloseModal}>
            <img alt="x" src={require('assets/images/x.svg')} />
          </Button>
        </div>

        <h3>You have already joined this call on a different device</h3>
      </div>
    </div>
  );
};

export default CallErrorModal;

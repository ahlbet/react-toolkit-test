import React from 'react';

import Button from 'Elements/Button/Button';

interface Props {
  onCancel: () => void;
  onClose: () => void;
}

function CancelModal(props: Props) {
  const { onCancel, onClose } = props;

  return (
    <div className="call-detail-view__cancel-modal-wrap">
      <div className="call-detail-view__cancel-modal">
        <div className="call-detail-view__cancel-modal--x-wrap">
          <Button
            className="call-detail-view__cancel-modal--x"
            onClick={onClose}>
            <img alt="x" src={require('assets/images/x.svg')} />
          </Button>
        </div>
        <h3>Are you sure you want to cancel this request?</h3>
        <div className="call-detail-view__cancel-modal--actions">
          <Button onClick={onClose} className="btn btn2__white">
            Nevermind
          </Button>
          <Button onClick={onCancel} className="btn btn2__filled">
            Yes, Cancel It
          </Button>
        </div>
        <p>
          If you cancel a booking after Talent has confirmed, you may be subject
          to a cancellation fee.
        </p>
      </div>
    </div>
  );
}

export default CancelModal;

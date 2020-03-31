import React, { useEffect, useRef } from 'react';
import ReactCrop from 'react-image-crop';

import Button from 'Elements/Button/Button'; 

export interface Crop {
  aspect?: number;
  height: number;
  minHeight?: number;
  minWidth?: number;
  unit?: '%' | 'px';
  width: number;
  x: number;
  y: number;
}

interface Props {
  crop: Crop;
  isVisible: boolean;
  onSaveCrop: VoidFunction;
  onUpdateCrop: (crop: Crop) => void;
  onUpdateImageSize: (size: any) => void;
  source: any;
}

const AvatarEditor = (props: Props) => {
  const { crop, isVisible, onSaveCrop, onUpdateCrop, onUpdateImageSize, source } = props;

  if (!isVisible || !source) {
    return null;
  }

  const imgContainer = useRef(null);

  const updateDimensions = () => {
    const height = imgContainer.current ? imgContainer.current.offsetHeight : 0;
    const width = imgContainer.current ? imgContainer.current.offsetWidth : 0;

    const dimensions = {
      height,
      width,
    };

    onUpdateImageSize(dimensions);
  };

  /*useEffect(() => {
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);
  */
  

  useEffect(() => {
    updateDimensions();
  }, [imgContainer.current]);

  return (
    <div className="modal is-active avatar-editor-modal">
      <div className="modal-background" />
      <div className="modal-content">
        <div className="avatar-editor" ref={imgContainer}>
          <ReactCrop
            crop={crop}
            keepSelection
            onChange={(newCrop: Crop) => onUpdateCrop(newCrop)}
            src={source}
          />
        </div>

        <Button className="btn2 btn2__filled btn2-full" onClick={onSaveCrop}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default AvatarEditor;

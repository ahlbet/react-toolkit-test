import React from 'react';

interface Props {
  rating: number;
}

const StarRating = (props: Props) => {
  const FULL_STAR = require('assets/images/filled.svg');
  const HALF_STAR = require('assets/images/star-half.svg');
  const EMPTY_STAR = require('assets/images/star-empty.svg');

  const { rating } = props;

  const buildRatingList = () => {
    const iconList = [];

    for (let i = 0; i < 5; ++i) {
      if (rating > i + 0.6) {
        iconList.push(FULL_STAR);
      } else if (rating > i + 0.2) {
        iconList.push(HALF_STAR);
      } else {
        iconList.push(EMPTY_STAR);
      }
    }

    return iconList;
  };

  const renderStars = () => {
    return buildRatingList().map((icon, index) => {
      return <img key={index} src={icon} />;
    });
  };

  return (
    <div className="has-text-centered profile-card__rating-wrap">
      {renderStars()}
    </div>
  );
};

export default StarRating;

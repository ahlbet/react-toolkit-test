import React from 'react';
import { Link } from 'react-router-dom';

import { getDisplayName } from 'utils/user_utils';

interface TalentCardProps {
  talentName: string;
  creditCost: number;
  isLive?: boolean;
  id?: any;
  talent?: any;
  key?: string;
}

const TalentCard = (props: TalentCardProps) => {
  const { id, talentName, creditCost, isLive, talent } = props;

  // NOTE: if talent has display_name (which means they have a slug), then use the friendly id slug, if not, use the id
  const slug = talent.attributes.slug;
  const getUrlParam = slug ? slug : id;

  return (
    <div className="talent-card">
      <Link to={'/profile/' + getUrlParam}>
        <div
          className="talent-card__image"
          style={{
            backgroundImage: `url(${talent.attributes.avatar_url})`,
          }}></div>
        {/* <img
          className="talent-card__image"
          src={talent.attributes.avatar_url}
        /> */}
        <div className="talent-card__name">
          {getDisplayName(talent.attributes)}
        </div>
        <p className="talent-card__headline">
          {talent.attributes.talent_profile.headline}
        </p>
        <div className="talent-card__credit">
          <img
            className="talent-card__credit--image"
            src={require('assets/images/icons-custom-ui-credits.svg')}
          />
          <p className="talent-card__credit--text">
            <span>{talent.attributes.talent_profile.rate}</span> / min
          </p>
        </div>
      </Link>
    </div>
  );
};

export default TalentCard;

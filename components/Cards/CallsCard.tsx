import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import momentFormatCall, { CallFormatType } from 'helpers/momentFormatCall';
import Avatar from 'Elements/Avatar/Avatar';
import { getDisplayName } from 'utils/user_utils';
import {
  isLiveEvent,
  isExpired,
  isCancelled,
  isComplete,
  canJoinEvent,
} from 'utils/event_utils';
import isWithinTime from 'helpers/isWithinTime';
import { formatMMSS } from 'utils/time_utils';

interface CallsCardProps {
  call: any;
  isBookingsHistory?: boolean;
  priceHidden?: boolean;
  isBookings?: boolean;
  isCallHistory?: boolean;
  isDeclined?: boolean;
}

function dateString(call) {
  if (
    call.attributes &&
    call.attributes.proposed_times &&
    call.attributes.proposed_times[0]
  ) {
    return new Date(call.attributes.proposed_times[0]).toString();
  } else {
    return null;
  }
}

const CallsCard = (props: CallsCardProps) => {
  const {
    call,
    isBookings,
    isBookingsHistory,
    isCallHistory,
    priceHidden,
  } = props;

  const isLive = isLiveEvent(call);

  const statusText = () => {
    if (isExpired(call)) {
      return 'Expired';
    }

    if (canJoinEvent(call) && (isWithinTime(call) || isLive)) {
      return 'Join Call';
    }

    if (isCancelled(call)) {
      return 'Cancelled';
    }

    if (isComplete(call)) {
      return 'Complete';
    }

    return 'See Details';
  };

  const cardName = () => {
    const name = isBookings
      ? getDisplayName(call.attributes.user)
      : getDisplayName(call.attributes.attendee);

    const text = [isLive ? 'Live' : null, name];

    return text.filter(n => n).join(' - ');
  };

  const renderStatus = () => {
    if (isBookingsHistory) {
      return (
        <div className="calls-card__bookings">
          <span className="calls-card__duration">
            {call.attributes.minutes} mins
          </span>
          <span className="calls-card__credits">
            <img src={require('assets/images/credits.svg')} />
            {call.attributes.total_cost} credits
          </span>
        </div>
      );
    }

    switch (call.attributes.status) {
      case 'pending':
        return isBookings ? (
          <div>
            <span className="calls-card__duration">
              {call.attributes.minutes} mins
            </span>

            <span className="calls-card__cost">
              ${call.attributes.total_cost}
            </span>
          </div>
        ) : (
          <span className="calls-card__duration">Requested</span>
        );
      case 'active':
        return (
          <div>
            <span className="calls-card__duration">
              {call.attributes.minutes} mins
            </span>
            {isBookings && (
              <span className="calls-card__cost">
                ${call.attributes.total_cost}
              </span>
            )}
          </div>
        );
    }
  };

  const renderInfoRight = () => {
    return (
      <div>
        <div className="btn calls-card__caret">
          <img src={require('assets/images/caret.svg')} />
        </div>
        <div className="btn calls-card__details">{statusText()}</div>
      </div>
    );
  };

  const renderDate = () => {
    return (
      <>
        {momentFormatCall(call.attributes.start_at, CallFormatType.DayOfWeek)}{' '}
        {momentFormatCall(call.attributes.start_at, CallFormatType.Month)}{' '}
        {momentFormatCall(call.attributes.start_at, CallFormatType.Day)}
        {' | '}
        {momentFormatCall(call.attributes.start_at, CallFormatType.Time)}
      </>
    );
  };

  const renderInfoMiddle = () => {
    return isBookingsHistory ? (
      <div>
        <span className="calls-card__date">{dateString(call)}</span>
        {call.attributes.total_cost && !priceHidden && (
          <span className="calls-card__bookings--price">
            ${call.attributes.total_cost}
          </span>
        )}
      </div>
    ) : (
      <div>
        {call.attributes.start_at ? (
          <span className="calls-card__date">{renderDate()}</span>
        ) : isBookings && !isLive ? (
          <span className="calls-card__date">
            {call.attributes.proposed_times.length} Options
          </span>
        ) : (
          <div></div>
        )}
      </div>
    );
  };

  const renderInfoLeft = () => {
    return (
      <div className="calls-card__info--left">
        <span className="calls-card__name">{cardName()}</span>
        {renderInfoMiddle()}
        {renderStatus()}
      </div>
    );
  };

  const renderInfo = () => {
    return (
      <div className="calls-card__info">
        {renderInfoLeft()}
        {renderInfoRight()}
      </div>
    );
  };

  const detailURL = isBookings ? '/booking-detail' : '/call-detail';

  const calculateCallDuration = () => {
    if (!call.attributes.actual_start_at || !call.attributes.actual_end_at) {
      return call.attributes.minutes;
    }

    const duration = moment(call.attributes.actual_start_at).diff(
      moment(call.attributes.actual_end_at),
      'seconds',
    );

    return formatMMSS(duration);
  };

  if (isCallHistory) {
    return (
      <div className="calls-card-call-history">
        <Avatar
          className="calls-card-call-history__avatar"
          avatarURL={call.attributes.attendee_avatar_url}
          isSmall
          withBorder
        />
        <div>
          <p className="calls-card-call-history__talent-name">
            {getDisplayName(call.attributes.attendee)}
          </p>
          <p className="calls-card-call-history__date">
            {props.isDeclined ? <>Declined</> : <>{renderDate()}</>}
          </p>
          <div className="calls-card-call-history__bottom">
            <span className="calls-card-call-history__duration">
              {calculateCallDuration()} mins
            </span>
            <span className="calls-card-call-history__credits">
              <img src={require('assets/images/credits.svg')} />
              {call.attributes.user_cost} credits
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link
      to={`${detailURL}/${call.id}`}
      className={
        isBookingsHistory ? `calls-card calls-card__padding-fix` : `calls-card`
      }>
      <div>
        <Avatar
          className="calls-card__avatar"
          avatarURL={
            isBookings
              ? call.attributes.owner_avatar_url
              : call.attributes.attendee_avatar_url
          }
          isSmall
          withBorder
        />
      </div>
      {renderInfo()}
    </Link>
  );
};

export default CallsCard;

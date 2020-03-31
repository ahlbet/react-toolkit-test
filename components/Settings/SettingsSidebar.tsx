import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'Elements/Button/Button';

import {
  accountMenuTalentData,
  accountMenuFanData,
} from 'helpers/MobileNavData';

export enum SettingsTabType {
  Alerts,
  BankingInfo,
  BookingsHistory,
  CallsHistory,
  Credits,
  Info,
  Payment,
  Profile,
}

interface SettingsSidebarProps {
  isTalent?: boolean;
  activeTab: SettingsTabType;
}

const SettingsSidebar = (props: SettingsSidebarProps) => {
  const [logoutModal, setLogoutModal] = useState(false);

  const { isTalent, activeTab } = props;

  const handleLogout = () => {
    const link = document.createElement('a');
    link.setAttribute('href', '/users/sign_out');
    link.setAttribute('rel', 'nofollow');
    link.setAttribute('data-method', 'delete');
    document.body.appendChild(link);
    link.click();
  };

  const renderLogoutModal = () => {
    return (
      <div className="call-detail-view__cancel-modal-wrap">
        <div
          className="call-detail-view__cancel-modal"
          style={{ height: 'fit-content' }}>
          <div className="call-detail-view__cancel-modal--x-wrap">
            <Button
              className="call-detail-view__cancel-modal--x"
              onClick={() => setLogoutModal(false)}>
              <img alt="x" src={require('assets/images/x.svg')} />
            </Button>
          </div>
          <h3>Are you sure you want to log out?</h3>
          <div className="call-detail-view__cancel-modal--actions">
            <Button
              onClick={() => setLogoutModal(false)}
              className="btn btn2__white">
              Cancel
            </Button>
            <Button onClick={handleLogout} className="btn btn2__filled">
              Yes
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="settings-sidebar">
      <div className="settings-sidebar__main">
        <div className="settings-sidebar__tabs">
          {isTalent
            ? accountMenuTalentData.map(item => {
                const activeClass: string =
                  item.type === activeTab && 'settings-sidebar__active';

                return (
                  <Link
                    to={item.path}
                    className={`btn ${activeClass}`}
                    key={item.title}>
                    <img src={require(`assets/images/${item.iconURL}.svg`)} />
                    <span>{item.title}</span>
                  </Link>
                );
              })
            : accountMenuFanData.map(item => {
                const activeClass: string =
                  item.type === activeTab && 'settings-sidebar__active';

                return (
                  <Link
                    to={item.path}
                    className={`btn ${activeClass}`}
                    key={item.title}>
                    <img src={require(`assets/images/${item.iconURL}.svg`)} />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
        </div>

        {logoutModal && renderLogoutModal()}
        <a onClick={() => setLogoutModal(true)} className="btn">
          <img
            alt="Log Out Icon"
            src={require('../../../../assets/images/log-out.svg')}
          />
          <span>Log out</span>
        </a>
      </div>
    </div>
  );
};

export default SettingsSidebar;

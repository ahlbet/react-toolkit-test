import React, { useState, useEffect } from 'react';

import Button from 'Elements/Button/Button';
import MainNavItem from 'Elements/Navigation/MainNavItem';
import MobileNav from 'Elements/Navigation/MobileNav';
import NavDropdown, { NavDropdownType } from 'Elements/Dropdown/NavDropdown';

interface HeaderProps {
  bookingsActive?: boolean;
  callsActive?: boolean;
  className: string;
  initialState?: Object;
  isAuth: boolean;
  isTalent?: boolean;
  searchActive?: boolean;
  shouldGetHtml?: boolean;
}

interface HeaderState {
  isMobileNavOpen: boolean;
}

const Header = (props: HeaderProps) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    isMobileNavOpen
      ? document.body.classList.add('no-scroll')
      : document.body.classList.remove('no-scroll');
  });

  const {
    bookingsActive,
    callsActive,
    className,
    initialState,
    isAuth,
    isTalent,
    searchActive,
    shouldGetHtml,
  } = props;

  const renderRightNav = () => {
    if (isAuth) {
      return (
        <div className="header__right">
          {/* this empty div is to maintain flex spacing on mobile */}
          <div></div>
          <div className="header__right--auth">
            <NavDropdown
              type={NavDropdownType.Account}
              isTalent={isTalent}
              initialState={initialState}
            />
            {/*
              design currently unclear if Alerts is included
              <NavDropdown type={NavDropdownType.Alert} alertCount={2} />
            */}
          </div>
        </div>
      );
    } else {
      return (
        <div className="header__right">
          <a className="btn btn__right-margin" href="/users/sign_up">
            Sign up
          </a>
          <a className="btn btn__right-margin" href="/users/sign_in">
            Log in
          </a>
        </div>
      );
    }
  };

  const renderSearch = () => {
    return (
      <MainNavItem
        className="btn btn__main-nav header__item"
        disabled={false}
        active={searchActive}
        to="/search"
        shouldGetHtml={shouldGetHtml}>
        <img
          className="header__item--icon"
          src={require('assets/images/discover.svg')}
        />
        <span>Our Talent</span>
      </MainNavItem>
    );
  };

  const renderCalls = () => {
    return (
      <MainNavItem
        className="btn btn__main-nav header__item"
        disabled={false}
        active={callsActive}
        to="/calls"
        shouldGetHtml={shouldGetHtml}>
        <img
          className="header__item--icon"
          src={require('assets/images/chats.svg')}
        />
        <span>Calls</span>
      </MainNavItem>
    );
  };

  const renderBookings = () => {
    return (
      <MainNavItem
        className="btn btn__main-nav header__item"
        disabled={false}
        active={bookingsActive}
        to="/bookings"
        shouldGetHtml={shouldGetHtml}>
        <img
          className="header__item--icon"
          src={require('assets/images/all.svg')}
        />
        <span>Bookings</span>
      </MainNavItem>
    );
  };

  return (
    <div className={className}>
      <div className="header__left">
        {isMobileNavOpen && (
          <MobileNav
            isAuth={isAuth}
            isTalent={isTalent}
            onXClicked={() => setIsMobileNavOpen(false)}
            shouldGetHtml={shouldGetHtml}
          />
        )}
        <div className="header__hamburger">
          <Button
            onClick={() => {
              setIsMobileNavOpen(true);
            }}
            className="btn"
            disabled={false}>
            <img
              src={require('assets/images/hamburger.svg')}
              className="header__hamburger--icon"
            />
          </Button>
        </div>
        <a href="/">
          <img
            className="header__logo--big"
            // src={require('assets/images/dark@3x.png')}
            src={require('assets/images/logo-main.png')}
          />
        </a>
      </div>
      <div className="header__middle">
        <img
          className="header__logo--small"
          src={require('assets/images/logo.svg')}
        />
        {isAuth && renderSearch()}
        {isAuth && renderCalls()}
        {isTalent && renderBookings()}
      </div>
      {renderRightNav()}
    </div>
  );
};

export default Header;

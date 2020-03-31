import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Button from 'Elements/Button/Button'
import {
  menuAuthTalentData,
  menuAuthFanData,
  menuUnauthData,
  bottomAuthData,
  bottomUnauthData,
  accountMenuTalentData,
  accountMenuFanData,
} from 'helpers/MobileNavData'

interface MobileNavProps {
  isAuth?: boolean
  isTalent?: boolean
  // TODO: improve type here
  onXClicked: any
  // this is just for storybook testing
  initialState?: Object
  shouldGetHtml?: boolean;
}

interface MobileNavState {
  accountOpen: boolean
  logoutModal: boolean
}

class MobileNav extends Component<MobileNavProps, MobileNavState> {
  constructor(props: MobileNavProps) {
    super(props)
    this.state = {
      accountOpen: false,
      logoutModal: false,
      ...props.initialState,
    }
  }

  handleLogout = () => {
    const link = document.createElement('a')
    link.setAttribute('href', '/users/sign_out')
    link.setAttribute('rel', 'nofollow')
    link.setAttribute('data-method', 'delete')
    document.body.appendChild(link)
    link.click()
  }

  renderLogoutModal = () => {
    return (
      <div className="call-detail-view__cancel-modal-wrap">
        <div
          className="call-detail-view__cancel-modal"
          style={{ height: 'fit-content' }}
        >
          <div className="call-detail-view__cancel-modal--x-wrap">
            <Button
              className="call-detail-view__cancel-modal--x"
              onClick={() => this.setState({ logoutModal: false })}
            >
              <img alt="x" src={require('assets/images/x.svg')} />
            </Button>
          </div>
          <h3>Are you sure you want to log out?</h3>
          <div className="call-detail-view__cancel-modal--actions">
            <Button
              onClick={() => this.setState({ logoutModal: false })}
              className="btn btn2__white"
            >
              Cancel
            </Button>
            <Button
              onClick={this.handleLogout.bind(this)}
              className="btn btn2__filled"
            >
              Yes
            </Button>
          </div>
        </div>
      </div>
    )
  }

  renderBottomItems = data => {
    const paddingTopStyles = { paddingTop: '1.56rem' }
    const { onXClicked } = this.props

    return (
      <div
        className="mobile-nav__bottom"
        style={data === bottomUnauthData ? paddingTopStyles : {}}
      >
        <div className="mobile-nav__bottom--main">
          {data.map(item => {
            if (item.title === "Sign up") {
              return (
                <a
                  key={item.title}
                  onClick={onXClicked}
                  className="btn mobile-nav__bottom-item"
                  href={item.path}
                >
                  {item.title}
                </a>
              )
            }
            else if (item.title == "Log In") {
              return (
                <a
                  key={item.title}
                  onClick={onXClicked}
                  className="btn mobile-nav__bottom-item"
                  href={item.path}
                >
                  {item.title}
                </a>
              )
            }
            else {
              return (
                <Link
                  to={item.path}
                  className="btn mobile-nav__bottom-item"
                  key={item.title}
                  onClick={onXClicked}
                >
                  {item.title}
                </Link>
              )
            }

            // TODO: Once the sign up button feature flag is removed. Replace the above with this original code.
            // return item.title === 'Sign up' || item.title === 'Log in' ? (
            //   <a
            //     key={item.title}
            //     onClick={onXClicked}
            //     className="btn mobile-nav__bottom-item"
            //     href={item.path}
            //   >
            //     {item.title}
            //   </a>
            // ) : (
            //   <Link
            //     to={item.path}
            //     className="btn mobile-nav__bottom-item"
            //     key={item.title}
            //     onClick={onXClicked}
            //   >
            //     {item.title}
            //   </Link>
            // )
          })}
        </div>
        {data === bottomAuthData && (
          <>
            {this.state.logoutModal && this.renderLogoutModal()}
            <a
              onClick={() => this.setState({ logoutModal: true })}
              className="btn btn__mobile-log-out"
            >
              <img src={require('assets/images/log-out.svg')} />
              <span>Log Out</span>
            </a>
          </>
        )}
      </div>
    )
  }

  renderMenuItem = (item) => {
    const { onXClicked } = this.props

    return this.props.shouldGetHtml ? (
      <a href={item.path} onClick={onXClicked} className="btn">
        <div>
          <img
            className="mobile-nav__menu--icon"
            src={require(`assets/images/${item.iconURL}.svg`)}
          />
          <span>{item.title}</span>
        </div>
      </a>
    ) : (
      <Link to={item.path} onClick={onXClicked} className="btn">
        <div>
          <img
            className="mobile-nav__menu--icon"
            src={require(`assets/images/${item.iconURL}.svg`)}
          />
          <span>{item.title}</span>
        </div>
      </Link>
    );
  };

  renderMenuItems = data => {
    const { onXClicked } = this.props
    return (
      <ul className="mobile-nav__menu">
        {data.map(item => {
          return (
            <li key={item.title}>
              {item.isAccount ? (
                <Button
                  onClick={() => {
                    this.setState({ accountOpen: !this.state.accountOpen })
                  }}
                  className="btn">
                  <div>
                    <img
                      className="mobile-nav__menu--icon"
                      src={require(`assets/images/${item.iconURL}.svg`)}
                    />
                    <span>{item.title}</span>
                  </div>
                  <img
                    src={require('assets/images/caret.svg')}
                    style={
                      this.state.accountOpen
                        ? { transform: 'rotate(180deg)' }
                        : {}
                    }
                  />
                </Button>
              ) : (
                this.renderMenuItem(item)
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  renderAccountMenuItems = data => {
    const { onXClicked } = this.props
    return (
      <ul className="mobile-nav__account-menu">
        {data.map(item => {
          return (
            <li key={item.title}>
              {this.props.shouldGetHtml ? (
                <a href={item.path} onClick={onXClicked} className="btn">
                  <img
                    className="mobile-nav__account-menu--icon"
                    src={require(`assets/images/${item.iconURL}.svg`)}
                  />
                  <span>{item.title}</span>
                </a>
              ) : (
                <Link to={item.path} onClick={onXClicked} className="btn">
                  <img
                    className="mobile-nav__account-menu--icon"
                    src={require(`assets/images/${item.iconURL}.svg`)}
                  />
                  <span>{item.title}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  renderAccountMenu = () => {
    return this.props.isTalent
      ? this.renderAccountMenuItems(accountMenuTalentData)
      : this.renderAccountMenuItems(accountMenuFanData)
  }

  renderMenu = () => {
    if (this.props.isAuth) {
      return this.props.isTalent
        ? this.renderMenuItems(menuAuthTalentData)
        : this.renderMenuItems(menuAuthFanData)
    } else {
      return this.renderMenuItems(menuUnauthData)
    }
  }

  renderBottomBar = () => {
    return this.props.isAuth
      ? this.renderBottomItems(bottomAuthData)
      : this.renderBottomItems(bottomUnauthData)
  }

  render() {
    const { onXClicked } = this.props
    return (
      <div className="mobile-nav">
        <div className="mobile-nav__wrap">
          <div className="mobile-nav__top">
            <Button
              className="btn"
              onClick={() => onXClicked()}
              disabled={false}
            >
              <img src={require('assets/images/x.svg')} />
            </Button>
          </div>
          {this.renderMenu()}
          {this.state.accountOpen && this.renderAccountMenu()}
          {this.renderBottomBar()}
        </div>
      </div>
    )
  }
}

export default MobileNav

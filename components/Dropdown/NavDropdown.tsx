import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// TODO: confirm with design whether Alerts fits this type of component

import Button from 'Elements/Button/Button'
import {
  accountMenuTalentData,
  accountMenuFanData,
} from 'helpers/MobileNavData'

export enum NavDropdownType {
  Account,
  Alerts,
}

interface NavDropdownProps {
  type: NavDropdownType
  isTalent?: boolean
  alertCount?: number
  // initialState for Storybook
  initialState?: Object
}

function NavDropdown(props: NavDropdownProps) {
  const [accountOpen, setAccountOpen] = useState(false)
  const [logoutModal, setLogoutModal] = useState(false)

  const renderItems = () => {
    if (props.isTalent) {
      return (
        <div className="nav-dropdown__items">
          {accountMenuTalentData.map(item => {
            return (
              <Link
                to={item.path}
                className="btn nav-dropdown__item"
                key={item.title}
                onClick={() => setAccountOpen(false)}
              >
                <img src={require(`assets/images/${item.iconURL}.svg`)} />
                <span>{item.title}</span>
              </Link>
            )
          })}
          {logoutModal && renderLogoutModal()}
          <a onClick={() => setLogoutModal(true)} className="btn nav-dropdown__item">
            <img src={require(`assets/images/log-out.svg`)} />
            <span>Log out</span>
          </a>
        </div>
      )
    } else {
      return (
        <div className="nav-dropdown__items">
          {accountMenuFanData.map(item => {
            return (
              <Link
                to={item.path}
                className="btn nav-dropdown__item"
                onClick={() => setAccountOpen(false)}
                key={item.title}
              >
                <img src={require(`assets/images/${item.iconURL}.svg`)} />
                <span>{item.title}</span>
              </Link>
            )
          })}{' '}
          {logoutModal && renderLogoutModal()}
          <a onClick={() => setLogoutModal(true)} className="btn nav-dropdown__item">
            <img src={require('assets/images/log-out.svg')} />
            <span>Log out</span>
          </a>
        </div>
      )
    }
  }

  const handleLogout = () => {
    const link = document.createElement('a');
    link.setAttribute('href', '/users/sign_out');
    link.setAttribute('rel', 'nofollow');
    link.setAttribute('data-method', 'delete');
    document.body.appendChild(link);
    link.click();
  }

  const renderLogoutModal = () => {
    return (
      <div className="call-detail-view__cancel-modal-wrap">
        <div className="call-detail-view__cancel-modal" style={{ height: 'fit-content'}}>
          <div className="call-detail-view__cancel-modal--x-wrap">
            <Button
              className="call-detail-view__cancel-modal--x"
              onClick={() => setLogoutModal(false)}
            >
              <img alt="x" src={require('assets/images/x.svg')} />
            </Button>
          </div>
          <h3>Are you sure you want to log out?</h3>
          <div className="call-detail-view__cancel-modal--actions">
            <Button
              onClick={() => setLogoutModal(false)}
              className="btn btn2__white"
            >
              Cancel
            </Button>
            <Button onClick={handleLogout} className="btn btn2__filled">
              Yes
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const renderButton = (type, alertCount) => {
    if (type === NavDropdownType.Account) {
      return (
        <Button
          onClick={() => setAccountOpen(!accountOpen)}
          className="btn btn__nav"
          disabled={false}
        >
          <img src={require('assets/images/account.svg')} />
          <span>{type === NavDropdownType.Account ? 'Account' : 'Alerts'}</span>
          <img src={require('assets/images/caret.svg')} />
        </Button>
      )
    } else {
      return (
        <Button onClick={() => {}} className="btn btn__nav" disabled={false}>
          <div className="btn__nav--alert">
            <span>{alertCount}</span>
          </div>
          <span>{type}</span>
          <img src={require('assets/images/caret.svg')} />
        </Button>
      )
    }
  }

  const { type, alertCount } = props
  return (
    <div className="nav-dropdown">
      {renderButton(type, alertCount)}
      {accountOpen && renderItems()}
    </div>
  )
}

export default NavDropdown

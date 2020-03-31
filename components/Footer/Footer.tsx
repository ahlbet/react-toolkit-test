import React from 'react'

import Button from 'Elements/Button/Button'
import { Link } from 'react-router-dom'
// TODO: decide if footer even needs props

interface FooterProps {}

const Footer = (props: FooterProps) => {
  return (
    <div id="footer" className="columns is-tablet footer">
      <div className="column is-narrow footer__logo">
        <Link to="/">
          <img
            // className="footer__logo"
            // src={require('assets/images/dark@3x.png')}
            src={require('assets/images/logo-main.png')}
          />
        </Link>
      </div>
      <div className="columns is-mobile column footer__link-wrap">
        <div className="column footer__links">
          <Link to="/contact" className="btn footer__link">
            Contact us
          </Link>
          <Link to="/terms" className="btn footer__link">
            Terms & conditions
          </Link>
          <Link to="/privacy" className="btn footer__link">
            Privacy policy
          </Link>
          {/* <Link to='/newtalent'>
            New Talent
          </Link> */}
        </div>

        <div className="column footer__stores is-narrow">
          <a href="https://apps.apple.com/us/app/real-talk-live/id1495499000?ign-mpt=uo%3D2" target="_blank">
            <img src={require('assets/images/app-store-badge.png')} />
          </a>
          <a href="https://play.google.com/store/apps/details?id=co.realtalklive" target="_blank" className="btn footer__store">
            <img src={require('assets/images/google-play-badge.png')} />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer

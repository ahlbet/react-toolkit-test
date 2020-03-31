import React from 'react'
import { Link } from 'react-router-dom'

interface MainNavItemProps {
  active?: boolean
  children: React.ReactNode
  className: string
  disabled?: boolean
  shouldGetHtml?: boolean
  to: string
}

const MainNavItem = (props: MainNavItemProps) => {
  const { shouldGetHtml } = props

  let activeClass = props.active && `header__item--active`

  if (shouldGetHtml) {
    return (
      <a href={props.to} className={`${props.className} ${activeClass}`}>
        <div className="header__item--main">{props.children}</div>
        {props.active && <div className="header__item--underline"></div>}
      </a>
    )
  }

  return (
    <Link to={props.to} className={`${props.className} ${activeClass}`}>
      <div className="header__item--main">{props.children}</div>
      {props.active && <div className="header__item--underline"></div>}
    </Link>
  )
}

export default MainNavItem

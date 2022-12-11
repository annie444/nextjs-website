import Link from 'next/link'
import React from 'react'

type NavItemProps = {
  text: string
  href: string
  active: boolean
}

const NavItem = ({ text, href, active }: NavItemProps): JSX.Element => {
  return (
    <>
      <Link className={`nav__item ${active ? 'active' : ''}`} href={href}>
        {text}
      </Link>
    </>
  )
}

export default NavItem

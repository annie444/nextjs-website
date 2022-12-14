import Link from 'next/link'
import React from 'react'
import styles from '../styles/NavItem.module.css'

type NavItemProps = {
  text: string
  href: string
  active: boolean
}

export const NavItem = ({ text, href, active }: NavItemProps): JSX.Element => {
  return (
    <>
      <Link
        className={`${styles['nav-item']} ${active ? styles['active'] : ''}`}
        href={href}
      >
        {text}
      </Link>
    </>
  )
}

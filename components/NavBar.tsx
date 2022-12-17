import { NavItem } from './NavItem'
import React from 'react'
import menu from '../public/cache/menu.json'
import { Collapse } from '@nextui-org/react'

export const Navbar = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const pages = menu.data

  return (
    <>
      <Collapse.Group splitted style={{ width: '100%' }}>
        {pages.map((page, idx: number) => (
          <NavItem
            text={page.data.Title ?? page.slug}
            href={page.slug}
            idx={idx}
            key={idx}
          >
            {children}
          </NavItem>
        ))}
      </Collapse.Group>
    </>
  )
}

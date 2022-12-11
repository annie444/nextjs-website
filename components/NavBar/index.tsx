import React, { useState } from 'react'
import NavItem from '../NavItem'

const MENU_LIST = [
  { text: 'About Me', href: '/' },
  { text: 'Education', href: '/education' },
  { text: 'Work Experience', href: '/employment' },
  { text: 'Publications', href: '/publications' },
  { text: 'Research', href: '/research' },
  { text: 'Contact', href: '/contact' },
]

const Navbar = (): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setNavActive] = useState<boolean>()
  const [activeIdx, setActiveIdx] = useState(-1)

  return (
    <>
      {MENU_LIST.map((menu, idx) => (
        <div
          onClick={() => {
            setActiveIdx(idx)
            setNavActive(false)
          }}
          key={menu.text}
        >
          <NavItem active={activeIdx === idx} {...menu} />
        </div>
      ))}
    </>
  )
}

export default Navbar

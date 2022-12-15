import { useState } from 'react'
import { NavItem } from './NavItem'
import React from 'react'

interface Post {
  slug?: string
  title?: string
  description?: string
  date?: string
  author?: string
}

export const Navbar = ({ pages }: { pages: Post[] }): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nav, setNavActive] = useState<boolean>()
  const [activeIdx, setActiveIdx] = useState(0)

  return (
    <>
      {pages.map((page: Post, idx: number) => (
        <div
          onClick={() => {
            setActiveIdx(idx)
            setNavActive(false)
          }}
          key={idx}
        >
          <NavItem
            active={activeIdx === idx}
            text={page.title ?? page.slug ?? 'No Title'}
            href={`${encodeURIComponent(page.slug ?? '')}`}
          />
        </div>
      ))}
    </>
  )
}

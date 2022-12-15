import { useEffect, useState } from 'react'
import anime from 'animejs'
import React from 'react'
import { type MouseEvent } from 'react'

type itemType = {
  id: number
  i: number
  key: number
  columns: number
  rows: number
}

type propsType = {
  columns: number
  rows: number
  items: itemType[]
}

export const GridItem = (props: propsType): JSX.Element => {
  const [columns, setColumns] = useState<number>(props.columns)
  const [rows, setRows] = useState<number>(props.rows)

  const clickHandler = (e: MouseEvent<HTMLDivElement>) => {
    anime({
      targets: '.grid-item',
      scale: [
        { value: 0.1, easing: 'easeOutSine', duration: 500 },
        { value: 1, easing: 'easeInOutQuad', duration: 1200 },
      ],
      delay: anime.stagger(200, {
        grid: [columns, rows],
        from: parseInt(e.currentTarget.id),
      }),
    })
  }

  useEffect(() => {
    setColumns(props.columns)
    setRows(props.rows)

    anime({
      targets: '.grid-item',
      scale: [
        { value: 0.1, easing: 'easeOutSine', duration: 500 },
        { value: 1, easing: 'easeInOutQuad', duration: 1200 },
      ],
      delay: anime.stagger(200, {
        grid: [props.columns, props.rows],
        from: 'center',
      }),
    })
  }, [props.columns, props.rows])

  return (
    <>
      {props.items.map((item: itemType) => {
        return (
          <div
            className="grid-item"
            id={item.id.toString()}
            key={item.i}
            onClick={clickHandler}
          ></div>
        )
      })}
    </>
  )
}

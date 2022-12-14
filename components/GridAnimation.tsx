import { useEffect, useState, useRef, useCallback } from 'react'
import styles from '../styles/GridAnimation.module.css'
import { GridItem } from './GridItem'
import React from 'react'

export const GridAnimation = (): JSX.Element => {
  const gridRef = useRef<HTMLDivElement>(null)

  const [columns, setColumns] = useState(1)
  const [rows, setRows] = useState(1)
  const [total, setTotal] = useState(1)

  const [GridItems, setGridItems] = useState(
    Array.from(Array(total)).map((e, i) => {
      return {
        id: i,
        i: i,
        key: i,
        columns: columns,
        rows: rows,
      }
    })
  )

  const createGrid = useCallback(() => {
    setColumns(Math.floor(window.innerWidth / 50))
    setRows(Math.floor(window.innerHeight / 50))
    setTotal(
      Math.floor(window.innerWidth / 50) * Math.floor(window.innerHeight / 50)
    )
    setGridItems(
      Array.from(
        Array(
          Math.floor(window.innerWidth / 50) *
            Math.floor(window.innerHeight / 50)
        )
      ).map((e, i) => {
        return {
          id: i,
          i: i,
          key: i,
          columns: columns,
          rows: rows,
        }
      })
    )
  }, [columns, rows])

  useEffect(() => {
    createGrid()
    window.addEventListener('resize', createGrid)
  }, [createGrid])

  return (
    <div
      className={styles['grid-container']}
      ref={gridRef}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      <GridItem items={GridItems} columns={columns} rows={rows} />
    </div>
  )
}

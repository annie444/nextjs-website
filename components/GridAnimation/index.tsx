import { useEffect, useState, useRef, useCallback } from 'react'
import { GridContainer } from './styles'
import gridItem from '../GridItem'
import React from 'react'

export default function GridAnimation(): JSX.Element {
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

  const createGrid = () => {
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
  }

  const memoizedGrid = useCallback(() => {
    createGrid()
  }, [])

  useEffect(() => {
    createGrid()
    window.addEventListener('resize', createGrid)
  }, [memoizedGrid])

  return (
    <>
      <GridContainer ref={gridRef} columns={columns} rows={rows}>
        {gridItem({ items: GridItems, columns: columns, rows: rows }).map(
          (item) => item
        )}
      </GridContainer>
    </>
  )
}

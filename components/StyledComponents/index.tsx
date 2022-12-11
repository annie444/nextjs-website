import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'

interface ResponsiveImageProps {
  alt: string
  src: string
}

export const ResponsiveImage = (props: ResponsiveImageProps) => (
  <Image {...props} />
)

export const Heading = {
  H1: styled.h1``,
  H2: styled.h2``,
}

export const Text = styled.p``

export const Pre = styled.pre``

export const InlineCode = styled.code``

export const Table = styled.table``

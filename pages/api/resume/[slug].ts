import { NextApiRequest, NextApiResponse } from 'next'

const url = `http://localhost:3000`

/**
 * fetches and returns all posts from json cache
 */
export const getAllPosts = async () => {
  const data = await fetch(`${url}/cache/resume.json`).then((res) => res.json())
  return data
}

/**
 * Finds and returns a single post
 */
const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query
  const data = (await getAllPosts()).find(
    (page: { slug: string }) => page.slug === slug
  )
  if (data) {
    res.status(200).json(data)
  } else {
    res.status(404)
    res.end()
  }
}

export default post

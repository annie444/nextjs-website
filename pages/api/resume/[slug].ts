import { NextApiRequest, NextApiResponse } from 'next'
// import { createClient } from '@supabase/supabase-js'

const url = 'https://annieehler.com'

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
const Resume = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query as { slug: string }
  const data = (await getAllPosts()).find(
    (page: { slug: string }) => page.slug === slug
  )
  if (data) {
    res.status(200).json(data)
    res.end()
  } else {
    res.status(404)
    res.end()
  }
}

export default Resume

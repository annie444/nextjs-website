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

// export const trySupabase = async () => {
//   const supabase = createClient(
//     <string>process.env.SUPABASE_URL,
//     <string>process.env.SERVICE_KEY
//   )
//   const { data, error } = await supabase.storage
//     .from('resume')
//     .download('public/avatar1.png')
// }

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
  } else {
    res.status(404)
    res.end()
  }
}

export default Resume

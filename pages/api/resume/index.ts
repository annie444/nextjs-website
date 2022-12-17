// You'll need to specify the absolute URL to fetch your file

export const config = {
  runtime: 'experimental-edge',
}

const url = 'https://annieehler.com'

/**
 * fetches and returns all posts from json cache
 */
export const getAllPosts = async () => {
  const data = await fetch(`${url}/cache/resume.json`).then((res) => res.json())
  return data
}

interface Post {
  slug?: string
  data?: {
    Title?: string
    Description?: string
    Date?: string
    Author?: string
  }
}

/**
 * Returns a list of paginated posts
 */
const posts = async () => {
  const data = await getAllPosts().then((res) => res)
  const mappedData = data.map((post: Post) => {
    return {
      slug: post.slug ?? '',
      title: post.data?.Title ?? '',
      description: post.data?.Description ?? '',
      date: post.data?.Date ?? '',
      author: post.data?.Author ?? '',
    }
  })
  return new Response(JSON.stringify(mappedData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600',
    },
  })
}

export default posts

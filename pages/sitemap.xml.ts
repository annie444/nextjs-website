import fetch from 'isomorphic-unfetch'
import { NextApiResponse } from 'next'
//import Cors from 'cors'

const url = 'https://annieehler.com'

export const getServerSideProps = async ({ res }: { res: NextApiResponse }) => {
  // We make an API call to gather the URLs for our site
  // Fetch our JSON file
  const posts = await fetch(`${url}/cache/resume.json`).then((res) =>
    res.json()
  )
  // Do something with your data!
  const sitemap = generateSiteMap(posts)
  res.setHeader('Content-Type', 'text/xml')
  // we send the XML to the browser
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

function generateSiteMap(posts: { slug: string }[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://jsonplaceholder.typicode.com</loc>
     </url>
     <url>
       <loc>https://jsonplaceholder.typicode.com/guide</loc>
     </url>
     ${posts
       .map(({ slug }: { slug: string }) => {
         return `
       <url>
           <loc>${`${url}/${slug}`}</loc>
       </url>
     `
       })
       .join('')}
   </urlset>
 `
}

const SiteMap = () => {
  // This is just a placeholder component
}

export default SiteMap

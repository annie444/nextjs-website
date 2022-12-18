export const config = {
  runtime: 'experimental-edge',
}

const url = 'https://annieehler.com'

const generateSiteMap = (posts: { slug: string }[]) => {
  const today = new Date()
  const dd = String(today.getDate()).padStart(2, '0')
  const mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
  const yyyy = today.getFullYear()
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
		 <url>
		 				 <loc>${url}</loc>
						 <lastmod>${`${yyyy}-${mm}-${dd}`}</lastmod>
						 <changefreq>daily</changefreq>
			</url>
			<url>
					<loc>${url}/sitemap.xml</loc>
					<lastmod>${`${yyyy}-${mm}-${dd}`}</lastmod>
					<changefreq>daily</changefreq>
			</url>
			<url>
					<loc>${url}/cache/resume.json</loc>
					<lastmod>${`${yyyy}-${mm}-${dd}`}</lastmod>
					<changefreq>monthly</changefreq>
			</url>
			<url>
					<loc>${url}/api/resume</loc>
					<lastmod>${`${yyyy}-${mm}-${dd}`}</lastmod>
					<changefreq>monthly</changefreq>
			</url>
     ${posts
       .map(({ slug }: { slug: string }) => {
         return `
       <url>
           <loc>${`${url}/${slug}`}</loc>
					 <lastmod>${`${yyyy}-${mm}-${dd}`}</lastmod>
					 <changefreq>daily</changefreq>
       </url>
			 <url>
			 		<loc>${`${url}/api/${slug}`}</loc>
					<lastmod>${`${yyyy}-${mm}-${dd}`}</lastmod>
					<changefreq>monthly</changefreq>
	 		</url>
     `
       })
       .join('')}
   </urlset>
 `
}

const SiteMap = async () => {
  // This is just a placeholder component
  // We make an API call to gather the URLs for our site
  // Fetch our JSON file
  const posts = await fetch(`${url}/cache/resume.json`).then((res) =>
    res.json()
  )
  // Do something with your data!
  const sitemap = generateSiteMap(posts)
  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'text/xml',
    },
  })
}

export default SiteMap

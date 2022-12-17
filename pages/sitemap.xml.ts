const url = 'http://localhost:3000'

export const getServerSideProps = async () => {
  // We make an API call to gather the URLs for our site
  return {
    redirect: {
      destination: `${url}/api/sitemap.xml`,
      statusCode: 302,
    },
  }
}

const SiteMap = () => {
  // This is just a placeholder component
}

export default SiteMap

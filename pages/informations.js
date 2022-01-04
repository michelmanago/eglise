import Head from 'next/head'

import Layout from '../components/layout'
import AppInformations from '../components/appinformations'

import { query } from '../lib/db'


export default function Informations ({blocks, locale}) {

// const router = useRouter()
//  const { locale, locales, defaultLocale } = router


  let title
  switch (locale) {
    case 'fr' : 
      title="Informations pratiques"
      break
    case 'en' : 
      title="General Information"
      break
    case 'ru' :
      title="Полезная информация"
      break
    default :
      throw("Erreur. langue inconnue dans informations.js : "+locale)
  }

	return (
      <Layout>
        <Head>
          	<title>{title}</title>
        </Head>
        <AppInformations blocks = {blocks} currentLanguage={locale} />
      </Layout>
    )
}


export async function getStaticProps(context) {

/*    
    const { req, query, asPath, pathname, locale } = context;
    if (req) {
        let host = req.headers.host // will give you localhost:3000
        let protocol = "https://"
        if (host === "localhost:3000") {
            protocol = "http://"
        }
        //const res = await fetch(`http://localhost:3000/api/defunts`)
        const res = await fetch(`${protocol}${host}/api/blocks/${locale}/informations`)
        const blocks = await res.json()
    
        if (!blocks) {
            return {
                notFound: true,
            }
        }
        return {
            props: { blocks, locale }, // will be passed to the page component as props
        }
    }
*/
    const { locale } = context;
//    const res = await fetch(`http://localhost:3000/api/blocks/${locale}/informations`)

      const res = await query(`
          SELECT * FROM pagecontent
          WHERE page = ? AND language = ?
          ORDER BY blockid
      `,["informations",locale])


    const blocks = JSON.parse(JSON.stringify(res))

    if (!blocks) {
        return {
            notFound: true,
        }
    }

    return {props: { blocks, locale }}
}

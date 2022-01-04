import Head from 'next/head'
import { useRouter } from 'next/router'

import Layout from '../components/layout'
import AppDons from '../components/appdons'
import { query } from '../lib/db'


export default function Dons ({locale, blocks}) {

  let title
  switch (locale) {
    case 'fr' : 
      title="Faire un don"
      break
    case 'en' : 
      title="Make a donation"
      break
    case 'ru' :
      title="Сделать пожертвование"
      break
    default :
      throw("Erreur. langue inconnue dans dons.js : "+locale)
  }

	return (
      <Layout>
        <Head>
          	<title>{title}</title>
        </Head>
        <AppDons blocks = {blocks}  currentLanguage={locale} />
      </Layout>
    )
}


export async function getStaticProps(context) {
/*    const { req, query, asPath, pathname, locale } = context;

    if (req) {
        let host = req.headers.host // will give you localhost:3000
        let protocol = "https://"
        if (host === "localhost:3000") {
            protocol = "http://"
        }
        //const res = await fetch(`http://localhost:3000/api/defunts`)
        const res = await fetch(`${protocol}${host}/api/blocks/${locale}/dons`)
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
    return {props: {  },}
}*/

    const { locale } = context;
//    const res = await fetch(`http://localhost:3000/api/blocks/${locale}/informations`)

      const res = await query(`
          SELECT * FROM pagecontent
          WHERE page = ? AND language = ?
          ORDER BY blockid
      `,["dons",locale])


    const blocks = JSON.parse(JSON.stringify(res))

    if (!blocks) {
        return {
            notFound: true,
        }
    }

    return {props: { blocks, locale }}
}


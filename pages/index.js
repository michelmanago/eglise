import Head from 'next/head'
import { useRouter } from 'next/router'

import Layout from '../components/layout'
import AppHome from '../components/apphome'

export default function Index (props) {

  const router = useRouter()
  const { locale, locales, defaultLocale } = router
  let title;
  switch (locale) {
    case 'fr' : 
      title="La nécropole russe"
      break
    case 'en' : 
      title="The Russian necropolis"
      break
    case 'ru' :
      title="Русский некрополь"
      break
    default :
      throw("Erreur. langue inconnue dans index.js : "+locale)
  }
	return (
      <Layout>
        <Head>
          <title>{title}</title>
        </Head>
        <AppHome currentLanguage={locale} />
      </Layout>
    )
}


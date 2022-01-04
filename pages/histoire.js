import Head from 'next/head'
import { useRouter } from 'next/router'

import Layout from '@/components/layout'
import AppHistoire from '@/components/apphistoire'

export default function Histoire (props) {

  const router = useRouter()
  const { locale, locales, defaultLocale } = router
  let title
  
  switch (locale) {
    case 'fr' : 
      title="Histoire de la nécropole russe"
      break
    case 'en' : 
      title="History of the Russian necropolis"
      break
    case 'ru' :
      title="История русского некрополя"
      break
    default :
      throw("Erreur. langue inconnue dans histoire.js : "+locale)
  }

	return (
      <Layout>
        <Head>
          	<title>{title}</title>
        </Head>
        <AppHistoire currentLanguage={locale} />
      </Layout>
    )
}
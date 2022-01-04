import Head from 'next/head'
import { useRouter } from 'next/router'

import Layout from '@/components/layout'
import AppCarres from '@/components/appcarres'

export default function CarresMilitaires (props) {

  const router = useRouter()
  const { locale, locales, defaultLocale } = router
  let title
  
  switch (locale) {
    case 'fr' : 
      title="Les carrés civils et militaires"
      break
    case 'en' : 
      title="Military Squares"
      break
    case 'ru' :
      title="Военные площади"
      break
    default :
      throw("Erreur. langue inconnue dans eglise.js : "+locale)
  }

	return (
      <Layout>
        <Head>
          	<title>{title}</title>
        </Head>
        <AppCarres currentLanguage={locale} />
      </Layout>
    )
}
import Header from './header.js'
import Image from 'next/image'
import Link from 'next/link'
import Footer from './footer'

import parse from 'html-react-parser'



export default function Appinformations ({currentLanguage, blocks}) {


	let block1 = blocks[0].blockcontent

	return (
		<div className="container sm:mx-auto bg-pwhite max-w-screen-xl">
		    <Header currentLanguage={currentLanguage} currentPage={"informations"} />


			<main className="p-2 mt-4 p-0 sm:p-4 md:mx-20">
				
				{parse(block1)}

			</main>
			<Footer />
		</div>	
	)
}


import Header from './header.js'
import Image from 'next/image'
import Link from 'next/link'
import Footer from './footer'

import parse from 'html-react-parser'

export default function AppDons ({currentLanguage, blocks}) {


//	let buttonText, block1=blocks[0].blockcontent, block2=blocks[1].blockcontent, block3=blocks[2].blockcontent

	let buttonText, 
		pageContent = blocks.map ((block) => {
			return(parse(block.blockcontent))
		})

	switch (currentLanguage) {
		case 'fr' :
			buttonText="Faire un Don"
	        break
		case 'en' :
			buttonText="Online donation for the crypt"
			break
		case 'ru' :
			buttonText="Онлайн-пожертвование на крипту"
	        break
		}

	return (
		<div className="container sm:mx-auto bg-pwhite max-w-screen-xl">
		    <Header currentLanguage={currentLanguage} currentPage={"dons"} />


			<main className="p-2 mt-4 sm:p-4 md:mx-20">
				
				<div className="flex flex-col">
					<div className="flex justify-center">
						<a href="https://www.helloasso.com/associations/association-cultuelle-orthodoxe-de-l-eglise-notre-dame-de-l-assomption-a-sainte-genevieve-des-bois/formulaires/2/widget"
							target="_blank"
							className="text-xs sm:text-sm bg-pgold rounded-lg text-white text-center -mt-24 sm:-mt-20 mb-20 
							h-6 sm:h-7 px-4 py-1 transition duration-300 ease-in-out hover:bg-pblue mr-6">
						    {buttonText}
						</a>
					</div>
				</div>

				{pageContent}

			</main>
			<Footer />
		</div>	
	)
}

import Link from 'next/link'

export default function Langue ({currentPage, currentLanguage}) {

	return (
		<div className="h-80px w-50px" >
		
			{currentLanguage=="fr"? 
				""
				: 
				<div className="h-40px sm:h-57px flex items-center justify-center">
					<Link href={currentPage===""?"":"/"+currentPage} locale={"fr"}>
						<a className="">

							<svg className = "" xmlns="http://www.w3.org/2000/svg" id="flag-icon-css-fr" width="30" height="22" viewBox="0 0 640 450">
								  <g fillRule="evenodd" strokeWidth="1pt">
								    <path fill="#fff" d="M0 0h640v480H0z"/>
								    <path fill="#00267f" d="M0 0h213.3v480H0z"/>
								    <path fill="#f31830" d="M426.7 0H640v480H426.7z"/>
								  </g>
							</svg>
						</a>
				</Link>
			</div>
			}	
			{currentLanguage=="ru"?
				"" 
				: 
				<div className="h-40px sm:h-57px flex items-center justify-center">
					<Link href={currentPage===""?currentPage:"/"+currentPage} locale={"ru"}>
						<a className="">

							<svg className = "" xmlns="http://www.w3.org/2000/svg" id="flag-icon-css-ru" width="30" height="22" viewBox="0 0 640 450">
							  <g fillRule="evenodd" strokeWidth="1pt">
							    <path fill="#fff" d="M0 0h640v480H0z"/>
							    <path fill="#0039a6" d="M0 160h640v320H0z"/>
							    <path fill="#d52b1e" d="M0 320h640v160H0z"/>
							  </g>
							</svg>

						</a>
					</Link>
				</div>
				}
				{currentLanguage=="en"?
					 "" : 
					<div className="h-40px sm:h-57px flex items-center justify-center">
						<Link href={currentPage===""?currentPage:"/"+currentPage} locale={"en"}>
							<a className="">
								<svg className = "" xmlns="http://www.w3.org/2000/svg" id="flag-icon-css-en" width="30" height="22" viewBox="-160 0 780 500">
								 	<g fillRule="evenodd" strokeWidth="1pt">
										<path fill="#012169" d="M-256 0H768v512H-256z"/>
						    			<path fill="#fff" d="M-256 0v57.2L653.5 512H768v-57.2L-141.5 0H-256zM768 0v57.2L-141.5 512H-256v-57.2L653.5 0H768z"/>
						    			<path fill="#fff" d="M170.7 0v512h170.6V0H170.7zM-256 170.7v170.6H768V170.7H-256z"/>
						    			<path fill="#c8102e" d="M-256 204.8v102.4H768V204.8H-256zM204.8 0v512h102.4V0H204.8zM-256 512L85.3 341.3h76.4L-179.7 512H-256zm0-512L85.3 170.7H9L-256 38.2V0zm606.4 170.7L691.7 0H768L426.7 170.7h-76.3zM768 512L426.7 341.3H503l265 132.5V512z"/>
									</g>
								</svg>

							</a>
						</Link>
					</div>
				}
		</div>

	)
}


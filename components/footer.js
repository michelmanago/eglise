import React from 'react'
import Link from 'next/link'
import "../tailwind.config.js"




const Footer = () => (
	<footer className="max-w-full mx-auto">
		<div className=" content-center justify-center  bg-pwhite mb-4  ">
			<img className="block ml-auto mr-auto w-20 sm:w-48 mt-9 " src="/static/img/ornament3.svg" alt="ornament3" />
		</div>

		<div className="w-150 bg-gray-100  content-center justify-center h-full items-center ">
			<img className=" w-center w-full " src="/static/img/ornament2.svg" alt="ornament2" />
		</div>

		<div className="main-footer  flex border-t-8 border-pdarkblue ">
			<div className="w-2/3 justify-start  ">
				<img className="sm:w-72 w-96 mt-6 ml-9 " src="/static/img/logo-cimetiere-footer.svg" alt="logo-cimetiere-footer" />
			</div>
			<div className="w-1/3"></div>
			<div className="w-1/3  justify-end">
				<a href="https://www.youtube.com/c/egliserussestegenevievedesbois">
					<img className="w-14 sm:w-20 sm:ml-18 mt-14 mx-auto my-10" src="/static/img/iconmonstr-youtube-10.svg" alt="iconmonstr-youtube-10" />
				</a>
			</div>
		</div>
	</footer>
)


export default Footer





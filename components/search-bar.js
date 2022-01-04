import Nav from './nav'

const SearchBar = ({color : color}) => (

		  	<div className="container mx-auto bg-white flex h-12 justify-between border-2 border-r-0">
	  			<div>
	  				<p className="ml-4 pt-3 whitespace-no-wrap text-grey">Rechercher sur le site</p>
	  			</div>
				<div className="w-12">
					<svg className={"-mt-2px bg-"+color+" fill-white"} width="48" height="48" viewBox="-12 -10 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
					</svg>
				</div>
			</div>

	)

export default SearchBar
	
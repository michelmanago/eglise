import {useState, useRef} from 'react';

export default function SearchBar({inputLabel, searchProp, prop, setProp}) {
    const searchRef = useRef(null);
    //const [query, setQuery] = useState('')
    const [active, setActive] = useState(false);
    const [results, setResults] = useState([]);
    const searchEndpoint = query => `/api/defunts/search?searchProp=${searchProp}&q=${query}`;

    const onClickResult = nom => {
        setProp(nom);
        setResults([])
    };
    const onChange = event => {
        const query = event.target.value;
        setProp(query);
        if (query.length > 2) {
            fetch(searchEndpoint(query))
                .then(res => res.json())
                .then(res => {
                    setResults(res);
                });
        } else {
            setResults([]);
        }
    };

    const onFocus = () => {
        setActive(true);
        window.addEventListener('click', onClick);
    };

    const onClick = event => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setActive(false);
            window.removeEventListener('click', onClick);
        }
    };
    return (
        <div className="relative" ref={searchRef}>
            <div className="flex flex-col justify-end px-1 w-60">
                <label className="block" htmlFor="name">
                    {inputLabel}
                </label>
                <input className="w-full px-2 py-1 border border-black" type="text" value={prop} onChange={onChange} onFocus={onFocus} />
            </div>

            {active && results.length > 0 && (
                <ul className="absolute left-0 z-10 w-full px-1 list-none top-10">
                    {results.map((defunt, i) => (
                        <li
                            className={`border-b border-black border-l border-r bg-blue-500 text-white px-2 py-1 cursor-pointer`}
                            key={i}
                            onClick={() => onClickResult(defunt[searchProp])}
                        >
                            {/*console.log(defunt)*/}
                            {defunt[searchProp]}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

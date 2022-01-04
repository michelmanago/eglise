import { useCallback, useRef, useState } from 'react'
import Link from 'next/link'
import styles from '../styles/search.module.css'

export default function Search({url}) {

    const searchRef = useRef(null)
    const [query, setQuery] = useState('')
    const [active, setActive] = useState(false)
    const [results, setResults] = useState([])

    const searchEndpoint = (query) => `/api/defunts/search?q=${query}`

    const onChange = useCallback((event) => {
        const query = event.target.value;
        setQuery(query)
        if (query.length) {
            fetch(searchEndpoint(query))
                .then(res => res.json())
                .then(res => {
                    setResults(res)
                })
        } else {
            setResults([])
        }
    }, [])

    const onFocus = useCallback(() => {
        setActive(true)
        window.addEventListener('click', onClick)
    }, [])

    const onClick = useCallback((event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setActive(false)
            window.removeEventListener('click', onClick)
        }
    }, [])

    return (
        <div
            className={styles.container}
            ref={searchRef}
        >
            <input
                className={styles.search}
                onChange={onChange}
                onFocus={onFocus}
                placeholder='Search defunts'
                type='text'
                value={query}
            />
            { active && results.length > 0 && (
                <ul className={styles.results}>
                    {results.map((defunt, i) => (
                        <li className={`${styles.result} border-b border-black border-l border-r`} key={defunt.id}>
                            {console.log(defunt)}
                            <Link href={`${url}${defunt.id}`}>
                                <a>{defunt.nom} {defunt.nomJFille} {defunt.prenom}</a>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
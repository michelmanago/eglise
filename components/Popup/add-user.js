import {useRef} from 'react';
import { SetMarkOperation } from 'slate';

export default function AddUser({setOpen, addUser}) {
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passRef = useRef(null);
    const roleRef = useRef(null);

    async function handleSignup(e) {
        e.preventDefault();
        setOpen(false);
        const resp = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: nameRef.current?.value,
                email: emailRef.current?.value,
                password: passRef.current?.value,
                role: roleRef.current?.value,
            }),
        });
        const json = await resp.json();

        addUser(json);
        //setMessage(json);
    }

    return (
        <form className="mt-6">
            <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
                Name
                <input
                    id="firstname"
                    type="text"
                    name="firstname"
                    placeholder="John"
                    ref={nameRef}
                    autoComplete="given-name"
                    className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                    required
                />
            </label>
            <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
                E-mail
                <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="john.doe@company.com"
                    ref={emailRef}
                    autoComplete="email"
                    className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                    required
                />
            </label>

            <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
                Password
                <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="********"
                    ref={passRef}
                    autoComplete="new-password"
                    className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                    required
                />
            </label>

            <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
                Confirm password
                <input
                    id="password-confirm"
                    type="password"
                    name="password-confirm"
                    placeholder="********"
                    autoComplete="new-password"
                    className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                    required
                />
            </label>

            <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
                Role
                <select
                    className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                    ref={roleRef}
                >
                    <option value="admin">Administrateur</option>
                    <option value="auteur">Auteur</option>
                    <option value="contributeur">Contributeur</option>
                </select>
            </label>

            <button
                type="submit"
                onClick={handleSignup}
                className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"
            >
                Ajouter
            </button>
        </form>
    );
}

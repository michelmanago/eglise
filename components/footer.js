import React from 'react';
import Link from 'next/link';
import '../tailwind.config.js';

const Footer = () => (
    <footer className="max-w-full mx-auto bg-pwhite">
        <div className="content-center justify-center mb-4 ">
            <img className="block w-20 ml-auto mr-auto sm:w-48 mt-9 " src="/static/img/ornament3.svg" alt="ornament3" />
        </div>

        <div className="items-center content-center justify-center h-full bg-gray-100 w-150 ">
            <img className="w-full  w-center" src="/static/img/ornament2.svg" alt="ornament2" />
        </div>

        <div className="flex border-t-8 main-footer border-pdarkblue ">
            <div className="justify-start w-2/3 ">
                <img
                    className="mt-6 sm:w-72 w-96 ml-9 "
                    src="/static/img/logo-cimetiere-footer.svg"
                    alt="logo-cimetiere-footer"
                />
            </div>
            <div className="w-1/3"></div>
            <div className="justify-end w-1/3">
                <a href="https://www.youtube.com/c/egliserussestegenevievedesbois">
                    <img
                        className="mx-auto my-10 w-14 sm:w-20 sm:ml-18 mt-14"
                        src="/static/img/iconmonstr-youtube-10.svg"
                        alt="iconmonstr-youtube-10"
                    />
                </a>
            </div>
        </div>
    </footer>
);

export default Footer;

import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/clerk-react"
import { Link } from "react-router-dom"
import { useState } from "react";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const list = [{
        title: 'Home',
        link: '/'
    }, {
        title: 'Favorites',
        link: '/favorites'
    }, {
        title: 'Create Shoe',
        link: '/createShoe'
    },
    {
        title: 'Create Tag',
        link: '/createTag'
    }]

    return (
        <>
            <header>
                <nav
                    className="relative flex w-full items-center justify-between bg-white py-2 shadow-dark-mild dark:bg-body-dark lg:flex-wrap lg:justify-start lg:py-4"
                    data-twe-navbar-ref>
                    <div className="flex w-full flex-wrap items-center justify-between px-3">
                        <div className="flex items-center">
                            <SignedOut>
                                <SignInButton />
                            </SignedOut>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                            <button
                                className="border-0 bg-transparent px-2 text-xl leading-none transition-shadow duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 lg:hidden"
                                type="button"
                                data-twe-collapse-init
                                data-twe-target="#navbarSupportedContentX"
                                aria-controls="navbarSupportedContentX"
                                aria-expanded={isMenuOpen}
                                aria-label="Toggle navigation"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                <span
                                    className="[&>svg]:h-7 [&>svg]:w-7 [&>svg]:stroke-black/50 ">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
                                </span>
                            </button>

                        </div>

                        <div
                            className={`!visible ${isMenuOpen ? 'block' : 'hidden'} grow basis-[100%] items-center text-center lg:!flex lg:basis-auto lg:text-left`}
                            id="navbarSupportedContentX"
                            data-twe-collapse-item>
                            <ul
                                className="me-auto flex flex-col lg:flex-row"
                                data-twe-navbar-nav-ref>
                                {list.map((item) => {
                                    return <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                                        <Link
                                            className="block !text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none  lg:px-2"
                                            to={item.link}
                                            data-twe-nav-link-ref
                                            data-twe-ripple-init
                                            data-twe-ripple-color="light"
                                        >{item.title}</Link
                                        >
                                    </li>
                                })}
                            </ul>

                        </div>

                    </div>
                </nav>

                <div
                    className="relative h-[350px] overflow-hidden bg-[url('https://images.pexels.com/photos/1449844/pexels-photo-1449844.jpeg?auto=compress&cs=tinysrgb&w=600')] bg-cover bg-[50%] bg-no-repeat">
                    <div
                        className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-black/60 bg-fixed">
                        <div className="flex h-full items-center justify-center">
                            <div className="px-6 text-center text-white md:px-12">
                                <h1 className="mb-6 text-5xl font-bold">Funky Shoes</h1>
                                <h3 className="mb-8 text-3xl font-bold">For funky feet</h3>
                                <Link to='/'>
                                    <button
                                        type="button"
                                        className="inline-block rounded border-2 border-neutral-50 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-300 hover:text-neutral-200 focus:border-neutral-300 focus:text-neutral-200 focus:outline-none focus:ring-0 active:border-neutral-300 active:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600"
                                        data-twe-ripple-init
                                        data-twe-ripple-color="light">
                                        Find shoes
                                    </button>
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
            </header>

        </>
    )
}

export default Header

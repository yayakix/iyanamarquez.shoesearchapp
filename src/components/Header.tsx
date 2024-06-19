
function Header() {
    const list = [{
        title: 'Home'
    }, {
        title: 'Favorites'
    }, {
        title: 'Contact'
    }]


    return (
        <>
            <header>
                <nav
                    className="relative flex w-full items-center justify-between bg-white py-2 shadow-dark-mild dark:bg-body-dark lg:flex-wrap lg:justify-start lg:py-4"
                    data-twe-navbar-ref>
                    <div className="flex w-full flex-wrap items-center justify-between px-3">
                        <div className="flex items-center">
                            <button
                                className="border-0 bg-transparent px-2 text-xl leading-none transition-shadow duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 lg:hidden"
                                type="button"
                                data-twe-collapse-init
                                data-twe-target="#navbarSupportedContentX"
                                aria-controls="navbarSupportedContentX"
                                aria-expanded="false"
                                aria-label="Toggle navigation">
                                <span
                                    className="[&>svg]:h-7 [&>svg]:w-7 [&>svg]:stroke-black/50 ">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor">
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
                                </span>
                            </button>

                        </div>

                        <div
                            className="!visible hidden grow basis-[100%] items-center text-center lg:!flex lg:basis-auto lg:text-left"
                            id="navbarSupportedContentX"
                            data-twe-collapse-item>
                            <ul
                                className="me-auto flex flex-col lg:flex-row"
                                data-twe-navbar-nav-ref>
                                {list.map((item) => {
                                    return <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                                        <a
                                            className="block !text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none  lg:px-2"
                                            href="#!"
                                            data-twe-nav-link-ref
                                            data-twe-ripple-init
                                            data-twe-ripple-color="light"
                                        >{item.title}</a
                                        >
                                    </li>
                                })}
                            </ul>

                        </div>
                        <form className="max-w-md mx-auto hidden lg:flex lg:flex-row ">
                            <div>
                                <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                    </div>
                                    <input type="search" id="default-search" className="block p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
                                </div>
                            </div>

                            <button className="mx-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                                Search
                            </button>
                        </form>
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
                                <button
                                    type="button"
                                    className="inline-block rounded border-2 border-neutral-50 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-300 hover:text-neutral-200 focus:border-neutral-300 focus:text-neutral-200 focus:outline-none focus:ring-0 active:border-neutral-300 active:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600"
                                    data-twe-ripple-init
                                    data-twe-ripple-color="light">
                                    Find shoes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

        </>
    )
}

export default Header

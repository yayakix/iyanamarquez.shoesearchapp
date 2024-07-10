import React from 'react';

import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function Products() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [errorMessage, setErrorMessage] = useState('');
    const { getToken } = useAuth();
    const URL = import.meta.env.VITE_REACT_APP_API_URL;
    console.log("API URL:", URL); // Add this line to debug the URL value

    // Get all products
    useEffect(() => {
        (async () => {
            setLoading(true); // Set loading to true before fetching
            fetch(`${URL}/shoes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${await getToken()}`
                }
            }).then(res => res.json()).then((data) => {
                setProducts(data);
                setLoading(false); // Set loading to false after fetching
            }).catch((error) => {
                console.error('Error fetching products:', error);
            });
        })();
    }, [getToken]);

    const query = useQuery().get('query');
    const [searchQuery, setSearchQuery] = useState(query || '');

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await fetch(`${URL}/shoes/search?query=${query}`);
                const data = await response.json();
                console.log("data", data);

            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };
        if (query) {
            fetchResults();
        }
    }, [query]);

    const handleSearch = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!searchQuery) {
            // If search query is empty, fetch all products
            try {
                const response = await fetch(`${URL}/shoes`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${await getToken()}`
                    }
                });
                const data = await response.json();
                setProducts(data);
                setErrorMessage('');
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        } else {
            try {
                const response = await fetch(`${URL}/shoes/search?query=${searchQuery}`);
                const data = await response.json();
                if (data.message) {
                    setErrorMessage(data.message);
                } else {
                    setErrorMessage('');
                    setProducts(data);
                }
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        }
    };
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-black text-center text-5xl underline">Products</h2>
                {loading ? ( // Conditionally render loading screen
                    <div className="flex justify-center items-center mt-10">
                        <button type="button" className="flex flex-row gap-4 p-4 rounded-xl text-xl border" disabled>
                            <div role="status">
                                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                            </div>
                            Content Loading
                        </button>

                    </div>
                ) : (
                    <>
                        <form className="max-w-md mx-auto hidden lg:flex lg:flex-row mt-5" onSubmit={handleSearch}>
                            <div>
                                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="search"
                                        id="default-search"
                                        className="block p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Search Mockups, Logos..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>
                            <button type="submit" className="mx-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                                Search
                            </button>
                            <div className="flex flex-row justify-center items-center">
                                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                            </div>
                        </form>
                    </>
                )}
            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 p-6">
                {products.map((product) => (
                    <Link key={product.id} to={`/products/${product.id}`} className="group">
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 md:h-64">
                            <img
                                src={product.image}
                                alt={product.description}
                                className="h-full w-full object-cover object-center group-hover:opacity-75"
                            />
                        </div>
                        <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                        <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
                        <button type="button" className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">View</button>
                    </Link>
                ))}
            </div>
        </div>

    );
}

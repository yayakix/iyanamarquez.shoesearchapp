import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import * as dotenv from 'dotenv';
// dotenv.config();


export default function Products() {
    const [products, setProducts] = useState([])
    const url = 'http://localhost:4000'
    // Get all products
    useEffect(() => {
        fetch(`http://localhost:4000/shoes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => res.json()).then((data) => {
            console.log('boop')
            console.log(data)
            setProducts(data)
        }).catch((error) => {
            console.log('error')
            const errorCode = error.code;
            const errorMessage = error.message;
        });


    }, [])

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-black text-center text-5xl mb-16">Products</h2>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <a key={product.id} href={product.url} className="group">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 md:h-64">
                                <img
                                    src={product.url}
                                    alt={product.description}
                                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                                />
                            </div>
                            <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                            <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
                            <button type="button" className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">View</button>
                        </a>
                    ))}
                </div>
            </div>
            <Link to='/products/2'><button className="bg-green-400">press me</button></Link>

        </div>
    )
}
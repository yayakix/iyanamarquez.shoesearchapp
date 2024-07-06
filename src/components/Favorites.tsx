import { useState, useEffect } from "react";
import Header from "./Header"
import { Link } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

function Favorites() {

    const [favorites, setFavorites] = useState<any[]>([])
    const URL = import.meta.env.VITE_REACT_APP_API_URL;
    // Get all products
    const { getToken } = useAuth();

    useEffect(() => {
        (async () => {
            fetch(`${URL}/favorites`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${await getToken()}`

                },
            }).then(res => res.json()).then((data) => {
                setFavorites(data)
            }).catch((error) => {
                console.log(error)
            });
        })()
    }, [])

    // get current users list of favorites

    return (
        <>
            <Header />
            <h1>List of test users favorite shoes</h1>
            <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="text-black text-center mb-16">
                    <h2 className="text-black text-center text-5xl mb-10">Favorites </h2>
                    {favorites.length == 0 ? <h3 className="text-2xl">you have none</h3> : null}
                </div>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">

                    {favorites.map((product) => (
                        <Link key={product.id} to={`/products/${product.id}`} className="group">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 md:h-64">
                                <img
                                    src={product.image}
                                    alt={product.description}
                                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                                />
                            </div>
                            <h3 className="mt-4 text-lg text-gray-700">{product.name}</h3>
                            <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
                            <button type="button" className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">View</button>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Favorites

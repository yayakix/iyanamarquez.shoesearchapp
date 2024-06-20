import { useParams, useNavigate } from "react-router-dom";
import { defaultTestUser } from "../main";

interface ItemProps {
    name: string,
    url: string,
    description: string,
    price: string
    imageUrl: string
}

export function ItemCard({ name, url, description, price, image }: ItemProps) {
    const { id } = useParams()
    const shoeId = id
    const userId = defaultTestUser.id
    const navigate = useNavigate();


    const addToFavorites = () => {
        const data = {
            userId: userId,
            shoeId: shoeId
        }

        fetch(`http://localhost:4000/favorite/user/shoe`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then(res => res.json()).then((data) => {
        }).catch((error) => {
            console.log('error')
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

    const removeFromFavorites = () => {
        const data = {
            userId: userId,
            shoeId: shoeId
        }
        fetch(`http://localhost:4000/remove/favorite/user/shoe`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
    }

    const deleteShoe = () => {
        fetch(`http://localhost:4000/delete/shoe/${shoeId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
    }
    return (
        <>
            <div className="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border !text-gray-700 shadow-md">
                <div className="relative mx-4 mt-4 h-96 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
                    <img
                        src={image}
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="p-6">
                    <div className="mb-2 flex items-center justify-between">
                        <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                            {name}
                        </p>
                        <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                            {price}
                        </p>
                    </div>
                    <p className="block font-sans text-lg font-normal leading-normal text-gray-700 antialiased opacity-75">
                        {description}
                    </p>
                </div>
                <div className="p-6 pt-0">
                    <button
                        className="mb-4 block w-full select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-103 focus:opacity-[0.65] active:scale-100 active:opacity-[0.65] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        onClick={() => {
                            addToFavorites()
                            navigate(-1)
                        }
                        }                    >
                        Add to favorites
                    </button>
                    <button
                        className="mb-4 block w-full select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-103 focus:opacity-[0.65] active:scale-100 active:opacity-[0.65] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        onClick={() => {
                            removeFromFavorites()
                            navigate(-1)
                        }
                        }
                    >
                        Remove from favorites
                    </button>
                    <button
                        className="block w-full select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-103 focus:opacity-[0.65] active:scale-100 active:opacity-[0.65] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        onClick={() => {
                            deleteShoe()
                            navigate(-1)
                        }
                        }
                    >
                        Delete Shoe
                    </button>
                </div>
            </div>
        </>

    );
}
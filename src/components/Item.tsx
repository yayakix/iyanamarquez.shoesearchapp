import { useEffect, useState } from "react";
import Header from "./Header";
import { useParams } from "react-router-dom";
import { ItemCard } from "./ItemCard";
import { useNavigate } from "react-router-dom";

function Item() {
    const URL = import.meta.env.VITE_REACT_APP_API_URL;

    const navigate = useNavigate();

    const [tags, setTags] = useState<any>([]);
    const { id } = useParams();
    const [item, setItem] = useState<any>("");
    const shoeId = id;

    // Get all tags
    useEffect(() => {
        fetch(`${URL}/tags`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setTags(data);
            })
            .catch((error) => { console.log("error", error); });
    }, []);

    // Get current shoe details
    useEffect(() => {
        fetch(`${URL}/shoes/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setItem(data);
            })
            .catch((error) => { console.log("error", error); });
    }, []);

    const createTagOnShoe = (tagId: string) => {
        fetch(`${URL}/createTagOnShoe`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ tagId: tagId, shoeId: shoeId }),
        })
            .then(() => {
                navigate(0);
            })
            .catch((error) => { console.log("error", error); });
    };

    // make a use effect
    useEffect(() => {
        fetch(`${URL}/tags/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("data", data);
            })
            .catch((error) => { console.log("error", error); });
    }, []);

    // fetch single item
    return (
        <>
            <Header />
            there should be one item here
            <div className="flex flex-wrap flex-row justify-center ">
                <div className="flex justify-center w-3/4">
                    <ItemCard
                        name={item.name}
                        url={item.url}
                        price={item.price}
                        description={item.description}
                        image={item.image}
                    />
                </div>
                <div className="flex flex-col content-start mt-10 lg-mt-0 ">
                    <h1 className="text-3xl w-full h-10 underline mb-4">Add tags</h1>
                    <div>
                        <ul>
                            {tags.map((tag: any) => {
                                return (
                                    <div className="flex flex-row justify-between space-x-4" key={tag.id}>
                                        <li className="text-2xl">
                                            {tag.text}
                                        </li>
                                        <button
                                            value={tag.id}
                                            className="bg-white hover:bg-gray-100 text-gray-800 py-2 px-4 border border-gray-400 rounded shadow text-sm"
                                            onClick={() => createTagOnShoe(tag.id)}
                                        >
                                            Add
                                        </button>
                                    </div>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Item;

import { useEffect, useState } from "react";
import Header from "./Header";
import { useParams } from "react-router-dom";
import { ItemCard } from "./ItemCard";
import { useNavigate } from "react-router-dom";

function Item() {
    const url = "http://localhost:4000";

    const navigate = useNavigate();

    const [tags, setTags] = useState<any>([]);
    const [shoeTags, setShoeTags] = useState<any>([]);

    const { id } = useParams();
    const [item, setItem] = useState<any>("");
    const shoeId = id;

    // Get all tags
    useEffect(() => {
        fetch(`${url}/tags`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setTags(data);
            })
            .catch((error) => { });
    }, []);

    // Get current shoe details
    useEffect(() => {
        fetch(`${url}/shoes/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setItem(data);
            })
            .catch((error) => { });
    }, []);

    const createTagOnShoe = (e) => {
        const tagId = e.target.value;
        fetch(`http://localhost:4000/createTagOnShoe`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ tagId: tagId, shoeId: shoeId }),
        });
    };
    // make a use effect
    useEffect(() => {
        fetch(`http://localhost:4000/tags/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setShoeTags(data);
            });
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
                        shoeTags={shoeTags}
                    />
                </div>
                <div className="flex flex-col content-start mt-10 lg-mt-0 ">
                    <h1 className="text-3xl w-full h-10 underline mb-4">Add tags</h1>
                    <div>
                        <ul>
                            {tags.map((tag) => {
                                return (
                                    <div className="flex flex-row justify-between space-x-4">

                                        <li key={tag.id} className="text-2xl">
                                            {tag.text}

                                        </li>
                                        <button
                                            value={tag.id}
                                            className=" bg-white hover:bg-gray-100 text-gray-800 py-2 px-4 border border-gray-400 rounded shadow text-sm"
                                            onClick={(e) => {
                                                createTagOnShoe(e);
                                                navigate(0);
                                            }}
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

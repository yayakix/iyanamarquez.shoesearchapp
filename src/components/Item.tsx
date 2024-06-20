import { useEffect, useState } from "react";
import Header from "./Header"
import { useParams } from "react-router-dom";
import { ItemCard } from "./ItemCard";

function Item() {

    const { id } = useParams();
    const [item, setItem] = useState<any>('')
    const url = 'http://localhost:4000'
    // Get all products
    useEffect(() => {
        fetch(`${url}/shoes/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => res.json()).then((data) => {
            setItem(data)
        }).catch((error) => {
        });
    }, [])

    // fetch single item
    return (
        <>
            <Header />
            <div className="w-full flex flex-col items-center justify-center mt-16">
                there should be one item here
                <ItemCard name={item.name} url={item.url} price={item.price} description={item.description} image={item.image} />

            </div>
        </>
    )
}

export default Item

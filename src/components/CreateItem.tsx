import Header from "./Header"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

const initialValues = {
    name: "",
    description: "",
    price: "",
    url: "",
    image: "",
};

function CreateItem() {
    const { getToken, isSignedIn } = useAuth();
    // FETCH TO POST NEW CARD
    const navigate = useNavigate();
    const [values, setValues] = useState(initialValues);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    }
    const labelClass = 'block mb-2 text-sm font-medium text-gray-900 dark:text-white'
    const inputClass = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
    const btnClass = 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'

    const URL = import.meta.env.VITE_REACT_APP_API_URL;
    const handleSubmit = () => {
        (async () => {
            fetch(`${URL}/createShoe`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${await getToken()}`
                },
                body: JSON.stringify({ shoe: values }),
            })
        })()
    }

    return (
        <>
            <Header />
            <div className="flex flex-col w-full">
                <h1 className="self-center mt-10 text-3xl">Create New Shoe Product</h1>
                <div className="p-32">
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        {/* form to submit data */}
                        <div>
                            <label className={labelClass}>Item Name</label>
                            <input className={inputClass} type="text" name="name" onChange={handleInputChange} value={values.name}></input>
                        </div>
                        <div>
                            <label className={labelClass}>Item Description</label>
                            <input className={inputClass} type="text" name="description" onChange={handleInputChange} value={values.description}></input>
                        </div>
                        <div>
                            <label className={labelClass}>Price</label>
                            <input className={inputClass} type="text" name="price" onChange={handleInputChange} value={values.price}></input>
                        </div>
                        <div>
                            <label className={labelClass}>Link to Product</label>
                            <input className={inputClass} type="text" name="url" onChange={handleInputChange} value={values.url}></input>
                        </div>
                        <div>
                            <label className={labelClass}>Image Url</label>
                            <input className={inputClass} type="text" name="image" onChange={handleInputChange} value={values.image}></input>
                        </div>
                    </div>
                    <button
                        className={btnClass}
                        type="submit"
                        onClick={() => {
                            handleSubmit()
                            navigate('/')
                        }}
                        disabled={!isSignedIn} // Disable button if not signed in
                    > Submit </button>
                    {!isSignedIn && (
                        <p className="text-red-500 mt-2">
                            You must be signed in to submit the form.
                        </p>
                    )}
                </div>
            </div>
        </>
    )
}

export default CreateItem;

import Header from "./Header"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialValues = {
    name: "",
};

function CreateTag() {
    // FETCH TO POST NEW CARD
    const navigate = useNavigate();

    const [values, setValues] = useState(initialValues);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    }
    const labelClass = 'block mb-2 text-sm font-medium text-gray-900 dark:text-white'
    const inputClass = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
    const btnClass = 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'

    const handleSubmit = () => {
        console.log(values)

        fetch(`http://localhost:4000/createTag`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ shoe: values }),
        })

    }

    return (
        <>
            <Header />
            <div className="flex flex-col w-full">

                <h1 className="self-center mt-10 text-3xl">Create New Tag</h1>
                <div className="p-32">

                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        {/* form to submit data */}
                        <div>
                            <label className={labelClass}>Tag Name</label>
                            <input className={inputClass} type="text" name="name" onChange={handleInputChange} value={values.name}></input>
                        </div>

                    </div>
                    <button className={btnClass} type="submit" onClick={() => {
                        handleSubmit()
                        navigate('/')

                    }}> Submit </button>
                </div>
            </div>
        </>
    )
}

export default CreateTag;

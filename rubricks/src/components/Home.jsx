import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"


const Home = () => {


    const [alldata, setalldata] = useState([])


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();


    const getData = async () => {
        const res = await axios.get('/twubric.json')
        setalldata(res.data)

    }
    useEffect(() => {
        getData()
    }, [])


    return (
        <>
            <div className="flex space-x-2 mb-4">
                <input
                    {...register("from_date")}
                    type="date"
                    className="border p-2 rounded"
                />
                <input
                    {...register("to_date")}
                    type="date"
                    className="border p-2 rounded"
                />
                {/* <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Filter
                </button> */}
            </div>
            <div className=' grid grid-cols-3 space-y-5 space-x-4'>
                {
                    alldata.map((e) => {

                        const joindate = new Date(e.join_date * 1000).toLocaleDateString()
                        return (

                            <div className="bg-white shadow-md rounded p-4 ">
                                <div className="flex items-center mb-4">
                                    <img className="w-16 h-16 rounded-full mr-4" src={e.image} alt={e.username} />
                                    <div>
                                        <p className="text-lg font-semibold">{e.fullname}</p>
                                        <p className="text-gray-600">@{e.username}</p>
                                    </div>
                                </div>
                                <p><strong>Twubric Score:</strong> {e.twubric.total}</p>
                                <p><strong>Friends:</strong> {e.twubric.friends} </p>
                                <p><strong>Influence:</strong> {e.twubric.influence}</p>
                                <p><strong>Chirpiness:</strong> {e.twubric.chirpiness}</p>
                                <p><strong>Joined:</strong> {joindate}</p>

                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                                    onClick={() => onRemove(follower.uid)}
                                >
                                    Remove
                                </button>
                            </div>

                        )

                    })
                }
            </div>


        </>
    )
}

export default Home
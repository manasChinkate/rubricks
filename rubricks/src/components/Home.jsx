import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { HiOutlineRefresh } from "react-icons/hi";


const Home = () => {


    const [alldata, setalldata] = useState([])
    const [TempData, setTempData] = useState([])
    const [RemovedData, setRemovedData] = useState([])
    const [FilteredData, setFilteredData] = useState([])


    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm();

    const removeItem =(id)=>{
        const updatedList = RemovedData.filter(e=>
            
            e.uid!==id
        )
        setRemovedData(updatedList)
        // setFilteredData(updatedList)

    }


    const getData = async () => {
        const res = await axios.get('/twubric.json')
        // setalldata(res.data)
        setTempData(res.data)
        setRemovedData(res.data)
        console.log("function called")

    }
    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (watch("fromDate") && watch("toDate")) {
          const formattedFromDate =
            watch("fromDate") && new Date(watch("fromDate"));
          const formattedToDate = watch("toDate") && new Date(watch("toDate"));
          setRemovedData(
            RemovedData.filter((value) => {
                const joindate = new Date(value.join_date * 1000).toLocaleDateString()

                
              if (joindate) {
                const parts = joindate.split(" ")[0].split("/");
                const dateObject = new Date(+parts[2], +parts[1] - 1, +parts[0]);
                console.log(dateObject)
                if (
                  dateObject >= formattedFromDate &&
                  dateObject <= formattedToDate
                ) {
                  return true;
                } else return false;
              } else {
                return false;
              }
            })
          );
        }
      }, [watch("fromDate"), watch("toDate")]);


    return (
        <>
            <div className="flex space-x-2 mb-4">
                <input
                    {...register("fromDate")}
                    type="date"
                    className="border p-2 rounded"
                />
                <input
                    {...register("toDate")}
                    type="date"
                    className="border p-2 rounded"
                />
                 <button
                  onClick={() => {
                    setValue("fromDate", null);
                    setValue("toDate", null);
                    getData();
                  }}
                  className="md:p-1.5 p-1 bg-gray-200 rounded-full "
                >
                  <HiOutlineRefresh />
                </button>
            </div>
            <div className=' grid grid-cols-3 space-y-5 space-x-4'>
                {
                    RemovedData.map((e) => {

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
                                    onClick={() => removeItem(e.uid)}
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
import React, { useState, useEffect } from "react";
import axios from 'axios'
import land from '../assets/land.jfif'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import PropertyCard from '../components/PropertyCard.jsx'
import { useParams} from 'react-router'


const PropertyDetails = () => {
const [propertyDetails, setPropertyDetails] = useState([])
const {propertyId} = useParams()
console.log(typeof(propertyId))
const apiUrl = `http://localhost:3001/api/properties/${(propertyId)}`;
const rentUrl = `http://localhost:3001/api/properties/rent/${propertyId}`;
console.log(rentUrl)

const getApiURL =async (url)=>{
    try {
        const response = await axios.get(url);
        console.log(response.data);
        setPropertyDetails(response.data);
    } catch (error) {
        console.log(error);
    }
}
const handleRentButton =async (url)=>{
    try {
        const response = await axios.get(url);
        console.log(response.data);
        setPropertyDetails(response.data);
    } catch (error) {
        console.log(error);
    }
}
 
const handleMouse=()=>{
    console.log(propertyId)
}

useEffect(()=>{
    getApiURL(apiUrl)
    handleRentButton(rentUrl)
}, [])

    return (
        <>
            <div className="container">
                <div className="container mx-44 h-[50vh] ">
                    <img src={land} alt="land"
                        className='w-full h-full object-cover transition-transform duration-300 hover:scale-95' />
                </div>
                <div className="container mx-44 h-[55vh] mt-10 flex justify-between">
                    <div className="left-container">
                        <h1 className='text-3xl w-1/2 pr-10 bg-green-200 font-semibold mx-[15rem] pb-7'>Property Details</h1>
                            <p className='pt-3 text-2xl mb-5'><strong className="pr-3">Propety type:</strong>{propertyDetails.propertyType?.propertyName}</p>
                        <div className="descriptions text-xl">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti impedit incidunt temporibus maxime corporis exercitationem amet porro assumenda, facilis reprehenderit repellendus sit qui quam molestiae suscipit aliquam sint vitae delectus. {propertyDetails.description}
                        </div>
                        <div className="other-details text-xl mt-3">
                            <p className='pt-3 '><strong className="pr-3">Owner name:</strong>: {propertyDetails.owner?.username}</p>
                            <p className='pt-3 '><strong className="pr-3">Address:</strong>{propertyDetails.address}</p>
                            <p className='pt-3 '><strong className="pr-3">Area:</strong>{propertyDetails.area}</p>
                            <p className='pt-3 '><strong className="pr-3">Price:</strong>{propertyDetails.price}</p>
                           {
                            propertyDetails?.propertyType?.propertyName==="Rooms" ? (
                                <p className='pt-3'><strong>Number of Rooms:</strong> {propertyDetails.numberOfRooms}</p>
                              ): null   
                           }
                           {
                            propertyDetails?.propertyType?.propertyName==="Flats" ? (
                                <p className='pt-3'>Number of Flats: {propertyDetails.numberOfFlats}</p>
                              ): null
                           }
                           {
                            propertyDetails?.propertyType?.propertyName==="Shutters" ? (
                                <p className='pt-3'>Number of Rooms: {propertyDetails.numberOfShutter}</p>
                              ): null
                           }
                        </div>
                        <div className="features-icons flex my-5">
                            <div className="message mt-5">
                                <FontAwesomeIcon icon={faComment}
                                    size='2xl'
                                    style={{ color: 'black', paddingTop: "10px", height:"2.5rem"}}
                                    className='-mt-1 cursor-pointer relative'
                                    onClick={() => setOpen(!open)}
                                />
                            </div>

                        </div>
                    </div>
                    <div className="right-container flex flex-wrap w-full h-3/4">
                        <img src={land} alt="" className='px-2 py-1 object-center w-1/3  transition-transform duration-300 hover:scale-90' />
                        <img src={land} alt="" className='px-2 py-1 object-center w-1/3  transition-transform duration-300 hover:scale-90' />
                        <img src={land} alt="" className='px-2 py-1 object-center w-1/3  transition-transform duration-300 hover:scale-90' />
                        <img src={land} alt="" className='px-2 py-1 object-center w-1/3  transition-transform duration-300 hover:scale-90' />
                        <img src={land} alt="" className='px-2 py-1 object-center w-1/3  transition-transform duration-300 hover:scale-90' />
                    </div>
                </div>
                <button className='rentButton' onClick={handleRentButton} onMouseOver={handleMouse}>Rent the property</button>
            </div>
            <div className="similars bg-slate-100 mx-60 my-11 flex flex-wrap justify-around ">
                <PropertyCard />
                <PropertyCard />
                <PropertyCard />
                <PropertyCard />
                <PropertyCard />
                <PropertyCard />
            </div>
        </>
    )
}

export default PropertyDetails

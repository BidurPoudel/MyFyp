import React from 'react'
import land from '../assets/land.jfif'
import { useNavigate } from 'react-router';
const PropertyCard = (props) => {
    const address = 'address';
    const area = 'area';
    const navigate = useNavigate()
    const handleMouse=(e)=>{
        console.log(typeof(props.propertyId))
    }

    return (
        <>
            <div className="card mt-10 flex flex-wrap">
                <div className="w-[35vh] ml-[10vh] border border-black bg-white rounded-xl overflow-hidden shadow-md">
                    <img src={props.images} alt='land' className='w-full h-48 object-coverrounded-lg' />
                    <div className="px-6 py-1">
                        <div className="text-left px-2">
                            <h2 className='property-type '>Property Type: <span className='ml-1'>{props.propertyType}</span></h2>
                            <div className="small-details">
                                <h2>Address: <span>{props.address}</span></h2>
                                <h2>Area:<span>{props.area}</span></h2>
                            </div>
                        </div>
                        <div className="mt-4">
                            <button className="view-details" onClick={() => { navigate(`/properties/${props.propertyId}`) }} onMouseOver={handleMouse}>View details</button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default PropertyCard

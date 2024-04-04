import React, { useState, useEffect } from 'react'
import Model from 'react-modal';
import axios from 'axios';
import { useParams } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
const OwnerProperty = () => {
  const {propertyId} = useParams
  const [isVisible, setIsVisible] = useState(false);
  const [properties, setProperties] = useState([]);
  const [deletePropertyId, setDeletePropertyId] = useState(null)

  function handleDeleteButton(propertyId) {
    setIsVisible(true)
    setDeletePropertyId(propertyId)

    console.log("Property ID clicked:", propertyId);
  }
  async function handleDelete(id) {
    setIsVisible(false)
    console.log("clicked:", id);
    const token = localStorage.getItem('token')
    console.log(token)
    try {
      const response = await axios.delete(`http://localhost:3001/api/properties/${id}`, {
        headers: {
          Authorization: `${token}`
        },
        withCredentials: true
      })
      window.location.reload();
      console.log(`localhost:3001/api/properties/${id}`)
      console.log("Property deleted successfully:", response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/properties/ownerProperty/user', {
          headers: {
            Authorization: `${token}`
          },
          withCredentials: true
        });
        console.log(response.data)
        setProperties(response.data); // Assuming the response data is an array of properties
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);
  const ownerId = properties.length > 0 ? properties[0].owner.userId : null;
  const totalPropertiesPosted = properties.filter(property => property.ownerId === ownerId).length;
  return (
    <div>
      
      <div>
        <p className='flex justify-center p-10 text-5xl font-semibold'>Your properties</p>
        <h2 className='px-32 pb-[1rem] text-lg font-semibold'>Total properties posted: {totalPropertiesPosted}</h2>
      </div>
      <div className="table-responsive table mx-[3%]  w-[50%]">
        <table className="table boder-2" >
          <thead>
            <tr>
              <th>S.NO</th>
              <th>Property Type</th>
              <th>Address of Property</th>
              <th>Area</th>
              <th>Price</th>
              <th>Number of Rooms</th>
              <th>Number of Flats</th>
              <th>Number of Shutters</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property, index) => (
              <tr key={index} className='text-lg'>
                <td>{index + 1}</td>
                <td>{property.propertyType.propertyName}</td>
                <td>{property.address}</td>
                <td>{property.area}</td>
                <td>{property.price}</td>
                <td>{property.numberOfRooms}</td>
                <td>{property.numberOfFlats}</td>
                <td>{property.numberOfShutter}</td>
                <td className='flex'>
                  <NavLink to={`/dashboard/update-property/${property.propertyId}`} className="action-btn">
                    Update
                  </NavLink>
                  <button className="action-btn" type="button" onClick={() => handleDeleteButton(property.propertyId)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th>S.NO</th>
              <th>Property Type</th>
              <th>Address of Property</th>
              <th>Area</th>
              <th>Price</th>
              <th>Number of Rooms</th>
              <th>Number of Flats</th>
              <th>Number of Shutters</th>
              <th>Actions</th>
            </tr>
          </tfoot>
        </table>
      </div>
      <Model
        isOpen={isVisible}
        onClick= {()=>handleDeleteButton(property.propertyId)}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            top: '50px', // Initial top position
            left: '50%', // Center horizontally
            transform: 'translateX(-50%)', // Center horizontally
            height: "35%",
            width: "40%",
            borderRadius: "25px",
            animation: "fade-in 5s forwards", // Fade out animation
            transition: "top 1s ease-out", // Apply transition effect to top position
          }
        }}
      >
        <div>
          <div className='flex justify-around relative'>
            <h1 className='text-red-500 text-5xl font-bold'>Do you want to Delete???</h1>
            <button onClick={() => setIsVisible(false)} className='text-3xl px-3 w-10 absolute right-1'> 
            <FontAwesomeIcon icon={faXmark}
                size='1x'
                style={{ color: 'black', paddingTop: "10px" }}
                className='-mt-1 cursor-pointer relative'
                onClick={() => setOpen(!open)}
              /></button>
          </div>
          <p className='text-2xl font-bold my-10 mx-44 w-1/2 h-1/2 text-red-500'>This action cannot be undone!!!</p>
          <div className='flex relative justify-between w-1/7 my-[4rem] ml-[45px] '>
            <div className=' absolute right-6 top-6'>
            <button className='action-btn' onClick={() => handleDelete(deletePropertyId)}>Delete</button>
            <button className='mx-1 px-5 py-1 font-bold rounded-xl border border-black bg-gray-300 ' onClick={() => setIsVisible(false)}>Close</button>
            </div>
          </div>
        </div>
      </Model>
    </div>
  )
}

export default OwnerProperty

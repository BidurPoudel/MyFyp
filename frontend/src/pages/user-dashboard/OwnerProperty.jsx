import React, { useState, useEffect } from 'react'
import Model from 'react-modal';
import axios from 'axios';
const OwnerProperty = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [properties, setProperties] = useState([]);
  function handleUpdate(){
    alert('update')
  }
  function handleDelete(){
    alert('delete')
  }
  useEffect(() => {
    // Fetch owner's properties from the backend API
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/properties');
        console.log(response.data) 
        setProperties(response.data); // Assuming the response data is an array of properties
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);
  return (
    <div>
      <style>{`
        .custom-modal-overlay {
          animation: pop-up 0.1s ease-in-out;
        }

        @keyframes pop-up {
          from {
            opacity: 0;
            transform: scale(0.1);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
      <div>
        <p className='flex justify-center p-10 text-5xl font-semibold'><h1>Your properties</h1></p>
      </div>
     <div className="table-responsive table mx-[5%]  w-[50%]">
        <table className="table boder-2 " >
          <thead>
            <tr>
              <th>S.NO</th>
              <th>Property Type</th>
              <th>Address of Property</th>
              <th>Area</th>
              <th>Number of Rooms</th>
              <th>Number of Flats</th>
              <th>Number of Shutters</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td className='flex'>
                <button className="action-btn" type="button" >
                Update 
                </button>
                <button className="action-btn" type="button" onClick={()=>setIsVisible(true)}>
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td><strong>ID</strong></td>
              <td><strong>Name</strong></td>
              <td><strong>Price</strong></td>
              <td><strong>Created At</strong></td>
              <td><strong>Updated At</strong></td>
              <td><strong>Actions</strong></td>
            </tr>
          </tfoot>
        </table>
      </div>
      <Model
        isOpen={isVisible}
        onRequestClose={() => setIsVisible(false)}
        overlayClassName="modal-overlay"
        contentLabel="Delete Modal"
        style={{
          overlay:{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            top: '50px', // Initial top position
            left: '50%', // Center horizontally
            transform: 'translateX(-50%)', // Center horizontally
            height: "300px",
            width: "500px",
            borderRadius: "25px",
            animation: "fade-in 500ms forwards", // Fade out animation
            transition: "top 1.5ms ease", // Apply transition effect to top position
          }
        }}
      >
        <div className='flex justify-around'>
        <h1 className='text-red-500 text-3xl font-bold'>Do you want to Delete???</h1>
        <button onClick={() => setIsVisible(false)} className='text-3xl px-3 '> X</button>
        </div>
        <p className='text-xl font-bold my-6 mx-10'>This action cannot be undone!!!</p>
        <div className='flex justify-between w-[20rem] my-[10px] ml-[45px]'>
        <button className='action-btn ' onClick={() => setIsVisible(false)}>Delete</button>
        <button className='mx-1 px-5 py-1 rounded-xl border border-black bg-gray-300 ' onClick={() => setIsVisible(false)}>Close</button>
        </div>
      </Model>
    </div>
  )
}

export default OwnerProperty

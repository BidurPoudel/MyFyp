import React, { useState, useEffect } from 'react';
import Model from 'react-modal';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const OwnerProperty = () => {
  const { propertyId } = useParams();
  const [isVisible, setIsVisible] = useState(false);
  const [properties, setProperties] = useState([]);
  const [deletePropertyId,  setDeletePropertyId] = useState(null);

  const columns = [
    {
      name: 'S.No',
      selector: (row, index) => index + 1,
      width: '70px',
      style: {
        fontSize: '18px',
      },
    },
    {
      name: 'Property',
      selector: (row) => row.propertyType.propertyName,
      minWidth: '100px',
      style: {
        fontSize: '18px',
      },
    },
    {
      name: 'Address',
      selector: (row) => row.address,
      minWidth: '250px',
      style: {
        fontSize: '18px',
      },
    },
    {
      name: 'Area',
      selector: (row) => row.area,
      style: {
        fontSize: '18px',
      },
    },
    {
      name: 'Price',
      selector: (row) => row.price,
      style: {
        fontSize: '18px',
      },
    },
    {
      name: 'Rooms',
      selector: (row) => row.numberOfRooms,
      style: {
        fontSize: '18px',
      },
    },
    {
      name: 'Flats',
      selector: (row) => row.numberOfFlats,
      style: {
        fontSize: '18px',
      },
    },
    {
      name: 'Shutters',
      selector: (row) => row.numberOfShutter,
      style: {
        fontSize: '18px',
      },
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className='flex space-x-2'>
          <NavLink
            to={`/owner/update-property/${row.propertyId}`}
            className="text-white text-lg border-[0.5px] border-black px-4 py-1 w-[6rem]  float-left bg-green-500  hover:bg-green-600 transition-all h-[5%] rounded-md"
          >
            Update
          </NavLink>
          <button
            className="border border-black w-[6rem] text-lg bg-red-500 text-white hover:bg-red-600 rounded-md"
            type="button"
            onClick={() => handleDeleteButton(row.propertyId)}
          >
            Delete
          </button>
        </div>
      ),
      minWidth: '20%',
    },
  ];

  function handleDeleteButton(propertyId) {
    setIsVisible(true);
    setDeletePropertyId(propertyId);
  }

  async function handleDelete(id) {
    setIsVisible(false);
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:3001/api/properties/${id}`, {
        headers: {
          Authorization: token,
        },
        withCredentials: true,
      });
      window.location.reload();
    } catch (error) {
      console.log('Error deleting property:', error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/properties/ownerProperty/user', {
          headers: {
            Authorization: token,
          },
          withCredentials: true,
        });
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  const ownerId = properties.length > 0 ? properties[0].owner.userId : null;
  const totalPropertiesPosted = properties.filter((property) => property.ownerId === ownerId).length;

  return (
    <div>
      <div>
        <p className='flex justify-center p-10 text-5xl font-semibold'>Your properties</p>
        <h2 className='px-32 pb-[1rem] text-lg font-semibold'>Total properties posted: {totalPropertiesPosted}</h2>
      </div>
      <div className="table-responsive table mx-[3%]  w-[50%]">
        <DataTable
          responsive={true}
          columns={columns}
          data={properties}
          pagination
          subHeader
          subHeaderComponent={
            <input
              type='text'
              placeholder='search property'
              className='px-4 py-[0.3rem] my-10 border-black rounded-full bg-gradient-to-r text-grey-300 hover:bg-gradient-to-r hover:from-grey-500 hover:to-green-700 hover:text-white'
            />
          }
          customStyles={{
            table: {
              style: {
                border: '0.05rem solid black',
              },
            },
            headCells: {
              style: {
                backgroundColor: '#333',
                color: '#fff',
                fontSize: 'medium',
                width: '100%',
              },
            },
            rows: {
              style: {
                alignItems: 'center',
                paddingY: '2px',
                '&:nth-of-type(odd)': {
                  backgroundColor: '#f5f5f5',
                },
              },
            },
            columns: {
              style: {
                width: '2rem',
              },
            },
          }}
        />
      </div>
      <Model
        isOpen={isVisible}
        onRequestClose={() => setIsVisible(false)}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            top: '50px',
            left: '50%',
            transform: 'translateX(-50%)',
            height: '35%',
            width: '40%',
            borderRadius: '25px',
            animation: 'fade-in 5s forwards',
            transition: 'top 1s ease-out',
          },
        }}
      >
        <div className='model'>
          <div className='flex justify-around relative'>
            <h1 className='text-red-500 text-5xl font-bold'>Do you want to Delete???</h1>
            <button onClick={() => setIsVisible(false)} className='text-3xl px-3 w-10 absolute right-1'>
              <FontAwesomeIcon icon={faTimes} size='1x' style={{ color: 'black', paddingTop: '10px' }} />
            </button>
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
  );
};

export default OwnerProperty;

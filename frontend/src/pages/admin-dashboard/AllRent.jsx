import React, { useState, useEffect } from 'react';
import Model from 'react-modal';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { useParams } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import OwnerPropertiesTable from '../../components/OwnerPropertiesTable';

const AllRent = () => {
  const { propertyId } = useParams();
  const [isVisible, setIsVisible] = useState(false);
  const [rents, setRents] = useState([]);
  const [deletePropertyId, setDeletePropertyId] = useState(null);
 
  async function handleDeleteButton(propertyId){
    setIsVisible(true);
    setDeletePropertyId(propertyId)
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/admin/allRents', {
          headers: {
            Authorization: token,
          },
          withCredentials: true,
        });
        console.log(response.data)
        setRents(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

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
      name: 'Owner Name',
      selector: (row) => row.property.owner.username,
      minWidth: '100px',
      style: {
        fontSize: '18px',
      },
    },
    {
      name: 'Property Name',
      selector: (row) => row.property.propertyType.propertyName,
      minWidth: '250px',
      style: {
        fontSize: '18px',
      },
    },
    {
      name: 'Tenant Name',
      selector: (row) => row.tenant.username,
      minWidth: '250px',
      style: {
        fontSize: '18px',
      },
    },
    {
      name: 'Property Address',
      selector: (row) => row.property.address,
      style: {
        fontSize: '18px',
      },
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className='flex space-x-2'>
          <button
            className='border border-black w-[6rem] text-lg bg-red-500 text-white hover:bg-red-600 rounded-md'
            type='button'
            onClick={() => handleDeleteButton(row.propertyId)}
          >
            Delete
          </button>
        </div>
      ),
      minWidth: '20%',
    },
  ];
  async function handleDelete(id){
    try {
      await axios.delete(`http://localhost:3001/api/admin/rent/${id}`);
      window.location.reload();
    } catch (error) {
      console.log('Error deleting property:', error);
    }
  }
  return (
    <div className=' relative  w-[100%]'>
      <div className='flex justify-center mt-16 text-3xl font-semibold'>
        Data of All Users
      </div>
      <div>
      <div className='flex relative mt-10 w-full bg-red-200'>
        <div className='absolute flex justify-center w-[50%] left-[25rem] mt-3 -top-11 text-xl'>Total users</div>
      </div>
        <div className='w-[75%] mx-[4rem] absolute top-48 left-20'>
          <DataTable
            responsive={true}
            columns={columns}
            data={rents} // Use the 'data' array here
            pagination
            subHeader
            subHeaderComponent={
              <input
                type='text'
                placeholder='search property'
                className='px-4 py-[0.3rem] my-5 border-black rounded-full bg-gradient-to-r text-black hover:bg-gradient-to-r hover:from-grey-500 hover:to-green-700 hover:text-white'
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
                    backgroundColor: '#f5f5f5', // grey background for odd rows
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
      </div>
      <Model
        isOpen={isVisible}
        onClick={() => handleDeleteButton()}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            top: '50px', // Initial top position
            left: '50%', // Center horizontally
            transform: 'translateX(-50%)', // Center horizontally
            height: '35%',
            width: '40%',
            borderRadius: '25px',
            animation: 'fade-in 5s forwards', // Fade out animation
            transition: 'top 1s ease-out', // Apply transition effect to top position
          },
        }}
      >
        <div className='model'>
          <div className='flex justify-around relative'>
            <h1 className='text-red-500 text-5xl font-bold'>Do you want to Delete???</h1>
            <button
              onClick={() => setIsVisible(false)}
              className='text-3xl px-3 w-10 absolute right-1'
            >
              <FontAwesomeIcon
                icon={faXmark}
                size='1x'
                style={{ color: 'black', paddingTop: '10px' }}
                className='-mt-1 cursor-pointer relative'
                onClick={() => setOpen(!open)}
              />
            </button>
          </div>
          <p className='text-2xl font-bold my-10 mx-44 w-1/2 h-1/2 text-red-500'>This action cannot be undone!!!</p>
          <div className='flex relative justify-between w-1/7 my-[4rem] ml-[45px] '>
            <div className=' absolute right-6 top-6'>
              <button className='action-btn' onClick={() => handleDelete(deletePropertyId)}>
                Delete
              </button>
              <button
                className='mx-1 px-5 py-1 font-bold rounded-xl border border-black bg-gray-300 '
                onClick={() => setIsVisible(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Model>
    </div>
  );
};

export default AllRent

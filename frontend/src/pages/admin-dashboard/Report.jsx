import React, { useState, useEffect } from 'react';
import Model from 'react-modal';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { useParams } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import OwnerPropertiesTable from '../../components/OwnerPropertiesTable';

const ReportGeneration = () => {
  const { propertyId } = useParams();
  const [isVisible, setIsVisible] = useState(false);
  const [properties, setReportProperties] = useState([]);
  const [deletePropertyId, setDeletePropertyId] = useState(null);
  const [search, setSearch] = useState('');

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };


  const filteredRents = properties.filter((rent) => {
    return (
      rent.property.owner.username.toLowerCase().includes(search.toLowerCase()) ||
      rent.property.propertyType.propertyName.toLowerCase().includes(search.toLowerCase()) ||
      rent.reporter.username.toLowerCase().includes(search.toLowerCase()) ||
      rent.property.address.toLowerCase().includes(search.toLowerCase())
    );
  });
  


  async function handleDeleteButton(propertyId){
    setIsVisible(true)
    setDeletePropertyId(propertyId)
  }


  
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/admin/allReportedProperties');
        console.log(response.data)
        setReportProperties(response.data);
      } catch (error) {
        console.log('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  async function handleDelete(id){
    try {
      await axios.delete(`http://localhost:3001/api/admin/report/${id}`);
      window.location.reload();
    } catch (error) {
      console.log('Error deleting property:', error);
    }
  }

  const columns = [
    {
      name: 'S.No',
      minWidth:"70px",
      selector: (row, index) => index + 1,

      style: {
        fontSize: '16px',
      },
    },
    
    {
      name: 'Owner Name',
      selector: (row) => row.property.owner.username,
      style: {
        fontSize: '16px',
      },
    },
    {
      name: 'Property',
      selector: (row) => row.property.propertyType.propertyName,
      style: {
        fontSize: '16px',
      },
    },
    {
      name: 'Reporter Name',
      selector: (row) => row.reporter.username,
  
      style: {
        fontSize: '16px',
      },
    },
    {
      name: 'Phone Number',
      selector: (row) => row.reporter.phoneNumber,
      
      style: {
        fontSize: '16px',
      },
    },
    {
      name: 'Email address',
      selector: (row) => row.reporter.email,
      
      style: {
        fontSize: '16px',
      },
    },
    {
      name: 'Reported At',
      selector: (row) => row.reportedAt,
     
      style: {
        fontSize: '16px',
      },
    },
    {
      name: 'Actions',
      
      cell: (row) => (
        <div>
          <button
            className='border border-black w-[6rem] text-lg bg-red-500 text-white hover:bg-red-600 rounded-md'
            type='button'
            onClick={() => handleDeleteButton(row.propertyId)}
          >
            Delete
          </button>
        </div>
      ),
      
    },
  ];

  return (
    <div className=' relative  w-[100%]'>
      <div className='flex justify-center mt-16 text-3xl font-semibold'>
        Data of All Users
      </div>
      <div>
      <div className='flex relative mt-10 w-full bg-red-200'>
        <div className='absolute flex justify-center w-[50%] left-[25rem] mt-3 -top-11 text-xl'>Total reports: {properties.length}</div>
      </div>
        <div className='w-[100%] -ml-[5.4rem] absolute top-48 left-20'>
          <DataTable
            responsive={true}
            columns={columns}
            data={filteredRents} // Use the 'data' array here
            pagination
            subHeader
            subHeaderComponent={
              <input
                type='text'
                placeholder='search property'
                className='px-4 py-[0.3rem]  my-5 border border-1 border-black rounded-full bg-gradient-to-r text-black'
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
            height: '45%',
            width: '50%',
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
                onClick={() => setOpen(true)}
              />
            </button>
          </div>
          <p className='text-2xl flex justify-center  font-bold my-10 mx-44 w-1/2 h-1/2 text-red-500'>This action cannot be undone!!!</p>
          <div className='flex relative justify-center w-1/7 my-[4rem] ml-[45px] '>
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
}

export default ReportGeneration

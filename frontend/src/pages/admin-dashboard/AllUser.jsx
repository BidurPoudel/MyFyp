import React, { useState, useEffect } from 'react';
import Model from 'react-modal';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { useParams } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import OwnerPropertiesTable from '../../components/OwnerPropertiesTable';

const AllUser = () => {
  const { propertyId } = useParams();
  const [isVisible, setIsVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [deleteUserId, setUserId] = useState(null);
  const [search, setSearch] = useState('');
const [currentPage, setCurrentPage] = useState(1);
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const filteredUsers = users.filter((user) => {
    return (
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  

  const columns = [
    {
      name: 'S.No',
      cell: (row) => {
        const index = filteredUsers.indexOf(row);
        return (currentPage - 1) * 5 + index + 1;
      },
      width: '70px',
      style: {
        fontSize: '18px',
      },
    },
    {
      name: 'User Name',
      selector: (row) => row.username,
      width: '150px',
      style: {
        fontSize: '18px',
      },
    },
    {
      name: 'Email Address',
      selector: (row) => row.email,
      width: '250px',
      style: {
        fontSize: '18px',
      },
    },
    {
      name: 'Contact number',
      selector: (row) => row.phoneNumber,
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
            onClick={() => handleDeleteButton(row.userId)}
          >
            Delete
          </button>
        </div>
      ),
      width: '20%',
    },
  ];
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/admin/allUsers', {
          headers: {
            Authorization: token,
          },
          withCredentials: true,
        });
        console.log(response.data)
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);
  async function handleDeleteButton(userId){
    setIsVisible(true)
    setUserId(userId)
    console.log(`click ${userId}`)
  }

  async function handleDelete(id) {
    setIsVisible(false);
    console.log(`http://localhost:3001/api/admin/users/${id}`)
    try {
      await axios.delete(`http://localhost:3001/api/admin/users/${id}`)
      window.location.reload();

    } catch (error) {
      console.log(error)
    }
  }
  

  return (
    <div className=' relative  w-[100%]'>
      <div className='flex justify-center mt-16 mr-44 text-3xl font-semibold'>
        Data of All Users
      </div>
      <div>
      <div className='flex relative mt-10 w-full bg-red-200'>
        <div className='absolute flex justify-center w-[50%] left-[14rem] mt-3 -top-11 text-xl'>Total users: {users.length}</div>
      </div>
        <div className='w-[75%] mx-[4rem] absolute top-36 left-20'>
          <DataTable
            responsive={true}
            columns={columns}
            data={filteredUsers} // Use the 'data' array here
            pagination
            paginationPerPage={5}
            subHeader
            subHeaderComponent={
              <input
                type='text'
                placeholder='search for user'
                onChange={handleSearchChange}
                className='px-4 py-[0.3rem] my-5 border border-1 border-black rounded-full bg-gradient-to-r text-black hover:to-green-700 '
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
            width: '55%',
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
          {/* <p className='text-2xl font-bold my-10 mx-44 w-1/2 h-1/2 text-red-500'>{userName}</p> */}
          <div className='flex relative justify-between w-1/7 my-[4rem] ml-[45px] '>
            <div className=' absolute right-6 top-6'>
              <button className='action-btn' onClick={() => handleDelete(deleteUserId)}>
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

export default AllUser;

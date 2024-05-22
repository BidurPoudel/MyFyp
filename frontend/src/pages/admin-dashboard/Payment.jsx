import React, { useState, useEffect } from 'react';
import Model from 'react-modal';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { useParams } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import OwnerPropertiesTable from '../../components/OwnerPropertiesTable';

const Payment = () => {

  const [payment, setPayment] = useState([]);
  const [search, setSearch] = useState('');
  const [totalPaymentAmount, setTotalPaymentAmount] = useState(0);
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredPayments = payment.filter((pay) => {
    return (
      pay.owner.username.toLowerCase().includes(search.toLowerCase()) ||
      pay.owner.email.toLowerCase().includes(search.toLowerCase())
    );
  });

  const calculateTotalPaymentAmount = (payments) => {
    const totalAmount = payments.reduce((acc, curr) => acc + curr.paymentAmount, 0);
    setTotalPaymentAmount(totalAmount);
  };

  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/payment/allPayment');
        console.log(response.data);
        setPayment(response.data);
        calculateTotalPaymentAmount(response.data);
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
      selector: (row) => row.owner.username,
      minWidth: '50px',
      style: {
        fontSize: '18px', minWidth: '100px',
      },
    },
    {
      name: 'Email Address',
      selector: (row) => row.owner.email,
      minWidth: '50 0px',
      style: {
        fontSize: '18px',
      },
    },
    {
      name: 'Payment amount',
      selector: (row) => row.paymentAmount,
      style: {
        fontSize: '18px',
      },
    },
    {
      name: 'Payment Date',
      width: '300px',
      selector: (row) => row.paymentDate,
      style: {
        fontSize: '18px',
      },
    },
  ];

  
  return (
    <div className=' relative  w-[100%]'>
      <div className='flex justify-center mt-16 text-3xl font-semibold'>
        Data of All Rents
      </div>
      <div>
      <div className='flex relative mt-10 w-full bg-red-200'>
        <div className='absolute flex justify-center w-[50%] left-[25rem] mt-3 -top-11 text-xl'>Total Revenue:{totalPaymentAmount}</div>
      </div>
        <div className='w-[75%] mx-[4rem] absolute top-48 left-20'>
          <DataTable
            responsive={true}
            columns={columns}
            data={filteredPayments} // Use the 'data' array here
            pagination
            subHeader
            subHeaderComponent={
              <input
                type='text'
                onChange={handleSearchChange}
                placeholder='search payment'
                className='px-4 py-[0.3rem] my-5 border border-1 border-black rounded-full bg-gradient-to-r text-black hover:to-green-700 '
              />
            }
            customStyles={{
              table: {
                style: {
                  border: '0.05rem solid black',
                  width: '100%'
                },
              },
              headCells: {
                style: {
                  backgroundColor: '#333',
                  color: '#fff',
                  fontSize: 'medium',
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
      </div>
      {/* <Model
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
      </Model> */}
    </div>
  );
}

export default Payment

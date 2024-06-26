  import React, { useState, useEffect } from 'react';
  import Model from 'react-modal';
  import DataTable from 'react-data-table-component';
  import axios from 'axios';
  import { useNavigate, useParams } from 'react-router';
  import { NavLink } from 'react-router-dom';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faTimes } from '@fortawesome/free-solid-svg-icons';
  import {  Zoom, toast } from 'react-toastify';
import Footer from '../../layouts/Footer/Footer';

  const RequestProperty = () => {
    const { propertyId } = useParams();
    const [isVisible, setIsVisible] = useState(false);
    const [properties, setProperties] = useState([]);
    const [acceptRent, setAcceptRent] = useState(null);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const handleSearchChange = (e) => {
      setSearch(e.target.value);
    };
    const filteredRequest = properties.filter((user) => {
      return (
        user.propertyType.propertyName.toLowerCase().includes(search.toLowerCase())
      );
    });
    

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
        name: 'Property Id',
        selector: (row) => row.propertyId,
        minWidth: '100px',
        style: {
          fontSize: '18px',
        },
      },{
        name: 'Property',
        selector: (row) => row.propertyType?.propertyName,
        minWidth: '100px',
        style: {
          fontSize: '18px',
        },
      },

      {
        name: 'Tenant name',
        cell: (row) => (
          <div >
            {
              row.rent?.map((tenant, index) => (
                <div key={index} className='py-4 border-b border-black'>
                  <div>Name: {index+1}</div>
                  <div>Name: {tenant?.tenant ? tenant.tenant.username : 'no request from ten'}</div>
                  <div>Email: {tenant?.tenant ? tenant.tenant.email : 'null'}</div>
                  <div >Phone: {tenant?.tenant ? tenant.tenant.phoneNumber : 'null'}</div>
                </div>
              ))}
            <hr />
          </div>
        ),
        minWidth: '250px',
        style: {
          fontSize: '18px',
        },
      },
      {
        name: 'Actions',
        cell: (row) => (
          <div className=' '>
            <div className=''>
              {row.rent.map((tenant, index) => (
                <div key={index} className='flex my-10 border-b  pb-2 mt-12'>
                  <div className='text-lg '>{index+1}</div>
                  <button onClick={() => handleAccept(tenant.rentId)} className='text-white text-lg border-[0.5px] border-black px-4 py-1 w-[6rem] mx-2 float-left bg-green-500  hover:bg-green-600 transition-all h-[5%] rounded-md'>Accept</button>
                  <button onClick={() => handleReject(tenant.rentId)} className="border border-black w-[6rem] text-lg bg-red-500 text-white hover:bg-red-600 rounded-md">Reject</button>
                </div>
              ))}
            </div>
          </div>
        ),
        minWidth: '20rem',
      },
    ];

    async function handleAccept(rentId) {
      console.log("Accepted rentId:", rentId);
      setIsVisible(true)
      setAcceptRent(rentId)
    }

    const handleAcceptButton = async (id)=>{
      const token = localStorage.getItem('token')
      try {
        const response = await axios.get(`http://localhost:3001/api/properties/rent/acceptRequest/${id}`, {
          headers: {
            Authorization: token,
          },
          withCredentials: true,
        });
        window.location.reload();
        console.log(id)

          toast.success('Accepted Request', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
            transition: Zoom,
          })
        navigate('/owner')  
        
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    }


    async function handleReject(rentId) {
      console.log("Reject rentId:", rentId);
      const token = localStorage.getItem('token')
      try {
        const response = await axios.delete(`http://localhost:3001/api/properties/rent/rejectRequest/${rentId}`, {
          headers: {
            Authorization: token,
          },
          withCredentials: true,
        });
          toast.success('Request rejected', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
            transition: Zoom,
          })
          
          setTimeout(() => {
            window.location.reload();
          }, 6000);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    }



    useEffect(() => {
      const token = localStorage.getItem('token');
      const fetchProperties = async () => {
        try {
          const response = await axios.get('http://localhost:3001/api/properties/rentRequest/user', {
            headers: {
              Authorization: token,
            },
            withCredentials: true,
          });
          const processedProperties = response.data.map(property => ({
            ...property,
            tenantDetails: property.rent.map(rent => ({
              rentId: rent.rentId,
              tenantName: rent.tenant.username,
              tenantEmail: rent.tenant.email,
              tenantPhone: rent.tenant.phone,
              isAccepted: rent.isAccepted
            }))
          }));
          setProperties(processedProperties);
          console.log(processedProperties)
        } catch (error) {
          console.error('Error fetching properties:', error);
        }
      };

      

      fetchProperties();
    }, []);

    const totalRequests = properties.reduce((total, property) => total + property.rent.length, 0);;

    return (
      <div >
        <div>
          <p className='flex justify-center p-10 text-5xl font-semibold'>Your properties</p>
          <h2 className='px-32 pb-[1rem] text-lg font-semibold'>Total properties posted: {totalRequests}</h2>
        </div>
        <div className="table-responsive table mx-[10%] w-[60vw]">
          <DataTable
            responsive={true}
            columns={columns}
            data={filteredRequest}
            pagination
            subHeader
            subHeaderComponent={
              <input
                type='text'
                onChange={handleSearchChange}
                placeholder='search property'
                className='px-4 py-[0.3rem] text-lg my-5 border border-1 border-black rounded-full bg-gradient-to-r text-black'
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
                  width: '5rem',
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
              overflow:'hidden',
              top: '50px',
              left: '50%',
              transform: 'translateX(-50%)',
              height: '40%',
              width: '50%',
              borderRadius: '25px',
              animation: 'fade-in 5s forwards',
              transition: 'top 1s ease-out',
            },
          }}
        >
          <div className='model'>
            <div className='flex justify-around relative'>
              <h1 className=' text-4xl font-bold mt-5'>Do you want to Accept request???</h1>
              <button onClick={() => setIsVisible(false)} className='text-3xl px-3 w-10 absolute right-1'>
                <FontAwesomeIcon icon={faTimes} size='1x' style={{ color: 'black', paddingTop: '10px' }} />
              </button>
            </div>
            <p className='text-2xl font-bold my-10 ml-[15rem] w-1/2 h-1/2 '>This action cannot be Undone!!</p>
            <div className='flex relative justify-between w-1/7 my-[4rem] ml-[45px] '>
              <div className=' absolute right-6 top-6'>
                <button className='text-white text-lg border-[0.5px] border-black px-4 py-1 w-[6rem] mx-2 float-left bg-green-600  hover:bg-green-700 transition-all rounded-md' onClick={() => handleAcceptButton(acceptRent)}>Accept</button>
                <button className='text-balck text-lg border-[0.5px]  px-4 py-1 w-[6rem] mx-2 float-left transition-all rounded-md border-black bg-gray-300 ' onClick={() => setIsVisible(false)}>Close</button>
              </div>
            </div>
          </div>
        </Model>
      </div>
    );
  };

  export default RequestProperty;

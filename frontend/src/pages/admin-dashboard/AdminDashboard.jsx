import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faBuildingUser, faBuildingCircleCheck, faSackDollar } from '@fortawesome/free-solid-svg-icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, ResponsiveContainer, Cell } from 'recharts';
import axois from 'axios';
import { Pie } from 'react-chartjs-2';

const AdminDashboard = () => {
  const [allUsers, setUsers] = useState([]);
  const [allProperties, setAllProperties] = useState([]);
  const [allRents, setAllRents] = useState([]);
  const [allReportedProperties, setAllReportedProperties] = useState([]);

  const propertyTypeData = [
    { name: 'Rooms', count: 10 },
    { name: 'Building', count: 6 },
    { name: 'Flats', count: 8 },
    { name: 'Shutters', count: 5 },
    { name: 'Land', count: 12 },
  ]

  const allUserUrl = 'http://localhost:3001/api/admin/allUsers';
  const allPropertiesUrl = 'http://localhost:3001/api/admin/allProperties';
  const allRentUrl = 'http://localhost:3001/api/admin/allRents';
  const allReportedPropertiesUrl = 'http://localhost:3001/api/admin/allReportedProperties';


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axois.get(allUserUrl);
        console.log(response.data)
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };
    const fetchProperties = async () => {
      try {
        const response = await axois.get(allPropertiesUrl);
        console.log(response.data)
        setAllProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };
    const fetchRentedProperties = async () => {
      try {
        const response = await axois.get(allRentUrl);
        console.log(response.data)
        setAllRents(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };
    const fetchReportedProperties = async () => {
      try {
        const response = await axois.get(allReportedPropertiesUrl);
        console.log(response.data)
        setAllReportedProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };
    fetchUsers();
    fetchProperties();
    fetchRentedProperties();
    fetchReportedProperties();

  }, [])


  return (
    <div className='w-full mx-5 my-5'>

      <div className="data-tables flex px-32 mt-12 h-36 w-full rounded-lg ">
        <div className=' border-1 mx-2 px-14 border drop-shadow shadow-lg bg-blue-200 rounded-lg'>
          <div className='my-5 mx-[55px]'>
            <FontAwesomeIcon icon={faUsers}
              size='3x'
              style={{ color: 'black', paddingTop: "10px" }}
              className=' cursor-pointer relative'
              onClick={() => setOpen(!open)}
            />
          </div>
          <div className=' text-xl '>
            Total User: {allUsers.length}
          </div>
        </div>
        <div className='border-1 mx-2 px-14 border drop-shadow shadow-lg bg-green-200 rounded-lg'>
          <div className='my-5 mx-[75px]'>
            <FontAwesomeIcon icon={faBuildingUser}
              size='3x'
              style={{ color: 'black', paddingTop: "10px" }}
              className=' cursor-pointer relative'
              onClick={() => setOpen(!open)}
            />
          </div>
          <div className='text-xl '>
            Total Properties: {allProperties.length}
          </div>
        </div>
        <div className='border-1 mx-2 px-14 border drop-shadow shadow-lg bg-red-200 rounded-lg'>
          <div className='my-5 mx-[75px]'>
            <FontAwesomeIcon icon={faBuildingCircleCheck}
              size='3x'
              style={{ color: 'black', paddingTop: "10px" }}
              className=' cursor-pointer relative'
              onClick={() => setOpen(!open)}
            />
          </div>
          <div className='text-xl mx-9'>
            Total Rents: {allRents.length}
          </div>
        </div>
        <div className='border-1 mx-2 px-14 border drop-shadow shadow-lg bg-slate-200 rounded-lg'>
          <div className='my-5 mx-[75px]'>
            <FontAwesomeIcon icon={faSackDollar}
              size='3x'
              style={{ color: 'black', paddingTop: "10px" }}
              className=' cursor-pointer relative'
              onClick={() => setOpen(!open)}
            />
          </div>
          <div className='text-xl '>
            Total Revenue: 2000
          </div>
        </div>
      </div>
      <div className="graph-div flex  mt-24 -mx-3 bg-green-100 h-[50vh] ">
        <div className='pie-chart-graph  mx-4 w-full'>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Pie data={propertyTypeData} dataKey="count" cx="50%" cy="50%" outerRadius={60} fill="#8884d8">
                {propertyTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`#${index}0000`} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className='bar-graph w-1/2 px-[2%] py-10 bg-blue-300'>
          <BarChart width={550} height={300} data={propertyTypeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#f5f5f5" />
          </BarChart>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard

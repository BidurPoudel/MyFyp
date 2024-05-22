import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faBuildingUser, faBuildingCircleCheck, faSackDollar, faBackward } from '@fortawesome/free-solid-svg-icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Pie, PieChart, ResponsiveContainer, Cell } from 'recharts';
import axois from 'axios';

// import { Pie } from 'react-chartjs-2';

const COLORS = ['#0088FE', '#00C49F', '#FF6E6E'];
const AdminDashboard = () => {
  const [allUsers, setUsers] = useState([]);
  const [allProperties, setAllProperties] = useState([]);
  const [allRents, setAllRents] = useState([]);
  const [allReportedProperties, setAllReportedProperties] = useState([]);
  const [allPayment, setTotalPayment] = useState([]);
  const [totalPaymentAmount, setTotalPaymentAmount] = useState(0);
  const totalProperties = allProperties.length;
  const totalRents = allRents.length;
  const rentedPercentage = ((totalRents / totalProperties) * 100).toFixed(2);

  const propertyTypeData = [
    { name: 'Total User', count: allUsers.length },
    { name: 'Total Properties', count: allProperties.length },
    { name: 'Total Rents', count: allRents.length },
  ]

  const pieData = [
    { name: 'Total User', value: allUsers.length },
    { name: 'Total Properties', value: allProperties.length },
    { name: 'Total Rents', value: allRents.length },
  ];

  const allUserUrl = 'http://localhost:3001/api/admin/allUsers';
  const allPropertiesUrl = 'http://localhost:3001/api/admin/allProperties';
  const allRentUrl = 'http://localhost:3001/api/admin/allRents';
  const allReportedPropertiesUrl = 'http://localhost:3001/api/admin/allReportedProperties';
  const totalPaymentURL = 'http://localhost:3001/api/payment/allPayment';

  const calculateTotalPaymentAmount = (payments) => {
    const totalAmount = payments.reduce((acc, curr) => acc + curr.paymentAmount, 0);
    setTotalPaymentAmount(totalAmount);
  };

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
    const fetchTotalPayment = async () => {
      try {
        const response = await axois.get(totalPaymentURL);
        console.log(response.data)
        setTotalPayment(response.data);
        calculateTotalPaymentAmount(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };
    fetchUsers();
    fetchProperties();
    fetchRentedProperties();
    fetchReportedProperties();
    fetchTotalPayment();
  }, [])


  return (
    <div className='w-full mx-5 my-5'>
      <div className="data-tables flex justify-around px-32 mt-8 h-36 w-full rounded-lg ">
        <div className=' border-1 w-[200px] border drop-shadow shadow-lg bg-blue-200 rounded-lg'>
          <div className='my-5 mx-[55px]'>
            <FontAwesomeIcon icon={faUsers}
              size='2x'
              style={{ color: 'black', paddingTop: "10px" }}
              className=' cursor-pointer relative ml-5'
              onClick={() => setOpen(!open)}
            />
          </div>
          <div className=' text-lg ml-12'>
            Total User: {allUsers.length}
          </div>
        </div>
        <div className='border-1 w-[200px] border drop-shadow shadow-lg bg-green-200 rounded-lg'>
          <div className='my-5 mx-[75px]'>
            <FontAwesomeIcon icon={faBuildingUser}
              size='2x'
              style={{ color: 'black', paddingTop: "10px" }}
              className=' cursor-pointer relative ml-2'
              onClick={() => setOpen(!open)}
            />
          </div>
          <div className='text-lg ml-6'>
            Total Properties: {allProperties.length}
          </div>
        </div>
        <div className='border-1 w-[200px] border drop-shadow shadow-lg bg-red-200 rounded-lg'>
          <div className='my-5 mx-[75px]'>
            <FontAwesomeIcon icon={faBuildingCircleCheck}
              size='2x'
              style={{ color: 'black', paddingTop: "10px" }}
              className=' cursor-pointer relative ml-2'
              onClick={() => setOpen(!open)}
            />
          </div>
          <div className='text-lg ml-10'>
            Total Rents: {allRents.length}
          </div>
        </div>
        <div className='border-1 border drop-shadow shadow-lg bg-slate-200 rounded-lg'>
          <div className='my-5 mx-[75px]'>
            <FontAwesomeIcon icon={faSackDollar}
              size='2x'
              style={{ color: 'black', paddingTop: "10px" }}
              className=' cursor-pointer relative '
              onClick={() => setOpen(!open)}
            />
          </div>
          <div className='text-lg ml-2'>
            Total Revenue: {totalPaymentAmount}
          </div>
        </div>
      </div>
      <div className="graph-div flex relative h-[50vh] ">
        <div className='pie w-full'>
          <div>
            <ResponsiveContainer width="160%" height={500} >
              <PieChart width={600} height={650}>
                <Pie
                  data={pieData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  fill="black "
                  label={({ name, percent }) => `${name} - ${(percent * 100).toFixed(2)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`${entry.name}`} fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className='bar-graph pl-24  mx-44 my-20 '>
          <BarChart width={400} height={400} className=' pl-2' data={propertyTypeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#05c1ff" />
          </BarChart>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard

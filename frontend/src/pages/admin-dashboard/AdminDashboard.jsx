import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faBuildingUser, faBuildingCircleCheck, faSackDollar } from '@fortawesome/free-solid-svg-icons';
import { Chart } from 'react-chartjs-2';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

const AdminDashboard = () => {
  //   const data = [
  //     {
  //       "label": "Properties",
  //       "value": 2
  //     },
  //     {
  //       "label": "Rents",
  //       "value": 2
  //     },
  //     {
  //       "label": "Users",
  //       "value": 2
  //     }
  //   ];
  //   const labels = data.map(item => item.label);
  //   const values = data.map(item => item.value);

  //   const barData = {
  //     labels: labels, // Use the labels array you defined earlier
  //     datasets: [
  //       {
  //         label: 'Data',
  //         backgroundColor: 'rgba(75,192,192,0.2)',
  //         borderColor: 'rgba(75,192,192,1)',
  //         borderWidth: 1,
  //         hoverBackgroundColor: 'rgba(75,192,192,0.4)',
  //         hoverBorderColor: 'rgba(75,192,192,1)',
  //         data: values,
  //       },
  //     ],
  //   };
  // };
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
          Total User: 100
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
          Total Properties: 2000
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
          Total Rents: 2000
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
    <div className="graph-div flex mt-24 -mx-3 bg-green-100 h-[50vh] ">
      <div className='pie-chart-graph bg-red-300 mx-4 w-full'>
        {/* <Bar
          data={barData}
          options={{
            maintainAspectRatio: false, // Disable aspect ratio
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }}
        /> */}
      </div>
      <div className='bar-graph px-[23%] bg-blue-300'>fir</div>
    </div>
  </div>
)
}

export default AdminDashboard

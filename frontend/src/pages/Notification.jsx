import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../layouts/Footer/Footer';

function NotificationUser() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const token = localStorage.getItem('token')
    try {
      const response = await axios.get('http://localhost:3001/api/properties/notification/user', {
        headers: {

          Authorization: token
        }
      });
      setNotifications(response.data);

    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  return (
    <>
      <div className='bg-gray-200 w-3/6 ml-[25rem] mt-2 shadow-sm shadow-black'>
        <h2 className='text-2xl flex justify-center'><strong>Notifications</strong></h2>
        <div className=' '>
          <ul className='my-2 py-2 w-full'>
            <li>{notifications.map((message, index) => (
              <li
                key={index}
                className='border-b w-full py-2 border-black px-2 my-3 flex justify-center'
                dangerouslySetInnerHTML={{ __html: message }}
              >
              </li>

            ))}</li>
          </ul>
        </div>
      </div>
      <div className='w-full mt-[70vh] bg-red-100 '>
        <Footer />
      </div>
    </>
  );
}

export default NotificationUser;

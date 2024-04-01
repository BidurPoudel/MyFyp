import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import {jwtDecode}  from 'jwt-decode';
import axios from 'axios';

const Home = () => {
  const [token, setToken] = useState(null);
  
  useEffect(() => {
    const tokenData = Cookies.get('token');
    const url = axios.get('http://localhost:3001/api/user/profile'
    , {headers:{
        Authorization:`${Cookies.get('token')}`
      }
    }
    )
    if(tokenData){
      const decodedToken = jwtDecode(tokenData)
      setToken(decodedToken);
      console.log(decodedToken);
      return decodedToken?.token;
    }
  }, [tokenData]);

  return (
    <div>
      {token && (
        <div>
          <p>Token: {token.username}</p>
        </div>
      )}
      <p>Other content of your home page...</p>
    </div>
  );
};

export default Home;

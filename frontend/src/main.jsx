import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import { ToastContainer } from 'react-toastify';
import Layout from './layouts/Layout.jsx'
import Home from './pages/Home.jsx'
import Create from './pages/Create.jsx'
import Properties from './pages/Properties.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/Signup.jsx'
import Dashboard from './layouts/Dashboard.jsx'
import OwnerProperty from './pages/user-dashboard/OwnerProperty.jsx'
import Chat from './pages/user-dashboard/Chat.jsx'
import Payment from './pages/user-dashboard/Payment.jsx'
import Setting from './pages/user-dashboard/Setting.jsx'
import PropertyDetails from './pages/PropertyDetails.jsx'


const router = createBrowserRouter([
  {
    path: '/', 
    element: <Layout/>,
    children:[
      {path:"/login", element:<Login/>},
      {path:"/signup", element:<SignUp/>},
      {path: "/logout", element:<Home/>},
      {path: "",element: <Home/>},
      {path: "/create", element: <Create/>},
      {path: "/properties",element: <Properties/>},
      {path: "/properties/:propertyId",element: <PropertyDetails/>},
      
    ]
  },
  {
    path:'/dashboard/',
    element:<Dashboard/>,
    children:[
      {path:'property', element: <OwnerProperty/>},
      {path:'chat', element: <Chat/>},
      {path:'payment', element: <Payment/>},
      {path:'setting', element: <Setting/>}

    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
    <ToastContainer
    position="top-right"
    autoClose={2000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick={false}
    rtl={false}
    pauseOnFocusLoss={false}
    draggable={false}
    pauseOnHover={false}
    theme="light"
/>

  </React.StrictMode>,
)

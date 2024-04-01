import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
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
import Cookies from 'js-cookie';
import { store, persistor } from './app/store.jsx'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';

const ProtectedRoute = (props) => {
  const { route } = props
  const navigate = useNavigate();
  const takeToken = Cookies.get("token");
  if (!takeToken) {
    navigate('/login');
  }
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/logout", element: <Login /> },
      { path: "", element: <ProtectedRoute route={Home} /> },
      { path: "/create", element: <Create /> },
      { path: "/properties", element: <Properties /> },
      { path: "/properties/:propertyId", element: <PropertyDetails /> },

    ]
  },
  {
    path: '/dashboard/',
    element: <Dashboard />,
    children: [
      { path: 'property', element: <OwnerProperty /> },
      { path: 'chat', element: <Chat /> },
      { path: 'payment', element: <Payment /> },
      { path: 'setting', element: <Setting /> }

    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <RouterProvider router={router} />
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
    </Provider>
  </PersistGate>
)

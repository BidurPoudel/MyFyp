import React from 'react'
import Modal from 'react-modal';
import ReactDOM from 'react-dom/client'
import './index.css'
import { SkeletonTheme } from 'react-loading-skeleton';
import { RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Layout from './layouts/Layout.jsx'
import AdminSidebarLayout from './layouts/AdminSidebarLayout.jsx';
import Home from './pages/Home.jsx'
import Create from './pages/Create.jsx'
import Properties from './pages/Properties.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/Signup.jsx'
import Dashboard from './layouts/Dashboard.jsx'
import OwnerProperty from './pages/user-dashboard/OwnerProperty.jsx'
import Chat from './pages/user-dashboard/Chat.jsx'
import Payment from './pages/admin-dashboard/Payment.jsx'
import Setting from './pages/user-dashboard/Setting.jsx'
import PropertyDetails from './pages/PropertyDetails.jsx'
import Cookies from 'js-cookie';
import { store, persistor } from './app/store.jsx'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import UpdateProperty from './pages/user-dashboard/UpdateProperty.jsx';
import AllUser from './pages/admin-dashboard/AllUser.jsx';
import AdminLogin from './pages/admin-dashboard/AdminLogin.jsx';
import AdminSignUp from './pages/admin-dashboard/AdminSignUp.jsx';
import AllProperties from './pages/admin-dashboard/AllProperties.jsx';
import AllRent from './pages/admin-dashboard/AllRent.jsx';
import AdminDashboard from './pages/admin-dashboard/AdminDashboard.jsx';
import ReportGeneration from './pages/admin-dashboard/Report.jsx';
import CheckoutSuccess from './components/CheckoutSuccess.jsx';
import RequestProperty from './pages/user-dashboard/Requests.jsx';
import ChangePassword from './pages/ChangePassword.jsx';
import NotificationUser from './pages/Notification.jsx';
import ForgetPassword from './pages/ForgetPassoword.jsx';
import FindEmail from './pages/FindEmail.jsx';
Modal.setAppElement('#root');
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
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {path:"forget-password", element:<ForgetPassword/>},
  {path:'find-email', element:<FindEmail/>},
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: "/logout", element: <Login /> },
      { path: "/", element: <Home /> },
      { path: 'checkout-success', element: <CheckoutSuccess /> },
      { path: "/create", element: <Create /> },
      { path: "/properties", element: <Properties /> },
      { path: "/properties/:propertyId", element: <PropertyDetails /> },
      {path:"/notification", element:<NotificationUser/>},
      

    ]
  },
  {
    path: '/owner/',
    element: <Dashboard />,
    children: [
      { path: '', element: <OwnerProperty /> },
      { path: 'payment', element: <Payment /> },
      { path: 'request', element: <RequestProperty /> },
      { path: 'setting', element: <Setting /> },
      { path: 'update-property/:propertyId', element: <UpdateProperty /> },
      {path:"change-password", element:<ChangePassword/>}
    ]
  },
  {
    path: '/admin/login',
    element: <AdminLogin />,
  },
  {
    path: '/admin/signup',
    element: <AdminSignUp />,
  },
  {
    path: '/admin',
    element: <AdminSidebarLayout />,
    children: [
      { path: '', element: <AdminDashboard /> },
      { path: 'all-user', element: <AllUser /> },
      { path: 'all-properties', element: <AllProperties /> },
      { path: 'rents', element: <AllRent /> },
      { path: 'payment', element: <Payment /> },
      { path: 'report', element: <ReportGeneration /> },
    ]
  }

])
ReactDOM.createRoot(document.getElementById('root')).render(
  <PersistGate persistor={persistor}>
    <SkeletonTheme baseColor='#e8ffd1' highlightColor='#e8ffd1'>
      <Provider store={store}>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          autoClose={3100}
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
    </SkeletonTheme>
  </PersistGate>
)

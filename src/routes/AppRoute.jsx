import React from 'react'
import { useSelector } from 'react-redux';
import AuthenticatedRoute from './AuthenticatedRoute';
import Login from '../pages/login/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from '../pages/register/register';

const AppRoute = () => {
    const isLogged = useSelector((state) => state.auth.isLogged);
    return (
        <>
            {
                isLogged ?
                    <AuthenticatedRoute />
                    :
                    <Login/>
            }
            <ToastContainer position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={true}
                theme="light" />

        </>
    )
}

export default AppRoute
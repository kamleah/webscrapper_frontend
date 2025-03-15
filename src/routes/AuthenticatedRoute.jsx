// AuthenticatedRoute
import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Sidebar from '../pages/sidebar/Sidebar';
import Dashboard from '../pages/dashboard/Dashboard';
import Product from '../pages/products/Products';
import History from '../pages/history/History';
import User from '../pages/user/User';
import Scrapping from '../pages/scrapping/scrapping';
import Language from '../pages/language/Language';


const AuthenticatedRoute = () => {
    return (
        <Sidebar>
            <Routes>
                <Route path="/" element={<Scrapping />} />
                <Route path="/history" element={<History />} />
                <Route path="/users" element={<User />} />
                <Route path="/language" element={<Language/>} />
            </Routes>
        </Sidebar>
    )
}

export default AuthenticatedRoute
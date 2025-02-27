import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useFirstLevelAuthCheck = () => {
  const user = useSelector((state) => state.user.loggedUserDetails);
    const navigate = useNavigate();
    
    const firstLevelAuthCheck = () => {
        if (user?.role !== 'SUPER_ADMIN') {
            navigate('/')
        }
    }
    return {firstLevelAuthCheck}
}

export default useFirstLevelAuthCheck
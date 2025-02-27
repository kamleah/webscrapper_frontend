import { Navigate } from 'react-router-dom';
import Login from '../pages/login/Login';
import PrivateLayout from '../layout/PrivateLayout';
import PageNotFound from '../pages/pagenotfound/PageNotFound';

export const PageNotFoundRouter = [
 
    {
        path: '*',
        exact: true,
        layout: PrivateLayout,
        component: <PageNotFound />
    },
 
];

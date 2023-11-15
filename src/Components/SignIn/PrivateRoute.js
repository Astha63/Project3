import React, { useContext ,useEffect} from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

    
function PrivateRoute({ element }) {
    const { accessToken } = useContext(AuthContext);

    // Example in PrivateRoute.js
    useEffect(() => {
        console.log('PrivateRoute: Access Token:', accessToken);
    }, [accessToken]);


    if (accessToken) {
        console.log('PrivateRoute: User is authenticated. Rendering element.');
        return element;
    } else {
        console.log('PrivateRoute: User is not authenticated. Redirecting to login.');
        return <Navigate to="/" />;
    }
}


export default PrivateRoute;

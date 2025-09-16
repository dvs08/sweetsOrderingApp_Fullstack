import React from "react";
import {Navigate} from 'react-router-dom';
import { useDispatch } from "react-redux";


const ProtectedRoute = ({children}) => {

    const dispatch = useDispatch();

    const token = localStorage.getItem('token');

    if(!token){
        dispatch({
            type: 'RESET_ITEM_QUEUE',
        });
        
        return <Navigate to= "/"/>;

    }

    return children;
};


export default ProtectedRoute;

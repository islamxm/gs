import { Navigate } from "react-router-dom"
import {useSelector} from 'react-redux';
import {useEffect} from 'react';

const CheckAuth = ({children}) => {

    const {token} = useSelector(state => state);

    if(!token) {
        return <Navigate to='/auth'/>
    }
    return (
        <>
            {children}
        </>
    )
}

export default CheckAuth;

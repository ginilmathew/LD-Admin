import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

const ProtectedRouter = ({ children }) => {
  const navigate = useNavigate()

    useEffect(() => {
        if(!(localStorage.getItem("tokenAxios") && localStorage.getItem("userData"))){
    
            navigate('/login')
        }
      }, [!localStorage.getItem("tokenAxios") ,!localStorage.getItem("userData")])
    
    
      if (!(localStorage.getItem("tokenAxios") && localStorage.getItem("userData"))) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/login" />
      }
    
      // authorized so return child components
      return children;
}

export default ProtectedRouter
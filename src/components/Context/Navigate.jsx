import React, { useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

const Navigate = () => {

 const NavigateContext = useContext(null);
 const navigate = useNavigate();
 const location = useLocation();


  return (
   <NavigationContext.Provider value={{ goTo, currentPath }}>
      {children}
    </NavigationContext.Provider>

  )
}

export default Navigate
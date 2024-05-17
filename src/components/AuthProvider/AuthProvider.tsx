import React, { ReactNode, createContext, useState } from 'react';
import { removeItemFromStorage } from '../../utils/storageUtils';



type AuthContextType = {

  isLoggedIn: boolean;
  // setIsLoggedIn: (value: boolean) => void;
  logIn: () => void;
  checkLogin: () => boolean;
  logOut: () => void;

};

type AuthProviderProps = {
  children: ReactNode;
};


export const AuthContext = createContext<AuthContextType>({

  isLoggedIn: false,
  // setIsLoggedIn: () => {},
  logIn: () => { },
  checkLogin: () => false,


  logOut: () => { },

});



const AuthProvider = ({ children }: AuthProviderProps) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);



  const logIn = () => {
    console.log("isLoggedIn is true");
    setIsLoggedIn(true);
    sessionStorage.setItem('isLoggedIn', JSON.stringify(true));

  };

  const checkLogin = () => {
    const status = sessionStorage.getItem('isLoggedIn');
    console.log(status);
    if(status=='true') return true;
    else return false;
    
  }

  const logOut = () => {
    console.log("isLoggedIn is false");
    setIsLoggedIn(false);
    sessionStorage.setItem('isLoggedIn', JSON.stringify(false));
    sessionStorage.removeItem('isLoggedIn');
    removeItemFromStorage('token');
    removeItemFromStorage('refreshToken');
    console.log('User Id is removed');
  };



  return (

    <AuthContext.Provider value={{ isLoggedIn, logIn, logOut, checkLogin }}>

      {children}

    </AuthContext.Provider>

  );

};



export default AuthProvider;
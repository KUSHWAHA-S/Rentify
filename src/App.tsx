import React from 'react';
import { createBrowserRouter, Outlet, RouterProvider, } from "react-router-dom";

import './App.css';

function App() {

  const LayOut=()=>(
    <>
    <Header></Header>
    <Outlet></Outlet>
    </>
  );

  const router = createBrowserRouter([
    {
      
      element: <LayOut />,
      children: [
        {
          path: "/",
          element: <LandingPage />,
        },{
          path: "/login",
          element: <LoginPage />
        }
        ,
        {
          path: "/register",
          element: <RegistrationPage />
        }
        ,
        {
          path: "/orgRegister",
          element: <OrgRegistrationPage />
    
        },
        {
          path: "/organisations",
          element: <OrgPage />
        },
        {
          path: "/events/:orgId",
          element: <EventList />
    
        }, {
          path: "/events",
          element: <EventList />
    
        },
        {
          path: "/eventDetail/:id",
          element: <EventDetails />
    
        },
        {
          path: "/createEvent",
          element: <CreateEventPage />
    
        },
        {
          path: "/eventRegister/:sportParam",
          element: <UserEventRegister />
    
        },
        {
          path: "/sports",
          element: <Sports />
    
        }
      ],
      errorElement: <Error />
    },
    

  ]);
  return (
    <AuthProvider>
    {/* <Header></Header> */}
    <RouterProvider router={router} ></RouterProvider>
  </AuthProvider>
  );
}

export default App;

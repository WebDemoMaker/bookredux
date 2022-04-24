import './App.css';
import React from 'react';

import Order from './Components/Order';
import Books from './Components/Books';
import Login from './Components/Login';

import Success from './Components/Success';

import NotFound from './Components/NotFound';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from "react-router-dom";


function App() {
  const dispatch = useDispatch();
  const is_auth = useSelector((state) => state.is_auth)
  const auth_user = useSelector((state) => state.auth_user)

  console.log("auth user is ", auth_user)
  React.useEffect(() => {
    var auth = localStorage.getItem("auth_token")
    let token;
    console.log("token is ", JSON.stringify(auth))

    if (auth) {
      token = JSON.parse(auth).token
      dispatch({ type: 'AUTH_USER', payload: JSON.parse(auth) })
    }
    if (token || auth_user && auth_user.token) {
      axios.get('http://localhost:5000/api/fetch/book/', {
        headers: {
          Authorization: `Bearer ${auth_user && auth_user.token ? auth_user.token : token}`
        }
      }).then(resp => {
        console.log("inside app js ", resp.data)
        if (resp.data.books) {
          dispatch({ type: 'ADD_BOOKS', payload: resp.data.books })

        }
      }).catch(err => {
        // console.log("Error occured",err)
      })

    }


  }, [])
  return (
    <>
      {is_auth ?
        <div>
          <Routes>
            <Route path="/" element={<Books />} exact />
            <Route path="/order/book/:id" element={<Order />} exact />
            <Route path="/order/success/" element={<Success />} exact />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div> :
        <Login />}
    </>

  );
}

export default App;

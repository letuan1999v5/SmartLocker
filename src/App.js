import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { isLogin, isLogout, } from './redux2/reducer/LoginReducer';
import { isWorking } from './service/API/AuthenticationAPI';
function App() {
  let login = useSelector((state) => state.login.value);
  const dispatch = useDispatch();

  async function identify(){
    let i = await isWorking();
    if(i == true){
      dispatch(isLogin());
      return true;
    }
    else{
      dispatch(isLogout());
      return false;
    }
  }

  
  
  function reload() {
    if (window.performance) {
      if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
        if (localStorage.getItem('token') == undefined) {
          dispatch(isLogout());
          return;
        }
        else {
          identify();
        }
      }
    }
  }
  return (
    <BrowserRouter>
      <Routes>
        {/* {firstAccess()} */}
        {reload()}
        <Route path="/" element={login !== "login" ? <Login /> : <Home />} />
        {/* <Route path="/" element={<Login />}/> */}
        <Route element={Error} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

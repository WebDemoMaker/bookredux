import './App.css';
import React from 'react';
import {store} from './Store';
import {useSelector} from 'react-redux';
function Third() {
const name = useSelector(state=>state.name)


  return (
    <div>
    <h1>Third component {name} </h1>
   
    </div>
  );
}

export default Third;
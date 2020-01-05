import { useRef, useState, useEffect } from 'react';
import React from 'react';
import ReactNode from './ReactNode';
import { Provider } from 'react-dims';
import './App.css';

const App=()=>{
  const [data, setData] = useState([]);
  const generateData = ()=>{
    let arr = [];
    for(let i =0; i < 10; i++){
      arr.push(Math.round(Math.random()*10));
    };
    setData(arr);
  };
  useEffect(()=>generateData(),[])
  return (
    <div className="myLayout">
      <div style={{gridArea: '1/2/2/4', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <button onClick={generateData}>update data</button></div>
      <div className="coolThing">
        <Provider>
          <ReactNode data={data}/>
        </Provider>
      </div>
    </div>
  );
};

export default App;
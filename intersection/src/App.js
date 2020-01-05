import React from 'react';
import logo from './logo.svg';
import './App.css';
import Matrix from './matrix/Matrix';


function App() {
  var data = [
  {rowKey:"32", items:[{column:"A", value:0},{column:"B", value:1},{column:"D", value:2}]},
  {rowKey:"34", items:[{column:"A", value:3},{column:"B", value:4},{column:"D", value:5}]},
  {rowKey:"36", items:[{column:"A", value:6},{column:"B", value:7},{column:"D", value:8}]},
]

  return (
    <div className="App">
      <div className="matrix">
        <Matrix data={data} id ="matrix"/>
      </div>
    </div>
  );
}

export default App;

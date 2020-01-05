import React from 'react';
import './App.css';
import ReactNode from './ReactNode';
import { Provider } from 'react-dims';


function App() {
  var data = [{
                label:"TYPE 1",
                product_id: 1,
                color:"#F44336",
                data:[
                      {y:"r1", items:[{x:"c1", value:0},{x:"c2", value:3},{x:"c4", value:2}]},
                      {y:"r2", items:[{x:"c1", value:33},{x:"c2", value:24},{x:"c4", value:25}]},
                      {y:"r3", items:[{x:"c1", value:64},{x:"c2", value:57},{x:"c4", value:80}]},
                    ] 
            },
            {
                label:"TYPE 2",
                product_id:2,
                color:"#42d7f5",
                data:[
                      {y:"r2", items:[{x:"c3", value:0},{x:"c4", value:5},{x:"c5", value:2}]},
                      {y:"r3", items:[{x:"c4", value:16},{x:"c5", value:40},{x:"c6", value:25}]},
                      {y:"r4", items:[{x:"c5", value:26},{x:"c6", value:73},{x:"c7", value:18}]},
                      {y:"r5", items:[{x:"c5", value:46},{x:"c6", value:72},{x:"c7", value:38}]},
                    ]
            },
]
  var options ={
    titleSettings: {title:"CHART TITLE", fontColor:"#3a3a3a"},
    legendSettings: { position: 'right', align:'top', visible: true, height: '100', width: '400', category: "label", 
                    title:"TYPE", fontColor:"#3a3a3a",
                    showIntersection:true, labelIntersection:"INTERSECTION", colorIntersection:"#fff459"},
    chartSettings: {fontColor:"#000", colorIntersection:"#fff459"},
    tooltipSettings:{title:"Total number for both types"}
  }

  return (
    <div className="myLayout">
      <div className="coolThing">
        <Provider className="provider">
          <ReactNode data={data} color="True" options={options}/>
        </Provider>
      </div>
    </div>
  );
}

export default App;

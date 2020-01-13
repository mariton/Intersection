import React, { useRef, useState, useEffect } from 'react';
import { withContext } from 'react-dims';
import Matrix from './matrix/Matrix';

const ReactNode = ({dims, data, options})=>{
  const domNode = useRef(null);
  const [canvas, createCanvas] = useState(null);
  const [vizInitialized, setVizInitialized]= useState(false);

  console.log("dims in ReactNode", dims)

  useEffect(()=>{
    createCanvas(()=>new Matrix(domNode.current, options));
  },[options]);

  useEffect(()=>{
    if(data.length>1 && dims.width && vizInitialized===false){
      canvas.init(data, dims);
      setVizInitialized(()=>true);
    };
  },[data, dims, vizInitialized, canvas]);  
  
  useEffect(()=>{
    vizInitialized && canvas.updateDims(dims);
  },[dims,vizInitialized,canvas])
  

  return (
    <div ref={domNode} style={{height: '100%', width: '100%'}}/>
  )
};

export default withContext(ReactNode);
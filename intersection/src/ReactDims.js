import { useRef, useState, useEffect } from 'react';

const ReactDims = React.createContext(null);



export const Provider = (props)=>{
  const domNode = useRef(null); 
  const [dimensions, setDimensions] = useState({});

  const [timeoutID, newTimeoutID] = useState(0);
/*
*
*/ 
  const getNodeDimensions = ()=>{
      clearTimeout(timeoutID);
      newTimeoutID(setTimeout(()=>{
         setDimensions(domNode.current.getBoundingClientRect());
        }, 300)
      );
    };

  useEffect(()=>{
     window.addEventListener('resize', getNodeDimensions);
     return ()=>{ window.removeEventListener('resize', getNodeDimensions)};
   }, []);

return (
    <div ref={domNode} style={{height: '100%'}}>
      <ReactDims.Provider value={dimensions}>
        {props.children}
      </ReactDims.Provider>
    </div>
  )
};
// here is the consumer;
export const withContext=(ChildComponent)=>{
    return (props)=>(
        <ReactDims.Consumer>
          {(incomingDims)=>(<ChildComponent {...props} dims={incomingDims} />)}
        </ReactDims.Consumer>
    )
};
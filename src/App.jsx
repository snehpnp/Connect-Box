import React, { useState, useEffect ,useRef} from 'react';
import Routing from './Routes/Routes';


function App() {
  const pageRef = useRef(null);




  return (
    <div id="App">
      <div ref={pageRef} >

      <Routing />
      </div>
    </div>
  );
}

export default App;

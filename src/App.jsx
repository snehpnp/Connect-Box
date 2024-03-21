import React, { useState, useEffect ,useRef} from 'react';
import Routing from './Routes/Routes';
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  const pageRef = useRef(null);

  useEffect(() => {
    AOS.init({
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  }, []);
  return (
    <div id="App">
      <div ref={pageRef} >

      <Routing />
      </div>
    </div>
  );
}






export default App;

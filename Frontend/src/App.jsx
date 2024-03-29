import React, { useState, useEffect, useRef } from 'react';
import Routing from './Routes/Routes';
import AOS from "aos";
import "aos/dist/aos.css";
import Loader from './Utils/Loader';

function App() {
  const [loading, setLoading] = useState(true);
  const pageRef = useRef(null);

  useEffect(() => {
    AOS.init({
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });

    const loadData = () => {
      setTimeout(() => {
        setLoading(false); 
      }, 2000); 
    };

    loadData();
  }, []);

  return (
    <div id="App">
      {loading ? (
        <Loader /> 
      ) : (
        <div ref={pageRef}>
          <Routing />
        </div>
      )}
    </div>
  );
}

export default App;

import React, { useEffect } from 'react'
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useState } from "react";
import { getActivity } from '../../../../ReduxStore/Slice/Subadmin/allServices';
import { useDispatch } from "react-redux";

const Trackpanel = () => {
  const dispatch = useDispatch();

    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedFromDate, setSelectedFromDate] = useState('');
    const [selectedToDate, setSelectedToDate] = useState('');
    
    const user = JSON.parse(localStorage.getItem("user_details"));
   

    const handleDateChange = (event) => {
        const { name, value } = event.target;
        name === 'fromDate' ? setSelectedFromDate(value) : setSelectedToDate(value);
    
        document.getElementById('dropdown-basic-button').click();
      };


    const handleDropdownSelect = async (eventKey) => {
        setSelectedItem(eventKey);
        switch (eventKey) {
          case "EditUser":
            await fetchEditUserData(selectedFromDate, selectedToDate) // Call a function to fetch subadmin data
            break;
          case "Strategy":
            await  "hello"
            break;
          default:
            // Handle other cases if necessary
            break;
        }
      };



      const fetchEditUserData = async (fromDate, toDate) => {
        console.log("Fetching EditUser data from", fromDate, "to", toDate);
      };

      //api  for activity

      const Activity = async () => {
        var data = { role:user.Role };
        await dispatch(getActivity(data))
          .unwrap()
          .then(async (response) => {
            if (response.status) {
                console.log("response",response.data)
            }
          })
          .catch((error) => {
            console.log("error", error);
          });
      };

      useEffect(()=>{
        Activity()
      },[])


  return (
    <>  
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"3rem"}}>
        <div>
            <label style={{padding:"10px"}}>FROM DATE</label>
            <input type="date" name="fromDate" value={selectedFromDate} onChange={handleDateChange}/>
        </div>

        <div>
            <label style={{padding:"10px"}}>TO DATE</label>
            <input type="date" name="toDate" value={selectedToDate} onChange={handleDateChange}/>
        </div>

         <div>
            


         <DropdownButton
                    id="dropdown-basic-button"
                    title="Select Category"
                    onSelect={handleDropdownSelect}
    
                  >
                    <Dropdown.Item eventKey="EditUser">Edit User</Dropdown.Item>
                    <Dropdown.Item eventKey="Strategy">Strategy</Dropdown.Item>
                    <Dropdown.Item eventKey="GroupService">Group Service</Dropdown.Item>
                    <Dropdown.Item eventKey="SubadminLogin">Subadmin Login</Dropdown.Item>
                    <Dropdown.Item eventKey="Userlogin">User login</Dropdown.Item>
                    <Dropdown.Item eventKey="UserActivity">User Activity</Dropdown.Item>
                  </DropdownButton>
         </div>
         </div>
    </>
  )
}

export default Trackpanel

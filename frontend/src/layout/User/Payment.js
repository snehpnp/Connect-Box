// /* eslint-disable array-callback-return */
// import React, { useState, useEffect } from "react";
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import { useDispatch } from "react-redux";
// import toast from "react-hot-toast";
// import ToastButton from "../../Components/ExtraComponents/Alert_Toast";
// import { check_Device } from "../../Utils/find_device";
// import Content from "../../Components/Dashboard/Content/Content"
// import { Get_Company_Logo, UpdatePaymentAmount } from '../../ReduxStore/Slice/Admin/AdminSlice'

// // import { User_Dashboard_Data, Update_Dashboard_Data } from "../../ReduxStore/Slice/Users/DashboardSlice";

// const BrokerResponse = () => {
//   const dispatch = useDispatch();


//   // SET MODAL IN STARTEGY
//   const [showStartegyModal, setShowStartegyModal] = useState(false);

//   const [getPlanInfo, setPlanInfo] = useState([]);

//   const [modalsingleValue, setModalsingleValue] = useState({});


//   const getPaymentAmountDetails = async () => {
//     const req = {}
//     await dispatch(UpdatePaymentAmount(req))
//       .unwrap()
//       .then((response) => {
//         console.log("payment amount:", response)
//         if (response.status) {

//           const arrayOfObjects = Object.entries(response.data)
//             .filter(([key]) => !['_id', '__v', 'user_id', 'updatedAt', 'createdAt'].includes(key))
//             .map(([key, value]) => ({ key, value }));


//           setPlanInfo(arrayOfObjects)
//         }
//         else {

//         }
//       })
//       .catch((error) => {
//         console.log("Error", error);
//       });
//   }

//   console.log("getPlanInfo", getPlanInfo)
//   useEffect(() => {
//     getPaymentAmountDetails()
//   }, []);

//   return (

//     // <Content Page_title="Try any of our plans " button_status={false}>
//       <div className="row">
//         <div className="col-md-8">
//           <div className="row upgarde-plan">
//             <div className="col-md-6 plan-div">
//               <div className="form-check custom-checkbox mb-3">
//                 <input
//                   type="checkbox"
//                   className="form-check-input"
//                   name="halfyearly"
//                   defaultValue="halfyearly"
//                 />
//                 <label className="form-check-label" htmlFor="halfyearly">
//                   <strong>halfyearly - 60</strong>
//                 </label>
//                 <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly</p>
//                 <strong>Rp 49.000</strong>
//               </div>

//             </div>
//             <div className="col-md-6 plan-div">
//               <div className="form-check custom-checkbox mb-3">
//                 <input
//                   type="checkbox"
//                   className="form-check-input"
//                   name="halfyearly"
//                   defaultValue="halfyearly"
//                 />
//                 <label className="form-check-label" htmlFor="halfyearly">
//                   <strong>halfyearly - 60</strong>
//                 </label>
//                 <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly</p>
//                 <strong>Rp 49.000</strong>
//               </div>

//             </div>
//           </div>
//           <div className="row upgarde-plan">
//             <div className="col-md-6 plan-div">
//               <div className="form-check custom-checkbox mb-3">
//                 <input
//                   type="checkbox"
//                   className="form-check-input"
//                   name="halfyearly"
//                   defaultValue="halfyearly"
//                 />
//                 <label className="form-check-label" htmlFor="halfyearly">
//                   <strong>halfyearly - 60</strong>
//                 </label>
//                 <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly</p>
//                 <strong>Rp 49.000</strong>
//               </div>

//             </div>
//             <div className="col-md-6 plan-div">
//               <div className="form-check custom-checkbox mb-3">
//                 <input
//                   type="checkbox"
//                   className="form-check-input"
//                   name="halfyearly"
//                   defaultValue="halfyearly"
//                 />
//                 <label className="form-check-label" htmlFor="halfyearly">
//                   <strong>halfyearly - 60</strong>
//                 </label>
//                 <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly</p>
//                 <strong>Rp 49.000</strong>
//               </div>

//             </div>
//           </div>
//         </div>
//       </div>

//     // </Content>



//   );
// };

// export default BrokerResponse;







// PlanSelector.js
import React, { useState } from 'react';
import { Get_Company_Logo, UpdatePaymentAmount } from '../../ReduxStore/Slice/Admin/AdminSlice'

//  import '../../../public/assets/css/uniqueModalStyles.css'

const PlanSelector = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    console.log("runn")
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const selectCard = (card) => {
    // Unselect previous card
    if (selectedCard) {
      selectedCard.classList.remove('selected');
    }

    // Select the clicked card
    card.classList.add('selected');
    setSelectedCard(card);
  };

  const submitSelectedPlan = () => {
    // Implement logic for submitting the selected plan
    if (selectedCard) {
      alert('Selected plan submitted: ' + selectedCard.querySelector('h3').innerText);
      closeModal();
    } else {
      alert('Please select a plan before submitting.');
    }
  };

  return (
    <div className='my-5'>
      { 
       
        <div className="uniqueModal-modal">
          <div className="uniqueModal-modal-content">
            <span className="uniqueModal-close-button" onClick={closeModal}>X</span>
            <div className='uniqueModal-main-container'>
            <div className="uniqueModal-container">
              <h2 className="uniqueModal-heading">Choose a Plan</h2>

              <div className="uniqueModal-card" >
                <input type="radio" name="plan" className="uniqueModal-radio-button" />
                <div className="uniqueModal-card-content">
                  <h3>Monthly Plan</h3>
                  <p>Perfect for short-term commitments</p>
                  <strong>₹ 699/month</strong>
                </div>
              </div>
              <div className="uniqueModal-card" >
                <input type="radio" name="plan" className="uniqueModal-radio-button" />
                <div className="uniqueModal-card-content">
                  <h3>Monthly Plan</h3>
                  <p>Perfect for short-term commitments</p>
                  <strong>₹ 700/month</strong>
                </div>
              </div>
             
             
              <div className="uniqueModal-card" >
                <input type="radio" name="plan" className="uniqueModal-radio-button" />
                <div className="uniqueModal-card-content">
                  <h3>Monthly Plan</h3>
                  <p>Perfect for short-term commitments</p>
                  <strong>₹ 699/month</strong>
                </div>
              </div>
              <div className="uniqueModal-card" >
                <input type="radio" name="plan" className="uniqueModal-radio-button" />
                <div className="uniqueModal-card-content">
                  <h3>Monthly Plan</h3>
                  <p>Perfect for short-term commitments</p>
                  <strong>₹ 700/month</strong>
                </div>
              </div>
                
             
              </div>
              <button className="d-block btn btn-primary" onClick={submitSelectedPlan}>Submit</button>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default PlanSelector;

import { useState, useEffect } from "react";

import { update_broker_Data, Get_broker_Data } from "../../../../ReduxStore/Slice/Subadmin/System";
import { useDispatch } from "react-redux";
import Swal from 'sweetalert2';



function BrokerInfoForm() {
  const dispatch = useDispatch();

  const [brokerName, setBrokerName] = useState('ALICE BLUE');
  const [apiKey, setApiKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [dematUserId, setDematUserId] = useState('');
  const user_id = JSON.parse(
    localStorage.getItem("user_details")
  ).user_id;


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!apiKey || !secretKey || !dematUserId) {
      Swal.fire({
        title: "Please Field The Box!",
        icon: "error",
        timer: 1000,
        timerProgressBar: true
      });
      return;
    }

    await dispatch(
      update_broker_Data({
        api_key: apiKey,
        api_secret: secretKey,
        demat_userid: dematUserId,
        id: user_id

      })
    )
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          let timerInterval;
          Swal.fire({
            title: "Messgage Send!",
            html: "I will close in <b></b> milliseconds.",
            timer: 1200,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
              const timer = Swal.getPopup().querySelector("b");
              timerInterval = setInterval(() => {
                timer.textContent = `${Swal.getTimerLeft()}`;
              }, 100);
            },
            willClose: () => {
              clearInterval(timerInterval);
            }
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
     
            }
          });
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };



  const gettable = async () => {
    await dispatch(Get_broker_Data({ id: user_id }))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          setApiKey(response.data[0].api_key)
          setSecretKey(response.data[0].api_secret)
          setDematUserId(response.data[0].demat_userid)

        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };



  useEffect(() => {
    gettable()
  }, []);


  
  return (
    <div className="container ">
      <div className="row justify-content-center">

        <div className="content-page-header">

          <h5>Set Broker Information</h5>
        </div> {/* Added mb-4 class for bottom margin */}
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label htmlFor="brokerName">Broker Name:</label>
            <input
              type="text"
              className="form-control"
              id="brokerName"
              value={brokerName}
              onChange={(e) => setBrokerName(e.target.value)}
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="apiKey">App Code:</label>
            <input
              type="text"
              className="form-control"
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="secretKey">Secret Key:</label>
            <input
              type="text"
              className="form-control"
              id="secretKey"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="dematUserId">Demat User Id:</label>
            <input
              type="text"
              className="form-control"
              id="dematUserId"
              value={dematUserId}
              onChange={(e) => setDematUserId(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">Submit</button>
        </form>
      </div>
    </div>

  );
}

export default BrokerInfoForm;

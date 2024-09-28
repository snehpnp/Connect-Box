import React, { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import FullDataTable from "../../../Components/ExtraComponents/Tables/FullDataTable";
import Content from "../../../Components/Dashboard/Content/Content";
import { fDateTime } from "../../../Utils/Date_formet";
import { IndianRupee } from "lucide-react";
import { UserWalletApiData } from "../../../ReduxStore/Slice/Comman/Userinfo";
import FundModal from "./FundModal"; // Import the modal component
import Swal from "sweetalert2";

import { UserBalanceAddReqApi } from "../../../ReduxStore/Slice/Users/Userdashboard.Slice";


function Payment() {
  const dispatch = useDispatch();
  const user_details = JSON.parse(localStorage.getItem("user_details"));
  const [cardData, setCardData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalActionType, setModalActionType] = useState("add");

  // Styles
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh",
    },
    boldHeader: {
      fontWeight: "bold",
    },
  };

  // Columns definition with useMemo for performance optimization
  const columns = useMemo(() => {
    const baseColumns = [
      {
        field: "id",
        headerName: "#",
        width: 70,
        headerClassName: styles.boldHeader,
        renderCell: (params) => <b>{params.value + 1}</b>,
      },
    
      {
        field: "Mode",
        headerName: "Mode",
        width: 250,
        headerClassName: styles.boldHeader,
        renderCell: (params) => (
          <span className="badge bg-success-light">{params.value || "CASH"}</span>
        ),
      },
      {
        field: "typeT",
        headerName: "Type",
        width: 250,
        headerClassName: styles.boldHeader,
        renderCell: (params) => (
          params.value === "Debit" ?
          <span className="badge bg-danger-light">{params.value.toUpperCase() || "-"}</span>
          :
          <span className="badge bg-success-light">{params.value.toUpperCase() || "-"}</span>
        ),
      },
      {
        field: "Balance",
        headerName: "Balance",
        width: 250,
        headerClassName: styles.boldHeader,
        renderCell: (params) => {
          const { balance, Mode, admin_charge,typeT } = params.row;
          const amount = balance || admin_charge || "-";
          const textColor = typeT != "Debit" ? "text-success-light" : "text-danger-light";
          const sign = typeT != "Debit" ? "+" : "-";
          return (
            <span className={textColor}>
              {sign}
              <IndianRupee style={{ height: "15px" }} />
              {amount}
            </span>
          );
        },
      },
      {
        field: "createdAt",
        headerName: "Created At",
        width: 250,
        headerClassName: styles.boldHeader,
        renderCell: (params) => <div>{fDateTime(params.value)}</div>,
      },
    ];

 

    return baseColumns;
  }, [user_details.subadmin_service_type]);

  // Fetch user wallet data
  const fetchData = async () => {
    try {
      const response = await dispatch(
        UserWalletApiData({
          req: { id: user_details.user_id },
          token: user_details.token,
        })
      ).unwrap();

      if (response.status) {
        setCardData({
          TotalBalance: response.TotalBalance,
          UsedBalance: response.UsedBalance,
          RemainingBalance: response.RemaingBalance,
          userTransection: response.UserTransection,
        });
      }
    } catch (error) {
      console.error("Error fetching wallet data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddFunds = () => {
    setModalActionType("add");
    setShowModal(true);
  };

  const handleWithdrawFunds = () => {
    setModalActionType("withdraw");
    setShowModal(true);
  };

  const handleModalSubmit = async(amount, actionType) => {


      const data = { id: user_details.user_id, balance: amount ,status:0,actionType:actionType};



      await dispatch(UserBalanceAddReqApi(data))
        .unwrap()
        .then(async (response) => {
          if (response.status) {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: response.msg,
              confirmButtonText: 'OK',
            });
         
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: response.msg,
              confirmButtonText: 'OK',
            });
          }
        })
        .catch((error) => {
          console.log('Error', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An unexpected error occurred. Please try again later.',
            confirmButtonText: 'OK',
          });
        });
  

  
    
 
  };

  return (
    <div data-aos="fade-left">
      <Content
        Card_title="Wallet"
        Card_title_icon="fas fa-money-bill-wave pe-2"
        Content={
          <>
            <div className="super-admin-list-head">
              <div className="row">
                {[
                  {
                    label: "Total Balance",
                    value: cardData.TotalBalance,
                    icon: "fe fe-package",
                  },
                  {
                    label: "Used Balance",
                    value: cardData.UsedBalance,
                    icon: "fe fe-list",
                  },
                  {
                    label: "Remaining Balance",
                    value: cardData.RemainingBalance,
                    icon: "fe fe-pause-circle",
                  },
                ].map((item, index) => (
                  <div className="col-xl-3 col-md-6 d-flex" key={index}>
                    <div className="card w-100">
                      <div className="">
                        <div className="grid-info-item">
                          <div className="grid-info">
                            <span>{item.label}</span>
                            <h4>{item.value}</h4>
                          </div>
                          <div className="grid-head-icon">
                            <i className={item.icon} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="col-xl-3 col-md-6 d-flex">
                  <div
                    className="card w-100"
                    style={{
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                      borderRadius: "10px",
                    }}
                  >
                    <div className="">
                      <div
                        className="grid-info-item total-type"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div className="grid-info">
                          <h4
                            style={{
                              marginBottom: "0",
                              fontSize: "1.25rem",
                              color: "#333",
                            }}
                          >
                            Wallet
                          </h4>
                          <span
                            style={{ color: "#777", fontSize: "0.875rem" }}
                          >
                            Manage your funds
                          </span>
                        </div>
                        <button
                          className="btn btn-primary"
                          style={{
                            padding: "8px 16px",
                            fontSize: "1rem",
                            backgroundColor: "#007bff",
                            border: "none",
                            borderRadius: "5px",
                            color: "#fff",
                            fontWeight: "bold",
                            cursor: "pointer",
                          }}
                          onClick={handleAddFunds}
                        >
                          Add Funds
                        </button>
                        <button
                          className="btn btn-warning"
                          style={{
                            padding: "8px 16px",
                            fontSize: "1rem",
                            backgroundColor: "#ffc107",
                            border: "none",
                            borderRadius: "5px",
                            color: "#000",
                            fontWeight: "bold",
                            cursor: "pointer",
                            marginLeft: "10px",
                          }}
                          onClick={handleWithdrawFunds}
                        >
                          Withdraw Funds
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <FullDataTable
          

              styles={styles}
              columns={columns}
              rows={cardData.userTransection || []}
              checkboxSelection={false}
            />
            <FundModal
              show={showModal}
              handleClose={() => setShowModal(false)}
              handleSubmit={handleModalSubmit}
              actionType={modalActionType}
              cardData={cardData}
            />
          </>
        }
      />
    </div>
  );
}

export default Payment;

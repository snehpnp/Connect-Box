import React, { useState, useMemo } from "react";
import FullDataTable from "../../../../Components/ExtraComponents/Tables/FullDataTable";
import Content from "../../../../Components/Dashboard/Content/Content";
import { IndianRupee } from "lucide-react";
import { Tabs, Tab, Badge, Button } from "react-bootstrap";

function Payment() {
  const [activeTab, setActiveTab] = useState("deposit");
  const [activeStatus, setActiveStatus] = useState("pending");

  const dummyData = {
    deposits: [
      { id: 0, username: "John Doe", Mode: true, Balance: 5000, createdAt: "2024-09-01", status: "pending" },
      { id: 1, username: "Alice Smith", Mode: true, Balance: 15000, createdAt: "2024-08-25", status: "complete" },
      { id: 2, username: "Bob Brown", Mode: true, Balance: 2000, createdAt: "2024-08-28", status: "reject" },
    ],
    withdrawals: [
      { id: 0, username: "Charlie Johnson", Mode: false, Balance: 3000, createdAt: "2024-09-02", status: "pending" },
      { id: 1, username: "Dave Wilson", Mode: false, Balance: 7000, createdAt: "2024-08-29", status: "complete" },
      { id: 2, username: "Eve Davis", Mode: false, Balance: 12000, createdAt: "2024-08-26", status: "reject" },
    ],
  };

  // Styles
  const styles = {
    boldHeader: {
      fontWeight: "bold",
    },
    tabContainer: {
      backgroundColor: "#f8f9fa",
      borderRadius: "8px",
      padding: "15px",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    },
    buttonGroup: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "20px",
    },
    button: {
      margin: "0 5px",
      padding: "10px 20px",
      borderRadius: "20px",
      fontWeight: "bold",
      cursor: "pointer",
    },
    activeButton: {
      backgroundColor: "#007bff",
      color: "#fff",
    },
    inactiveButton: {
      backgroundColor: "#f8f9fa",
      color: "#000",
    },
  };

  // Columns definition with useMemo for performance optimization
  const columns = useMemo(() => [
    {
      field: "id",
      headerName: "#",
      width: 70,
      headerClassName: styles.boldHeader,
      renderCell: (params) => <b>{params.value + 1}</b>,
    },
    {
      field: "username",
      headerName: "User Name",
      width: 210,
      headerClassName: styles.boldHeader,
      renderCell: (params) => <div>{params.row.username}</div>,
    },
    {
      field: "Mode",
      headerName: "Mode",
      width: 250,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <span className={params.row.Mode ? "badge bg-success-light" : "badge bg-danger-light"}>
          {params.row.Mode ? "Deposit" : "Withdrawal"}
        </span>
      ),
    },
    {
      field: "Balance",
      headerName: "Balance",
      width: 250,
      headerClassName: styles.boldHeader,
      renderCell: (params) => {
        const textColor = params.row.Mode ? "text-success-light" : "text-danger-light";
        const sign = params.row.Mode ? "+" : "-";
        return (
          <span className={textColor}>
            {sign}
            <IndianRupee style={{ height: "15px" }} />
            {params.row.Balance}
          </span>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 250,
      headerClassName: styles.boldHeader,
      renderCell: (params) => <div>{params.row.createdAt}</div>,
    },
  ], []);

  // Filtering function based on active tab and status
  const filteredRows = useMemo(() => {
    const data = activeTab === "deposit" ? dummyData.deposits : dummyData.withdrawals;
    return data.filter((transaction) => transaction.status === activeStatus);
  }, [activeTab, activeStatus]);

  return (
    <div data-aos="fade-left">
      <Content
        Card_title="Payment Request"
        Card_title_icon="fas fa-money-bill-wave pe-2"
        Content={
          <>
            <div style={styles.buttonGroup}>
              <Button
                style={activeTab === "deposit" ? { ...styles.button, ...styles.activeButton } : { ...styles.button, ...styles.inactiveButton }}
                onClick={() => setActiveTab("deposit")}
              >
                Deposits
              </Button>
              <Button
                style={activeTab === "withdrawal" ? { ...styles.button, ...styles.activeButton } : { ...styles.button, ...styles.inactiveButton }}
                onClick={() => setActiveTab("withdrawal")}
              >
                Withdrawals
              </Button>
            </div>

            <div style={styles.tabContainer}>
              <Tabs
                id="controlled-tab-example"
                activeKey={activeStatus}
                onSelect={(k) => setActiveStatus(k)}
                className="mb-3"
              >
                <Tab eventKey="pending" title={<Badge bg="warning">Pending</Badge>} />
                <Tab eventKey="complete" title={<Badge bg="success">Complete</Badge>} />
                <Tab eventKey="reject" title={<Badge bg="danger">Reject</Badge>} />
              </Tabs>

              <FullDataTable
                styles={styles}
                columns={columns}
                rows={filteredRows}
                checkboxSelection={false}
              />
            </div>
          </>
        }
      />
    </div>
  );
}

export default Payment;

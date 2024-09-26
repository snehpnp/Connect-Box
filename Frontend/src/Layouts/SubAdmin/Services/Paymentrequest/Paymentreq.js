import React, { useState, useMemo, useEffect } from "react";
import FullDataTable from "../../../../Components/ExtraComponents/Tables/FullDataTable";
import Content from "../../../../Components/Dashboard/Content/Content";
import { IndianRupee, Timer } from "lucide-react";
import { Tabs, Tab, Badge, Button, Dropdown } from "react-bootstrap";
import { Get_User_Balance } from "../../../../ReduxStore/Slice/Subadmin/allServices";
import { useDispatch } from "react-redux";
import { fDateTime } from "../../../../Utils/Date_formet";
import { Update_status_balance } from "../../../../ReduxStore/Slice/Subadmin/allServices";
import Swal from 'sweetalert2'

function Payment() {
    const [activeTab, setActiveTab] = useState("deposit");
    const [activeStatus, setActiveStatus] = useState("pending");
    const dispatch = useDispatch();
    const [transactionData, setTransactionData] = useState({
        deposits: [],
        withdrawals: [],
    });

    const userDetail = JSON.parse(localStorage.getItem("user_details"));
    const userid = userDetail?.user_id;



    useEffect(() => {
        getuser_balance();
    }, []);



    const getuser_balance = async () => {
        const data = { id: userid };
        await dispatch(Get_User_Balance(data))
            .unwrap()
            .then((response) => {
                if (response.status) {
                    const deposits = response.data
                        .filter((item) => item.type === "CREDIT")
                        .map((item, index) => ({
                            ...item,
                            id: index + 1,
                            Mode: "Deposit",
                            status: item.status === 0 ? "pending" : item.status === 1 ? "complete" : "reject",
                        }));

                    const withdrawals = response.data
                        .filter((item) => item.type === "DEBIT")
                        .map((item, index) => ({
                            ...item,
                            id: index + 1,
                            Mode: "Withdrawal",
                            status: item.status === 0 ? "pending" : item.status === 1 ? "complete" : "reject",
                        }));

                    setTransactionData({ deposits, withdrawals });
                }
            });
    };





    const handleStatusChange = async (id, newStatus) => {
        const data = { id: id._id, status: newStatus, balance: id.balance ,type:activeTab};
        try {
            const response = await dispatch(Update_status_balance(data)).unwrap();
            if (response.status) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Status updated successfully.',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
                getuser_balance();
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to update status.',
                    icon: 'error',
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'An error occurred while updating status.',
                icon: 'error',
                timer: 1500,
                showConfirmButton: false
            });
        }
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
            overflow: "auto",
            maxHeight: "800px",
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

    const columns = useMemo(
        () => [
            {
                field: "id",
                headerName: "S.No",
                width: 70,
                headerClassName: styles.boldHeader,
                renderCell: (params) => <b>{params.value + 1}</b>,
            },
            {
                field: "UserName",
                headerName: "User Name",
                width: 210,
                headerClassName: styles.boldHeader,
                renderCell: (params) => <div>{params.row.UserName}</div>,
            },
            {
                field: "Mode",
                headerName: "Mode",
                width: 250,
                headerClassName: styles.boldHeader,
                renderCell: (params) => (
                    <span className={params.row.Mode === "Deposit" ? "badge bg-success-light" : "badge bg-danger-light"}>
                        {params.row.Mode}
                    </span>
                ),
            },
            {
                field: "balance",
                headerName: "Balance",
                width: 250,
                headerClassName: styles.boldHeader,
                renderCell: (params) => {
                    const textColor = params.row.Mode === "Deposit" ? "text-success-light" : "text-danger-light";
                    const sign = params.row.Mode === "Deposit" ? "+" : "-";
                    return (
                        <span className={textColor}>
                            {sign}
                            <IndianRupee style={{ height: "15px" }} />
                            {params.row.balance}
                        </span>
                    );
                },
            },
            {
                field: "createdAt",
                headerName: "Created At",
                width: 250,
                headerClassName: styles.boldHeader,
                renderCell: (params) => <div>{fDateTime(params.row.createdAt)}</div>,
            },
            {
                field: "status",
                headerName: "Status",
                width: 150,
                headerClassName: styles.boldHeader,
                renderCell: (params) =>
                    params.row.status === "pending" ? (
                        <Dropdown
                            onSelect={(eventKey) => handleStatusChange(params.row, eventKey)}
                        >
                            <Dropdown.Toggle variant="secondary" id={`dropdown-basic-${params.row.id}`}>
                                {params.row.status}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="0">Pending</Dropdown.Item>
                                <Dropdown.Item eventKey="1">Complete</Dropdown.Item>
                                <Dropdown.Item eventKey="2">Reject</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    ) : (
                        <span>{params.row.status.charAt(0).toUpperCase() + params.row.status.slice(1)}</span>
                    ),
            },
        ],
        [transactionData, activeTab]
    );


    const filteredRows = useMemo(() => {
        const data = activeTab === "deposit" ? transactionData.deposits : transactionData.withdrawals;
        return data.filter((transaction) => transaction.status === activeStatus);
    }, [activeTab, activeStatus, transactionData]);




    return (

        <div data-aos="fade-left">
            <Content
                Card_title="Payment Request"
                Card_title_icon="fas fa-money-bill-wave pe-2"
                Content={
                    <>
                        <div style={styles.buttonGroup}>
                            <Button
                                style={
                                    activeTab === "deposit"
                                        ? { ...styles.button, ...styles.activeButton }
                                        : { ...styles.button, ...styles.inactiveButton }
                                }
                                onClick={() => setActiveTab("deposit")}
                            >
                                Deposits
                            </Button>
                            <Button
                                style={
                                    activeTab === "withdrawal"
                                        ? { ...styles.button, ...styles.activeButton }
                                        : { ...styles.button, ...styles.inactiveButton }
                                }
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

import React, { useState, useEffect } from "react";
import { fetchSubadminCompanyInfo } from "../../../ReduxStore/Slice/Admin/SubAdminCompanyInfo";
import { useDispatch } from "react-redux";
import Content from '../../../Components/Dashboard/Content/Content';
import FullDataTable from '../../../Components/ExtraComponents/Tables/FullDataTable';
import Loader from '../../../Utils/Loader';
import { fDateTime } from '../../../Utils/Date_formet';
import CompanyChange from '../../../Components/ExtraComponents/Models/CompanyChange';


function Option_Chain() {
    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
    const [selectedRow, setSelectedRow] = useState(null);
    const [symbolStrike, setSymbolStrike] = useState('')
    const [symbol, setSymbol] = useState('')
    const [expiry, setExpiry] = useState('')
    const [strategy, setStrategy] = useState('')
    const [ButtonDisabled, setButtonDisabled] = useState(false)
    const [refresh, setRefresh] = useState(false)


    const [companyData, setCompanyData] = useState({
        loading: false,
        data: [],
    });
    const [OptionChainData, setOptionChainData] = useState({
        loading: true,
        data: [],
    });
    const [All_Symbols, set_All_Symbols] = useState({
        loading: false,
        data: []
    });



    const handleOpenModal = (rowData) => {
        setSelectedRow(rowData)
        setIsModalOpen(true);
    };


    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh',
        },
        card: {
            width: 'auto',
        },
        boldHeader: {
            fontWeight: 'bold',
        },
        headerButton: {
            marginRight: 12,
        },
    };


    const columns = [
        { field: 'id', headerName: '#', width: 70, headerClassName: styles.boldHeader },
        {
            field: 'profile',
            headerName: 'Profile',
            width: 120,
            headerClassName: styles.boldHeader,
            renderCell: (params) => (
                <div>
                    <a href="profile.html" className="company-avatar avatar-md me-2 companies company-icon">
                        <img className="avatar-img rounded-circle company" src="assets/img/companies/company-05.svg" alt="Company Image" />
                    </a>
                </div>
            )
        },
        {
            field: 'makerInfo',
            headerName: 'Subadmin Name',
            width: 210,
            headerClassName: styles.boldHeader,
            renderCell: (params) => (
                <div>
                    {params.row.makerInfo.FullName}
                </div>
            )
        },
        {
            field: 'razorpay_key',
            headerName: 'razorpay_key',
            width: 250,
            headerClassName: styles.boldHeader,
            renderCell: (params) => (
                <div>
                    {params.value || '-'}
                </div>
            )
        },
        {
            field: 'email',
            headerName: 'email',
            width: 250,
            headerClassName: styles.boldHeader,
            renderCell: (params) => (
                <div>
                    {params.value || '-'}
                </div>
            )
        },
        {
            field: "change",
            headerName: "Change",
            width: 150,
            headerClassName: styles.boldHeader,
            renderCell: (params) => (
                <div onClick={() => handleOpenModal(params.row)}>
                    <span className="badge bg-purple">Change</span>
                </div>
            ),
        },
        {
            field: 'Status',
            headerName: 'Status',
            width: 120,
            headerClassName: styles.boldHeader,
            renderCell: (params) => {
                if (params.row.razorpay_key !== '') {
                    return (
                        <div>
                            <span className={`badge bg-success-light d-inline-flex align-items-center`}>
                                <i className={'fe fe-check me-1'} />Active
                            </span>
                        </div>
                    );
                } else {
                    return (
                        <div>
                            <span className={`badge bg-danger-light d-inline-flex align-items-center`}>
                                <i className={`fe fe-x me-1`}></i>InActive</span>
                        </div>
                    );
                }
            }
        },
        {
            field: 'createdAt', headerName: 'createdAt', width: 250, headerClassName: styles.boldHeader,
            renderCell: (params) => (
                <div>
                    {fDateTime(params.value)}
                </div>
            )
        },
    ];




    const getCompanyData = async () => {
        try {
            const response = await dispatch(fetchSubadminCompanyInfo()).unwrap();

            if (response.status) {
                const formattedData = response.data.map((row, index) => ({
                    ...row,
                    id: index + 1,
                }));
                setCompanyData({
                    loading: true,
                    data: formattedData,
                });
            }
        } catch (error) {
            setCompanyData({
                loading: false,
                data: [],
            });
        }
    };


    useEffect(() => {
        getCompanyData();
    }, []);



    return (
        <>
            {companyData.loading ? (
                <Content
                    Card_title="Option Chain"

                    Content={
                        <>
                            <div className="row d-flex mb-3">
                                <div className="col-md-2 text-secondary input-block">
                                    <label className="text-secondary"
                                        style={{ fontWeight: "bold", color: "black" }}
                                    >SYMBOLS</label>
                                    <select
                                        name="symbols_filter"
                                        className="default-select wide form-control spacing  "
                                    onChange={(e) => {
                                        setSymbol(e.target.value)
                                        setSymbolStrike(e.target.options[e.target.selectedIndex].getAttribute("name"))
                                        setStrategy("")
                                        setExpiry("")
                                        setOptionChainData({
                                            loading: false,
                                            data: [],
                                        });
                                    }}
                                    >
                                        <option value="" >Select Stock Name</option>
                                        <option value="" >Select Stock Name</option>

                                        {/* {All_Symbols.data && All_Symbols.data.map((item) => {
                                            return <option value={item.symbol} name={item.price}>{item.symbol}</option>
                                        })} */}
                                    </select>
                                </div>
                                <div className="col-md-2 text-secondary input-block">
                                    <label
                                        className="text-secondary"
                                        style={{ fontWeight: "bold", color: "black" }}
                                    >
                                        EXPIRY DATE
                                    </label>
                                    <select className="default-select wide form-control" name="expiry_date"
                                    // onChange={(e) => {
                                    //     setExpiry(e.target.value)
                                    // }}
                                    // value={expiry}
                                    >
                                        <option value="" >Select Expiry</option>
                                        {/* {All_Symbols_Expiry.data && All_Symbols_Expiry.data.map((item) => {
                                            return <option value={item.uniqueExpiryValues}>{get_thre_digit_month(item.expiryDate)}</option>
                                        })} */}
                                    </select>
                                </div>
                                <div className="col-md-2 input-block ">
                                    <label
                                        className="text-secondary"
                                        style={{ fontWeight: "bold", color: "black" }}
                                    >
                                        STRATEGY
                                    </label>
                                    <select className="default-select wide form-control" name="strategyname"
                                    // onChange={(e) => {
                                    //     setStrategy(e.target.value);
                                    //     test(e);

                                    // }} value={strategy}

                                    // disabled={CreateSignalRequest.length === 0}
                                    >
                                        <option value="">Select Strategy</option>
                                        {/* {getAllStrategyName.data &&
                                            getAllStrategyName.data.map((item) => {
                                                return (
                                                    <option value={item.strategy_name}>
                                                        {item.strategy_name}
                                                    </option>
                                                );
                                            })} */}
                                    </select>
                                </div>
                                <div className="col-md-2 input-block  text-secondary ">
                                    <label
                                        className="text-secondary"
                                        style={{ fontWeight: "bold", color: "black" }}
                                    > Price
                                    </label>
                                    <input type="number" className="new-input-control form-control" />
                                </div>

                                <div className="col-md-4 d-flex justify-content-end align-items-center">
                                    <div className=" ">
                                        <button
                                            className="btn btn-primary me-2"
                                        // onClick={(e) => SelectOptionStock()}
                                        >
                                            Select Option Stock
                                        </button>
                                    </div>
                                    <div className="   ">
                                        <button
                                            className="btn btn-primary me-2"
                                        // onClick={(e) => ExcuteTradeButton()}
                                        // disabled={CreateSignalRequest.length === 0}

                                        >
                                            Execute Trade
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <FullDataTable
                                styles={styles}
                                columns={columns}
                                rows={companyData.data}
                                checkboxSelection={false}
                            />
                        </>


                    }
                />
            ) : (
                <Loader />
            )}
            {isModalOpen && selectedRow && (
                <CompanyChange
                    rowData={selectedRow}
                    onClose={() => setIsModalOpen(false)}

                />
            )}
        </>
    );
}

export default Option_Chain;

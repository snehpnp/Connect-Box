import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import FullDataTable from '../../../Components/ExtraComponents/Tables/FullDataTable1';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Loader from '../../../Utils/Loader';
import { Link, useNavigate } from "react-router-dom";
import { GanttChartSquare } from 'lucide-react';
import toast from "react-hot-toast";
import ToastButton from '../../../Components/ExtraComponents/Alert_Toast'
import ExportToExcel from '../../../Utils/ExportCSV'
import Modal from '../../../Components/Dashboard/Models/Model'
import { Get_All_Trade_Details } from "../../../ReduxStore/Slice/Subadmin/TradeDetailsSlice";








function GroupStrategy() {


    const dispatch = useDispatch();



    const [allTradeDetails, setAlltradeDetails] = useState({
        loading: true,
        data: [],
    });
    const [allGroupService, setAllGroupService] = useState({
        loading: false,
        data: [],
    });


 
    const [ForGetCSV, setForGetCSV] = useState([])
    const [inputSearch, SetInputSearch] = useState('');
    const [refresh, setrefresh] = useState(false)
  



    const user_id = JSON.parse(localStorage.getItem("user_details")).user_id

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
            field: 'createdAt',
            headerName: 'Trade Time',
            width: 250,
            headerClassName: styles.boldHeader,
            renderCell: (params) => (
                <div>
                    {params.value}
                </div>
            )
        },
        {
            field: 'type',
            headerName: 'Type',
            width: 250,
            headerClassName: styles.boldHeader,
            renderCell: (params) => (
                <div>
                    {params.value}
                </div>
            )
        },


        {
            field: 'trade_symbol',
            headerName: 'Symbol',
            width: 250,
            headerClassName: styles.boldHeader,
            renderCell: (params) => (
                <div>
                    {params.value}
                </div>
            )
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 250,
            headerClassName: styles.boldHeader,
            renderCell: (params) => (
                <div>
                    {params.value}
                </div>
            )
        },
        {
            field: 'strategy',
            headerName: 'Strategy',
            width: 250,
            headerClassName: styles.boldHeader,
            renderCell: (params) => (
                <div>
                    {params.value}
                </div>
            )
        },

        {
            field: 'TradeType',
            headerName: 'Trade Type',
            width: 250,
            headerClassName: styles.boldHeader,
            renderCell: (params) => (
                <div>
                    {params.value}
                </div>
            )
        }

    ];


    const getAllGroupService = async () => {

        var data = { user_id: user_id }
        await dispatch(Get_All_Trade_Details(data)).unwrap()
            .then((response) => {
                if (response.status) {
                    setAlltradeDetails({
                        loading: true,
                        data: response.data,
                    });
                } else {
                    setAlltradeDetails({
                        loading: true,
                        data: [],
                    });
                }

            })
            .catch((err) => {
                console.log("Error", err)

            })
    
};

useEffect(() => {
    getAllGroupService();
}, []);





const RefreshHandle = () => {
    setrefresh(!refresh)
    SetInputSearch('')
}

const forCSVdata = () => {
    let csvArr = []
    if (allTradeDetails.data.length > 0) {
        allTradeDetails.data.map((item) => {
            return csvArr.push({
                "Group Name": item.name,
                "Group Description": item.description,
                "Group Count Category": item.resultCount,

            })
        })

        setForGetCSV(csvArr)
    }

}

useEffect(() => {
    forCSVdata()
}, [allTradeDetails.data])


return (

    <>
        <div className="content container-fluid">

            {/* PAGE HEADER */}
            <div className="page-header">
                <div className="content-page-header">
                    <h5>All Trades</h5>
                    <div className="page-content">
                        <div className="list-btn">
                            <ul className="filter-list">
                                <li className="mt-3">
                                    <p
                                        className="btn-filters"

                                        data-bs-toggle="tooltip"
                                        data-bs-placement="bottom"
                                        title="Refresh"
                                        onClick={RefreshHandle}
                                    >
                                        <span>
                                            <i className="fe fe-refresh-ccw" />
                                        </span>
                                    </p>
                                </li>
                                <li>
                                    <div className="input-group input-block">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search..."
                                            aria-label="Search"
                                            aria-describedby="search-addon"
                                            onChange={(e) => SetInputSearch(e.target.value || '')}
                                            value={inputSearch}

                                        />

                                    </div>
                                </li>
                                <li>
                                    <div
                                        className="dropdown dropdown-action"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="bottom"
                                        title="Download"
                                    >
                                        <li>
                                            <div className="card-body">
                                                <ExportToExcel
                                                    className="btn btn-primary "
                                                    apiData={ForGetCSV}
                                                    fileName={'All Strategy'} />
                                            </div>
                                        </li>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {
                allTradeDetails.loading ? (
                    <FullDataTable
                        styles={styles}
                        columns={columns}
                        rows={allTradeDetails.data}
                        checkboxSelection={false}

                    />) : <Loader />
            }

        </div>
        < ToastButton />
    </>
)
}

export default GroupStrategy

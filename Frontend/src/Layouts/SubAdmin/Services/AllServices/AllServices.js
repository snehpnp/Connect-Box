import React, { useEffect, useState } from "react";
import Content from "./Content";
import Loader from "../../../../Utils/Loader";
import { Pencil, Trash2 } from "lucide-react";
import FullDataTable1 from "./FullDataTable";
import FullDataTable from '../../../../Components/ExtraComponents/Tables/FullDataTable'
 
import ExportToExcel from '../../../../Utils/ExportCSV'



import {
  getAllServices,
  getCatogries,
} from "../../../../ReduxStore/Slice/Subadmin/allServices";

import { useDispatch } from "react-redux";

const ServicesList = () => {
  const dispatch = useDispatch();

  const [first, setfirst] = useState("all");

  const [AllServices, setAllServices] = useState({
    loading: true,
    data: [],
  });
  const [ForGetCSV, setForGetCSV] = useState([])



  const [CatagoryData, setCatagoryData] = useState({
    loading: true,
    data: [],
  });
  const [refresh, setrefresh] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  




  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh",
    },
    card: {
      width: "auto",
    },
    boldHeader: {
      fontWeight: "bold",
    },
    headerButton: {
      marginRight: 8,
    },
  };





  const columns = [
    {
      dataField: "index",
      text: "SR. No.",
      sort: true,

      formatter: (cell, row, rowIndex) => rowIndex + 1,
    },
    {
      dataField: "category.name",
      text: "Catagory",
      sort: true,
    },
    {
      dataField: "name",
      text: "Service Name",
      sort: true,
    },
    {
      dataField: "category.segment",
      text: "Segment",
      sort: true,
    },
  ];


  const columns1 = [
    {
      field: "id",
      headerName: "SR. No.",
      width: 100,
      headerClassName: styles.boldHeader,
      renderCell: (params) => params.row.id + 1,
    },
    {
      field: "category",
      headerName: "Catagory",
      width: 400,
      headerClassName: styles.boldHeader,
      renderCell: (params) => params.row.category.name,

    },
    {
      field: "name",
      headerName: "Service Name",
      width: 400,
      headerClassName: styles.boldHeader,
    },
    {
      field: "category.segment",
      headerName: "Segment",
      width: 300,
      headerClassName: styles.boldHeader,
      renderCell: (params) => params.row.category.segment,

    }
  ];







  const getservice = async () => {
    await dispatch(getCatogries())
      .unwrap()
      .then((response) => {
        if (response.status) {
          setCatagoryData({
            loading: false,
            data: response.data,
          });
        }
      });
  };
  useEffect(() => {
    getservice();
  }, []);

  const data = async () => {
    await dispatch(getAllServices({ segment: first }))
      .unwrap()
      .then((response) => {

        if (response.status) {
          
          setAllServices({
            loading: false,
            data: response.data,
          });
        } else {
          setAllServices({
            loading: false,
            data: [],
          });
        }
      });
  };

  useEffect(() => {
    data(first);
  }, [first]);


  const RefreshHandle = () => {
    setrefresh(!refresh)
    setSearchInput('')
  }


  const forCSVdata = () => {
    let csvArr = []
    if (AllServices.data.length > 0) {
      AllServices.data.map((item) => {
        return csvArr.push({
          "FullName": item.FullName,
          "UserName": item.UserName,
          "PhoneNo": item.PhoneNo,
          "Prifix Key": item.prifix_key,
          "Created At": item.createdAt
        })
      })

      setForGetCSV(csvArr)
    }

  }

  useEffect(() => {
    forCSVdata()
  }, [AllServices.data])

  return (
    <>
      <div className="content container-fluid" data-aos="fade-left">
            <div className="page-header">
              <div className="content-page-header">
                <h5>All Service</h5>
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
                            onChange={(e) => setSearchInput(e.target.value)}
                            value={searchInput}

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

                          <div className="card-body">
                            <ExportToExcel
                              className="btn btn-primary "
                              apiData={ForGetCSV}
                              fileName={'All Strategy'} />
                          </div>

                        </div>
                      </li>
 
                    </ul>
                  </div>
                </div>
              </div>
            </div>
 

            <FullDataTable
              styles={styles}
              columns={columns1}
              rows={AllServices.data}

            />
          </div>


      {AllServices.loading ? (
        <Loader />
      ) : (
        <>
          <div className="content container-fluid">
            <Content Page_title="All Services" button_status={false}>
              <div className="d-flex">
                <div className="col-lg-6">
                  <div className="mb-3 row">
                    <div className="col-lg-7">
                      <select
                        className="default-select wide form-control"
                        id="validationCustom05"
                        onChange={(e) => setfirst(e.target.value)}
                        value={first}
                      >
                        <option disabled>Please Select Catagory</option>
                        <option selected value="all">
                          All
                        </option>
                        {CatagoryData.data &&
                          CatagoryData.data.map((item) => {
                            return (
                              <>
                                <option value={item.segment}>{item.name}</option>
                              </>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {AllServices.data && AllServices.data.length === 0 ? (
                <FullDataTable1
                  TableColumns={columns}
                  tableData={AllServices.data}
                />
              ) : (
                <>
                  <FullDataTable1
                    TableColumns={columns}
                    tableData={AllServices.data}
                  />
                </>
              )}
            </Content>
          </div>

           
        </>
      )}
    </>
  );
};

export default ServicesList;

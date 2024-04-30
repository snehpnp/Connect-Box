import React, { useEffect, useState } from "react";
 
import Loader from "../../../../Utils/Loader";
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
      field: "id",
      headerName: "SR. No.",
      width: 100,
      headerClassName: styles.boldHeader,
      renderCell: (params) => params.row.id + 1,
    },
    {
      field: "category",
      headerName: "Category",
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
          const filterData = response.data && response.data.filter((items) => {
            const searchInputMatch =
              searchInput === '' ||
              items.category.name.toLowerCase().includes(searchInput.toLowerCase()) ||
              items.category.segment.toLowerCase().includes(searchInput.toLowerCase()) ||
              items.name.toLowerCase().includes(searchInput.toLowerCase())

            return searchInputMatch;

          })



          setAllServices({
            loading: false,
            data: searchInput ? filterData : response.data,
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
  }, [first, searchInput, refresh]);


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
            <h5>All Services</h5>
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
                    <div className="d-flex">
                      <div className="col-lg-12">
                        <div className="mb-3">
                          <div className="col-lg-12 mt-3">
                            <select
                              className="default-select wide form-control p-2"
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
                          fileName={'All Service'} />
                      </div>

                    </div>
                  </li>

                </ul>
              </div>
            </div>
          </div>
        </div>


        {AllServices.loading ? <Loader /> :
          <FullDataTable
            styles={styles}
            columns={columns}
            rows={AllServices.data}

          />
        }
      </div>


       
    </>
  );
};

export default ServicesList;

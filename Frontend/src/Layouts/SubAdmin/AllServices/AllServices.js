import React, { useEffect, useState } from "react";
import Content from "./Content";
import Loader from "../../../Utils/Loader";
import { Pencil, Trash2 } from "lucide-react";
import FullDataTable from "./FullDataTable";
import {
  getAllServices,
  getCatogries,
} from "../../../ReduxStore/Slice/Subadmin/allServices";

import { useDispatch } from "react-redux";

const ServicesList = () => {
  const dispatch = useDispatch();

  const [first, setfirst] = useState("all");

  const [AllServices, setAllServices] = useState({
    loading: true,
    data: [],
  });

  const [CatagoryData, setCatagoryData] = useState({
    loading: true,
    data: [],
  });

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
console.log("CatagoryData",CatagoryData)

  const data = async () => {
    await dispatch(getAllServices({ segment: first }))
      .unwrap()
      .then((response) => {
        setAllServices({
          loading: false,
          data: response,
        });
        if (response.status) {
          setAllServices({
            loading: false,
            data: response.data,
          });
        }
      });
  };

  useEffect(() => {
    data(first);
  }, [first]);

//   console.log("AllServices", AllServices);

  const columns = [
    {
      dataField: "index",
      text: "SR. No.",
      sort: true,

      formatter: (cell, row, rowIndex) => rowIndex + 1,
    },
    {
      dataField: "categoryResult.name",
      text: "Catagory",
      sort: true,
    },
    {
      dataField: "name",
      text: "Service Name",
      sort: true,
    },
    {
      dataField: "categoryResult.segment",
      text: "Segment",
      sort: true,
    },
  ];

  return (
    <>
      {AllServices.loading ? (
        <Loader />
      ) : (
        <>
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
              <FullDataTable
                TableColumns={columns}
                tableData={AllServices.data}
              />
            ) : (
              <>
                <FullDataTable
                  TableColumns={columns}
                  tableData={AllServices.data}
                />
              </>
            )}
          </Content>
        </>
      )}
    </>
  );
};

export default ServicesList;

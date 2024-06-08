import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getActivity, findstatus } from "../../../../ReduxStore/Slice/Comman/Setting";
import { Form, Row, Col, Card, Spinner } from 'react-bootstrap';
import FullDataTable from "../../../../Components/ExtraComponents/Tables/FullDataTable";
import { fDateTime } from "../../../../Utils/Date_formet";

const Trackpanel = () => {
  const dispatch = useDispatch();

  const [selectedFromDate, setSelectedFromDate] = useState("");
  const [selectedToDate, setSelectedToDate] = useState("");
  const [activityData, setActivityData] = useState([]);
  const [findData, setFindData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user_details"));
  const userId = user?.user_id;

  const handleDropdownSelect = async (selectedActivity) => {
    setSelectedCategory(selectedActivity);
    const selectedActivityObj = activityData.find(activity => activity.activity === selectedActivity);
    if (selectedActivityObj) {
      await findActivity(selectedActivityObj.activity);
    }
  };

  useEffect(() => {
    getActivityData();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      findActivity(selectedCategory);
    }
  }, [selectedFromDate, selectedToDate, selectedCategory]);

  const getActivityData = async () => {
    const data = { role: user?.Role };
    setLoading(true);
    try {
      const response = await dispatch(getActivity(data)).unwrap();
      if (response.status) {
        setActivityData(response.data);
      }
    } catch (error) {
      console.error("Error fetching activity data:", error);
    } finally {
      setLoading(false);
    }
  };

  const findActivity = async (activity) => {
    const data = { id: userId, category: activity, fromDate: selectedFromDate, endDate: selectedToDate };
    setLoading(true);
    try {
      const response = await dispatch(findstatus(data)).unwrap();
      if (response.status) {
        setFindData(response.data);
      } else {
        setFindData([]);
      }
    } catch (error) {
      console.error("Error finding activity:", error);
    } finally {
      setLoading(false);
    }
  };

  let columns = [
    {
      field: "id",
      headerName: "ID",
      width: 60,
      renderCell: (params) => (
        <div><b>{params.value + 1}</b></div>
      ),
    },
    { field: "UserName", headerName: "UserName", width: 150 },
    { field: "maker_role", headerName: "Maker Role", width: 180 },
    { field: "message", headerName: "Message", width: selectedCategory === "TARGET-STOPLOSS-TIME" ? 800 : 250 },
    {
      field: "createdAt",
      headerName: "Date",
      width: 220,
      valueGetter: (params) => fDateTime(params.row.createdAt),
    },
  ];

  if (selectedCategory === "TARGET-STOPLOSS-TIME") {
    columns = columns.filter(column => column.field !== 'UserName' && column.field !== 'maker_role');
  }

  return (
    <div>
      <Row className="mb-3">
        <Col>
          <Form.Group>
            <Form.Label>Select Category</Form.Label>
            <Form.Control
              as="select"
              value={selectedCategory}
              onChange={(e) => handleDropdownSelect(e.target.value)}
            >
              <option value="">Select...</option>
              {activityData.map((data, index) => (
                <option key={index} value={data.activity}>
                  {data.activity}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>From Date</Form.Label>
            <Form.Control
              type="date"
              value={selectedFromDate}
              onChange={(e) => setSelectedFromDate(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>To Date</Form.Label>
            <Form.Control
              type="date"
              value={selectedToDate}
              onChange={(e) => setSelectedToDate(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      {selectedCategory && (
        <Row>
          <Col>
            <Card.Title>{selectedCategory}</Card.Title>
            {loading ? (
              <div className="d-flex justify-content-center align-items-center">
                <Spinner animation="border" />
                <span className="ml-2">Loading...</span>
              </div>
            ) : (
              <FullDataTable columns={columns} rows={findData} />
            )}
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Trackpanel;

import React, { useEffect } from "react";
import { useState } from "react";
import { getActivity, findstatus } from "../../../../ReduxStore/Slice/Comman/Setting";
import { useDispatch } from "react-redux";
import FullDataTable from "../../../../Components/ExtraComponents/Tables/FullDataTable";
import { Form, Row, Col, Card } from 'react-bootstrap';
import { fDate, fDateTime } from "../../../../Utils/Date_formet";


const Trackpanel = () => {
  const dispatch = useDispatch();


  const [selectedFromDate, setSelectedFromDate] = useState("");
  const [selectedToDate, setSelectedToDate] = useState("");
  const [activityData, setActivityData] = useState([]);
  const [finddata, setFinddata] = useState([])



  const user = JSON.parse(localStorage.getItem("user_details"));
  const userid = JSON.parse(localStorage.getItem("user_details")).user_id



  const [selectedCategory, setSelectedCategory] = useState('');

  const handleDateChange = (e) => {
    // Your date change handling logic
  };

  const handleDropdownSelect = async (selectedActivity) => {
    setSelectedCategory(selectedActivity);
    const selectedActivityObj = activityData.find(activity => activity.activity === selectedActivity);
    if (selectedActivityObj) {
      await FindActivity(selectedActivityObj.activity);
    }
  };



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
      headerName: "#",
      width: 80,
      headerClassName: styles.boldHeader,
      renderCell: (params, index) => params.row.id + 1,
    },
    {
      field: "UserName",
      headerName: "UserName",
      width: 150,
      headerClassName: styles.boldHeader,
    },
    {
      field: "maker_role",
      headerName: "maker_role",
      width: 180,
      headerClassName: styles.boldHeader,
    },

    {
      field: "message",
      headerName: "message",
      width: 350,
      headerClassName: styles.boldHeader,
    },
    {
      field: "createdAt",
      headerName: "Date",
      width: 220,
      headerClassName: styles.boldHeader,
      valueGetter: (params) => fDateTime(params.row.createdAt),
    },
  ];



  const Activity = async (fromDate, toDate) => {
    var data = { role: user.Role, fromDate, toDate };
    await dispatch(getActivity(data))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          setActivityData(response.data);

        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    Activity();
  }, []);


  const FindActivity = async (activity) => {

    var data = { id: userid, category: activity };

    await dispatch(findstatus(data))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          setFinddata(response.data)
        } else {
          setFinddata([])
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };


  return (
    <>
      <div>
        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label>FROM DATE</Form.Label>
              <Form.Control
                type="date"
                name="fromDate"
                value={selectedFromDate}
                onChange={handleDateChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>TO DATE</Form.Label>
              <Form.Control
                type="date"
                name="toDate"
                value={selectedToDate}
                onChange={handleDateChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Select Category</Form.Label>
              <Form.Control
                as="select"
                value={selectedCategory}
                onChange={(e) => handleDropdownSelect(e.target.value)}
              >
                <option value="">Select...</option>
                {activityData &&
                  activityData.map((data, index) => (
                    <option key={index} value={data.activity}>
                      {data.activity}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>


        {selectedCategory && (
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>{selectedCategory}</Card.Title>
                  <Card.Text>{selectedCategory}</Card.Text>
                  <FullDataTable columns={columns} rows={finddata} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </div>
    </>
  );
};

export default Trackpanel;

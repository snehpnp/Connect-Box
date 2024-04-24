import React, { useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useState } from "react";
import { getActivity,findstatus} from "../../../../ReduxStore/Slice/Comman/Setting";
import { useDispatch } from "react-redux";
import FullDataTable from "../../../../Components/ExtraComponents/Tables/FullDataTable";
import { Form, Row, Col,Card } from 'react-bootstrap';



const Trackpanel = () => {
  const dispatch = useDispatch();

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedFromDate, setSelectedFromDate] = useState("");
  const [selectedToDate, setSelectedToDate] = useState("");
  const [activityData, setActivityData] = useState(null);
  

  const user = JSON.parse(localStorage.getItem("user_details"));



  const [selectedCategory, setSelectedCategory] = useState('');

  const handleDateChange = (e) => {
    // Your date change handling logic
  };

  const handleDropdownSelect = (selectedActivity) => {
    setSelectedCategory(selectedActivity);
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
      field: "activity",
      headerName: "activity",
      width: 150,
      headerClassName: styles.boldHeader,
      renderCell: (params, index) => params.row.id + 1,
    },
    {
      field: "createdAt",
      headerName: "Date",
      width: 190,
      headerClassName: styles.boldHeader,
    },
    {
      field: "description",
      headerName: "description",
      width: 290,
      headerClassName: styles.boldHeader,
    },

    {
      field: "role",
      headerName: "role",
      width: 210,
      headerClassName: styles.boldHeader,
    },
  ];



  const Activity = async (fromDate, toDate) => {
    var data = { role: user.Role, fromDate, toDate };
    await dispatch(getActivity(data))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          console.log("response", response.data);
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

  
  const FindActivity = async () => {
    var data = {};
    await dispatch(getActivity(data))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          console.log("response", response.data);
          
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
                onChange={(e) => setSelectedCategory(e.target.value)}
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

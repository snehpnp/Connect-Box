import React, { useState, useEffect } from "react";
import Loader from "../../../Utils/Loader";
import { ProfileInfo } from "../../../ReduxStore/Slice/Admin/System";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { fDateTime } from "../../../Utils/Date_formet";
import { fDate } from "../../../Utils/Date_formet";
import { isToday } from "../../../Utils/Date_formet";
import Swal from "sweetalert2";
import { countries } from "./ProfileCountrydata";
import {
  Employeedatabyid,
  Get_Parent_Type,
} from "../../../ReduxStore/Slice/Admin/System";
import {
  ProfilImage,
  ProfileUpdatedata,
  profiledatauserId,
  ActiveProfile,
} from "../../../ReduxStore/Slice/Comman/Userinfo";
import Toaster from "../../../Components/ExtraComponents/Alert_Toast";
import useLogout from "../../../Utils/Logout";
import { ipAddress } from "../../../Utils/Ipaddress";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  height: 600,
  borderRadius: "3rem",
};

const Profile = () => {
  const dispatch = useDispatch();
  const logout = useLogout();

  const user_id = JSON.parse(localStorage.getItem("user_details")).user_id;
  const user = JSON.parse(localStorage.getItem("user_details"));
  const Role = JSON.parse(localStorage.getItem("user_details")).Role;
  const token = JSON.parse(localStorage.getItem("user_details")).token;

  const [ip, setIp] = useState(null);
  const [getemployeedata, setGetemployeedata] = useState("");
  const [profileData, setProfileData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [active, setActive] = useState([]);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [editbtn, setEditbtn] = useState(false);
  const [info, setInfo] = useState([]);
  const [getParentType, setParentType] = useState("");
  const [update, setUpdate] = useState({
    user_Id: "",
    Address: "",
    Country: "",
    State: "",
    Location: "",
    DOB: "",
    CompanyName: "",
  });

  const [selectedCountry, setSelectedCountry] = useState(update.Country || "");
  const [selectedState, setSelectedState] = useState(update.State || "");


  const [clientkey,setClientkey] = useState("")
 

  const currentDate = new Date();
  currentDate.setFullYear(currentDate.getFullYear() - 12);
  const currentDateISOString = currentDate.toISOString().split("T")[0];

  const avatarImages = [
    "hacker.png",
    "gamer (1).png",
    "character.png",
    "man.png",
    "man (2).png",
    "man (1).png",
    "girl.png",
    "girl (3).png",
    "girl (2).png",
    "girl (1).png",
    "gamer.png",
    "bussiness-man.png",
    "businessman.png",
    "businessman (1).png",
    "actor.png",
    "donkey.png",
    "wolf.png",
    "cat (1).png",
    "cat (2).png",
    "cat.png",
    "cheetah.png",
    "deer.png",
    "dog (1).png",
    "dog (2).png",
    "dog.png",
    "horse.png",
    "kangaroo.png",
    "lemur.png",
    "monkey.png",
    "penguin.png",
    "rabbit.png",
    "shiba-inu.png",
    "squirrel.png",
    "tiger.png",
    "wolf (1).png",
  ];


  // get employee by id
  const Employeetable = async () => {
    const data = { id: user_id };
   
    await dispatch(Employeedatabyid(data))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          setGetemployeedata(response.subadmin);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };





  // function to update profile
  const handleAvatarClick = async (avatarUrl) => {
    try {
      var data = { user_id: user_id, profile_img: avatarUrl };
      const response = await dispatch(ProfilImage(data)).unwrap();

      if (response.status) {
        Swal.fire({
          title: " Profile Changed",
          icon: "success",
        });
        setRefresh(!refresh);
      }
    } catch (error) {
      console.error("Error", error);
      Swal.fire({
        title: "Error",
        text: "error to update",
        icon: "error",
      });
    }

    setOpen(false);
  };




  ///  handler to handle form
  const handleAddInfo = () => {
    if (info && info.length > 0) {
      const latestInfo = info[0];
      setUpdate({
        user_Id: user_id,
        Address: latestInfo.Address || "",
        Country: latestInfo.Country || "",
        State: latestInfo.State || "",
        Location: latestInfo.Location || "",
        DOB: latestInfo.DOB || "",
        CompanyName: latestInfo.CompanyName || "",
      });
    }
    setEditbtn(!editbtn);
  };





  // update profile data
  const Updateprofile = async () => {
    await dispatch(
      ProfileUpdatedata({
        user_Id: user_id,
        Address: update.Address,
        Country: update.Country,
        State: update.State,
        Location: update.Location,
        DOB: update.DOB,
        CompanyName: update.CompanyName,
      })
    )
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          setEditbtn(!editbtn);
          Swal.fire({
            title: "Updated",
            icon: "success",
          });
          setRefresh(!refresh);
          profiledata();
        }
      })
      .catch((error) => {
        console.log("Error", error);
        Swal.fire({
          title: "Error",
          text: "Error to Updated",
          icon: "error",
        });
      });
  };





  //  profile information
  const profiledata = async () => {
    var data = { user_id: user_id };
    await dispatch(profiledatauserId(data))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          setInfo(response.data);
          setRefresh(!refresh);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };





  ///active status
  const profilestatus = async () => {
    var data = { _id: user_id, role: user.Role };
    await dispatch(ActiveProfile(data))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          setActive(response.data);
          setRefresh(!refresh);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };




  // api for getting ProfileInfo
  const fetchData = async () => {
    try {
      let data = { id: user_id };
      await dispatch(ProfileInfo({ req: data, token: token }))
        .unwrap()
        .then(async (response) => {
          if (response.status) {
          
            setProfileData(response.data);
            setProfileImage(response.data[0].profile_img);
            setClientkey(response.data[0].client_key)
            setLoading(true);
          } else {
            if (response.msg == "Unauthorized!") {
              // logout(user_id, ip);
            } else {
              toast.error(response.msg);
              setLoading(false);
            }
          }
        })
        .catch((error) => {
          console.log("Error", error);
        });
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };





  const FindParentType = async () => {
    try {
      const data = { id: user_id, Role: Role };
      await dispatch(Get_Parent_Type(data))
        .unwrap()
        .then((response) => {
          if (response.status) {
            setParentType(response.data);
          } else {
            setParentType("");
          }
        });
    } catch (error) {
      console.log("Error in fatching in Parent Type", error);
    }
  };




  const fetchIP = async () => {
    try {
      const ip = await ipAddress();
      setIp(ip);
    } catch (error) {
      console.error("Failed to fetch IP address:", error);
    }
  };




  useEffect(() => {
    profiledata();
    Employeetable();
    profilestatus();
    FindParentType();
    fetchIP();
  }, []);

    


  useEffect(() => {
    fetchData();
  }, [refresh]);

  return (
    <div>

      {loading ? (
        <div className="content container-fluid pb-0">
          <div className="row justify-content-lg-center">
            <div className="col-lg-10">
              <div className="profile-cover">
                <div className="profile-cover-wrap">
                  <img
                    className="profile-cover-img"
                    src="assets/img/profiles/ProfileAvataar/—Pngtree—abstract geometric poster cover hexagon_9008888.png"
                    alt="Profile Cover"
                    id="cover-image"
                  />
                  <div className="cover-content"></div>
                </div>
              </div>
              <div className="text-center mb-5">
                <label
                  className="avatar avatar-xxl profile-cover-avatar"
                  htmlFor="avatar_upload"
                >
                  <img
                    className="avatar-img"
                    src={
                      profileImage
                        ? profileImage
                        : "assets/img/profiles/ProfileAvataar/hacker.png"
                    }
                    alt="Profile Image"
                    id="blah"
                  />
                  <input type="file" />
                  <span
                    className="avatar-edit"
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    <i className="fe fe-edit avatar-uploader-icon shadow-soft" />
                  </span>

                  <Modal
                    open={open}
                    onClose={() => {
                      setOpen(false);
                    }}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Seclect avatar
                      </Typography>
                      <Typography
                        id="modal-modal-description"
                        sx={{ mt: 8 }}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "2.5rem",
                          flexWrap: "wrap",
                        }}
                      >
                        {avatarImages.map((avatar, index) => (
                          <img
                            key={index}
                            className="avatar-img grow"
                            src={`assets/img/profiles/ProfileAvataar/${avatar}`}
                            alt={`Profile Image ${index + 1}`}
                            onClick={() =>
                              handleAvatarClick(
                                `assets/img/profiles/ProfileAvataar/${avatar}`
                              )
                            }
                            style={{ width: "5rem", cursor: "pointer" }}
                          />
                        ))}
                      </Typography>
                    </Box>
                  </Modal>
                </label>
                <h2>
                  {profileData && profileData[0].UserName
                    ? profileData[0].UserName
                    : "SNEH"}
                  <i
                    className="fas fa-certificate text-primary small"
                    data-bs-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-original-title="Verified"
                  />
                </h2>
                {info &&
                  info.map((item, index) => {
                    return (
                      <ul className="list-inline">
                        {user.Role === "USER" ? (
                          ""
                        ) : (
                          <li className="list-inline-item">
                            <i className="far fa-building" />{" "}
                            <span>{item.CompanyName}</span>
                          </li>
                        )}

                        <li className="list-inline-item">
                          <i className="fas fa-map-marker-alt" />
                          {item.Country}
                        </li>
                        <li className="list-inline-item">
                          <i className="far fa-calendar-alt" />{" "}
                          <span>{fDate(item.DOB || "")}</span>
                        </li>
                      </ul>
                    );
                  })}
              </div>

              <div className="row">
                <div className="col-lg-4">
                  <div className="card">
                    <div className="card-header align-items-center">
                      <h5 className="card-title d-flex justify-content-between mb-0">
                        <span>Profile</span>
                        <a
                          className="btn btn-sm btn-white"
                          onClick={handleAddInfo}
                        >
                          Update Info
                        </a>
                      </h5>

                      {editbtn && (
                        <div
                          className="modal custom-modal d-block kk"
                          role="dialog"
                        >
                          <div className="modal-dialog modal-dialog-centered modal-md">
                            <div className="modal-content">
                              <div className="modal-header border-0 pb-0">
                                <div className="form-header modal-header-title text-start mb-0">
                                  <h4 className="mb-0">Information</h4>
                                </div>
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                  onClick={() => setEditbtn(!editbtn)}
                                ></button>
                              </div>
                              <form onSubmit={Updateprofile}>
                                <div className="modal-body">
                                  <div className="row">
                                    <div className="col-lg-6 col-sm-12">
                                      <div className="input-block mb-3">
                                        <label>Country</label>
                                        <select
                                          className="form-control"
                                          value={selectedCountry}
                                          onChange={(e) => {
                                            const newCountry = e.target.value;
                                            setSelectedCountry(newCountry);
                                            setSelectedState("");
                                            setUpdate({
                                              ...update,
                                              Country: newCountry,
                                              State: "",
                                              Location: "",
                                            });
                                          }}
                                        >
                                          <option value="" disabled>
                                            Select Country
                                          </option>
                                          {Object.keys(countries).map(
                                            (country) => (
                                              <option
                                                key={country}
                                                value={country}
                                              >
                                                {country}
                                              </option>
                                            )
                                          )}
                                        </select>
                                      </div>
                                    </div>
                                    <div className="col-lg-6 col-sm-12">
                                      <div className="input-block mb-3">
                                        <label>State</label>
                                        <select
                                          className="form-control"
                                          value={selectedState}
                                          onChange={(e) => {
                                            const newState = e.target.value;
                                            setSelectedState(newState);
                                            setUpdate({
                                              ...update,
                                              State: newState,
                                              Location: "",
                                            });
                                          }}
                                          disabled={!selectedCountry}
                                        >
                                          <option value="" disabled>
                                            Select State
                                          </option>
                                          {selectedCountry &&
                                            Object.keys(
                                              countries[selectedCountry]
                                            ).map((state) => (
                                              <option key={state} value={state}>
                                                {state}
                                              </option>
                                            ))}
                                        </select>
                                      </div>
                                    </div>
                                    <div className="col-lg-6 col-sm-12">
                                      <div className="input-block mb-3">
                                        <label>Location</label>
                                        <select
                          
                                          className="form-control"
                                          value={update.Location}
                                          onChange={(e) => {
                                            setUpdate({
                                              ...update,
                                              Location: e.target.value,
                                            });
                                          }}
                                          disabled={!selectedState}
                                        >
                                          <option value="" disabled>
                                            Select Location
                                          </option>
                                          {selectedState &&
                                            countries[selectedCountry][
                                              selectedState
                                            ].map((location) => (
                                              <option
                                                key={location}
                                                value={location}
                                              >
                                                {location}
                                              </option>
                                            ))}
                                        </select>
                                      </div>
                                    </div>

                                    <div className="col-lg-6 col-sm-12">
                                      <div className="input-block mb-3">
                                        <label>Address</label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="Enter Address"
                                          value={update.Address}
                                          onChange={(e) => {
                                            setUpdate({
                                              ...update,
                                              Address: e.target.value,
                                            });
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-lg-6 col-sm-12">
                                      <div className="input-block mb-3">
                                        <label>DOB</label>
                                        <input
                                          type="date"
                                          className="form-control"
                                          placeholder="Enter birth date"
                                          value={update.DOB}
                                          max={currentDateISOString}
                                          onChange={(e) => {
                                            setUpdate({
                                              ...update,
                                              DOB: e.target.value,
                                            });
                                          }}
                                        />
                                      </div>
                                    </div>
                                    {user.Role !== "USER" && (
                                      <div className="col-lg-6 col-sm-12">
                                        <div className="input-block mb-3">
                                          <label>Company Name</label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Company Name"
                                            value={update.CompanyName}
                                            onChange={(e) => {
                                              setUpdate({
                                                ...update,
                                                CompanyName: e.target.value,
                                              });
                                            }}
                                          />
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    data-bs-dismiss="modal"
                                    className="btn btn-back cancel-btn me-2"
                                    onClick={() => setEditbtn(!editbtn)}
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    type="submit"
                                    className="btn btn-primary paid-continue-btn"
                                  >
                                    Update
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="card-body">
                      {info &&
                        info.map((item, index) => (
                          <ul key={index} className="list-unstyled mb-0">
                          <li className="pb-0">
                              <h6>
                                <span>
                                  <b>Client Key</b> : {clientkey && clientkey}{" "}
                                </span>
                              </h6>
                            </li>
                            <li className="pb-0">
                              <h6>
                                <span>
                                  <b>Company Name</b> : {item.CompanyName}{" "}
                                </span>
                              </h6>
                            </li>
                            <li className=" pb-0">
                              <h6>
                                <span>
                                  <b>Address</b> : {item.Address}{" "}
                                </span>
                              </h6>
                            </li>
                            <li className="pb-0">
                              <h6>
                                <span>
                                  <b>DOB</b>: {fDate(item.DOB || "")}
                                </span>
                              </h6>
                            </li>

                            <li className=" pb-0">
                              <h6>
                                <span>
                                  <b>Location</b> : {item.Location}{" "}
                                </span>
                              </h6>
                            </li>
                            <li className=" pb-0">
                              <h6>
                                <span>
                                  <b>State</b> : {item.State}{" "}
                                </span>
                              </h6>
                            </li>

                            <li className="pb-0">
                              <h6>
                                <span>
                                  <b>Country</b> : {item.Country}{" "}
                                </span>
                              </h6>
                            </li>
                          </ul>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title">Activity</h5>
                    </div>
                    <div className="card-body card-body-height">
                      <ul className="activity-feed">
                        {active
                          .filter((item) => isToday(new Date(item.createdAt)))
                          .map((item, index) => (
                            <li key={index} className="feed-item">
                              <div className="feed-date d-flex justify-content-between">
                                <span className="feed-text">
                                  {fDateTime(item.createdAt)}
                                </span>
                                <span className="feed-text ">
                                  <a href="#" style={{ color: "blue" }}>
                                    {item.system_ip}
                                  </a>
                                </span>
                              </div>
                              <span className="feed-text">
                                <a href="#" style={{ color: "blue" }}>
                                  {item.role}
                                </a>{" "}
                                {item.trading_status
                                  ? item.trading_status
                                  : item.login_status}
                              </span>
                            </li>
                          ))}
                        {user.Role === "EMPLOYEE" ? (
                          <li>
                            <h6>
                              Subadmin Name :{" "}
                              {getemployeedata && getemployeedata}
                            </h6>
                          </li>
                        ) : (
                          ""
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}

      <Toaster />
    </div>
  );
};

export default Profile;

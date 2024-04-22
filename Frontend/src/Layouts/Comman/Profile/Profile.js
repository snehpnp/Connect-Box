import React, { useState, useEffect } from "react";
import Loader from "../../../Utils/Loader";
import { ProfileInfo } from "../../../ReduxStore/Slice/Admin/System";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { fDateTime,fDate } from "../../../Utils/Date_formet";

import {
  ProfilImage,
  ProfileUpdatedata,
  profiledatauserId,
  ActiveProfile,
} from "../../../ReduxStore/Slice/Comman/Userinfo";

import Toaster from "../../../Components/ExtraComponents/Alert_Toast";

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

  const user_id = JSON.parse(localStorage.getItem("user_details")).user_id;
  const user = JSON.parse(localStorage.getItem("user_details"))
 
  const [profileData, setProfileData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [active,setActive] = useState([])
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [editbtn, setEditbtn] = useState(false);
  const [info, setInfo] = useState([]);
  const [update, setUpdate] = useState({
    user_Id: "",
    Address: "",
    Country: "",
    State: "",
    Location: "",
    DOB: "",
    CompanyName: "",
  });

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

  const handleAvatarClick = async (avatarUrl) => {

    try {
      var data = { user_id: user_id, profile_img: avatarUrl };
      const response = await dispatch(ProfilImage(data)).unwrap();

      if (response.status) {
        setRefresh(!refresh);
      }
    } catch (error) {
      console.error("Error", error);
      toast.error("Failed to update profile");
    }

    setOpen(false);
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
          setEditbtn(!editbtn)
          toast.success("Infomation added");
          setRefresh(!refresh);
        }
      })
      .catch((error) => {
        console.log("error", error);
        toast.error("error to add info");
      });
  };

  //  profile information



  const profiledata = async () => {
    var data = {user_id:user_id};
    await dispatch(profiledatauserId(data))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
        
          setInfo(response.data);
          setRefresh(!refresh);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    profiledata();
  }, []);


  ///active status 

  const profilestatus = async () => {
    var data = {_id:user_id,role:user.Role};
    await dispatch(ActiveProfile(data))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
        
          setActive(response.data)
          setRefresh(!refresh);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    profilestatus();
  }, []);



  const fetchData = async () => {
    try {
      let data = { id: user_id };

      await dispatch(ProfileInfo(data))
        .unwrap()
        .then(async (response) => {
          if (response.status) {
            setProfileData(response.data);
            setProfileImage(response.data[0].profile_img);
            setLoading(true);
          } else {
            toast.error(response.msg);
            setLoading(false);
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
                  <div className="cover-content">
                    {/* <div className="custom-file-btn">
                      <input
                        type="file"
                        className="custom-file-btn-input"
                        id="cover_upload"
                      />
                      <label
                        className="custom-file-btn-label btn btn-sm btn-white"
                        htmlFor="cover_upload"
                      >
                        <i className="fas fa-camera" />
                        <span className="d-none d-sm-inline-block ms-1">
                          Update Cover
                        </span>
                      </label>
                    </div> */}
                  </div>
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
                  {info && info.map((item,index)=>{
                      return (

                        <ul className="list-inline"  >
                        <li className="list-inline-item">
                          <i className="far fa-building" />{" "}
                          <span>{item.CompanyName}</span>
                        </li>
                        <li className="list-inline-item">
                          <i className="fas fa-map-marker-alt" />{item.Country}
                        </li>
                        <li className="list-inline-item">
                          <i className="far fa-calendar-alt" />{" "}
                          <span>{fDate(item.DOB)}</span>
                        </li>
                      </ul>
                      )
                  })}
               
              </div>
              <div className="row">
                <div className="col-lg-4">
                  <div className="card card-body">
                    <h5>Complete your profile</h5>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="progress progress-md flex-grow-1">
                        <div
                          className="progress-bar bg-primary"
                          role="progressbar"
                          style={{ width: "30%" }}
                          aria-valuenow={30}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                      <span className="ms-4">30%</span>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title d-flex justify-content-between">
                        <span>Profile</span>
                        <a
                          className="btn btn-sm btn-white"
                          onClick={() => {
                            setEditbtn(!editbtn);
                          }}
                        >
                          Add Info
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

                              <form>
                                <div className="modal-body">
                                  <div className="row">
                                    <div className="col-lg-12 col-sm-12">
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

                                    <div className="col-lg-12 col-sm-12">
                                      <div className="input-block mb-3">
                                        <label>Country</label>

                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="Enter Country"
                                          value={update.Country}
                                          onChange={(e) => {
                                            setUpdate({
                                              ...update,
                                              Country: e.target.value,
                                            });
                                          }}
                                        />
                                      </div>
                                    </div>

                                    <div className="col-lg-12 col-sm-12">
                                      <div className="input-block mb-3">
                                        <label>State</label>

                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="Enter State"
                                          value={update.State}
                                          onChange={(e) => {
                                            setUpdate({
                                              ...update,
                                              State: e.target.value,
                                            });
                                          }}
                                        />
                                      </div>
                                    </div>

                                    <div className="col-lg-12 col-sm-12">
                                      <div className="input-block mb-3">
                                        <label>Location</label>

                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="Enter current Location"
                                          value={update.Location}
                                          onChange={(e) => {
                                            setUpdate({
                                              ...update,
                                              Location: e.target.value,
                                            });
                                          }}
                                        />
                                      </div>
                                    </div>

                                    <div className="col-lg-12 col-sm-12">
                                      <div className="input-block mb-0">
                                        <label>DOB</label>

                                        <input
                                          type="Date"
                                          className="form-control"
                                          placeholder="Enter birth date"
                                          value={update.DOB}
                                          onChange={(e) => {
                                            setUpdate({
                                              ...update,
                                              DOB: e.target.value,
                                            });
                                          }}
                                        />
                                      </div>
                                    </div>

                                    <div className="col-lg-12 col-sm-12">
                                      <div className="input-block mb-0">
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
                                  </div>
                                </div>

                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    data-bs-dismiss="modal"
                                    className="btn btn-back cancel-btn me-2"
                                    onClick={() => {
                                      setEditbtn(!editbtn);
                                    }}
                                  >
                                    Cancel
                                  </button>

                                  <button
                                    type="submit"
                                    // data-bs-dismiss="modal"
                                    className="btn btn-primary paid-continue-btn"
                                    onClick={Updateprofile}
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
                          <li className="pt-2 pb-0">
                            <h6>Company Name</h6>
                            <li> {item.CompanyName}  </li>
                          </li><br/>

                         
                          <li>
                          </li>
                          <li className="pt-2 pb-0">
                            <h6>Address</h6>
                            <li> {item.Address}  </li>
                          </li><br/>

                          <li className="pt-2 pb-0">
                            <h6>DOB</h6>
                            <li> {fDate(item.DOB)}  </li>
                          </li><br/>
                          

                          <li className="pt-2 pb-0">
                            <h6>Location</h6>
                            <li> {item.Location}  </li>
                          </li><br/>

                          <li className="pt-2 pb-0">
                            <h6>State</h6>
                            <li> {item.State}  </li>
                          </li><br/>

                          <li className="pt-2 pb-0">
                            <h6>Country</h6>
                            <li> {item.Country}  </li>
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
                       {active && active.map((item,index)=>{
                             return (
                              <li key={index} className="feed-item">
                              <div className="feed-date">{fDateTime(item.createdAt)}</div>
                              <span className="feed-text">
                                <a  style={{ color: "blue" }}>
                                  {item.role}
                                </a>{" "}
                                {item.trading_status}
                              </span>
                            </li>
                             )     
                       })}
                       
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

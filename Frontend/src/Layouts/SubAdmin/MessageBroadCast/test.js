import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';



function LabTabs() {
    const [value, setValue] = useState('1');
    const [formData1, setFormData1] = useState({ input1: '', input2: '' });
    const [formData2, setFormData2] = useState({ input3: '', input4: '' });
    const [formData3, setFormData3] = useState({ input5: '', input6: '' });
    const [messageText, setMessageText] = useState("");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleForm1Change = (e) => {
        setFormData1({ ...formData1, [e.target.name]: e.target.value });
    };

    const handleForm2Change = (e) => {
        setFormData2({ ...formData2, [e.target.name]: e.target.value });
    };

    const handleForm3Change = (e) => {
        setFormData3({ ...formData3, [e.target.name]: e.target.value });
    };

    const handleSubmitForm1 = (e) => {
        e.preventDefault();
        // Logic for handling form submission for Tab 1
    };

    const handleSubmitForm2 = (e) => {
        e.preventDefault();
        // Logic for handling form submission for Tab 2
    };

    const handleSubmitForm3 = (e) => {
        e.preventDefault();
        // Logic for handling form submission for Tab 3
    };
    const handleMessageChange = (e) => {
        setMessageText(e.target.value);
      };
    return (

        <div className="content container-fluid" >

            <div className="card" data-aos="fade-left">
                <div className="card-header">
                    <h5 className=" card-title mb-0 w-auto">Message Broadcast</h5>
                </div>


                <div className="card-body">
                    <div className="mt-3 ">
                        <Box sx={{ width: '100%', typography: 'body1' }}>
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                        <Tab label="Send" value="1" />
                                        <Tab label="Sent Messages" value="2" />
                                        <Tab label="Received Messages" value="3" />
                                    </TabList>
                                </Box>
                                <TabPanel value="1">
                                    <div className="row align-items-center">
                                        <div className="col-md-5">
                                            <img
                                                src="/assets/img/gif/Email-campaign.png"
                                                alt="Investment data"
                                                className="w-75"
                                            />
                                        </div>
                                        <div className="col-md-7">
                                            <div>
                                                <div className="input-block mt-3">
                                                    <label className="form-label" htmlFor="strategy-select">
                                                        Strategy
                                                    </label>
                                                    {/* Select strategy dropdown */}
                                                </div>
                                                <div className=" input-block mt-3">
                                                    <label className="form-label" htmlFor="broker-select">
                                                        Broker
                                                    </label>
                                                    {/* Select broker dropdown */}
                                                </div>
                                            </div>

                                            <div className="input-block mt-3">
                                                <label className="form-label" htmlFor="message">
                                                    Message
                                                </label>
                                                <textarea
                                                    id="message"
                                                    className="form-control"
                                                    rows="4"
                                                    value={messageText}
                                                    onChange={handleMessageChange}
                                                ></textarea>
                                            </div>
                                            <button
                                                type="button"
                                                className="btn btn-primary mt-3"
                                                // onClick={sendMessage}
                                            >
                                                Send
                                            </button>
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel value="2">
                                    <form onSubmit={handleSubmitForm2}>
                                        <input
                                            type="text"
                                            name="input3"
                                            value={formData2.input3}
                                            onChange={handleForm2Change}
                                        />
                                        <input
                                            type="text"
                                            name="input4"
                                            value={formData2.input4}
                                            onChange={handleForm2Change}
                                        />
                                        <button type="submit">Submit Form 2</button>
                                    </form>
                                </TabPanel>
                                <TabPanel value="3">
                                    <form onSubmit={handleSubmitForm3}>
                                        <input
                                            type="text"
                                            name="input5"
                                            value={formData3.input5}
                                            onChange={handleForm3Change}
                                        />
                                        <input
                                            type="text"
                                            name="input6"
                                            value={formData3.input6}
                                            onChange={handleForm3Change}
                                        />
                                        <button type="submit">Submit Form 3</button>
                                    </form>
                                </TabPanel>
                            </TabContext>
                        </Box>
                    </div>
                </div>


            </div>





            {/* {modal !== 0 && (
                <div
                    className="modal fade show"
                    tabIndex="-1"
                    style={{ display: "block" }}
                >
                    <div className="modal custom-modal d-block">
                        <div className="modal-dialog modal-dialog-centered modal-md">
                            <div className="modal-content">
                                <div className="modal-header border-0 pb-0">
                                    <div className="form-header modal-header-title text-start mb-0">
                                        <h4 className="mb-0">Update Message</h4>
                                    </div>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                        onClick={() => setModal(0)}
                                    ></button>
                                </div>
                                {modal === 1 && (
                                    <form onSubmit={handleUpdate}>
                                        <div className="modal-body">
                                            <div className="row">
                                                <div className="input-block mb-3">
                                                    <label>Message Title*</label>
                                                    <textarea
                                                        type="text"
                                                        className="form-control"
                                                        onChange={(e) => setMsgData(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer border-0 pt-0">
                                            <button type="submit" className="btn btn-primary">
                                                Update
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {deleteModal && (
                <div className="modal custom-modal modal-delete d-block" >
                    <div className="modal-dialog modal-dialog-centered modal-md">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="form-header">
                                    <div className="delete-modal-icon">
                                        <span>
                                            <i className="fe fe-check-circle" />
                                        </span>
                                    </div>
                                    <h3>Are You Sure?</h3>
                                    <p>You want delete Message</p>
                                </div>
                                <div className="modal-btn delete-action">
                                    <div className="modal-footer justify-content-center p-0">
                                        <button type="submit" onClick={() => handleDlt()} className="btn btn-primary paid-continue-btn me-2">Yes, Delete</button>
                                        <button type="button" onClick={() => setdeleteModal(false)} className="btn btn-back cancel-btn">No, Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )} */}


        </div>

    );
}

export default LabTabs;

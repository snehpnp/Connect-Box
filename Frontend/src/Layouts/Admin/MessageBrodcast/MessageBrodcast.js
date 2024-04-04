import React, { useState, useEffect } from 'react';
import Content from '../../../Components/Dashboard/Content/Content';
import axios from 'axios';

function MessageBroadcast() {
    const [messages, setMessages] = useState([]);
    const [strategies, setStrategies] = useState([]);
    const [brokers, setBrokers] = useState([]);
    const [subadmin, setsubadmin] = useState([]);

    const [selectedStrategy, setSelectedStrategy] = useState('');
    const [selectedBroker, setSelectedBroker] = useState('');
    const [messageText, setMessageText] = useState('');
    const roles = JSON.parse(localStorage.getItem('user_role'));



    const fetchStrategies = async () => {
        try {
            const response = await axios.get('http://localhost:7000/strategy_for_add_client/getall');
            setStrategies(response.data.data);
        } catch (error) {
            console.error('Error fetching strategies:', error);
        }
    };

    const fetchBrokers = async () => {
        try {
            const response = await axios.get('http://localhost:7000/broker/get');
            setBrokers(response.data.data);
        } catch (error) {
            console.error('Error fetching brokers:', error);
        }
    };

    const fetchSubadminName = async () => {
        try {
            const response = await axios.post('http://localhost:7000/subadmin/name/getall');
            setsubadmin(response.data.data);
        } catch (error) {
            console.error('Error fetching brokers:', error);
        }
    };

    const sendMessage = async () => {
        try {
            const newMessage = {
                strategyName: selectedStrategy,
                brokerName: selectedBroker,
                message: messageText,
                status: 'Sent',
            };
            await axios.post('http://localhost:7000/messageData', newMessage);
            console.log("Message sent successfully");
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleStrategyChange = (e) => {
        setSelectedStrategy(e.target.value);
    };

    const handleBrokerChange = (e) => {
        setSelectedBroker(e.target.value);
    };

    const handleMessageChange = (e) => {
        setMessageText(e.target.value);
    };


    useEffect(() => {
        fetchStrategies();
        fetchBrokers();
        fetchSubadminName()
    }, []);


    return (
        <Content
            Page_title="Message Boardcast"
            Card_title="Message"
            Card_title_icon='fas fa-message pe-3'
            Content={
                <>
                
                    {roles == "SUBADMIN" ? (<div>
                        <div className="mt-3">
                            <label className="form-label" htmlFor="strategy-select">Strategy</label>
                            <div className="input-group">
                                <select
                                    id="strategy-select"
                                    className="form-control"
                                    value={selectedStrategy}
                                    onChange={handleStrategyChange}
                                >
                                    <option value="">Select Strategy</option>
                                    {strategies.map(strategy => (
                                        <option key={strategy._id} value={strategy.strategy_name}>{strategy.strategy_name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="mt-3">
                            <label className="form-label" htmlFor="broker-select">Broker</label>
                            <div className="input-group">
                                <select
                                    id="broker-select"
                                    className="form-control"
                                    value={selectedBroker}
                                    onChange={handleBrokerChange}
                                >
                                    <option value="">Select Broker</option>
                                    {brokers.map(broker => (
                                        <option key={broker._id} value={broker.title}>{broker.title}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>) : <div className="mt-3">
                        <label className="form-label" htmlFor="broker-select">SubAdmins</label>
                        <div className="input-group">
                            <select
                                id="broker-select"
                                className="form-control"
                                value={selectedBroker}
                                onChange={handleBrokerChange}
                            >
                                <option value="">Select UserName</option>
                                {subadmin.map(broker => (
                                    <option key={broker._id} value={broker.UserName}>{broker.UserName}</option>
                                ))}
                            </select>
                        </div>
                    </div>}


                    <div className="mt-3">
                        <label className="form-label" htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            className="form-control"
                            rows="4"
                            value={messageText}
                            onChange={handleMessageChange}
                        ></textarea>
                    </div>
                    <button type="button" className="btn btn-primary mt-3" onClick={sendMessage}>Send</button>

                    <div className="mt-3">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">S.No</th>
                                    <th scope="col">Sub-Admin Name</th>
                                    <th scope="col">Strategy</th>
                                    <th scope='col'>Broker</th>
                                    <th scope="col">Message</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {messages && messages.map((message, index) => (
                                    <tr key={message.id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{message.subAdminName}</td>
                                        <td>{message.strategy}</td>
                                        <td>{message.message}</td>
                                        <td>{message.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            }
        />
    );
}

export default MessageBroadcast;

import React, { useState, useEffect } from 'react';
import Content from '../../../Components/Dashboard/Content/Content';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function MessageBroadcast() {
    const [messages, setMessages] = useState([]);
    const [strategies, setStrategies] = useState([]);
    const [selectedStrategy, setSelectedStrategy] = useState('');
    const [messageText, setMessageText] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchStrategies();
    }, []);

    const fetchStrategies = async () => {
        try {
            const response = await axios.get('http://localhost:7000/strategy/getall');
            setStrategies(response.data.data);
        } catch (error) {
            console.error('Error fetching strategies:', error);
        }
    };

    const sendMessage = async () => {
        try {
            const selectedStrategyObject = strategies.find(strategy => strategy.strategyname === selectedStrategy);
            if (selectedStrategyObject) {
                const newMessage = {
                    strategyName: selectedStrategyObject.strategyname,
                    brokerName: '',
                    message: messageText,
                    status: 'Sent',
                };
                await axios.post('http://localhost:7000/msg/post', newMessage);
                console.log("Message sent successfully");

            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleStrategyChange = (e) => {
        setSelectedStrategy(e.target.value);
    };

    const handleMessageChange = (e) => {
        setMessageText(e.target.value);
    };

    return (
        <>
            <Content
                Page_title="All Subadmins"
                Card_title="All Subadmins"
                Card_title_icon='fas fa-user pe-3'
                Content={
                    <>
                        <div className="mt-3">
                            <label className="form-label" htmlFor="search-focus form1">Strategy</label>
                            <div className="input-group">
                                <select
                                    className="form-control"
                                    value={selectedStrategy}
                                    onChange={handleStrategyChange}
                                >
                                    <option value="">Select Strategy</option>
                                    {strategies.map(strategy => (
                                        <option key={strategy._id} value={strategy.strategy_name
                                        }>{strategy.strategy_name
                                            }</option>
                                    ))}
                                </select>
                                <button type="button" className="btn btn-primary" onClick={sendMessage}>
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                        </div>

                        <div className="mt-3">
                            <label className="form-label" htmlFor="search-focus form1">Broker</label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="search-focus form1"
                                />
                                <button type="button" className="btn btn-primary">
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                        </div>


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
        </>
    );
}

export default MessageBroadcast;

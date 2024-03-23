import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function StrategyForm() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        strategyname: '',
        description: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/strategy', formData);
            console.log(response.data);
            setFormData({
                name: '',
                strategyname: '',
                description: '',

            });
            navigate('/admin/message-broadcast')
        } catch (error) {
            console.error('Error:', error);
            console.error('Failed to add strategy. Please try again later.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Add New Strategy</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name"><i className="fas fa-user"></i> Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        placeholder="Enter your name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="strategyname"><i className="fas fa-tasks"></i> Strategy Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="strategyname"
                                        name="strategyname"
                                        placeholder="Enter strategy name"
                                        value={formData.strategyname}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description"><i className="fas fa-file-alt"></i> Description</label>
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        name="description"
                                        rows="3"
                                        placeholder="Enter description"
                                        value={formData.description}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary"><i className="fas fa-save"></i> Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StrategyForm;

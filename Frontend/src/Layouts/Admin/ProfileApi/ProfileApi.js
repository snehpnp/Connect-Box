import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Profile from '../Profile/Profile';

const ProfileApi = () => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let data = JSON.stringify({
                    "id": "65fe8362d0baef71be02ee10"
                });

                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: 'http://localhost:7000/subadmin/get',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: data
                };

                const response = await axios.request(config);
                setProfileData(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {profileData && <Profile profileData={profileData} />}
        </div>
    );
};

export default ProfileApi;

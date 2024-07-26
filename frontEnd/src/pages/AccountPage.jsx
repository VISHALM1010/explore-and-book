import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../userContext/userContext';

const AccountPage = () => {
    const [accountData, setAccountData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    useEffect(() => {
        const fetchAccountData = async () => {
            try {
                const { data } = await axios.get('/account');
                setAccountData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching account data:', error);
                setLoading(false);
            }
        };
        fetchAccountData();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post('/logout');
            setUser(null);
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                <div className="px-6 py-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">User Information</h2>
                    {accountData ? (
                        <>
                            <div className="mb-4">
                                <label className="text-gray-600 font-semibold">Name:</label>
                                <p className="text-gray-800 font-semibold">{accountData.name}</p>
                            </div>
                            <div className="mb-4">
                                <label className="text-gray-600 font-semibold">Email:</label>
                                <p className="text-gray-800 font-semibold">{accountData.email}</p>
                            </div>
                          
                            <button
                                onClick={handleLogout}
                                className="mt-6 py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <p className="text-gray-700">No account information found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AccountPage;

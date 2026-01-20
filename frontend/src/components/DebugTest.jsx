import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DebugTest = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const testAPI = async () => {
            try {
                console.log("Testing API connection...");
                const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
                console.log("Backend URL:", url);
                
                const response = await axios.get(url + "/api/food/list");
                console.log("API Response:", response.data);
                setData(response.data);
            } catch (err) {
                console.error("API Error:", err);
                setError(err.message);
            }
        };
        
        testAPI();
    }, []);
    
    return (
        <div style={{ padding: '20px', border: '1px solid red', margin: '20px' }}>
            <h3>Debug Test Component</h3>
            <p>Backend URL: {import.meta.env.VITE_BACKEND_URL}</p>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {data && (
                <div>
                    <p>Success: {data.success ? 'true' : 'false'}</p>
                    <p>Food items count: {data.data ? data.data.length : 0}</p>
                    {data.data && data.data.slice(0, 3).map(item => (
                        <div key={item._id}>
                            <strong>{item.name}</strong> - {item.category}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DebugTest;
import React, { useState } from 'react'
import './Login.css'
import { toast } from 'react-toastify'
import axios from 'axios'

const Login = ({ setToken }) => {
    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const onLogin = async (event) => {
        event.preventDefault();
        
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/admin/login`, data);
            
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem('adminToken', response.data.token);
                toast.success('Login successful!');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('Login failed. Please try again.');
        }
    }

    return (
        <div className='login'>
            <div className="login-container">
                <h2>Admin Login</h2>
                <form onSubmit={onLogin} className="login-form">
                    <div className="login-input">
                        <input
                            name='email'
                            onChange={onChangeHandler}
                            value={data.email}
                            type="email"
                            placeholder='Email'
                            required
                        />
                    </div>
                    <div className="login-input">
                        <input
                            name='password'
                            onChange={onChangeHandler}
                            value={data.password}
                            type="password"
                            placeholder='Password'
                            required
                        />
                    </div>
                    <button type="submit" className="login-btn">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login
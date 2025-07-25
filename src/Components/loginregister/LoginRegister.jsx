import React, { useState } from "react";
import axios from "axios";
import './LoginRegister.css';
import { FaUser, FaLock, FaEnvelope, FaHome } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const LoginRegister = () => {
    const [action, setAction] = useState(''); // Toggle between login and signup
    const [signupData, setSignupData] = useState({
        id: '',
        name: '',
        dept: '',
        password: '',
        confirmPassword: '',
        address: '',
        email: '',
        batch: '',
        interest: '',
        phones: [],
    });
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
        isAdmin: false, // To differentiate between student and admin login
    });

    const navigate = useNavigate();

    const signupLink = () => setAction('active');
    const loginLink = () => setAction('');

    const handleSignupChange = (e) => {
        const { name, value } = e.target;
        setSignupData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const addPhoneField = () => {
        setSignupData((prevData) => ({
            ...prevData,
            phones: [...prevData.phones, { phoneNumber: '' }],
        }));
    };

    const handlePhoneChange = (e, index) => {
        const { value } = e.target;
        setSignupData((prevData) => {
            const updatedPhones = [...prevData.phones];
            updatedPhones[index].phoneNumber = value;
            return { ...prevData, phones: updatedPhones };
        });
    };

    const removePhoneField = (index) => {
        setSignupData((prevData) => {
            const updatedPhones = [...prevData.phones];
            updatedPhones.splice(index, 1);
            return { ...prevData, phones: updatedPhones };
        });
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (signupData.password !== signupData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        if (!signupData.phones.length) {
            alert("Please add at least one phone number!");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/student/signup', signupData);
            console.log("Signup response:", response.data);
            alert("Signup successful");// Display success message
            setAction(''); // Switch to login form
            setSignupData({
                id: '',
                name: '',
                dept: '',
                password: '',
                confirmPassword: '',
                address: '',
                email: '',
                batch: '',
                interest: '',
                phones: [],
            });
        } catch (error) {
            console.error('Error during signup:', error.response?.data || error.message);
            alert("Signup failed! Please try again.");
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const loginEndpoint = loginData.isAdmin
            ? 'http://localhost:8080/api/admin/students/login'
            : 'http://localhost:8080/api/student/login';

        try {
            const response = await axios.post(loginEndpoint, {
                email: loginData.email,
                password: loginData.password,
            });

            if (response.status === 200) {
                localStorage.setItem('email', loginData.email);
                localStorage.setItem('userInfo', JSON.stringify(response.data));
                localStorage.setItem('studentId', response.data.id); // assuming backend sends { id, name, email, ... }
                alert("Login successful");

                navigate(loginData.isAdmin ? '/adminDash' : '/intermediate');
            } else {
                alert("Login failed! Please check your credentials.");
            }
        } catch (error) {
            console.error('Error during login:', error.response?.data || error.message);
            alert("Login failed! Please check your credentials.");
        }
    };

    return (
        <div className="auth-container">
            <div className={`wrapper ${action}`}>
                {/* Login Form */}
                <div className={`form-box login ${action === '' ? 'active' : ''}`}>
                    <form onSubmit={handleLogin}>
                        <h1>Login</h1>
                        <div className="input-box">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                required
                                value={loginData.email}
                                onChange={handleLoginChange}
                            />
                            <FaEnvelope className="icon" />
                        </div>
                        <div className="input-box">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                required
                                value={loginData.password}
                                onChange={handleLoginChange}
                            />
                            <FaLock className="icon" />
                        </div>
                        <div className="input-box">
                            <label>
                                <input
                                    type="checkbox"
                                    name="isAdmin"
                                    checked={loginData.isAdmin}
                                    onChange={(e) => setLoginData((prev) => ({ ...prev, isAdmin: e.target.checked }))}
                                />
                                Admin Login
                            </label>
                        </div>
                        <button type="submit">Login</button>
                        <div className="signup-link">
                            <p>Don't have an account? <a href="#" onClick={signupLink}>Sign-Up</a></p>
                        </div>
                    </form>
                </div>

                {/* Sign-Up Form */}
                <div className={`form-box sign-up ${action === 'active' ? 'active' : ''}`}>
                    <form onSubmit={handleSignup}>
                        <h1>Sign-Up</h1>
                        <div className="input-box">
                            <input
                                type="text"
                                name="id"
                                placeholder="Student ID"
                                required
                                value={signupData.id}
                                onChange={handleSignupChange}
                            />
                        </div>
                        <div className="input-box">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                required
                                value={signupData.name}
                                onChange={handleSignupChange}
                            />
                            <FaUser className="icon" />
                        </div>
                        <div className="input-box half">
                            <select
                                name="dept"
                                value={signupData.dept}
                                onChange={handleSignupChange}
                                required
                            >
                                <option value="" disabled>Department</option>
                                <option value="CSE">CSE</option>
                                <option value="EE">EE</option>
                                <option value="ME">ME</option>
                            </select>
                        </div>
                        <div className="input-box">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                required
                                value={signupData.password}
                                onChange={handleSignupChange}
                            />
                            <FaLock className="icon" />
                        </div>
                        <div className="input-box">
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                required
                                value={signupData.confirmPassword}
                                onChange={handleSignupChange}
                            />
                            <FaLock className="icon" />
                        </div>
                        <div className="input-box">
                            <input
                                type="text"
                                name="address"
                                placeholder="Present Address"
                                required
                                value={signupData.address}
                                onChange={handleSignupChange}
                            />
                            <FaHome className="icon" />
                        </div>
                        <div className="input-box">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                required
                                value={signupData.email}
                                onChange={handleSignupChange}
                            />
                            <FaEnvelope className="icon" />
                        </div>
                        <div className="input-box half">
                            <select
                                name="batch"
                                value={signupData.batch}
                                onChange={handleSignupChange}
                                required
                            >
                                <option value="" disabled>Batch</option>
                                <option value="2019">2019</option>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                            </select>
                        </div>
                        <div className="input-box">
                            <input
                                type="text"
                                name="interest"
                                placeholder="Interest"
                                required
                                value={signupData.interest}
                                onChange={handleSignupChange}
                            />
                        </div>
                        <div className="phone-container">
                            <label>Phone Numbers</label>
                            {signupData.phones.map((phone, index) => (
                                <div key={index} className="phone-input-group">
                                    <input
                                        type="text"
                                        placeholder={`Phone Number ${index + 1}`}
                                        value={phone.phoneNumber}
                                        onChange={(e) => handlePhoneChange(e, index)}
                                    />
                                    <button type="button" onClick={() => removePhoneField(index)}>Remove</button>
                                </div>
                            ))}
                            <button type="button" onClick={addPhoneField}>Add Phone</button>
                        </div>
                        <div className="remember-forgot">
                            <label>
                                <input type="checkbox" required /> I agree to the terms & conditions
                            </label>
                        </div>
                        <button type="submit">Sign-Up</button>
                        <div className="signup-link">
                            <p>Already have an account? <a href="#" onClick={loginLink}>Login</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginRegister;

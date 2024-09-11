import React,{useState} from 'react'
import {sendOtp, verifyOtp} from '../../appwrite/otp';

function OTP() {
const [otp, setOtp] = useState('');
const [email, setEmail] = useState('');
const [userId, setUserId] = useState('');
const handleEmail = async () => {
    const response = await sendOtp(email);
    setUserId(response);
}

const handleOtp = async () => {
    try {
        const response = await verifyOtp(otp, userId);
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

    return (
        <div>
            <input type="email" 
            placeholder='forexapmle@google.com'
            onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleEmail}>Send OTP</button>
            <input type="text" 
            placeholder='OTP'
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={handleOtp}>verify otp</button>
        </div>
    )
}

export default OTP

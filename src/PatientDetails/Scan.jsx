import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './PatientReg.css';

const Scan = () => {
    const [scan, setScan] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { formData } = location.state;

    const handleScanClick = () => {
        setScan(true);
        axios.post('http://localhost:5000/patient-finger-register')
            .then(() => {
                setTimeout(() => {
                    axios.get('http://localhost:5000/finger-print-register-status')
                        .then((response) => {
                            if (response.data.status === 'success') {
                                axios.post('http://localhost:5000/patient-register', formData)
                                    .then((res) => {
                                        if (res.data.status === 'success') {
                                            setTimeout(() => {
                                                toast.success('Patient registered successfully!', {
                                                    onClose: () => navigate('/IncHome')
                                                });
                                            }, 3000); // 3-second delay before showing the toast and navigating
                                        } else {
                                            toast.error(res.data.message);
                                            setScan(false);
                                        }
                                    })
                                    .catch((err) => {
                                        console.error(err);
                                        toast.error('Failed to register patient');
                                        setScan(false);
                                    });
                            } else {
                                toast.error('Fingerprint registration failed');
                                setScan(false);
                            }
                        })
                        .catch((err) => {
                            console.error(err);
                            toast.error('Failed to check fingerprint registration status');
                            setScan(false);
                        });
                }, 800);
            })
            .catch((err) => {
                console.error(err);
                toast.error('Failed to start scanning');
                setScan(false);
            });
    };

    return (
        <>
            <ToastContainer />
            {!scan && (
                <button onClick={handleScanClick}>Start Scanning</button>
            )}
            {scan && (
                <img
                    src="https://i.gifer.com/origin/9c/9c2a750210f1e91d23859d240efed4e1.gif"
                    style={{ borderRadius: '60%' }}
                    alt="scan"
                />
            )}
        </>
    );
};

export default Scan;

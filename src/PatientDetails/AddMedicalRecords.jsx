import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AddMed() {
    const [medicalRecords, setMedicalRecords] = useState([{ category: '', description: '' }]);

    const handleCategoryChange = (event, index) => {
        const updatedRecords = [...medicalRecords];
        updatedRecords[index].category = event.target.value;
        setMedicalRecords(updatedRecords);
    };

    const handleDescriptionChange = (event, index) => {
        const updatedRecords = [...medicalRecords];
        updatedRecords[index].description = event.target.value;
        setMedicalRecords(updatedRecords);
    };

    const handleAddAnother = () => {
        setMedicalRecords([...medicalRecords, { category: '', description: '' }]);
    };

    const handleRemove = (index) => {
        const updatedRecords = [...medicalRecords];
        updatedRecords.splice(index, 1);
        setMedicalRecords(updatedRecords);
    };

    const handleSubmit = async () => {
        try {
            const formattedMedicalRecords = medicalRecords.map(record => ({
                Speciality: record.category,
                Details: record.description
            }));
    
            // Ensure patientID is logged or debugged here
            console.log('Patient ID:', "P2");
    
            const response = await axios.put(`http://localhost:5000/patients/P2/medicalRecords`, { medicalRecords: formattedMedicalRecords });
            console.log('Medical records updated:', response.data);
            alert('Medical records updated successfully');
        } catch (error) {
            console.error('Error updating medical records:', error);
            alert('Failed to update medical records');
        }
    };
    
    return (
        <div style={{ backgroundColor: 'white', padding: '20px' }}>
            {medicalRecords.map((record, index) => (
                <div key={index} style={{ marginBottom: '20px' }}>
                    <TextField
                        select
                        label="Speciality"
                        value={record.category}
                        onChange={(event) => handleCategoryChange(event, index)}
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        required
                    >
                        <MenuItem value="Cardiovascular Diseases">Cardiovascular Diseases</MenuItem>
                        <MenuItem value="Diabetes">Diabetes</MenuItem>
                        <MenuItem value="Cancer">Cancer</MenuItem>
                        <MenuItem value="Major Allergies">Major Allergies</MenuItem>
                        <MenuItem value="Surgical History">Surgical History</MenuItem>
                        {/* Add other MenuItem components here */}
                    </TextField>
                    <TextField
                        label="Details"
                        value={record.description}
                        onChange={(event) => handleDescriptionChange(event, index)}
                        fullWidth
                        multiline
                        rows={4}
                        sx={{ marginBottom: 2 }}
                        required
                    />
                    {index === medicalRecords.length - 1 && (
                        <>
                            <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ marginRight: 2 }}>
                                Submit
                            </Button>
                            <Button variant="outlined" color="primary" onClick={handleAddAnother} sx={{ marginRight: 2 }}>
                                Add Another
                            </Button>
                            <Button component={Link} to="/" variant="contained" color="primary" sx={{ marginRight: 2 }}>
                                Back
                            </Button>
                        </>
                    )}
                    {index !== medicalRecords.length - 1 && (
                        <Button variant="outlined" color="secondary" onClick={() => handleRemove(index)} sx={{ marginRight: 2 }}>
                            Remove
                        </Button>
                    )}
                </div>
            ))}
        </div>
    );
}

export default AddMed;

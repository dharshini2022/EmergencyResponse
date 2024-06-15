import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Typography, Snackbar, Alert
} from '@mui/material';

const HospitalDisplay = () => {
  const [hospitalDetails, setHospitalDetails] = useState([]);
  const [hospitalCount, setHospitalCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    address: '',
    contactNumber: '',
    email: ''
  });
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const fetchHospitalDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/hospitals');
        setHospitalDetails(response.data);
        setHospitalCount(response.data.length);
      } catch (error) {
        console.error('Error fetching hospital details:', error);
      }
    };

    fetchHospitalDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/addhospitals', formData);
      setHospitalDetails([...hospitalDetails, response.data]);
      setHospitalCount(hospitalCount + 1);
      setOpen(false);
      setFormData({
        id: '',
        name: '',
        address: '',
        contactNumber: '',
        email: ''
      });
      setMessage('Hospital added successfully');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error adding hospital:', error);
    }
  };

  const handleRemove = async () => {
    try {
      await axios.delete(`http://localhost:5000/hospitals/${formData.id}`);
      setHospitalDetails(hospitalDetails.filter(hospital => hospital.id !== formData.id));
      setHospitalCount(hospitalCount - 1);
      setRemoveDialogOpen(false);
      setFormData({
        id: '',
        name: '',
        address: '',
        contactNumber: '',
        email: ''
      });
      setMessage('Hospital removed successfully');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error removing hospital:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const styles = {
    container: {
      marginTop: '50px',
      marginBottom: '50px',
      padding: '20px',
      border: '2px solid #ddd',
      borderRadius: '10px',
      backgroundColor: '#f0f0f0',
      maxWidth: '1200px',
      width: '90%',
      margin: '0 auto',
      position: 'relative',
      zIndex: '1',
    },
    gradientBackground: {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      zIndex: '-1',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      borderRadius: '10px',
    },
    countContainer: {
      textAlign: 'center',
      marginBottom: '20px',
      fontSize: '20px',
      fontWeight: 'bold',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      padding: '10px',
      borderRadius: '5px',
    },
    header: {
      backgroundColor: '#3f51b5',
    },
    headerCell: {
      color: 'white',
      border: '1px solid white',
      textAlign: 'center',
    },
    bodyCell: {
      border: '1px solid #ddd',
      textAlign: 'center',
      backgroundColor: '#f9f9f9',
    },
    button: {
      margin: '20px 10px',
      width: '200px',
      height: '50px',
    },
    dialogContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
  };

  return (
    <div style={{ ...styles.container, position: 'relative' }}>
      <div style={styles.gradientBackground}></div>
      <Typography variant="h4" style={{ textAlign: 'center', marginBottom: '30px', color: 'white', zIndex: '1' }}>
        Welcome to Hospital Dashboard
      </Typography>
      <div style={styles.countContainer}>
        Total Hospitals Registered: {hospitalCount}
      </div>
      <div style={{ textAlign: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          style={styles.button}
          onClick={() => setOpen(true)}
        >
          Add Hospital
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={styles.button}
          onClick={() => setRemoveDialogOpen(true)}
        >
          Remove Hospital
        </Button>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Hospital</DialogTitle>
        <DialogContent style={styles.dialogContent}>
          <TextField
            autoFocus
            margin="dense"
            name="id"
            label="Hospital ID"
            type="text"
            fullWidth
            value={formData.id}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="address"
            label="Address"
            type="text"
            fullWidth
            value={formData.address}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="contactNumber"
            label="Contact Number"
            type="text"
            fullWidth
            value={formData.contactNumber}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Register
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={removeDialogOpen} onClose={() => setRemoveDialogOpen(false)}>
        <DialogTitle>Remove Hospital</DialogTitle>
        <DialogContent style={styles.dialogContent}>
          <TextField
            autoFocus
            margin="dense"
            name="id"
            label="Hospital ID"
            type="text"
            fullWidth
            value={formData.id}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRemoveDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleRemove} color="secondary">
            Remove
          </Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper}>
        <Table aria-label="hospital table">
          <TableHead style={styles.header}>
            <TableRow>
              <TableCell align="center" style={styles.headerCell}>Hospital ID</TableCell>
              <TableCell style={styles.headerCell}>Name</TableCell>
              <TableCell align="center" style={styles.headerCell}>Address</TableCell>
              <TableCell align="center" style={styles.headerCell}>Contact Number</TableCell>
              <TableCell align="center" style={styles.headerCell}>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hospitalDetails.map((detail) => (
              <TableRow key={detail._id}>
                <TableCell align="center" style={styles.bodyCell}>{detail.id}</TableCell>
                <TableCell component="th" scope="row" style={styles.bodyCell}>{detail.name}</TableCell>
                <TableCell align="center" style={styles.bodyCell}>{detail.address}</TableCell>
                <TableCell align="center" style={styles.bodyCell}>{detail.contactNumber}</TableCell>
                <TableCell align="center" style={styles.bodyCell}>{detail.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default HospitalDisplay;

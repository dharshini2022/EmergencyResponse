import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, IconButton, Snackbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const InchargeDisplay = () => {
  const [inchargeDetails, setInchargeDetails] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [incCount, setIncCount] = useState(0);
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  const [formData, setFormData] = useState({
    inchargeId: '',
    name: '',
    hospitalId: '',
    doctorId: '',
    department: '',
    email: '',
    phoneNumber: ''
  });
  const [removeId, setRemoveId] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const fetchInchargeDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/incharge');
        setInchargeDetails(response.data);
        setIncCount(response.data.length);
      } catch (error) {
        console.error('Error fetching incharge details:', error);
      }
    };

    fetchInchargeDetails();
  }, []);

  const handleAddClick = () => {
    setOpenAddDialog(true);
  };

  const handleRemoveClick = () => {
    setOpenRemoveDialog(true);
  };

  const handleAddClose = () => {
    setOpenAddDialog(false);
  };

  const handleRemoveClose = () => {
    setOpenRemoveDialog(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRemoveIdChange = (e) => {
    setRemoveId(e.target.value);
  };

  const handleSubmitAdd = async () => {
    try {
      const response = await axios.post('http://localhost:5000/addincharge', formData);
      setInchargeDetails([...inchargeDetails, response.data]);
      setIncCount(incCount + 1);
      setOpenAddDialog(false);
      setFormData({
        inchargeId: '',
        name: '',
        hospitalId: '',
        doctorId: '',
        department: '',
        email: '',
        phoneNumber: '',
        password: ''
      });
      setSnackbarMessage('Incharge added successfully');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error adding incharge:', error);
    }
  };

  const handleSubmitRemove = async () => {
    try {
      await axios.delete(`http://localhost:5000/incharge/${removeId}`);
      const updatedInchargeDetails = inchargeDetails.filter(detail => detail.inchargeId !== removeId);
      setInchargeDetails(updatedInchargeDetails);
      setIncCount(incCount - 1);
      setOpenRemoveDialog(false);
      setRemoveId('');
      setSnackbarMessage('Incharge removed successfully');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error removing incharge:', error);
    }
  };

  const handleRemoveIncharge = async (inchargeId) => {
    try {
      await axios.delete(`http://localhost:5000/incharge/${inchargeId}`);
      const updatedInchargeDetails = inchargeDetails.filter(detail => detail.inchargeId !== inchargeId);
      setInchargeDetails(updatedInchargeDetails);
      setIncCount(incCount - 1);
      setSnackbarMessage('Incharge removed successfully');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error removing incharge:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
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
    actionButton: {
      marginLeft: '10px',
      color: 'red',
    },
  };

  return (
    <div style={{ ...styles.container, position: 'relative' }}>
      <div style={styles.gradientBackground}></div>
      <Typography variant="h4" style={{ textAlign: 'center', marginBottom: '30px', color: '#fff', zIndex: '1' }}>
        Welcome to Incharge Dashboard
      </Typography>
      <div style={styles.countContainer}>
        Total Incharges Registered: {incCount}
      </div>
      <div style={{ textAlign: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddClick}
          style={styles.button}
        >
          Add Incharge
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleRemoveClick}
          style={styles.button}
        >
          Remove Incharge
        </Button>
      </div>

      <Dialog open={openAddDialog} onClose={handleAddClose}>
        <DialogTitle>Add New Incharge</DialogTitle>
        <DialogContent style={styles.dialogContent}>
          <TextField
            autoFocus
            margin="dense"
            name="inchargeId"
            label="Incharge ID"
            type="text"
            fullWidth
            value={formData.inchargeId}
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
            name="hospitalId"
            label="Hospital ID"
            type="text"
            fullWidth
            value={formData.hospitalId}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="doctorId"
            label="Doctor ID"
            type="text"
            fullWidth
            value={formData.doctorId}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="department"
            label="Department"
            type="text"
            fullWidth
            value={formData.department}
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
          <TextField
            margin="dense"
            name="phoneNumber"
            label="Contact Number"
            type="text"
            fullWidth
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="password"
            label="Password"
            type="text"
            fullWidth
            value={formData.password}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmitAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openRemoveDialog} onClose={handleRemoveClose}>
        <DialogTitle>Remove Incharge</DialogTitle>
        <DialogContent style={styles.dialogContent}>
          <TextField
            autoFocus
            margin="dense"
            name="removeId"
            label="Incharge ID"
            type="text"
            fullWidth
            value={removeId}
            onChange={handleRemoveIdChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRemoveClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmitRemove} color="primary">
            Remove
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
       
        action={[
            <Button key="close" color="inherit" size="small" onClick={handleCloseSnackbar}>
              Close
            </Button>,
          ]}
        />
        <TableContainer component={Paper}>
          <Table aria-label="incharge table">
            <TableHead style={styles.header}>
              <TableRow>
                <TableCell align="center" style={styles.headerCell}>Incharge ID</TableCell>
                <TableCell style={styles.headerCell}>Name</TableCell>
                <TableCell align="center" style={styles.headerCell}>Hospital ID</TableCell>
                <TableCell align="center" style={styles.headerCell}>Doctor ID</TableCell>
                <TableCell style={styles.headerCell}>Department</TableCell>
                <TableCell style={styles.headerCell}>Email</TableCell>
                <TableCell style={styles.headerCell}>Contact Number</TableCell>
                <TableCell align="center" style={styles.headerCell}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inchargeDetails.map((incharge) => (
                <TableRow key={incharge.inchargeId}>
                  <TableCell align="center" style={styles.bodyCell}>{incharge.inchargeId}</TableCell>
                  <TableCell style={styles.bodyCell}>{incharge.name}</TableCell>
                  <TableCell align="center" style={styles.bodyCell}>{incharge.hospitalId}</TableCell>
                  <TableCell align="center" style={styles.bodyCell}>{incharge.doctorId}</TableCell>
                  <TableCell style={styles.bodyCell}>{incharge.department}</TableCell>
                  <TableCell style={styles.bodyCell}>{incharge.email}</TableCell>
                  <TableCell style={styles.bodyCell}>{incharge.phoneNumber}</TableCell>
                  <TableCell align="center" style={styles.bodyCell}>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleRemoveIncharge(incharge.inchargeId)}
                      style={styles.actionButton}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };
  
  export default InchargeDisplay;
  
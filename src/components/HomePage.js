import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  makeStyles,
  Typography,
  Box,
  Modal,
} from '@material-ui/core';
import { DeleteOutline, Create } from '@material-ui/icons';
import ButtonWithConfirm from './Form/ButtonWithConfirm.js';
import { getUser } from '../helpers/utils';
import FormContent from './Form/FormContent.js';
import NavBar from './NavBar';

const useStyles = makeStyles(() => ({
  toolBar: {
    padding: '10px 15px',
  },
  noEmployee: {
    textAlign: 'center',
    paddingBottom: '15px',
  },
  heading: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const HomePage = (props) => {
  const [rows, setRows] = useState([]);
  const [isAdmin, setIsAdmin] = useState(getUser().role === 'Admin');
  const [showDialog, setShowDialog] = useState(false);
  const [values, setValues] = useState([]);
  const [formMode, setFormMode] = useState('');
  const [rowIndex, setRowIndex] = useState();
  const classes = useStyles();
  useEffect(() => {
    axios
      .get('http://localhost:4000/employees')
      .then((response) => {
        const employeeList = response.data.employeeList;
        setRows(employeeList);
      })
      .catch((error) => {
        console.log('Something went wrong. Please try again later.');
      });
  }, []);

  const updateEmployee = (e, index, row) => {
    setShowDialog(true);
    setFormMode('edit');
    setValues(row);
    setRowIndex(index);
  };

  const handleDelete = (e, index, row) => {
    axios
      .get(
        `http://localhost:4000/deleteEmployee?index=${index}&data=${row.joinDate}`
      )
      .then((response) => {
        const employeeList = response.data.employeeList;
        setRows(employeeList);
        const data = new Date(row.joinDate);
        props.updateChartData({ year: data.getFullYear(), mode: 'delete' });
        setShowDialog(false);
      });
  };

  return (
    <>
      <NavBar isAdmin={isAdmin} />
      <Paper className="container">
        <Box
          className={classes.toolBar}
          display="flex"
          justifyContent="space-between"
        >
          <Box className={classes.heading}>
            <Box pt={1} pb={1}>
              <Typography variant="h5">Employee List</Typography>
            </Box>
          </Box>
          {isAdmin && (
            <Button
              color="primary"
              size="small"
              variant="outlined"
              onClick={() => {
                setShowDialog(true);
                setFormMode('add');
              }}
            >
              Add Employee
            </Button>
          )}
        </Box>
        {rows.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email Address</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Joined Date</TableCell>
                {isAdmin && <TableCell>Actions</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {row.firstName}
                  </TableCell>
                  <TableCell>{row.lastName}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.gender}</TableCell>
                  <TableCell>{row.joinDate}</TableCell>
                  {isAdmin && (
                    <TableCell>
                      <Button
                        color="primary"
                        size="small"
                        onClick={(e) => {
                          updateEmployee(e, index, row);
                        }}
                      >
                        <Create />
                      </Button>
                      <ButtonWithConfirm
                        size="small"
                        warningMessage="Are you sure you want to delete?"
                        onClick={(e) => {
                          handleDelete(e, index, row);
                        }}
                      >
                        <DeleteOutline />
                      </ButtonWithConfirm>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <h3 className={classes.noEmployee}>
            There are no employees to be shown
          </h3>
        )}
        {showDialog && (
          <Modal
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            open={showDialog}
            onClose={() => setShowDialog(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={{ width: '50%', margin: '0 auto', background: 'white' }}>
              <FormContent
                setRows={setRows}
                setShowDialog={setShowDialog}
                values={values}
                mode={formMode}
                index={rowIndex}
                updateChartData={props.updateChartData}
              />
            </Box>
          </Modal>
        )}
      </Paper>
    </>
  );
};

export default HomePage;

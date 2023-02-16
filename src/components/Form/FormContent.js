import React from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  InputLabel,
} from '@material-ui/core';
import TextInput from './TextInput';

const FormContent = ({
  setRows,
  setShowDialog,
  values,
  mode,
  index,
  updateChartData,
}) => {
  const getInitialValue = () => {
    let initialValues = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      gender: '',
      joinDate: new Date().toISOString().split('T')[0],
    };

    if (mode === 'edit') {
      initialValues = {
        ...values,
      };
      return initialValues;
    }

    return initialValues;
  };

  const fk = useFormik({
    initialValues: getInitialValue(),
    validationSchema: Yup.object().shape({
      firstName: Yup.string()
        .min(6, 'Should be atleast 6 characters')
        .max(10, 'Cannot be longer than 10 characters')
        .required('Required'),
      lastName: Yup.string()
        .min(6, 'Should be atleast 6 characters')
        .max(10, 'Cannot be longer than 10 characters')
        .required('Required'),
      email: Yup.string().email('Invalid email format').required('Required'),
      phone: Yup.string()
        .matches(
          /\+65[6|8|9]\d{7}|\+65\s[6|8|9]\d{7}/g,
          'Phone number is not valid'
        )
        .required('Required'),
    }),
    onSubmit: (values) => {
      if (mode === 'add') {
        axios
          .post('http://localhost:4000/addEmployee', { values })
          .then((response) => {
            setRows(response.data.employeeList);
            const data = new Date(values.joinDate);
            updateChartData({ year: data.getFullYear(), mode: 'add' });
            setShowDialog(false);
          });
      } else if (mode === 'edit') {
        axios
          .post('http://localhost:4000/editEmployee', { values, index })
          .then((response) => {
            setRows(response.data.employeeList);
            setShowDialog(false);
          });
      }
    },
  });
  return (
    <form noValidate onSubmit={fk.handleSubmit}>
      <DialogTitle>{`${mode === 'add' ? 'Add' : 'Edit'} Employee`}</DialogTitle>
      <DialogContent>
        <Box mb={1} p={0}>
          <Grid container spacing={3}>
            <Grid item md={6}>
              <TextInput name="firstName" fk={fk} />
            </Grid>
            <Grid item md={6}>
              <TextInput name="lastName" fk={fk} />
            </Grid>
            <Grid item md={6}>
              <TextInput name="email" fk={fk} />
            </Grid>
            <Grid item md={6}>
              <TextInput name="phone" fk={fk} />
            </Grid>
            <Grid item md={6}>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender"
                row
                value={fk.values.gender}
                onChange={fk.handleChange}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio color="primary" size="small" />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio color="primary" size="small" />}
                  label="Female"
                />
              </RadioGroup>
            </Grid>
            <Grid item md={6}>
              <InputLabel htmlFor="password">Joined Date</InputLabel>
              <TextField
                type="date"
                name="joinDate"
                value={fk.values.joinDate}
                onChange={fk.handleChange}
                InputProps={{
                  inputProps: {
                    min: '2017-01-01',
                    max: new Date().toISOString().split('T')[0],
                  },
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setShowDialog(false)}
          color="primary"
          variant="outlined"
        >
          Close
        </Button>
        <Button color="primary" variant="contained" type="submit">
          {mode === 'edit' ? 'Edit' : 'Add'}
        </Button>
      </DialogActions>
    </form>
  );
};

export default FormContent;

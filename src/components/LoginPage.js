import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from '../helpers/utils.js';
import { makeStyles } from '@material-ui/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  FormControl,
  CircularProgress,
  OutlinedInput,
  InputLabel,
  FormHelperText,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    overflow: 'visible',
    display: 'flex',
    position: 'relative',
    width: '400px',
    margin: 'auto',
    '& > *': {
      flexGrow: 1,
      flexBasis: '25%',
      width: '25%',
    },
  },
  content: {
    padding: '32px',
  },
  loginHeading: {
    fontWeight: 400,
    fontSize: '20px',
  },
}));

function LoginPage(props) {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fk = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      axios
        .post('http://localhost:4000/users/signin', {
          username: values.username,
          password: values.password,
        })
        .then((response) => {
          setLoading(false);
          setUserSession(response.data.token, response.data.user);
          props.history.push('/home');
        })
        .catch((error) => {
          setLoading(false);
          if (error.response.status === 401)
            setError(error.response.data.message);
          else setError('Something went wrong. Please try again later.');
        });
    },
  });

  return (
    <div className={classes.root} title="Login">
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <Typography variant="h4" className={classes.loginHeading}>
            Login to your account
          </Typography>
          <form noValidate onSubmit={fk.handleSubmit}>
            <Box mb={3} mt={4}>
              <TextField
                size="small"
                label="User Name"
                name="username"
                onChange={fk.handleChange}
                value={fk.values.username}
                variant="outlined"
                error={Boolean(fk.errors.username)}
                fullWidth
                helperText={fk.errors.username}
              />
            </Box>
            <Box>
              <FormControl
                size="small"
                fullWidth
                error={Boolean(fk.errors.password)}
                variant="outlined"
              >
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  label="Password"
                  id="password"
                  type="password"
                  value={fk.values.password}
                  name="password"
                  fullWidth
                  onChange={fk.handleChange}
                  labelWidth={70}
                  {...props}
                />
                <FormHelperText id="outlined-weight-helper-text">
                  {fk.errors.password}
                </FormHelperText>
              </FormControl>
            </Box>
            {error && (
              <>
                <small style={{ color: 'red' }}>{error}</small>
                <br />
              </>
            )}
            <br />
            <Box mt={2}>
              <Button
                color="primary"
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="secondary" />
                ) : (
                  'Login'
                )}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginPage;

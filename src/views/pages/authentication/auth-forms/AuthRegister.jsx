/* eslint-disable no-unused-vars */
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Formik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimateButton from 'ui-component/extended/AnimateButton';
import * as Yup from 'yup';
import { signUpForm } from '../../../../services/ApiServices';

const AuthRegister = ({ ...others }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('');

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (data) => {
    const requestBody = {
      username: data.email,
      password: data.password,
      status: 'APPROVED',
      roleId: 2
    };

    console.log('Request Body:', requestBody);

    try {
      const response = await signUpForm(requestBody);
      if (response.status === 200) {
        setAlertMessage('Data Saved Successfully! Please login now');
        setAlertSeverity('success');
        navigate('/pages/login/login3', { replace: true });
        setTimeout(() => {
          setAlertMessage('');
        }, 1000);
      } else {
        setAlertMessage('Process failed! Try again');
        setAlertSeverity('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setAlertMessage('An error occurred! Please try again.');
      setAlertSeverity('error');
    }
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().max(255).required('Username is required'),
        // email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().max(255).required('Password is required')
      })}
      onSubmit={handleSubmit}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit} {...others}>
          <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
            <InputLabel htmlFor="outlined-adornment-email-register">Email Address / Username</InputLabel>
            <OutlinedInput
              id="outlined-adornment-email-register"
              type="email"
              value={values.email}
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              inputProps={{}}
            />
            {touched.email && errors.email && (
              <FormHelperText error id="standard-weight-helper-text--register">
                {errors.email}
              </FormHelperText>
            )}
          </FormControl>

          {/* Add similar fields for other inputs */}
          <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
            <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password-register"
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              name="password"
              label="Password"
              onBlur={handleBlur}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    size="large"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              inputProps={{}}
            />
            {touched.password && errors.password && (
              <FormHelperText error id="standard-weight-helper-text-password-register">
                {errors.password}
              </FormHelperText>
            )}
          </FormControl>

          <Box sx={{ mt: 2 }}>
            <AnimateButton>
              <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                Sign up
              </Button>
            </AnimateButton>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default AuthRegister;

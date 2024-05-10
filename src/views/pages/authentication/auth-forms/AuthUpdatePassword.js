import { useState } from 'react';
import { useSelector } from 'react-redux';
import { updatePasswordAdmin } from 'AxiosInstance';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Checkbox,
    CircularProgress,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Google from 'assets/images/icons/social-google.svg';
import { toast } from 'react-toastify';

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthUpdatePassword = ({ ...others }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const customization = useSelector((state) => state.customization);
    const [checked, setChecked] = useState(true);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const googleHandler = async () => {
        console.error('Login');
    };

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const resetPassword = (newpassword, confirmpassword, otp) => {
        setLoading(true);
        console.log('reset password function');
        //console.log(confirmpassword)
        //console.log(newpassword)
        //console.log(otp)
        //navigate('/')
        if (newpassword !== confirmpassword) {
            alert('new password does not match with confirm password');
        }
        updatePasswordAdmin(confirmpassword, newpassword, otp)
            .then((res) => {
                if (res.data.status === true) {
                    console.log('reset password confirmed');
                    toast.success(res.data.message, {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light'
                    });
                    console.log('reset password confirmed', res.data.message);
                    navigate('/login');
                } else {
                    toast.error(res.data.message, {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light'
                    });
                }
            })
            .catch((error) => {
                console.log('ERROR reset password confirmed');
                console.log('eroororoor', error.response.data.message);
                toast.error(error.response.data.message, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light'
                });
            })
            .finally(() => {
                setLoading(false);
            });

        //console.log(data)
        // if (data.status === 200){
        //     console.log("hi")
        //     console.log(data)
        //     navigate('/verifyotp');
        // }
    };

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12}>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex'
                        }}
                    >
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />

                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                    </Box>
                </Grid>
                {/* <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Enter </Typography>
                    </Box>
                </Grid> */}
            </Grid>

            <Formik
                initialValues={{
                    //email: 'abdul.wahab@codistan.org',
                    newpassword: '',
                    confirmpassword: '',
                    text: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    //email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    newpassword: Yup.string()
                        .max(255)
                        .required('New Password is required')
                        .matches(
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                            'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character!'
                        ),
                    confirmpassword: Yup.string()
                        .oneOf([Yup.ref('newpassword'), null], 'Passwords must match')
                        .required('Confirm Password is required'),

                    text: Yup.string().length(6, 'OTP must be exactly 6 characters').required('OTP is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        if (scriptedRef.current) {
                            setStatus({ success: true });
                            setSubmitting(false);
                            //console.log(`Data is ${values.email} and ${values.password} ${setStatus.status}`);
                            //adminApi.getAdmin();
                            // const data = adminApi.forgotPasswordAdmin(values.email);
                            // console.log(data);
                            //navigate('/');
                            //console.log(values.confirmpassword)
                            //console.log(values.newpassword)
                            resetPassword(values.confirmpassword, values.newpassword, values.text);
                        }
                    } catch (err) {
                        console.error(err);
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        {/* <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-email-login">Reset Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-login"
                                type="email"
                                value={values.email}
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Email Address / Username"
                                inputProps={{}}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl> */}

                        <FormControl
                            fullWidth
                            error={Boolean(touched.newpassword && errors.newpassword)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-login">New Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-login"
                                type={showPassword ? 'text' : 'password'}
                                value={values.newpassword}
                                name="newpassword"
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
                                label="New Password"
                                inputProps={{}}
                            />
                            {touched.newpassword && errors.newpassword && (
                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                    {errors.newpassword}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl
                            fullWidth
                            error={Boolean(touched.confirmpassword && errors.confirmpassword)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-login">Confirm Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-login1"
                                type={showPassword ? 'text' : 'password'}
                                value={values.confirmpassword}
                                name="confirmpassword"
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
                                label="New Password"
                                inputProps={{}}
                            />
                            {touched.confirmpassword && errors.confirmpassword && (
                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                    {errors.confirmpassword}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl fullWidth error={Boolean(touched.text && errors.text)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-email-login">Enter OTP</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-login"
                                type="text"
                                value={values.text}
                                name="text"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Email Address / Username"
                                inputProps={{}}
                            />
                            {touched.text && errors.text && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {errors.text}
                                </FormHelperText>
                            )}
                        </FormControl>

                        {/* <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={(event) => setChecked(event.target.checked)}
                                        name="checked"
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                            <Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }} 
                                    component={Link}
                                    to="/forgotpassword"
                            
                            >
                                Forgot Password?
                            </Typography>
                        </Stack> */}
                        {/* {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )} */}

                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    //onClick = { () => {console.log(`values is ${values.email} and ${values.password}`)}}
                                    typeof="submit"
                                >
                                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Update Password'}
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default AuthUpdatePassword;

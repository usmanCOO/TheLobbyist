import { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { resetPasswordAdmin } from 'AxiosInstance';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// import Google from 'assets/images/icons/social-google.svg';
import { toast } from 'react-toastify';

// ============================|| FIREBASE - LOGIN ||============================ //

const FirebaseLogin = ({ ...others }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    // const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    // const customization = useSelector((state) => state.customization);
    // const [checked, setChecked] = useState(true);
    const [loading, setLoading] = useState(false);

    // const googleHandler = async () => {
    //     console.error('Login');
    // };

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const resetPassword = (newpassword) => {
        setLoading(true);
        console.log('reset password function');

        resetPasswordAdmin(newpassword)
            .then((res) => {
                console.log('reset pass res:', res);
                if (res.data.status === true) {
                    toast.success(res.data.message, {
                        autoClose: 2500
                    });

                    setTimeout(() => {
                        localStorage.removeItem('userData');
                        if (!localStorage.getItem('userData')) {
                            window.location.href = '/adminpanel/login';
                        }
                    }, 3000);
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.response.data.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <>
            <Formik
                initialValues={{
                    newpassword: '',
                    confirmnewpassword: '',

                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    newpassword: Yup.string()
                        .max(255)
                        .required('New Password is required')
                        .matches(
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                            'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character!'
                        ),
                    confirmnewpassword: Yup.string()
                        .oneOf([Yup.ref('newpassword'), null], 'Passwords must match')
                        .required('Confirm Password is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        if (scriptedRef.current) {
                            setStatus({ success: true });
                            setSubmitting(false);

                            resetPassword(values.newpassword);
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
                            error={Boolean(touched.confirmnewpassword && errors.confirmnewpassword)}
                            sx={{ ...theme.typography.customInput, mt: 2 }}
                        >
                            <InputLabel htmlFor="outlined-adornment-confirm-password-login">Confirm New Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-confirm-password-login"
                                type={showPassword ? 'text' : 'password'}
                                value={values.confirmnewpassword}
                                name="confirmnewpassword"
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
                                label="Confirm New Password"
                                inputProps={{}}
                            />
                            {touched.confirmnewpassword && errors.confirmnewpassword && (
                                <FormHelperText error id="standard-weight-helper-text-confirm-password-login">
                                    {errors.confirmnewpassword}
                                </FormHelperText>
                            )}
                        </FormControl>

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
                                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Reset Password'}
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default FirebaseLogin;

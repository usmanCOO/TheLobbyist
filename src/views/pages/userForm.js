import { useState } from 'react';
import { TextField, Button, Grid } from '@material-ui/core';
import { useNavigate, useLocation } from 'react-router-dom';
import { Avatar, Box, Container, CssBaseline, Typography } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { getRole, signUp } from 'AxiosInstance';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useMemo } from 'react';
// import { Navigate } from 'react-router-dom';

const UserForm = () => {
     const Navigate = useNavigate();
    const theme = createTheme();
    const location = useLocation();
    const [role, setRole] = useState({});
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [check, setCheck] = useState(false);
    const id = location.pathname.split('/')[2];

    const fetchRole = async () => {
        getRole(id)
            .then((res) => {
                console.log('getting the role of user ');
                console.log(res);
                if (res.status === 200) {
                    setRole(res.data.user);
                    console.log('get data here ', res.data.user);
                }
            })
            .catch((error) => {
                console.log(' getting the role error  ', error);
            });
    };

    useEffect(() => {
        fetchRole();
    }, []);

    const FullName = useMemo(() => {
        console.log('computing fullName...');
        return `${firstName} ${lastName}`;
    }, [firstName, lastName]);

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setPasswordError('');
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
        setConfirmPasswordError('');
    };

    const validatePassword = () => {
        if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters long');
        } else {
            setPasswordError('');
        }
    };

    const validateConfirmPassword = () => {
        if (confirmPassword !== password) {
            setConfirmPasswordError('Passwords do not match');
        } else {
            setConfirmPasswordError('');
            setCheck(true);
        }
    };

    const [fullNameValid, setFullNameValid] = useState(false);

    useEffect(() => {
        if (FullName.trim() !== '') {
            setFullNameValid(true);
        } else {
            setFullNameValid(false);
        }
    }, [FullName]);
    const handleSignUp = (e) => {
        e.preventDefault();
        console.log('handleSignUp: ', role.email, role.role, FullName, password);
        try {
            if (fullNameValid && password && check === true) {
                signUp(role.email, role.role, FullName, password)
                    .then((res) => {
                        console.log('response maessage ');
                        Navigate('/login');
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
                     //   Navigate('/login');
                    })
                    .catch((error) => {
                        Navigate('/login');
                        console.log('error ', error);
                        toast.error(error.response.data.message, {
                            position: 'top-right',
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: 'dark'
                        });
                      
                    });
            } else {
                if (check === false) {
                    toast.error('Password and Confirm Password must be same', {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light'
                    });
                } else {
                    toast.error(" Name or Password can't be empty ", {
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
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <form>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>

                        <Box component="form" noValidate sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={6} alignItems="center">
                                    <TextField
                                        variant="outlined"
                                        disabled
                                        id="outlined-disabled"
                                        value={role.email}
                                        label="Email"
                                        InputProps={{
                                            style: {
                                                color: 'black'
                                            }
                                        }}
                                        InputLabelProps={{ shrink: true, style: { color: 'grey[500]' } }}
                                    />
                                </Grid>
                                <Grid item xs={6} alignItems="center">
                                    <TextField
                                        disabled
                                        id="outlined-disabled"
                                        variant="outlined"
                                        value={role.role}
                                        label="Role"
                                        InputProps={{
                                            style: {
                                                color: 'black'
                                            }
                                        }}
                                        InputLabelProps={{ shrink: true, style: { color: 'grey[500]' } }}
                                    />
                                </Grid>
                                <Grid item xs={6} alignItems="center">
                                    <TextField
                                        variant="outlined"
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        value={firstName}
                                        onChange={(e) => {
                                            setFirstName(e.target.value);
                                        }}
                                    />{' '}
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                        value={lastName}
                                        onChange={(e) => {
                                            setLastName(e.target.value);
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        variant="outlined"
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        onBlur={validatePassword}
                                        error={!!passwordError}
                                        helperText={passwordError}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        variant="outlined"
                                        name="ConfirmPassword"
                                        label="ConfirmPassword"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                        onBlur={validateConfirmPassword}
                                        error={!!confirmPasswordError}
                                        helperText={confirmPasswordError}
                                    />
                                </Grid>
                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{  
                                        width: '100px', // Adjust the width to your desired value
                                        height: '50px', }}
                                    type="submit"
                                    onClick={handleSignUp}
                                    color="primary"
                                >
                                    {' '}
                                    SIGN UP{' '}
                                </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>{' '}
        </form>
    );
};

export default UserForm;

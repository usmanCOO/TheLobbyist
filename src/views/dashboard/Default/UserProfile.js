import { Label } from '@mui/icons-material';
import { Button, CircularProgress, FormControl, Grid, IconButton, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import { display } from '@mui/system';
import { UpdateProfile } from 'AxiosInstance';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import userContext from 'userContext';
import { useContext } from 'react';
import { getUserDetails } from 'AxiosInstance';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import AnimateButton from 'ui-component/extended/AnimateButton';

const UserProfile = () => {
    const userName = useSelector((state) => state.currentUser);
    console.log('userName', userName);
    const theme = useTheme();
    // const [fullName, setFullName] = useState(userName.userData.user.fullName);
    const { fullName, setFullName } = useContext(userContext);
    const { profileImg, setProfileImg } = useContext(userContext);
    const { user, setUser } = useContext(userContext);
    console.log('user', user);
    console.log('profileImg', profileImg);
    console.log('fullName', fullName);
    const navigate = useNavigate();
    const [count, setCount] = useState(0);
    const [file, setFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        console.log(e.target.files[0]);
        if (e.target.files) {
            setFile(e.target.files[0]);
            setIsFilePicked(true);
            const image = e.target.files[0];
            if (image) {
                console.log('file', image);
                const reader = new FileReader();

                reader.onload = function (e) {
                    setImagePreview(e.target.result);
                };

                reader.readAsDataURL(image);
            } else {
                setImagePreview(null);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (file) {
            setLoading(true);
            const formData = new FormData();
            formData.append('fullName', fullName);
            formData.append('profileImg', file);
            UpdateProfile(formData)
                .then((res) => {
                    setCount(count + 1);
                    console.log('res in api', res);
                    const storedUserData = JSON.parse(localStorage.getItem('userData'));

                    // Update name and profileImg fields
                    storedUserData.user.fullName = res.data.user.fullName;
                    storedUserData.user.profileImg = res.data.user.profileImg;

                    // Update userData in localStorage
                    localStorage.setItem('userData', JSON.stringify(storedUserData));
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

                    fetchUser().then(() => {
                        navigate('/dashboard/default');
                    });
                })
                .catch((err) => {
                    console.log('err', err);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            toast.error('No file Selected', {
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
    };
    console.log('user id', userName.userData.user.id);
    const fetchUser = async () => {
        console.log('count', count);
        getUserDetails(userName.userData.user.id)
            .then((res) => {
                setProfileImg(res?.data?.User[0]?.profileImg);
                console.log('user data images ', res?.data?.User[0]?.profileImg);
            })
            .catch((error) => {
                console.log('error in getting user', error);
            });
    };

    useEffect(() => {
        fetchUser();
    }, [count]);

    const cards = {
        width: '500px',
        height: '400px',
        padding: '15px',
        margin: 'auto',

        display: 'flex',
        justifyContent: 'center',
        animation: 'open .5s'
    };

    return (
        <>
            <Card style={cards}>
                <CardContent>
                    <Grid container spacing={3} justify="center">
                        <Grid item xs={12}>
                            <Typography variant="h2" align="center">
                                User Profile
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <form onSubmit={handleSubmit}>
                                <Grid container justifyContent="center" alignItems="center">
                                    <Grid item xs={12} container justifyContent="center">
                                        <FormControl sx={{ ...theme.typography.customInput }}>
                                            <InputLabel htmlFor="outlined-adornment-email-login">FullName</InputLabel>
                                            <OutlinedInput
                                                type="text"
                                                value={fullName}
                                                name="fullName"
                                                onChange={(e) => {
                                                    const inputValue = e.target.value
                                                        .replace(/[^a-zA-Z\s]/g, '')
                                                        .replace(/\s{2,}/g, ' ')
                                                        .substring(0, 32);
                                                    setFullName(inputValue);
                                                }}
                                                label="fullName"
                                                inputProps={{}}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Grid container justifyContent="center" alignItems="center">
                                            <Grid item>
                                                <div>
                                                    <label htmlFor="profile-image-upload">
                                                        {imagePreview ? (
                                                            <img
                                                                src={imagePreview}
                                                                alt="ProfileImage"
                                                                style={{
                                                                    width: '100px',
                                                                    height: '100px',
                                                                    borderRadius: '50%',
                                                                    cursor: 'pointer'
                                                                }}
                                                            />
                                                        ) : (
                                                            <div
                                                                style={{
                                                                    width: '100px',
                                                                    height: '100px',
                                                                    borderRadius: '50%',
                                                                    backgroundColor: '#e0e0e0',
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    cursor: 'pointer'
                                                                }}
                                                            >
                                                                <CameraAltIcon style={{ color: '#888888', fontSize: '2rem' }} />
                                                            </div>
                                                        )}
                                                    </label>
                                                    <input
                                                        id="profile-image-upload"
                                                        type="file"
                                                        accept="image/*"
                                                        multiple
                                                        onChange={handleFileChange}
                                                        style={{ display: 'none' }}
                                                    />
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12} container justifyContent="center" alignItems="center" style={{ paddingTop: '10px' }}>
                                        <Box sx={{ mt: 2 }}>
                                            <AnimateButton>
                                                <Button
                                                    size="large"
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                    // onClick = { () => {console.log(`values is ${values.email} and ${values.password}`)}}
                                                    typeof="submit"
                                                >
                                                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
                                                </Button>
                                            </AnimateButton>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    );
};

export default UserProfile;

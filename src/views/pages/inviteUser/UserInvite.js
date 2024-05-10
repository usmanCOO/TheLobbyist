import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { sendInvite } from 'AxiosInstance';
import { toast } from 'react-toastify';
import {
    Button,
    Card,
    CardContent,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField
} from '@mui/material';
import { Box } from '@mui/material';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const InviteUser = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const theme = useTheme();
    const [loading, setLoading] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        // validate email format using regex
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailError(!regex.test(e.target.value));
    };

    const [roleAssigned, setRoleAssigned] = useState('');

    const inviteUserAdmin = (e) => {
        setLoading(true);
        e.preventDefault();

        console.log('email ', e.target.value);
        console.log('btn is clicked');

        try {
            console.log('Api options are ', email, roleAssigned);
            sendInvite(email, roleAssigned)
                .then((res) => {
                    console.log('success ', res.data.message);
                    if (res.data.status == true) {
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
                    console.log('error ', error);
                })
                .finally(() => {
                    setLoading(false);
                });
        } catch (err) {}
    };
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        padding: '20px'
    };

    const cardStyle = {
        width: '450px',
        height: 'auto',
        padding: '15px'
    };

    return (
        <>
            <div>
                <Box style={containerStyle}>
                    <Card style={cardStyle}>
                        <CardContent>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '10px',
                                    maxWidth: '300px',
                                    margin: '0 auto' // Center align the Box horizontally
                                }}
                            >
                                <h2 sx={{ textAlign: 'center', margin: 0 }}>Invite User</h2>{' '}
                                <form>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', height: '100%' }}>
                                        <Box sx={{ display: 'flex', gap: '20px', height: '100%', alignItems: 'center' }}>
                                            <FormControl variant="outlined" sx={{ ...theme.typography.customInput, height: '100%' }}>
                                                <InputLabel htmlFor="outlined-adornment-email-login">Email Address</InputLabel>
                                                <OutlinedInput
                                                    type="email"
                                                    value={email}
                                                    name="email"
                                                    error={emailError}
                                                    helperText={emailError ? 'Invalid email format' : ''}
                                                    variant="outlined"
                                                    onChange={handleEmailChange}
                                                    label="Email"
                                                    inputProps={{}}
                                                    style={{
                                                        height: '60px'
                                                    }}
                                                />
                                            </FormControl>
                                            <FormControl sx={{ minWidth: 100, height: '100%' }}>
                                                <InputLabel id="demo-simple-select-label">Mode</InputLabel>
                                                <Select
                                                    label="Role"
                                                    name="role"
                                                    style={{ height: '60px' }}
                                                    value={roleAssigned}
                                                    onChange={(e) => setRoleAssigned(e.target.value)}
                                                >
                                                    <MenuItem value="user">User</MenuItem>
                                                    <MenuItem value="admin">Admin</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Box>
                                        <Button variant="contained" type="submit" onClick={inviteUserAdmin}>
                                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
                                        </Button>
                                    </Box>
                                </form>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </div>
        </>
    );
};

export default InviteUser;

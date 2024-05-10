import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthLogin from '../auth-forms/AuthLogin';
import Logo from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';
import favicon from 'assets/images/favicon.png';
// assets

//   AUTH3 - LOGIN ||================================ //

const Login = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    const loggedIn = useSelector((state) => state.currentUser.loggedIn);
    return loggedIn ? (
        <Navigate to="/" />
    ) : (
        <AuthWrapper1 >
            <Grid container direction="column" justifyContent="flex-end"  > 
                
                    <Grid container justifyContent="center" alignItems="center" >
                        
                            <AuthCardWrapper>
                                <Grid container alignItems="center" justifyContent="center">
                                    <Grid
                                    style={
                                        {
                                            // backgroundColor: "black",
                                        }
                                    }
                                    >
                                       
                                        <img  draggable={false} src={favicon} alt="The Lobbyist" width="200" />
                                        
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid
                                            container
                                            direction={matchDownSM ? 'column-reverse' : 'row'}
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Grid item>
                                                <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                    <h2>Welcome Back</h2>
                                                    <Typography>
                                                    Enter your credentials to continue

                                                    </Typography>
                                                        
                                                    
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <AuthLogin />
                                    </Grid>
                                    
                                   
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
               
                <Grid item xs={12} >
                    <AuthFooter />
                </Grid>
       
        </AuthWrapper1>
    );
};

export default Login;

import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase } from '@mui/material';

// project imports
import LogoSection from '../LogoSection';
import SearchSection from './SearchSection';
import ProfileSection from './ProfileSection';
// import NotificationSection from './NotificationSection';
import BeforeLogin from './BeforeLogin/NotificationListBL';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

// assets
import { IconMenu2 } from '@tabler/icons';
import { useState } from 'react';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {

    const [LoggedIn,setLoggedIn] = useState(false);
    const logindata = localStorage.getItem('token');  
    //console.log(`logindata is ${localStorage.getItem('token')}`);



    useEffect ( () => {
        if(logindata){
            setLoggedIn(true);
        }else{
            setLoggedIn(false);
        }
    },[logindata])
    


    const theme = useTheme();

    return (
        <>
            {/* logo & toggler button */}
            <Box
                sx={{
                    width: 228,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            >
                <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                    <LogoSection />
                </Box>
                <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: 'all .2s ease-in-out',
                            background: theme.palette.secondary.main,
                            color: theme.palette.secondary.light,
                            '&:hover': {
                                background: theme.palette.secondary.light ,
                                color: theme.palette.secondary.main
                            }
                        }}
                        onClick={handleLeftDrawerToggle}
                        color="inherit"
                    >
                        <IconMenu2 stroke={1.5} size="1.3rem" />
                    </Avatar>
                </ButtonBase>
            </Box>

            {/* header search */}
            {/* <SearchSection /> */}
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 1 }} />

            {/* notification & profile */}
            {/* <NotificationSection /> */}
            <ProfileSection />
        </>
    );


};

Header.propTypes = {
    handleLeftDrawerToggle: PropTypes.func
};

export default Header;

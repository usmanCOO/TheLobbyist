import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';

// third-party
import Chart from 'react-apexcharts';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ChartDataMonth from './chart-data/total-order-month-line-chart';
import ChartDataYear from './chart-data/total-order-year-line-chart';

// assets
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useEffect } from 'react';
import { totalGame } from 'AxiosInstance';

const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.primary.dark,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&>div': {
        position: 'relative',
        zIndex: 5
    },
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.primary[800],
        borderRadius: '50%',
        zIndex: 1,
        top: -85,
        right: -95,
        [theme.breakpoints.down('sm')]: {
            top: -105,
            right: -140
        }
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        zIndex: 1,
        width: 210,
        height: 210,
        background: theme.palette.primary[800],
        borderRadius: '50%',
        top: -125,
        right: -15,
        opacity: 0.5,
        [theme.breakpoints.down('sm')]: {
            top: -155,
            right: -70
        }
    }
}));

// ==============================|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||============================== //

const TotalOrderLineChartCard = () => {
    const theme = useTheme();
    const [totalGames, setTotalGames] = useState(0);
    const fetchTotalGames = async () => {
        totalGame()
            .then((res) => {
                console.log('total games ', res.data.data);
                setTotalGames(res.data.data);
                console.log('total games in month ', totalGames);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        fetchTotalGames();
    }, []);

    const [timeValue, setTimeValue] = useState(false);
    const handleChangeTime = (event, newValue) => {
        setTimeValue(newValue);
    };

    return (
        <>
            <CardWrapper border={false} content={false}>
                <Box sx={{ p: 2.25 }}>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item alignItems="center">
                            <Avatar
                                variant="rounded"
                                sx={{
                                    ...theme.typography.commonAvatar,
                                    ...theme.typography.largeAvatar,
                                    backgroundColor: theme.palette.primary[800],
                                    color: '#fff',
                                    mt: 1
                                }}
                            >
                               <SportsEsportsIcon />
                            </Avatar>
                        </Grid>
                        <Grid item alignItems="center">
                            <Button
                                disableElevation
                                variant={timeValue ? 'contained' : 'text'}
                                size="small"
                                sx={{ color: 'inherit' }}
                                onClick={(e) => handleChangeTime(e, true)}
                            >
                                Month
                            </Button>
                            <Button
                                disableElevation
                                variant={!timeValue ? 'contained' : 'text'}
                                size="small"
                                sx={{ color: 'inherit' }}
                                onClick={(e) => handleChangeTime(e, false)}
                            >
                                Weekly
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item sx={{ mb: 0.75 }}>
                        <Grid container alignItems="center">
                            <Grid item xs={6}>
                                <Grid container alignItems="center">
                                    <Grid item>
                                        <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                                            {timeValue ? totalGames?.monthlyGames : totalGames?.weeklyGames}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography
                                            sx={{
                                                fontSize: '1rem',
                                                fontWeight: 500,
                                                color: theme.palette.primary[200],
                                                color: 'white'
                                            }}
                                        >
                                            Games Played
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </CardWrapper>
        </>
    );
};

export default TotalOrderLineChartCard;

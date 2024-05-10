import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Button, CardActions, CardContent, Divider, Grid, Menu, MenuItem, Paper, Table, TableCell, TableContainer, TableRow, Typography ,TableBody, TableHead  } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// project imports
import BajajAreaChartCard from './BajajAreaChartCard';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { topQuestionPlayed } from 'AxiosInstance';

import { useEffect } from 'react';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const PopularCard = ({ isLoading }) => {
    const [questionData, setQuestionData] = useState([]);

    const fecthQuestionData = async () => {
        topQuestionPlayed()
            .then((result) => {
                console.log("top 5 question ", result.data.data);
                setQuestionData(result.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        fecthQuestionData();
    }, []);


    return (
        <>
            {isLoading ? (
                <SkeletonPopularCard />
            ) : (
                <MainCard content={false}>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid container alignContent="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="h4">Games Record </Typography>
                                    </Grid>
                                  
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sx={{ pt: '16px !important' }}>
                                <BajajAreaChartCard />
                            </Grid>
                            <Grid Grid item xs={12} sx={{ pt: '16px !important' }}>
                            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography
                        style={{
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: '#000',
                            textTransform: 'capitalize',
                            fontFamily: `'Roboto', sans-serif`
                        }}
                    >
                        Top Five Question Played
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 200 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 'bold' }}> Code</TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }}> Count</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {questionData?.map((row) => (
                                    <TableRow key={row.question_id}>
                                        <TableCell   >
                                            {row.question_code}
                                        </TableCell>
                                        <TableCell  align='center'>{row.question_count}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </AccordionDetails>
            </Accordion>
                                </Grid>
                        </Grid>
                    </CardContent>
                  
                </MainCard>
            )}
        </>
    );
};

PopularCard.propTypes = {
    isLoading: PropTypes.bool
};

export default PopularCard;

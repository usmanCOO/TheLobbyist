import { useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Card,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
    TableBody,
    TableHead
} from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import chartData from './chart-data/bajaj-area-chart';
import { topCardPlayed } from 'AxiosInstance';
import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// ===========================|| DASHBOARD DEFAULT - BAJAJ AREA CHART CARD ||=========================== //

const BajajAreaChartCard = () => {
    const [data, setData] = useState([]);

    const fecthCards = async () => {
        topCardPlayed()
            .then((result) => {
                console.log(result.data.data);
                setData(result.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        fecthCards();
    }, []);

    console.log('data', data);
    return (
        <>
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
                        Top Five Cards Played
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 200 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }}>Count</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row) => (
                                    <TableRow key={row.card_id}>
                                        <TableCell >
                                            {row.card_name}
                                        </TableCell>
                                        <TableCell align='center'>{row.card_count}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </AccordionDetails>
            </Accordion>
        </>
    );
};

export default BajajAreaChartCard;

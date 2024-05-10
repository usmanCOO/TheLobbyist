import { Grid, Paper, Table, TableCell, TableContainer, TableRow, TextField } from '@mui/material';
import { getPackAnalytics, getQuestionAnalytics } from 'AxiosInstance';
import { object } from 'prop-types';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router';

const PackAnalytics = () => {
    const location = useLocation();
    const { prop1 } = location.state;

    const [count, setCount] = useState(0);

    console.log('roter prop', prop1);
    const [packData, setPackData] = useState([
        {
            code: prop1?.pack_id,
            name: prop1?.pack_name,
            id: prop1.id
        }
    ]);

    const [games, setGames] = useState('');
    const [timePlayed, setTimePlayed] = useState(0);
    // var temp = 0

    const fetchPackAnalysis = async () => {
        console.log('packData', prop1.id);
        getPackAnalytics(prop1.id)
            .then((res) => {
                console.log('getting all Records ');
                console.log(res);
                if (res.status === 200) {
                    console.log('data', res.data.packRecord);
                    setGames(res?.data?.packRecord);
                    setCount(count + 1);
                    console.log(count);
                }
            })
            .catch((error) => {
                console.log('error in getting all Records ', error);
            });
    };

    const [keys, setKeys] = useState([]);
    const [values, setValues] = useState([]);

    useEffect(() => {
        fetchPackAnalysis();
    }, []);

    useEffect(() => {
        console.log('games', games);
        if (games) {
            let keyssss = Object.keys(games?.players);
            let valuesss = Object.values(games?.players);

            const sum = valuesss.reduce((partialSum, a) => partialSum + a, 0);

            setTimePlayed(sum);

            setKeys(keyssss);
            setValues(valuesss);

            console.log('games keys', values);
        }
    }, [count]);

    console.log('errrrrrrrrrrrrr', games);

    const percentage = values?.map((e) => ((e / timePlayed) * 100).toFixed(2) + '%');
    console.log(percentage);
    values?.map((e) => console.log('eeeeeeeeeeeeee', e / timePlayed));

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'white',
                paddingLeft: '10px',
                width: '100%',
                padding: '20px',
                paddingTop: '20px'
            }}
        >
            <h2 style={{ textAlign: 'center' }}>Pack Analytics</h2>
            <Grid container spacing={4}>
                <Grid item xs={9} sm={9}>
                    <TextField
                        inputProps={{
                            style: {
                                height: 20
                            }
                        }}
                        InputLabelProps={{
                            style: {
                                color: 'grey[500]'
                            }
                        }}
                        sx={{
                            width: 50,
                            height: 20
                        }}
                        type={'text'}
                        label={'Code'}
                        variant="standard"
                        value={packData[0]?.code ? packData[0]?.code : ''}
                    />
                </Grid>

                <Grid item xs={9} sm={9}>
                    <TextField
                        type={'text'}
                        label={'Name'}
                        variant="standard"
                        value={packData[0]?.name ? packData[0]?.name : ''}
                        InputLabelProps={{
                            style: {
                                color: 'grey[500]'
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={3} sm={3}>
                    <TextField
                        InputLabelProps={{
                            style: {
                                color: 'grey[500]'
                            }
                        }}
                        inputProps={{
                            style: {
                                height: 20
                            }
                        }}
                        type={'text'}
                        label={'Times Played'}
                        variant="standard"
                        value={timePlayed}
                    />
                </Grid>

                <Grid item xs={9} sm={9}></Grid>

                <Grid item xs={12} sm={12} style={{
                    paddingBottom: '30px' 
                }}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableRow style={{ fontWeight: 'bold' }}>
                                <TableCell></TableCell>
                                {keys.map((key, index) => (
                                    <TableCell style={{ fontWeight: 'bold' }}>{key}</TableCell>
                                ))}
                            </TableRow>

                            <TableRow>
                                <TableCell style={{ fontWeight: 'bold' }}>Games Played</TableCell>
                                {values.map((value, index) => (
                                    <TableCell style={{ fontWeight: 'bold' }}>{value}</TableCell>
                                ))}
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ fontWeight: 'bold' }}>Average Qs Per Game</TableCell>
                                {percentage.map((value, percentage) => (
                                    <TableCell key={value}> {value}</TableCell>
                                ))}
                            </TableRow>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </div>
    );
};

export default PackAnalytics;

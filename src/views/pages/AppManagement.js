import {
    Button,
    Grid,
    Table,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
    TableBody,
    TableHead,
    IconButton,
    Menu,
    Paper,
    ListItem,
    Modal
} from '@mui/material';
import { Box, borderRadius } from '@mui/system';
import { WinningCriteria, getRoundTime, getWinnigVotes, updateRoundTime } from 'AxiosInstance';
import { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import { useState } from 'react';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { toast } from 'react-toastify';
import Criteria from 'views/utilities/Criteria';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    root: {
        overflow: 'auto',
        '&::-webkit-scrollbar': {
            width: '0.4em',
            background: 'transparent'
        },
        '&::-webkit-scrollbar-thumb': {
            background: 'transparent'
        }
    }
}));

const AppManagement = () => {
    const classes = useStyles();
    const [timerId, setTimerId] = useState('');
    const [timerTime, setTimerTime] = useState('');
    const [count, setCount] = useState(0);
    const [Votes, setVotes] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedPlayer, setSelectedPlayer] = useState();
    const [openEdit, setOpenEdit] = useState(false);
    const [open, setOpen] = useState(false);
    const [previousTimerTime, setPreviousTimerTime] = useState('');
    const [loading, setLoading] = useState(false);

    const handleEdit = () => {
        console.log('handleEdit called');
        setOpenEdit(false);
        console.log('handleEdit called', selectedPlayer);
        setCount(count + 1);
    };
    const fetchTime = async () => {
        getRoundTime()
            .then((res) => {
                console.log('getting time ');
                console.log(res);
                setTimerId(res?.data?.roundtime[0]?.id);
                setTimerTime(res?.data?.roundtime[0]?.round_time);
                setPreviousTimerTime(res?.data?.roundtime[0]?.round_time);
            })
            .catch((error) => {
                console.log('error in getting all time ', error);
            });
    };
    useEffect(() => {
        fetchTime();
        console.log('timerId ', timerId);
    }, [count]);

    const fetchVotes = async () => {
        setLoading(true);
        getWinnigVotes()
            .then((res) => {
                console.log('getting all data  ');
                console.log(res);

                if (res.status === 200) {
                    setVotes(res.data.votes);
                }
            })
            .catch((error) => {
                console.log('error in getting all Votes data ', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    useEffect(() => {
        fetchVotes();
    }, [count]);

    const handleClosed = () => {
        setAnchorEl(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('timerTime', timerTime);
        console.log('previousTimerTime', previousTimerTime);
        if (timerTime === previousTimerTime) {
            toast.success("The Value of time hasn't Change", {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light'
            });
            // If the value of timerTime has not changed, return without making the API call
            return;
        }
        console.log('timerrrrrr ', timerId);

        try {
            updateRoundTime(timerId, timerTime)
                .then((res) => {
                    console.log('success ', res);
                    if (res?.data?.status) {
                        toast.success(res?.data?.message, {
                            position: 'top-right',
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: 'light'
                        });
                        setCount(count + 1);
                        setPreviousTimerTime(timerTime);
                    }
                })
                .catch((error) => {
                    console.log('error ', error);
                    toast.error(error.response.data.message, {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light'
                    });
                });
        } catch (err) {
            console.log(err);
        }
    };
    const handleTimerChange = (e) => {
        setTimerTime(e.target.value);
    };

    return (
        <>
            {!loading ? (
                <div style={{ height: 'auto', maxHeight: 'calc(100vh - 190px)', width: '100' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <h2
                            style={{
                                color: '#000000'
                            }}
                        >
                            App Management
                        </h2>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <TextField
                                sx={{
                                    width: '200px',
                                    height: '48px',
                                    marginRight: '10px'
                                }}
                                InputProps={{
                                    style: { fontWeight: 'bold' }
                                }}
                                InputLabelProps={{ shrink: true, style: { color: 'grey[500]' } }}
                                variant="outlined"
                                label="Round Time"
                                name="round_time"
                                value={timerTime}
                                onChange={handleTimerChange}
                            />
                            <Button onClick={handleSubmit} variant="contained" color="primary" style={{ height: '40px', width: 100 }}>
                                submit
                            </Button>
                        </div>
                    </div>
                    <TableContainer
                        component={Paper}
                        className={classes.root}
                        sx={{ height: 'auto', maxHeight: 'calc(100vh - 220px)', width: '100' }}
                    >
                        <Table aria-label="sticky table" stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 'bold' }}>ID</TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }}>No of Players</TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }}>Votes</TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }}>Action</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {Votes?.map((row) => (
                                    <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell>{row.id}</TableCell>
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}
                                        >
                                            {row.no_players} Players
                                        </TableCell>

                                        <TableCell>{row.winning_criteria} Votes</TableCell>
                                        <TableCell>
                                            <IconButton
                                                onClick={(event) => {
                                                    setAnchorEl(event.currentTarget);
                                                    console.log(row);
                                                    setSelectedPlayer(row);
                                                }}
                                            >
                                                <MoreVertOutlinedIcon />
                                            </IconButton>{' '}
                                            <Menu
                                                PaperProps={{ elevation: 1.2 }}
                                                anchorEl={anchorEl}
                                                open={Boolean(anchorEl)}
                                                onClose={handleClosed}
                                            >
                                                <ListItem
                                                    align="right"
                                                    sx={{
                                                        cursor: 'pointer',
                                                        '&:hover': {
                                                            backgroundColor: 'rgba(150, 122, 251, 0.1)' // Customize the background color on hover
                                                        }
                                                    }}
                                                    onClick={() => {
                                                        handleClosed();
                                                        setOpenEdit(true);
                                                    }}
                                                >
                                                    {' '}
                                                    Edit
                                                </ListItem>
                                            </Menu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {openEdit && <Criteria handleEdit={handleEdit} selectedPlayer={selectedPlayer} />}
                </div>
            ) : (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '220px' }}>
                    <CircularProgress size={48} color="inherit" />
                </div>
            )}
        </>
    );
};

export default AppManagement;

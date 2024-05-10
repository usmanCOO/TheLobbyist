import {
    Button,
    CircularProgress,
    Grid,
    ListItem,
    Menu,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from '@mui/material';
import { archivePack, deletePack, getPackList, getPackQuestions, trainModel, unArchivePack } from 'AxiosInstance';
import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { toast } from 'react-toastify';
import PackEdit from './PackEdit';
import { useNavigate } from 'react-router-dom';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import PackAnalytics from './PackAnalytics';
import PackCreation from './packCreation';
import { Box } from '@mui/system';
import PackDetail from './PackDetail';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';

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

const PackList = () => {
    const classes = useStyles();
    const [packList, setPackList] = useState([]);
    const [count, setCount] = useState(0);
    const [selectedPack, setSelectedPack] = useState();
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openDetails, setOpenDetails] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const Navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [openArchiveModal, setOpenArchiveModal] = useState(false);
    const [question, setQuestion] = useState([]);
    const [loading, setLoading] = useState(false);

    const user = useSelector((state) => state.currentUser);
    console.log('userName', user);
    const handleEdits = () => {
        console.log('handleEdit called');
        setOpenEdit(false);
        console.log('handleEdit called', selectedPack);
        setCount(count + 1);
    };
    const handleOpenDetails = () => {
        setOpenDetails(false);
        console.log('handleOpenDetails called', selectedPack);
    };

    const handleOpenEdit = () => {
        setOpen(false);
        setCount(count + 1);
    };

    const handleOpenAnalytics = (data) => {
        Navigate('/utils/PackAnalytics', { state: { prop1: data } });
    };

    const fetchPackList = async () => {
        setLoading(true);
        getPackList()
            .then(async (res) => {
                console.log('getting all packs ');
                console.log(res);
                if (res.status === 200) {
                    setPackList(res.data.packs);
                    console.log('get data packs', res.data.packs);
                }
            })
            .catch((error) => {
                console.log('error in getting all packs ', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    useEffect(() => {
        fetchPackList();
    }, [count]);
    const handleDelete = (id) => {
        console.log('handleDelete called');
        console.log('id is ', id);

        const packToDelete = packList.find((pack) => pack.id === id);
        console.log('packToDelete', packToDelete);
        if (!packToDelete) {
            toast.error('Pack not found', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light'
            });

            return;
        }
        if (packToDelete.mode === 'LIVE' && user?.userData?.user?.role_id === 1) {
            console.log('packToDelete', packToDelete.id);
            archivePack(packToDelete.id).then((res) => {
                console.log('archived scuccess', res.data.message);
                alert("Pack is Live so it's archived");
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
                setCount(count + 1);
            });
            return;
        }
        if (packToDelete.mode !== 'LIVE' && user?.userData?.user?.role_id === 1) {
            deletePack(id)
                .then((res) => {
                    console.log('deleted scuccess', res.data.message);
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
                    setCount(count + 1);
                })
                .catch((error) => {
                    console.log('error ', error);
                });
        } else {
            toast.error('You are not authorized to delete this pack', {
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
    const handleOpenArchiveModal = () => {
        setOpenArchiveModal(true);
    };

    const handleCloseArchiveModal = () => {
        setOpenArchiveModal(false);
    };
    const handleUnarchive = (id) => {
        console.log('handleUnarchive called');
        console.log('id is ', id);
        unArchivePack(id)
            .then((res) => {
                console.log('unarchived scuccess', res.data.message);
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
                setCount(count + 1);
            })
            .catch((error) => {
                console.log('error ', error);
            });
    };
    const cardStyles = {
        background: 'white',
        color: 'white'
    };

    const handleClosed = () => {
        setAnchorEl(null);
    };
    const boxStyle = {
        position: 'relative',
        overflowY: 'scroll',
        top: '50%',
        left: '50%',
        height: '70vh',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 3,
        paddingTop: '10px',
        paddingBottom: '10px'
    };
    const handleTrainModel = async () => {
        trainModel()
            .then((res) => {
                console.log('trainModel scuccess', res.data.message);
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
            })
            .catch((error) => {
                console.log('error ', error);
            });
    };

    useEffect(() => {
        console.log('question in useEffect', question);
    }, [question]);

    return (
        <div>
            {!loading ? (
                <>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            position: 'static',
                            marginBottom: '10px'
                        }}
                    >
                        <h2
                            style={{
                                color: '#000000'
                            }}
                        >
                            Pack List
                        </h2>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <TextField
                                label="Search Packs"
                                variant="outlined"
                                value={searchQuery}
                                onChange={(event) => setSearchQuery(event.target.value)}
                                style={{ width: '160px', height: '48px', marginRight: '10px' }}
                            />
                            <Button
                                onClick={() => handleTrainModel()}
                                variant="contained"
                                color="primary"
                                style={{ marginRight: '10px', height: '45px' }}
                            >
                                Train Model
                            </Button>
                            <Button
                                onClick={() => setOpen(true)}
                                variant="contained"
                                color="primary"
                                style={{ marginRight: '10px', height: '45px' }}
                            >
                                Create Pack
                            </Button>
                            <Button onClick={handleOpenArchiveModal} variant="contained" color="primary" style={{ height: '45px' }}>
                                Archive List
                            </Button>
                        </div>
                    </div>

                    {/*  sx={{ }} */}

                    <TableContainer
                        component={Paper}
                        sx={{ height: 'auto', maxHeight: 'calc(100vh - 190px)', width: '100' }}
                        className={classes.root}
                    >
                        <Table style={cardStyles} stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 'bold' }}>Id</TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }}>Pack Name</TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }}>Code</TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }}>No of Cards</TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }}>Mode</TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }}>Action</TableCell>
                                    {/* <TableCell style={{ fontWeight: 'bold' }}>Train Pack</TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {packList
                                    ?.filter(
                                        (row) =>
                                            (row.pack_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                                row.pack_id.toLowerCase().includes(searchQuery.toLowerCase())) &&
                                            row.isArchived === false
                                    )
                                    .map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.id}</TableCell>
                                            <TableCell>{row.pack_name}</TableCell>
                                            <TableCell>{row.pack_id}</TableCell>
                                            <TableCell>{row.no_cards}</TableCell>
                                            <TableCell>{row.mode}</TableCell>
                                            <TableCell>
                                                <IconButton
                                                    onClick={(event) => {
                                                        setAnchorEl(event.currentTarget);
                                                        setSelectedPack(row);
                                                    }}
                                                >
                                                    <MoreVertOutlinedIcon />
                                                </IconButton>{' '}
                                                <Menu
                                                    PaperProps={{ elevation: 0.9 }}
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
                                                        Edit
                                                    </ListItem>
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
                                                            handleDelete(selectedPack.id);
                                                        }}
                                                    >
                                                        {' '}
                                                        Delete
                                                    </ListItem>
                                                    <ListItem
                                                        sx={{
                                                            cursor: 'pointer',
                                                            '&:hover': {
                                                                backgroundColor: 'rgba(150, 122, 251, 0.1)' // Customize the background color on hover
                                                            }
                                                        }}
                                                        onClick={() => {
                                                            handleClosed();
                                                            handleOpenAnalytics(selectedPack);
                                                        }}
                                                    >
                                                        {' '}
                                                        Analytics
                                                    </ListItem>
                                                    <ListItem
                                                        sx={{
                                                            cursor: 'pointer',
                                                            '&:hover': {
                                                                backgroundColor: 'rgba(150, 122, 251, 0.1)' // Customize the background color on hover
                                                            }
                                                        }}
                                                        onClick={() => {
                                                            handleClosed();
                                                            setOpenDetails(true);
                                                        }}
                                                    >
                                                        {' '}
                                                        Details
                                                    </ListItem>
                                                </Menu>
                                            </TableCell>
                                            {/* <TableCell>
                                        <Grid>
                                        <Button
                                        onClick={() => {
                                            handleTrainModel(row);
                                                }}
                                                variant="contained"
                                                color="primary"
                                            >
                                                Train
                                                </Button>
                                                </Grid>
                                            </TableCell> */}
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            ) : (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '220px' }}>
                    <CircularProgress size={48} color="inherit" />
                </div>
            )}
            <Modal open={openArchiveModal} onClose={handleCloseArchiveModal}>
                <Box sx={boxStyle} style={{ padding: '10px' }}>
                    <h2
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        Archive List
                    </h2>
                    <TableContainer
                        component={Paper}
                        sx={{ height: 'auto', maxHeight: 'calc(100vh - 190px)', width: '100' }}
                        className={classes.root}
                    >
                        <Table style={cardStyles} stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Id</TableCell>
                                    <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Pack Name</TableCell>
                                    <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Code</TableCell>
                                    <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>No of Cards</TableCell>
                                    <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {packList
                                    ?.filter(
                                        (row) =>
                                            (row.pack_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                                row.pack_id.toLowerCase().includes(searchQuery.toLowerCase())) &&
                                            row.isArchived === true
                                    )
                                    .map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell style={{ textAlign: 'center' }}>{row.id}</TableCell>
                                            <TableCell style={{ textAlign: 'center' }}>{row.pack_name}</TableCell>
                                            <TableCell style={{ textAlign: 'center' }}>{row.pack_id}</TableCell>
                                            <TableCell style={{ textAlign: 'center' }}>{row.no_cards}</TableCell>
                                            <TableCell style={{ textAlign: 'center' }}>
                                                <IconButton onClick={() => handleUnarchive(row.id)}>
                                                    <UnarchiveOutlinedIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div style={{ marginTop: '10px', marginLeft: 650 }}>
                        <Button onClick={handleCloseArchiveModal} variant="contained" color="primary">
                            Close
                        </Button>
                    </div>
                </Box>
            </Modal>

            {openEdit && <PackEdit handleEdits={handleEdits} selectedPack={selectedPack} />}

            {openDetails && <PackDetail handleOpenDetails={handleOpenDetails} selectedPack={selectedPack} />}
            {open && <PackCreation handleOpenEdit={handleOpenEdit} />}
        </div>
    );
};

export default PackList;

import {
    Box,
    Button,
    IconButton,
    ListItem,
    Menu,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import QuestionAnalytics from './QuestionAnalytics';
import { AddQuestion, deleteQuestion, getAllQuestions } from 'AxiosInstance';
import { Grid, TextField } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { QuestionEditForm } from './QuestionEditForm';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { LogsDetail } from 'views/utilities/LogsDetail';
import ImageUploader from 'views/dashboard/ImageUploader';
import QuestionDetails from './QuestionDetails';
import { makeStyles } from '@mui/styles';
import AnimateButton from 'ui-component/extended/AnimateButton';
import CircularProgress from '@mui/material/CircularProgress';

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

const QuestionTable = () => {
    const classes = useStyles();

    const [ques, setQues] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(false);
    const [openDetails, setOpenDetails] = useState(false);
    const [openLogs, setOpenLogs] = useState(false);
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [option3, setOption3] = useState('');
    const [option4, setOption4] = useState('');
    const [option5, setOption5] = useState('');
    const [option6, setOption6] = useState('');
    const [imagePath, setImagePath] = useState([]);
    const [count, setCount] = useState(0);
    const [values, setValues] = useState({
        uniqueId: '',
        question: '',
        CorrectAnswer: '',
        funfact: '',
        comment: ''
    });
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadinButton, setLoadingButton] = useState(false);

    const handleOpenDetails = () => {
        setOpenDetails(false);
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        console.log('selectedQuestion', selectedQuestion);
        setOpen(false);
        setAnchorEl(null);
        setValues({ ...values, question: '', CorrectAnswer: '', funfact: '', uniqueId: '' });
        setOption1('');
        setOption2('');
        setOption3('');
        setOption4('');
        setOption5('');
        setOption6('');
    };

    const handleEdit = () => {
        console.log('handleEdit called');
        setOpenEdit(false);
        setCount(count + 1);
    };
    const handleOpenEdit = () => {
        console.log('handleOpenEdit called');
        setOpenLogs(false);
    };

    const navigate = useNavigate();
    const handleOpenAnalytics = (data) => {
        console.log('handleOpenAnalytics called');
        navigate('/questionAnalytics/default', { state: { prop1: data } });
    };

    const setImages = (images) => {
        setImagePath(images);
        console.log('imagePath', imagePath);
    };

    useEffect(() => {
        setImages();
    }, []);

    const handleDelete = (id) => {
        console.log('handleDelete called');
        console.log('id is ', id);

        deleteQuestion(id)
            .then((res) => {
                console.log('deleted scuccess', res);
                if (res.status === 200) {
                    toast.success(res.data.message);
                    // toast.success('You have to Train Modal Again');

                    setCount(count + 1);
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
    };

    let handleSubmit = async (e) => {
        e.preventDefault();
        console.log('handleSubmit called');
        const opt = [option1, option2, option3, option4, option5, option6].filter(Boolean);

        if (new Set(opt).size !== opt.length) {
            // Show an error message or perform any necessary action
            toast.error('Duplicate options found', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light'
            });
            console.log('Duplicate options found');
            return;
        }

        // Check if the correct answer is different from the options
        if (opt.includes(values.CorrectAnswer)) {
            // Show an error message or perform any necessary action
            toast.error('Correct answer should be different from the options', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light'
            });
            console.log('Correct answer should be different from the options');
            return;
        }

        console.log('imagePath', imagePath);
        let img = {
            card_image: imagePath
        };
        if (!img.card_image || img.card_image.length === 0) {
            toast.error('No image is Uploaded. Uplaod an Image', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light'
            });
            console.log('No images uploaded');
            return;
        }

        const updatedArray = img?.card_image?.map((card_image) => card_image.substring(card_image.lastIndexOf('/') + 1));
        const newData = [];
        
        for (let i = 0; i < updatedArray.length; i++) {
            const fileName = updatedArray[i];
            const images = {
                card_name: fileName,
                card_image: fileName,
                metadata: ''
            };
            newData.push(images);
        }
        // Options for the API
        const questionOpt = {
            options: [option1, option2, option3, option4, option5, option6]
        };
        console.log('newData is ', newData);

        console.log('*********', e.target.value);
        try {
            setLoadingButton(true);
            console.log('Api options are ', questionOpt);
            AddQuestion(values.question, questionOpt, values.funfact, newData, values.CorrectAnswer, values.uniqueId)
                .then((res) => {
                    console.log('success ', res);

                    toast.success('Question Added Successfully', {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light'
                    });
                    // toast.success('You have to Train Modal Again');

                    setValues({ ...values, question: '', CorrectAnswer: '', funfact: '', uniqueId: '' });
                    setOption1('');
                    setOption2('');
                    setOption3('');
                    setOption4('');
                    setOption5('');
                    setOption6('');
                    handleClose();
                    setCount(count + 1);
                })
                .catch((error) => {
                    toast.error(error.response.errors, {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light'
                    });
                    console.log('error ', error);
                })
                .finally(() => {
                    setLoadingButton(false);
                });
        } catch (err) {
            toast.error(err, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light'
            });
            console.log('errorr', err);
        }
    };

    const style = {
        position: 'relative',
        overflowY: 'scroll',
        top: '50%',
        left: '50%',
        height: '95%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        // border: '2px solid #000',
        // boxShadow: 24,
        padding: '20px'
    };

    const fetchQuestions = async () => {
        setLoading(true);
        getAllQuestions()
            .then((res) => {
                console.log('getting all questions ');
                console.log(res);
                if (res.status === 200) {
                    setQues(res.data.questions);
                    console.log('get data ', res.data.questions);
                }
            })
            .catch((error) => {
                console.log('error in getting all questions ', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    useEffect(() => {
        fetchQuestions();
    }, [count]);

    const handleClosed = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            {!loading ? (
                <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <h2
                            style={{
                                color: '#000000'
                            }}
                        >
                            Question Management
                        </h2>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <TextField
                                label="Search Question"
                                variant="outlined"
                                value={searchQuery}
                                onChange={(event) => setSearchQuery(event.target.value)}
                                style={{
                                    width: '200px',
                                    height: '48px',
                                    marginRight: '10px',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        border: 'none'
                                    }
                                }}
                            />
                            <Button onClick={handleOpen} variant="contained" color="primary" style={{ height: '40px' }}>
                                Create Question
                            </Button>
                        </div>
                    </div>

                    <TableContainer
                        component={Paper}
                        sx={{ height: 'auto', maxHeight: 'calc(100vh - 190px)', width: '100', background: 'white' }}
                        className={classes.root}
                    >
                        <Table aria-label="sticky table" stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 'bold' }}>ID</TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }}>Question</TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }}>Code</TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {ques
                                    ?.filter(
                                        (row) =>
                                            row.statements.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                            row.code.toLowerCase().includes(searchQuery.toLowerCase())
                                    )
                                    .map((row) => (
                                        <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell>{row.id}</TableCell>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}
                                            >
                                                {row.statements}
                                            </TableCell>

                                            <TableCell>{row.code}</TableCell>

                                            <TableCell>
                                                <IconButton
                                                    onClick={(event) => {
                                                        setAnchorEl(event.currentTarget);
                                                        setSelectedQuestion(row);
                                                    }}
                                                >
                                                    <MoreVertOutlinedIcon />
                                                </IconButton>{' '}
                                                <Menu
                                                    open={Boolean(anchorEl)}
                                                    onClose={handleClosed}
                                                    PaperProps={{ elevation: 0.999999 }}
                                                    anchorEl={anchorEl}
                                                    getContentAnchorEl={null}
                                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                                >
                                                    <ListItem
                                                        sx={{
                                                            cursor: 'pointer',
                                                            '&:hover': {
                                                                backgroundColor: 'rgba(150, 122, 251, 0.1)' // Customize the background color on hover
                                                            }
                                                        }}
                                                        onClick={() => {
                                                            handleClose();
                                                            setOpenEdit(true);
                                                        }}
                                                    >
                                                        {' '}
                                                        Edit
                                                    </ListItem>
                                                    <ListItem
                                                        sx={{
                                                            cursor: 'pointer',
                                                            '&:hover': {
                                                                backgroundColor: 'rgba(150, 122, 251, 0.1)' // Customize the background color on hover
                                                            }
                                                        }}
                                                        onClick={() => {
                                                            handleClose();
                                                            handleDelete(selectedQuestion.id);
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
                                                            handleClose();
                                                            handleOpenAnalytics(selectedQuestion);
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
                                                            handleClose();
                                                            setOpenDetails(true);
                                                        }}
                                                    >
                                                        {' '}
                                                        More Details
                                                    </ListItem>
                                                    <ListItem
                                                        sx={{
                                                            cursor: 'pointer',
                                                            '&:hover': {
                                                                backgroundColor: 'rgba(150, 122, 251, 0.1)' // Customize the background color on hover
                                                            }
                                                        }}
                                                        onClick={() => {
                                                            handleClose();
                                                            setOpenLogs(true);
                                                        }}
                                                    >
                                                        {' '}
                                                        Logs
                                                    </ListItem>
                                                </Menu>
                                            </TableCell>
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

            {/* Modal for creating question */}

            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <div>
                        <h2 style={{ textAlign: 'center' }}>Create Question</h2>
                        <form>
                            <Grid item xs={6} sm={6} sx={{ mb: '10px', width: '60px' }}>
                                <TextField
                                    InputLabelProps={{
                                        style: {
                                            color: 'grey[500]'
                                        }
                                    }}
                                    inputProps={{
                                        maxLength: 5
                                    }}
                                    variant="standard"
                                    label="Code"
                                    value={values.uniqueId}
                                    name="uniqueId"
                                    onChange={(e) => {
                                        setValues({ ...values, uniqueId: e.target.value });
                                    }}
                                ></TextField>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ mb: '10px' }}>
                                <TextField
                                    InputLabelProps={{
                                        style: {
                                            color: 'grey[500]'
                                        }
                                    }}
                                    variant="standard"
                                    fullWidth
                                    label="Question"
                                    multiline
                                    value={values.question}
                                    onChange={(e) => {
                                        setValues({ ...values, question: e.target.value });
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ mb: '10px' }}>
                                <TextField
                                    InputLabelProps={{
                                        style: {
                                            color: 'grey[500]'
                                        }
                                    }}
                                    multiline
                                    variant="standard"
                                    label="Correct Answer"
                                    onChange={(e) => {
                                        setValues({ ...values, CorrectAnswer: e.target.value });
                                    }}
                                    inputProps={{
                                        maxLength: 30
                                    }}
                                />
                            </Grid>
                            <Grid container>
                                <Grid item xs={6} sm={6} sx={{ mb: '10px' }}>
                                    <TextField
                                        InputLabelProps={{
                                            style: {
                                                color: 'grey[500]'
                                            }
                                        }}
                                        multiline
                                        variant="standard"
                                        label="Option 1"
                                        value={option1}
                                        onChange={(e) => {
                                            setOption1(e.target.value);
                                        }}
                                        inputProps={{
                                            maxLength: 50
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={6} sx={{ mb: '10px' }}>
                                    <TextField
                                        InputLabelProps={{
                                            style: {
                                                color: 'grey[500]'
                                            }
                                        }}
                                        inputProps={{
                                            maxLength: 50
                                        }}
                                        multiline
                                        variant="standard"
                                        label="Option 2"
                                        value={option2}
                                        onChange={(e) => {
                                            setOption2(e.target.value);
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={12} sm={6} sx={{ mb: '10px' }}>
                                    <TextField
                                        InputLabelProps={{
                                            style: {
                                                color: 'grey[500]'
                                            }
                                        }}
                                        multiline
                                        variant="standard"
                                        label="Option 3"
                                        value={option3}
                                        onChange={(e) => {
                                            setOption3(e.target.value);
                                        }}
                                        inputProps={{
                                            maxLength: 50
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ mb: '10px' }}>
                                    <TextField
                                        InputLabelProps={{
                                            style: {
                                                color: 'grey[500]'
                                            }
                                        }}
                                        multiline
                                        variant="standard"
                                        label="Option 4"
                                        value={option4}
                                        onChange={(e) => {
                                            setOption4(e.target.value);
                                        }}
                                        inputProps={{
                                            maxLength: 50
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={12} sm={6} sx={{ mb: '10px' }}>
                                    <TextField
                                        InputLabelProps={{
                                            style: {
                                                color: 'grey[500]'
                                            }
                                        }}
                                        multiline
                                        variant="standard"
                                        label="Option 5"
                                        value={option5}
                                        onChange={(e) => {
                                            setOption5(e.target.value);
                                        }}
                                        inputProps={{
                                            maxLength: 50
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ mb: '10px' }}>
                                    <TextField
                                        InputLabelProps={{
                                            style: {
                                                color: 'grey[500]'
                                            }
                                        }}
                                        multiline
                                        variant="standard"
                                        label="Option 6"
                                        value={option6}
                                        onChange={(e) => {
                                            setOption6(e.target.value);
                                        }}
                                        inputProps={{
                                            maxLength: 50
                                        }}
                                    />
                                </Grid>
                            </Grid>

                            <Grid item xs={12} sm={6} sx={{ mb: '10px' }}>
                                <TextField
                                    InputLabelProps={{
                                        style: {
                                            color: 'grey[500]'
                                        }
                                    }}
                                    variant="standard"
                                    label="Fun fact"
                                    multiline
                                    fullWidth
                                    inputProps={{ maxLength: 500 }}
                                    onChange={(e) => {
                                        setValues({ ...values, funfact: e.target.value });
                                    }}
                                />
                            </Grid>
                            {/* <Grid item xs={12} sm={6} sx={{ mb: '10px' }}>
                                <TextField
                                    InputLabelProps={{
                                        style: {
                                            color: 'grey[500]'
                                        }
                                    }}
                                    variant="standard"
                                    label="Comment"
                                    onChange={(e) => {
                                        setValues({ ...values, comment: e.target.value });
                                    }}
                                />
                            </Grid> */}

                            <Grid item xs={12} sm={6} sx={{ mb: '10px' }}>
                                <p
                                    style={{
                                        color: 'grey[500]',
                                        fontWeight: 'bold',
                                        fontSize: '15px'
                                    }}
                                >
                                    {' '}
                                    Upload Images for Question. Image must be less than 5MB <br />
                                </p>

                                <ImageUploader setImages={setImages} />
                            </Grid>

                            <Grid item xs={12} sm={6} sx={{ mb: '10px', display: 'flex', justifyContent: 'flex-end' }}>
                                <AnimateButton>
                                    <Button type="submit" variant="contained" color="primary" onClick={handleSubmit} typeof="submit">
                                        {loadinButton ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </form>
                    </div>{' '}
                </Box>
            </Modal>

            {openDetails && <QuestionDetails handleOpenDetails={handleOpenDetails} selectedQuestion={selectedQuestion} />}
            {openEdit && <QuestionEditForm handleEdit={handleEdit} selectedQuestion={selectedQuestion} />}
            {openLogs && <LogsDetail handleOpenEdit={handleOpenEdit} selectedQuestion={selectedQuestion} />}
        </div>
    );
};

export default QuestionTable;

import {
    Box,
    Button,
    IconButton,
    Modal,
    Paper,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableBody,
    ListItem,
    Menu,
    Select,
    FormControl,
    InputLabel,
    MenuItem,
    CircularProgress
} from '@mui/material';
import { EditPack, getPackQuestions } from 'AxiosInstance';
import { Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { style } from '@mui/system';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { QuestionEditForm } from 'views/dashboard/Default/Question-Management/QuestionEditForm';
import { makeStyles } from '@material-ui/core/styles';
import theme from 'themes';

const useStyles = makeStyles((theme) => ({
    disabledSelect: {
        '& .MuiInputBase-input.Mui-disabled': {
            '-webkit-text-fill-color': 'black' // Change this to the desired color
        }
    }
}));

const PackEdit = ({ handleEdits, selectedPack }) => {
    const [openEdit, setOpenEdit] = useState(false);
    const classes = useStyles();
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [question, setQuestion] = useState([]);
    const [count, setCount] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [formData, setFormData] = useState({
        id: selectedPack.id,
        pack_name: selectedPack.pack_name,
        pack_id: selectedPack.pack_id,
        no_cards: selectedPack.no_cards
    });
    const [mode, setMode] = useState(selectedPack.mode);
    const [loading, setLoading] = useState(false);

    console.log('fetchPackQuestion called', selectedPack.id);

    const fetchPackQuestion = async () => {
        getPackQuestions(selectedPack.id)
            .then((res) => {
                console.log('getting all questions for pack ', res.data);
                console.log('question', res.data);
                setQuestion(res.data.packquestion);
            })
            .catch((err) => {
                console.log('error in getting all questions for pack ');
                console.log(err);
            });
    };
    useEffect(() => {
        fetchPackQuestion();
    }, [count]);
    console.log('question in question', question);

    const handleClosed = () => {
        setAnchorEl(null);
    };

    const handleChanged = (event) => {
        let inputValue = event.target.value;
        // convert the input value to a number
        inputValue = Number(inputValue);

        // check if the input value is less than 0 or greater than 100
        if (inputValue < 0) {
            inputValue = 0;
            toast.error('Please enter a value greater than 0', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light'
            });
        } else if (inputValue > 100) {
            inputValue = 100;
            toast.error('Please enter a value less than 100', {
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
        setFormData((prevFormData) => ({ ...prevFormData, [event.target.name]: inputValue }));
        console.log('input value is ', formData.no_cards);
    };

    const handleChange = (e) => {
        setFormData((prevFormData) => ({ ...prevFormData, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('form data is ', question);
        const ids = question.map((row) => row.question_id);
        console.log('ids are ', ids);

        try {
            setLoading(true);

            const res = await EditPack(formData.id, formData.pack_name, formData.pack_id, formData.no_cards, ids, mode);

            console.log('success ', res);
            toast.success(res?.data?.message || 'Updated successfully');
            handleEdits();
        } catch (error) {
            console.log('error', error);
            toast.error(error?.response?.data?.message || 'An error occurred', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (rows) => {
        console.log('row id is ', rows);
        if (selectedPack.mode === 'PLAYTEST') {
            const newRows = question.filter((row) => row.question.id !== rows.id);
            console.log('new rows are ', newRows);
            setQuestion(newRows);
            toast.success('Question deleted successfully');
        } else {
            toast.error('Cannot delete question from this pack because Pack is Live', {
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

    const style = {
        position: 'relative',
        overflowY: 'scroll',
        top: '50%',
        left: '50%',
        height: '90vh',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        border: '2px solid #000',

        paddingLeft: '30px',
        paddingBottom: '20px',
        paddingTop: '20px',
        justifyContent: 'center',
        alignItems: 'center'
    };
    const handleEdit = () => {
        console.log('handleEdit called');
        setOpenEdit(false);
        setCount(count + 1);
    };
    return (
        <>
            <form>
                <Modal
                    open={open}
                    onClose={() => handleEdits()}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div>
                            <h2 style={{ textAlign: 'center', color: 'black' }}>Edit Pack</h2>
                            <form>
                                <Grid container>
                                    <Grid sx={{ mb: '10px', paddingRight: '230px' }}>
                                        <TextField
                                            InputLabelProps={{
                                                style: {
                                                    color: 'grey[500]'
                                                }
                                            }}
                                            variant="standard"
                                            label="Id"
                                            name="id"
                                            value={formData.id}
                                        />
                                    </Grid>{' '}
                                    <Grid sx={{ mb: '10px' }}>
                                        <TextField
                                            InputLabelProps={{
                                                style: {
                                                    color: 'grey[500]'
                                                }
                                            }}
                                            variant="standard"
                                            label="Pack Code"
                                            name="pack_id"
                                            value={formData.pack_id}
                                            onChange={handleChange}
                                            inputProps={{ maxLength: 5 }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid sx={{ mb: '10px', paddingRight: '230px' }}>
                                        <TextField
                                            InputLabelProps={{
                                                style: {
                                                    color: 'grey[500]'
                                                }
                                            }}
                                            variant="standard"
                                            multiline
                                            label="Pack Name"
                                            name="pack_name"
                                            value={formData.pack_name}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid sx={{ mb: '10px', marginLeft: '20px' }}>
                                        <TextField
                                            InputLabelProps={{
                                                style: {
                                                    color: 'grey[500]'
                                                }
                                            }}
                                            variant="standard"
                                            label="No of Cards"
                                            name="no_cards"
                                            value={formData.no_cards}
                                            onChange={handleChanged}
                                        />
                                    </Grid>{' '}
                                </Grid>
                                <Grid sx={{ mb: '10px' }}>
                                    <Box>
                                        <FormControl sx={{ minWidth: 150 }}>
                                            <InputLabel id="demo-simple-select-label" sx={{ color: 'grey[500]' }}>
                                                Mode
                                            </InputLabel>
                                            <Select
                                                className={classes.disabledSelect}
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                disabled={selectedPack?.mode === 'LIVE'}
                                                value={mode}
                                                label="mode"
                                                InputLabelProps={{ shrink: true, style: { color: 'grey[500]' } }}
                                                onChange={(e) => setMode(e.target.value)}
                                            >
                                                <MenuItem value="PLAYTEST">PlayTest</MenuItem>
                                                <MenuItem value="LIVE">Live</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>

                                <Grid>
                                    <TableContainer
                                        component={Paper}
                                        style={{ overflowX: 'scroll' }}
                                        sx={{ height: 300, width: '100', paddingBottom: '20px' }}
                                    >
                                        <Table sx={{ minWidth: 500 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Id</TableCell>
                                                    <TableCell>Question</TableCell>
                                                    <TableCell>Code</TableCell>
                                                    <TableCell>Action</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {question?.map((row) => (
                                                    <>
                                                        {row.question ? (
                                                            <TableRow
                                                                key={row.id}
                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                            >
                                                                <TableCell>{row.question.id}</TableCell>
                                                                <TableCell
                                                                    component="th"
                                                                    scope="row"
                                                                    style={{
                                                                        maxWidth: '200px',
                                                                        overflow: 'hidden',
                                                                        textOverflow: 'ellipsis'
                                                                    }}
                                                                >
                                                                    {row.question.statements}
                                                                </TableCell>

                                                                <TableCell>{row.question.code}</TableCell>
                                                                <TableCell>
                                                                    <IconButton
                                                                        onClick={(event) => {
                                                                            setAnchorEl(event.currentTarget);
                                                                            setSelectedRow(row.question);
                                                                            setSelectedQuestion(row.question);
                                                                        }}
                                                                    >
                                                                        <MoreVertOutlinedIcon />
                                                                    </IconButton>{' '}
                                                                    <Menu
                                                                        PaperProps={{ elevation: 1 }}
                                                                        anchorEl={anchorEl}
                                                                        open={Boolean(anchorEl)}
                                                                        onClose={handleClosed}
                                                                    >
                                                                        <ListItem
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
                                                                        <ListItem
                                                                            align="right"
                                                                            sx={{ cursor: 'pointer' }}
                                                                            onClick={() => {
                                                                                handleClosed();
                                                                                handleDelete(selectedRow);
                                                                            }}
                                                                        >
                                                                            {' '}
                                                                            Delete
                                                                        </ListItem>
                                                                    </Menu>
                                                                </TableCell>
                                                            </TableRow>
                                                        ) : null}
                                                    </>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    sx={{
                                        mb: '10px',
                                        paddingTop: '20px',
                                        paddingRight: '30px',
                                        display: 'flex',
                                        justifyContent: 'flex-end'
                                    }}
                                >
                                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
                                    </Button>
                                </Grid>
                            </form>
                        </div>
                    </Box>
                </Modal>
            </form>
            {openEdit && <QuestionEditForm handleEdit={handleEdit} selectedQuestion={selectedQuestion} />}
        </>
    );
};

export default PackEdit;

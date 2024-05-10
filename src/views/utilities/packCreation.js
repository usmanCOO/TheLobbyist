import { CircularProgress, FormControl, Grid, InputLabel, MenuItem, Modal, Select, Typography } from '@mui/material';
import { createNewPack } from 'AxiosInstance';
import { toast } from 'react-toastify';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { getAllQuestions } from 'AxiosInstance';
import { TextField } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { debounce } from 'lodash';
const PackCreation = ({ handleOpenEdit }) => {
    const [packOption, setPackOption] = useState({
        code: '',
        packName: ''
    });
    const [mode, setMode] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [value, setValue] = useState('');
    const [ques, setQues] = useState([]);
    const [newQues, setNewQues] = useState([]);
    const [selected, setSelected] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChecked = (event, row) => {
        if (event.target.checked) {
            setSelected((prevSelected) => [...prevSelected, row.id]);
        } else {
            setSelected((prevSelected) => prevSelected.filter((item) => item !== row.id));
        }
    };

    const cardStyles = {
        background: 'white',
        color: 'white'
    };
    /* Validation */
    const validateForm = () => {
        const errors = {};

        // Check if the code field is empty
        if (!packOption.code) {
            errors.code = 'Code is required';
        }

        // Check if the packName field is empty
        if (!packOption.packName) {
            errors.packName = 'Pack Name is required';
        }

        // Check if the value field is empty
        if (!value) {
            errors.value = 'No of Cards is required';
        }
        if (!mode) {
            errors.mode = 'Mode is required';
        }

        // Return the errors object
        return errors;
    };

    /*   creating new pack API Integration     */
    let handleSubmit = async (e) => {
        e.preventDefault();
        console.log('handleSubmit called');
        // Validate the form
        const errors = validateForm();

        // If there are errors, set the formErrors state and prevent form submission
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        console.log('selected', selected);
        console.log('mode', mode);

        try {
            setLoading(true);
            createNewPack(packOption.packName, packOption.code, value, selected, mode)
                .then((res) => {
                    console.log('success ', res);
                    if (res.data.status == false) {
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
                    } else {
                        toast.success(res.statusText, {
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
                    handleOpenEdit();
                })
                .catch((error) => {
                    console.log('error ', error);
                })
                .finally(() => setLoading(false));
        } catch (err) {
            console.log(err);
        }
    };

    const data = ques.filter((item) => {
        return (
            item.statements.toLowerCase().includes(searchInput.toLowerCase()) || item.code.toLowerCase().includes(searchInput.toLowerCase())
        );
    });

    const fetchQuestions = async () => {
        getAllQuestions()
            .then((res) => {
                console.log('getting all questions ');
                console.log(res);
                if (res.status === 200) {
                    setQues(res.data.questions);

                    console.log('getting the Question data ', res.data.questions);
                }
            })
            .catch((error) => {
                console.log('error in getting all questions ', error);
            });
    };
    useEffect(() => {
        fetchQuestions();
    }, []);

    useEffect(() => {
        setNewQues(data);
    }, [searchInput]);

    const handleChanged = (event) => {
        let inputValue = event.target.value;

        // check if the input value is an empty string
        if (inputValue === '') {
            setValue(''); // Set the field to empty
            return;
        }

        // convert the input value to a number
        inputValue = Number(inputValue);

        // check if the input value is NaN or less than 0 or greater than 100
        if (isNaN(inputValue) || inputValue < 0 || inputValue > 100) {
            setValue(''); // Set the field to empty
            if (isNaN(inputValue)) {
                toast.error('Please enter a valid number', {
                    // error message details
                });
            } else if (inputValue < 0) {
                toast.error('Please enter a value greater than 0', {
                    // error message details
                });
            } else {
                toast.error("Card can't be more than 100", {
                    // error message details
                });
            }
        } else {
            setValue(inputValue);
        }
    };

    const style = {
        paddingBottom: '20px',
        paddingTop: '20px',
        position: 'relative',
        top: '50%',
        left: '50%',
        height: 730,
        transform: 'translate(-50%, -50%)',
        width: 820,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        justifyContent: 'center',
        alignItems: 'center'
    };
    const debouncedFetchQuestions = debounce(fetchQuestions, 300); // Adjust the delay as per your requirement

    useEffect(() => {
        debouncedFetchQuestions();
    }, [searchInput]);

    return (
        <>
            <form>
                <Modal
                    open={open}
                    onClose={() => handleOpenEdit()}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div>
                            <h2 style={{ textAlign: 'center', color: '#000000' }}>Create Pack</h2>
                        </div>
                        <Grid
                            style={{ padding: 5, paddingBottom: 20 }}
                            sx={{
                                '& > :not(style)': { m: 1, width: '25ch' }
                            }}
                        >
                            <TextField
                                fullWidth
                                inputProps={{
                                    maxLength: 5
                                }}
                                InputLabelProps={{
                                    style: {
                                        color: 'grey[500]'
                                    }
                                }}
                                variant="standard"
                                label="Code"
                                value={packOption.code}
                                name="Code"
                                onChange={(e) => {
                                    setPackOption({ ...packOption, code: e.target.value });
                                }}
                                error={formErrors.code !== undefined}
                                helperText={formErrors.code}
                            />
                            <TextField
                                fullWidth
                                variant="standard"
                                label="Pack Name"
                                multiline
                                InputLabelProps={{
                                    style: {
                                        color: 'grey[500]'
                                    }
                                }}
                                value={packOption.packName}
                                name="Pack Name"
                                onChange={(e) => {
                                    setPackOption({ ...packOption, packName: e.target.value });
                                }}
                                error={formErrors.packName !== undefined}
                                helperText={formErrors.packName}
                            />
                            <TextField
                                fullWidth
                                type="numeric"
                                label="No of Cards"
                                variant="standard"
                                value={value}
                                InputLabelProps={{
                                    style: {
                                        color: 'grey[500]'
                                    }
                                }}
                                onChange={handleChanged}
                                inputProps={{
                                    width: 10
                                }}
                                error={formErrors.value !== undefined}
                                helperText={formErrors.value}
                            />
                        </Grid>

                        <Grid>
                            <Box sx={{ minWidth: 150, paddingLeft: '20px' }}>
                                <FormControl sx={{ minWidth: 150 }}>
                                    <InputLabel
                                        id="demo-simple-select-label"
                                        sx={{ color: 'grey[500]' }}
                                        error={formErrors.mode !== undefined}
                                        helperText={formErrors.mode}
                                    >
                                        Mode
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={mode}
                                        label="mode"
                                        InputLabelProps={{
                                            style: {
                                                color: 'grey[500]'
                                            }
                                        }}
                                        onChange={(e) => setMode(e.target.value)}
                                    >
                                        <MenuItem value="PLAYTEST">PlayTest</MenuItem>
                                        <MenuItem value="LIVE">Live</MenuItem>
                                    </Select>
                                    {formErrors.mode && (
                                        <Typography variant="caption" color="error" sx={{ marginTop: '4px' }}>
                                            {formErrors.mode}
                                        </Typography>
                                    )}
                                </FormControl>
                            </Box>
                        </Grid>

                        <br />

                        <Grid container>
                            <Grid container>
                                <Grid sx={{ paddingLeft: '10px' }}>
                                    <h3 style={{ color: '#000000' }}>Current Questions</h3>
                                </Grid>
                                <Grid justifyContent="end">
                                    <TextField
                                        style={{ width: 200, marginLeft: 380, paddingBottom: '10px', border: 'none' }}
                                        label="Search Question"
                                        variant="outlined"
                                        InputLabelProps={{
                                            style: {
                                                color: 'grey[500]'
                                            }
                                        }}
                                        InputProps={{
                                            style: {
                                                border: 'none',
                                                borderRadius: 0
                                            }
                                        }}
                                        onChange={(e) => {
                                            setSearchInput(e.target.value);
                                        }}
                                        value={searchInput}
                                    />
                                </Grid>{' '}
                            </Grid>

                            <TableContainer style={{ overflowX: 'scroll', height: 300 }}>
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{ fontWeight: 'bold' }}>CheckBox</TableCell>
                                            <TableCell style={{ fontWeight: 'bold' }}>Code</TableCell>
                                            <TableCell style={{ fontWeight: 'bold' }}>Question</TableCell>
                                        </TableRow>{' '}
                                    </TableHead>
                                    <TableBody>
                                        {searchInput
                                            ? newQues?.map((row) => (
                                                  <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                      <TableCell>
                                                          {' '}
                                                          <Checkbox onChange={(e) => handleChecked(e, row)} />
                                                      </TableCell>
                                                      <TableCell>{row.code}</TableCell>

                                                      <TableCell component="th" scope="row" style={{ maxWidth: '150px' }}>
                                                          {row.statements}
                                                      </TableCell>
                                                  </TableRow>
                                              ))
                                            : ques?.map((row) => (
                                                  <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                      <TableCell>
                                                          {' '}
                                                          <Checkbox onChange={(e) => handleChecked(e, row)} />
                                                      </TableCell>
                                                      <TableCell>{row.code}</TableCell>
                                                      <TableCell component="th" scope="row" style={{ maxWidth: '150px' }}>
                                                          {row.statements}
                                                      </TableCell>
                                                  </TableRow>
                                              ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <br />
                        <Grid container>
                            <Grid item xs={6} sm={6}>
                                <div>
                                    <h2 style={{ color: 'black' }}>Questions Selected: {selected.length}/100</h2>
                                </div>
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <Button style={{ marginLeft: 300 }} variant="contained" color="primary" onClick={handleSubmit}>
                                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Modal>
            </form>
        </>
    );
};
export default PackCreation;

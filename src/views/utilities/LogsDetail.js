import { Grid, Modal, Paper, Table, TableCell, TableContainer, TableRow, TextField, TableHead, TableBody } from '@mui/material';
import { Box } from '@mui/system';
import { getQuestionLogs } from 'AxiosInstance';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';

export const LogsDetail = ({ handleOpenEdit, selectedQuestion }) => {
    const [log, setLog] = useState([]);
    const [formData, setFormData] = useState({
        id: selectedQuestion.id
    });
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [detailsModalOpen, setDetailsModalOpen] = useState(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1000,
        height: 600,
        bgcolor: 'white',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
        overflowY: 'auto'
    };
    const fetchLogs = async () => {
        console.log('selected question ', selectedQuestion?.id);
        getQuestionLogs(selectedQuestion?.id)
            .then((res) => {
                console.log('getting Record');
                console.log(res);
                if (res.status === 200) {
                    setLog(res.data.questions);
                }
            })
            .catch((error) => {
                console.log('error in getting record ', error);
            });
    };
    useEffect(() => {
        fetchLogs();
    }, []);
    console.log('log', log);

    const handleDetailsClick = (row) => {
        setSelectedRow(row.id);
        setSelectedRowData(row);
        setDetailsModalOpen(true);
        console.log('selected row in ', row,selectedRowData);
    };

    return (
        <form>
            <Modal
                open={open}
                onClose={() => handleOpenEdit(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h2 style={{ textAlign: 'center' }}>Question Logs</h2>
                    <TableContainer
                        component={Paper}
                        sx={{ height: 450, width: '100' }}
                    >
                        <Table aria-label="sticky table" stickyHeader>
                            <TableHead>
                                <TableRow>
                                    
                                    <TableCell style={{ fontWeight: 'bold' }}>Log ID</TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }}>Created By</TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }}>Edited By</TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }}>Created At</TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }}>Edited At</TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }}>Details</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {log?.map((row) => {
                                    const createdAt = new Date(row?.createdAt);
                                    const updatedAt = new Date(row?.updatedAt);
                                    const options = { year: 'numeric', month: 'long', day: 'numeric' };
                                    const localeString = createdAt.toLocaleString(undefined, options);
                                    const localeString2 = updatedAt.toLocaleString(undefined, options);
                                    console.log(localeString);
                                    return (
                                        <TableRow
                                            key={row.id}
                                            onClick={() => setSelectedRow(row.id)}
                                            selected={selectedRow === row.id}
                                        >
                                           
                                            <TableCell>{row.id}</TableCell>
                                            <TableCell>{row?.createdBy}</TableCell>
                                            <TableCell>{row?.editedBy ? row?.editedBy : row?.createdBy}</TableCell>
                                            <TableCell>{localeString}</TableCell>
                                            <TableCell>{localeString2}</TableCell>
                                            <TableCell>
                                                <IconButton
                                                    size="small"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDetailsClick(row);
                                                    }}
                                                >
                                                    <VisibilityIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Modal>

            <Modal
                open={detailsModalOpen}
                onClose={() => setDetailsModalOpen(false)}
                aria-labelledby="details-modal-title"
                aria-describedby="details-modal-description"
            >
                <Box sx={style}>
                    <h2 style={{ textAlign: 'center' }}>Details</h2>
                     {selectedRowData && (
                     <div>
                      
                        <form>
                            <Grid container>
                            
                                <Grid item xs={6} sm={6} sx={{ mb: '10px', '& > :not(style)': { m: 1, width: '50px' } }}>
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
                                        name="code"
                                        value={selectedRowData.code}
                                       
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={6} style={{ padding: 5 }} sx={{ mb: '10px', '& > :not(style)': { m: 1 } }}>
                                <TextField
                                    InputLabelProps={{
                                        style: {
                                            color: 'grey[500]'
                                        }
                                    }}
                                    multiline
                                    variant="standard"
                                    fullWidth
                                    label="Question"
                                    name="question"
                                    value={selectedRowData.statements}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                style={{ padding: 5 }}
                                sx={{ mb: '10px', '& > :not(style)': { m: 1, width: '25ch' } }}
                            >
                                <TextField
                                    InputLabelProps={{
                                        style: {
                                            color: 'grey[500]'
                                        }
                                    }}
                                    multiline
                                    variant="standard"
                                    label="Correct Answer"
                                    name="correctAnswer"
                                    value={selectedRowData.answers}
                                />
                            </Grid>
                            <Grid container>
                                {selectedRowData?.options?.options?.map((options, index) => {
                                    return (
                                        <Grid
                                            style={{ padding: 5 }}
                                            sx={{
                                                '& > :not(style)': { m: 1, width: '25ch' }
                                            }}
                                        >
                                            <TextField
                                                InputLabelProps={{
                                                    style: {
                                                        color: 'grey[500]'
                                                    }
                                                }}
                                                variant="standard"
                                                multiline
                                                label={`Option ${index + 1}`}
                                                name={`option${index + 1}`}
                                                value={options}
                                            />
                                        </Grid>
                                    );
                                })}
                            </Grid>
                            <Grid item xs={12} sm={6} style={{ padding: 5 }} sx={{ mb: '10px' }}>
                                <TextField
                                    InputLabelProps={{
                                        style: {
                                            color: 'grey[500]'
                                        }
                                    }}
                                    variant="standard"
                                    fullWidth
                                    label="Fun Fact"
                                    name="funFact"
                                    multiline
                                    inputProps={{ maxLength: 100 }}
                                    value={selectedRowData.fun_fact}
                                />
                            </Grid>

                         
                        </form>
                    </div> )}
                </Box>
            </Modal>
        </form>
    );
};

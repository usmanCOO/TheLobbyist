import { Grid, Modal, Table, TableCell, TableContainer, TableRow, TextField, TableBody, TableHead, Box, Button } from '@mui/material';
import { getPackQuestions } from 'AxiosInstance';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';

const PackDetail = ({ handleOpenDetails, selectedPack }) => {
    console.log('selectedPack', selectedPack);
    const style = {
        position: 'relative',
        overflowY: 'scroll',
        top: '50%',
        left: '50%',
        height: '100vh',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 3
    };
    const [question, setQuestion] = useState([]);
    console.log('id', selectedPack.id);
    const fetchPackQuestion = async () => {
        getPackQuestions(selectedPack.id)
            .then((res) => {
                console.log('getting all questions for pack ', res.data);
                setQuestion(res.data.packquestion);
            })
            .catch((err) => {
                console.log('error in getting all questions for pack ');
                console.log(err);
            });
    };
    useEffect(() => {
        fetchPackQuestion();
    }, []);

    return (
        <form>
            <Modal
                open={open}
                onClose={() => handleOpenDetails()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div>
                        <h2 style={{ textAlign: 'center', paddingBottom: '30px' }}>More Details</h2>
                        <form>
                            <Grid container spacing={2}>
                                <Grid
                                    style={{
                                        paddingRight: '350px',
                                        paddingLeft: '30px'
                                    }}
                                >
                                    <TextField
                                        label="Mode"
                                        variant="standard"
                                        value={selectedPack?.mode}
                                        InputLabelProps={{
                                            style: {
                                                color: 'grey[500]'
                                            }
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid>
                                <h2
                                    style={{
                                        color: '#000000'
                                    }}
                                >
                                    Question in Pack
                                </h2>
                                <TableContainer sx={{ height: 450, width: '100' }}>
                                    <Table aria-label="sticky table" stickyHeader>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell style={{ fontWeight: 'bold' }}>ID</TableCell>
                                                <TableCell style={{ fontWeight: 'bold' }}>Question</TableCell>
                                                <TableCell style={{ fontWeight: 'bold' }}>Code</TableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {question?.map((row) => (
                                                <>
                                                    {row.question ? (
                                                        <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                            <TableCell>{row.question.id}</TableCell>
                                                            <TableCell
                                                                component="th"
                                                                scope="row"
                                                                style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}
                                                            >
                                                                {row.question.statements}
                                                            </TableCell>

                                                            <TableCell>{row.question.code}</TableCell>
                                                        </TableRow>
                                                    ) : null}
                                                </>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </form>
                    </div>
                </Box>
            </Modal>
        </form>
    );
};

export default PackDetail;

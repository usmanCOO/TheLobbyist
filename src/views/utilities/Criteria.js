import { Button, Grid, Modal, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { updateVotes } from 'AxiosInstance';
import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Criteria = ({ handleEdit, selectedPlayer }) => {
    const [formData, setFormData] = useState({
        id: selectedPlayer?.id,
        players: selectedPlayer?.no_players,
        vote: selectedPlayer?.winning_criteria
    });
    const handleChange = (e) => {
        let inputValue = event.target.value;
        setFormData((prevFormData) => ({ ...prevFormData, [event.target.name]: inputValue }));
        console.log('input value is ', formData.vote);
    };
    const style = {
        position: 'relative',
       
        top: '50%',
        left: '50%',
        height: 300,
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 3
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            updateVotes(formData.id, formData.vote)
                .then((res) => {
                    console.log('success ', res);
                    toast.success('Pack Edit', {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light'
                    });
                    handleEdit();
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

    return (
        <div>
            <Modal open={open} onClose={() => handleEdit()} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <h2 style={{ textAlign: 'center',  color: '#000000', }}>Edit Winning Criteria</h2>
                        </Grid>
                        <Grid item xs={12} sm={12} sx={{ mb: '10px', '& > :not(style)': { m: 1, width: '80px' } }}>
                            <TextField
                                InputProps={{
                                    style: { fontWeight: 'bold' }
                                }}
                                InputLabelProps={{
                                    style: {
                                        color: 'grey[500]'
                                    }
                                }}
                                variant="standard"
                                label="ID"
                                value={formData?.id}
                            />
                        </Grid>
                        <br />
                        <Grid item xs={6} sm={6} sx={{ mb: '10px', '& > :not(style)': { m: 1, width: '80px' } }}>
                            <TextField
                                InputProps={{
                                    style: { fontWeight: 'bold' }
                                }}
                                InputLabelProps={{
                                    style: {
                                        color: 'grey[500]'
                                    }
                                }}
                                variant="standard"
                                label="No of Players"
                                value={formData?.players}
                            />
                        </Grid>
                        <br />
                        <Grid item xs={6} sm={6} sx={{ mb: '10px', '& > :not(style)': { m: 1, width: '100px' } }}>
                            <TextField
                                InputProps={{
                                    style: { fontWeight: 'bold' }
                                }}
                                InputLabelProps={{
                                    style: {
                                        color: 'grey[500]'
                                    }
                                }}
                                variant="standard"
                                label="Winning Votes"
                                name="vote"
                                value={formData.vote}
                                onChange={handleChange}
                            />
                        </Grid>

                        <br />
                        <Grid
                                   
                                    sx={{
                                        mb: '10px',
                                        paddingTop: '20px',
                                        paddingRight: '30px',
                                        marginLeft: 40,
                                        justifyContent: 'end'
                                    }}
                                >
                            <Button  variant="contained" color="primary" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
};

export default Criteria;

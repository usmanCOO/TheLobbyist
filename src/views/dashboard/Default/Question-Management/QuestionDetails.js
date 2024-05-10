/* eslint-disable react/prop-types */
import { Grid, Modal, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

// eslint-disable-next-line react/prop-types
const QuestionDetails = ({ handleOpenDetails, selectedQuestion }) => {
    console.log('selectedQuestion', selectedQuestion);

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
        p: 3,
        paddingRight: '20px'
    };
    return (
        <form>
            <Modal open={open} onClose={() => handleOpenDetails()} aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <div>
                        <h2 style={{ textAlign: 'center', color: '#000000' }}>More Details</h2>
                        <form>
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
                                    label="Correct Answer"
                                    // eslint-disable-next-line react/prop-types
                                    value={selectedQuestion.answers}
                                    name="answers"
                                ></TextField>
                            </Grid>
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
                                    label="Option 1"
                                    // eslint-disable-next-line react/prop-types
                                    value={selectedQuestion.options.options[0] ? selectedQuestion.options.options[0] : ''}
                                    name="options"
                                ></TextField>
                                <TextField
                                    InputLabelProps={{
                                        style: {
                                            color: 'grey[500]'
                                        }
                                    }}
                                    variant="standard"
                                    label="Option 2"
                                    value={selectedQuestion.options.options[1] ? selectedQuestion.options.options[1] : ''}
                                    name="options"
                                ></TextField>
                                <TextField
                                    InputLabelProps={{
                                        style: {
                                            color: 'grey[500]'
                                        }
                                    }}
                                    variant="standard"
                                    label="Option 3"
                                    value={selectedQuestion.options.options[2] ? selectedQuestion.options.options[2] : ''}
                                    name="options"
                                ></TextField>
                                <TextField
                                    InputLabelProps={{
                                        style: {
                                            color: 'grey[500]'
                                        }
                                    }}
                                    variant="standard"
                                    label="Option 4"
                                    value={selectedQuestion.options.options[3] ? selectedQuestion.options.options[3] : ''}
                                    name="options"
                                ></TextField>
                                <TextField
                                    InputLabelProps={{
                                        style: {
                                            color: 'grey[500]'
                                        }
                                    }}
                                    variant="standard"
                                    label="Option 5"
                                    value={selectedQuestion.options.options[4] ? selectedQuestion.options.options[4] : ''}
                                    name="options"
                                ></TextField>
                                <TextField
                                    InputLabelProps={{
                                        style: {
                                            color: 'grey[500]'
                                        }
                                    }}
                                    variant="standard"
                                    label="Option 6"
                                    value={selectedQuestion.options.options[5] ? selectedQuestion.options.options[5] : ''}
                                    name="options"
                                ></TextField>
                            </Grid>
                            <Grid
                                style={{ padding: 5 }}
                                sx={{
                                    '& > :not(style)': { m: 1, width: '80ch' }
                                }}
                            >
                                <TextField
                                    InputLabelProps={{
                                        style: {
                                            color: 'grey[500]'
                                        }
                                    }}
                                    variant="standard"
                                    label="Fun fact"
                                    value={selectedQuestion.fun_fact}
                                    name="funfact"
                                    multiline
                                    fullWidth
                                ></TextField>
                            </Grid>

                            <br />

                            <Grid
                                item
                                xs={6}
                                sm={6}
                                sx={{
                                    '& > :not(style)': { m: 1, width: '25ch' }
                                }}
                                style={{
                                    display: 'flex',

                                    flexDirection: 'row'
                                }}
                            >
                                {selectedQuestion?.cardsimages.map((image) => {
                                    return (
                                        <img
                                            style={{
                                                width: '150px',
                                                height: '200px',

                                                display: 'flex',

                                                flexDirection: 'row',
                                                marginRight: '10px',

                                                overflow: 'hidden',
                                                objectFit: 'cover'
                                            }}
                                            src={`https://testlobbiyst.s3.amazonaws.com/cardsimages/${image.card_image}`}
                                            alt="images"
                                        />
                                    );
                                })}
                            </Grid>
                        </form>
                    </div>
                </Box>
            </Modal>
        </form>
    );
};

export default QuestionDetails;

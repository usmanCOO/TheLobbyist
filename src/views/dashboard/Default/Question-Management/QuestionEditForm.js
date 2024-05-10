import { Box, Button, CircularProgress, Modal } from '@mui/material';
import { EditQuestion, deleteImage, uploadImages } from 'AxiosInstance';
import { Grid, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRef } from 'react';
import ImageUploader from 'views/dashboard/ImageUploader';
import AnimateButton from 'ui-component/extended/AnimateButton';
import DeleteIcon from '@mui/icons-material/Delete';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function RightArrow({ className, onClick }) {
    return (
        <ArrowForwardIosIcon
            onClick={onClick}
            className={className}
            style={{
                color: '#111'
            }}
        />
    );
}

function LeftArrow({ className, onClick }) {
    return (
        <ArrowBackIosIcon
            onClick={onClick}
            className={className}
            style={{
                color: '#111'
            }}
        />
    );
}

var settings = {
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <RightArrow />,
    prevArrow: <LeftArrow />
};

export const QuestionEditForm = ({ handleEdit, selectedQuestion }) => {
    const [imagesList, setImagesList] = useState([]);
    const fileRef = useRef(null);
    const [imagePath, setImagePath] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deletedIds, setDeletedIds] = useState([]);

    const [formData, setFormData] = useState({
        uniqueId: selectedQuestion.id,
        question: selectedQuestion.statements,
        correctAnswer: selectedQuestion.answers,
        funFact: selectedQuestion.fun_fact,
        code: selectedQuestion.code,
        comment: selectedQuestion.comment,
        image: selectedQuestion.cardsimages
    });

    useEffect(() => {
        setImagesList(selectedQuestion.cardsimages);
    }, []);
    console.log('imagesList', imagesList);

    const [optionData, setOptionData] = useState(selectedQuestion.options);

    const handleChange = (e) => {
        setFormData((prevFormData) => ({ ...prevFormData, [e.target.name]: e.target.value }));
    };
    const setImages = (images) => {
        setImagePath(images);
        console.log('imagePath in edit form', imagePath);
    };

    useEffect(() => {
        setImages();
    }, []);
    var img = {
        card_image: imagePath
    };
    console.log('img is ', img);
    const updatedArray = img?.card_image?.map((card_image) => card_image.substring(card_image.lastIndexOf('/') + 1));
    const newData = [];
    
    for (let i = 0; i < updatedArray?.length; i++) {
        const fileName = updatedArray[i];
        const images = {
            card_name: fileName,
            card_image: fileName,
            metadata: ''
        };
        newData.push(images);
    }
  
    
    console.log('newData is ', newData);

    // merge the existing image list and new data
    const mergedData = [...imagesList, ...newData];

    // set the merged data as the new state
    console.log('mergedData after updating', mergedData);

   

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('mergedData', mergedData);
        console.log("mergedData?.length ", mergedData?.length)
        console.log('option data in edit form is ', optionData);

        try {
            if (mergedData?.length === 0) {
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
            setLoading(true);

            const res = await EditQuestion(
                formData.question,
                optionData.options,
                formData.correctAnswer,
                formData.funFact,
                formData.code,
                formData.uniqueId,
                mergedData.filter((image) => !deletedIds.includes(image.id))
            );

            console.log('success ', res);
            toast.success(res?.data?.message);
            // toast.success('You have to Train Modal Again');
            handleEdit();
        } catch (error) {
            console.log('error in edit', error.message);
            toast.error(error?.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        setDeletedIds([...deletedIds, id]);
    
        // Remove the deleted image from formData.image
        const updatedImages = formData.image.filter((image) => image.id !== id);
    
        // Remove the deleted image from imagesList
        const updatedImagesList = imagesList.filter((image) => image.id !== id);
    
        // Update the formData object and the imagesList
        setFormData((prevFormData) => ({
            ...prevFormData,
            image: updatedImages
        }));
        setImagesList(updatedImagesList);
    };
    

    const style = {
        position: 'relative',
        overflowY: 'scroll',
        top: '50%',
        left: '50%',
        height: '100vh',
        transform: 'translate(-50%, -50%)',
        width: 820,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        justifyContent: 'center',
        alignItems: 'center'
    };
    return (
        <form>
            <Modal open={open} onClose={() => handleEdit()} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <div>
                        <h2 style={{ textAlign: 'center', color: '#000000' }}>Edit Form</h2>
                        <form>
                            <Grid container>
                                <Grid
                                    style={{ padding: 5 }}
                                    sx={{
                                        '& > :not(style)': { m: 1, width: '10ch' }
                                    }}
                                >
                                    <TextField
                                        InputLabelProps={{
                                            style: {
                                                color: 'grey[500]'
                                            }
                                        }}
                                        variant="standard"
                                        label="Id"
                                        name="card_id"
                                        value={formData.uniqueId}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid
                                    style={{ padding: 5, paddingLeft: '60px' }}
                                    sx={{
                                        '& > :not(style)': { m: 1, width: '10ch' }
                                    }}
                                >
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
                                        value={formData.code}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={6} style={{ padding: 5 }} sx={{ mb: '10px', width: '650px' }}>
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
                                    value={formData.question}
                                    onChange={handleChange}
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
                                    value={formData.correctAnswer}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid container>
                                {optionData?.options.map((options, index) => {
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
                                                value={optionData.options[index]}
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    setOptionData((prevFormData) => ({
                                                        ...prevFormData,
                                                        options: optionData.options.map((option, i) =>
                                                            i === index ? e.target.value : option
                                                        )
                                                    }));
                                                }}
                                            />
                                        </Grid>
                                    );
                                })}
                            </Grid>
                            <Grid item xs={12} sm={6} style={{ padding: 5 }} sx={{ mb: '10px', width: '650px' }}>
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
                                    inputProps={{ maxLength: 500 }}
                                    value={formData.funFact}
                                    onChange={handleChange}
                                />
                            </Grid>

                            {formData?.image?.length <= 4 ? (
                                <Grid
                                    item
                                    xs={6}
                                    sm={6}
                                    sx={{ mb: '10px' }}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row'
                                    }}
                                >
                                    <>
                                        {formData?.image.map((image, index) => {
                                            const imageUrl = `https://testlobbiyst.s3.amazonaws.com/cardsimages/${image.card_image}`;

                                            return (
                                                <div key={index} style={{ marginRight: '10px', position: 'relative' }}>
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
                                                        src={imageUrl}
                                                        alt="images"
                                                    />
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault(); // Prevent the default behavior
                                                            handleDelete(image.id);
                                                        }}
                                                        style={{
                                                            position: 'absolute',
                                                            top: '5px',
                                                            right: '5px',
                                                            backgroundColor: 'transparent',
                                                            border: 'none',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        <DeleteIcon
                                                            style={{
                                                                color: 'red'
                                                            }}
                                                        />
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </>
                                </Grid>
                            ) : (
                                <>
                                    <Slider {...settings}>
                                        {formData?.image.map((image, index) => {
                                            const imageUrl = `https://testlobbiyst.s3.amazonaws.com/cardsimages/${image.card_image}`;

                                            return (
                                                <div key={index} style={{ marginRight: '10px', position: 'relative' }}>
                                                    <img
                                                        style={{
                                                            width: '175px',
                                                            height: '220px',
                                                            display: 'flex',
                                                            flexDirection: 'row',
                                                            marginRight: '10px',
                                                            overflow: 'hidden',
                                                            objectFit: 'cover'
                                                        }}
                                                        src={imageUrl}
                                                        alt="images"
                                                    />
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault(); // Prevent the default behavior
                                                            handleDelete(image.id);
                                                        }}
                                                        style={{
                                                            position: 'absolute',
                                                            top: '5px',
                                                            right: '15px',
                                                            backgroundColor: 'transparent',
                                                            border: 'none',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        <DeleteIcon
                                                            style={{
                                                                color: 'red'
                                                            }}
                                                        />
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </Slider>
                                </>
                            )}

                            <Grid>
                                <p
                                    style={{
                                        color: 'grey[500]',
                                        fontWeight: 'bold',
                                        fontSize: '20px'
                                    }}
                                >
                                    {' '}
                                    Upload More Images for Question{' '}
                                </p>

                                <ImageUploader setImages={setImages} />
                            </Grid>

                            <Grid item xs={12} sm={6} sx={{ mb: '10px', display: 'flex', justifyContent: 'flex-end' }}>
                                <AnimateButton>
                                    <Button type="submit" variant="contained" color="primary" onClick={handleSubmit} typeof="submit">
                                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </form>
                    </div>
                </Box>
            </Modal>
        </form>
    );
};

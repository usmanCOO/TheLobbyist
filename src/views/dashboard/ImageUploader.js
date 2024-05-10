import { uploadImages, s3ImageDelete } from 'AxiosInstance';
import { useState } from 'react';
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';

const ImageUploader = ({ setImages }) => {
    const [image, setImage] = useState([]);
    const [imagesList, setImagesList] = useState([]);
    const [formData, setFormData] = useState(new FormData());
    setImages(imagesList);

    const handleImageChange = (e) => {
        toast.success('Image is Uploading Please Wait', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
        })
        const imageFiles = Array.from(e.target.files);
        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
        const maxImageSize = 5 * 1024 * 1024; // 5MB in bytes

        const filteredImages = imageFiles.filter((image) => validImageTypes.includes(image.type));

        const imagePreviews = filteredImages
            .map((img) => {
                const imageName = img?.name;

                if (image.some((img) => img.file.name === imageName)) {
                    toast.error(`An image with the name "${imageName}" has already been selected.`);
                    return null;
                }
                const convertedImage = new File([img], img.name, { type: 'image/png' });
                return {
                    file: convertedImage,
                    preview: URL.createObjectURL(convertedImage),
                    size: convertedImage.size
                };
            })
            .filter(Boolean);

        const oversizedImages = imagePreviews.filter((image) => image.size > maxImageSize);

        if (oversizedImages.length > 0) {
            console.log('Error: Image size exceeds 5MB limit');
            toast.error('Image size exceeds 5MB limit', {
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

        setImage((prevImages) => [...prevImages, ...imagePreviews]);
        console.log('imagepreviews is:', imagePreviews[0]?.file);
        if (imagePreviews[0]?.file) {
            formData.set('card_image', imagePreviews[0]?.file);
            console.log('formData after setting card_image:', formData.get('card_image'));
          
           uploadImages(formData)
                .then((res) => {
                    
                    console.log('res data:', res.data);
                    console.log('picture get inserted!', res.data.imagePath);
                    if (res.data.status === true) {
                        setImagesList((prevState) => [...prevState, res.data.imagePath]);
                        console.log('imagesList is:', imagesList);
                        toast.success('Image uploaded successfully', {
                            position: 'top-right',
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: 'light'
                        });
                    }
                })
                .catch((err) => {
                    console.log('error in uploading image', err);
                });
        } else {
            console.log('No file to upload');
        }
    };
    const deleteImage = async (uploadImage, index) => {
        console.log('index is:', uploadImage, index);
        console.log('imagesList is:', imagesList);
        console.log('setImagesList is:', image);
        const deletedImage = imagesList[index];
        console.log('deletedImage is:', deletedImage);

        try {
            // Send a request to delete the image on the server
            const imageNameWithoutPrefix = deletedImage.replace('cardsimages/', '');
            console.log('imageNameWithoutPrefix is:', imageNameWithoutPrefix);
            s3ImageDelete(imageNameWithoutPrefix).then((res) => {
                console.log('image deleted successfully', res);

                // Update the state to remove the deleted image
                const updatedImages = image.filter((_, i) => i !== index);
                console.log('updatedImages is:', updatedImages);
                setImage(updatedImages);
                console.log('image is:', image);
                setImagesList((prevState) => prevState.filter((path) => path !== deletedImage));
                console.log('imagesList is:', imagesList);

                toast.success('Image deleted successfully', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light'
                });
            });
        } catch (error) {
            console.log('Error deleting image:', error);
            toast.error('Error deleting image', {
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

    const renderImages = () => {
        return (
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'nowrap',
                    overflowX: 'auto'
                }}
            >
                {image.map((image, index) => (
                    <div key={index} style={{ marginRight: '10px', position: 'relative' }}>
                        <img
                            src={image.preview}
                            alt=""
                            style={{
                                width: '150px',
                                height: '150px',
                                borderRadius: '10px'
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => deleteImage(image, index)}
                            style={{
                                position: 'absolute',
                                top: '5px',
                                right: '5px',
                                backgroundColor: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                padding: 0 // Remove padding
                            }}
                        >
                            <DeleteIcon style={{ color: 'red', fontSize: '20px' }} />
                        </button>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div>
            <input
                type="file"
                accept="image/*"
                // multiple
                onChange={handleImageChange}
                style={{
                    paddingBottom: '10px'
                }}
            />
            <br />
            <div>{renderImages()} </div>
        </div>
    );
};

export default ImageUploader;

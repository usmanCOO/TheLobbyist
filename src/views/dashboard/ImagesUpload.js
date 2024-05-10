import { uploadImages } from 'AxiosInstance';
import React, { useState } from 'react';

const ImageUploader = ({ setRefImages }) => {
    const [image, setImage] = useState([]);
    const [imagesList, setImagesList] = useState([]);
    setRefImages(imagesList);
    const handleImageChange = (e) => {
        const imageFiles = Array.from(e.target.files);
        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];

        const filteredImages = imageFiles.filter((image) => validImageTypes.includes(image.type));

        const imagePreviews = filteredImages.map((image) => {
            return {
                file: image,
                preview: URL.createObjectURL(image)
            };
        });

        setImage((prevImages) => [...prevImages, ...imagePreviews]);
        let formData = new FormData();
        formData.append('card_image', e.target.files[0]);
        console.log('formData is :', e.target.files);
        uploadImages(formData)
            .then((res) => {
                console.log('picture get inserted!', res);
                setImagesList((prevState) => [...prevState, res.data.imagePath]);
                console.log('imagesList is for Ref images:', imagesList);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const renderImages = () => {
       
        return (
        <div style={{
            display: 'flex',
            flexWrap: 'nowrap',
            overflowX: 'auto'}}> 

        { image.map((image, index) => (
   
                <div
                    key={index}
                    style={{
                       
                       marginRight: '10px',
                    }}
                >
                    <img
                        src={image.preview}
                        alt=""
                        style={{
                           width: '100px',
                            height: '100px',
                            borderRadius: '10px',
                           
                        }}
                    />
                
            </div> 
        ))} </div>
        );

    };

    return (
        <div>
            <input type="file" accept="image/*"   multiple onChange={handleImageChange} style={{
                paddingBottom: '10px',
            }} />
            <br />
            <div>{renderImages()} </div>
        </div>
    );
};

export default ImageUploader;

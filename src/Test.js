import React, {useState} from 'react';
import axios from 'axios';
import {requestURL} from "./config/config";

const Test = () => {
    const [imageURL, setImageURL] = useState('');

    const handleFileUpload = async (event) => {
        console.log(`${event.target.files[0].name} uploaded`);
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        let uploadedFilePath = ''

        try {
            const response = await axios.post(requestURL + '/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            setImageURL("../uploads" + response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
        setImageURL(uploadedFilePath);
        console.log('Response:', imageURL);
    };

    return (
        <div>
            <input type="file" onChange={handleFileUpload} />
            <img src="/uploads/1718519010452-321.png" alt="Uploaded" />
        </div>

    );
};

export default Test;

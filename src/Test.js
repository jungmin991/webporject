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
            uploadedFilePath = response.data;
            await setImageURL("response");
            console.log('Response:', uploadedFilePath);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
        setImageURL(uploadedFilePath);
        console.log('Response:', imageURL);
    };

    return (
        <div>
            <input type="file" onChange={handleFileUpload} />
        </div>

    );
};

export default Test;

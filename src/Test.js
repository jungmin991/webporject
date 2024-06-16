import React, {useState} from 'react';
import axios from 'axios';
import {requestURL} from "./config/config";

const Test = () => {
    const [imageURL, setImageURL] = useState(null);

    const handleFileUpload = async (event) => {
        console.log(`${event.target.files[0].name} uploaded`);
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

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
    };

    return (
        <div>
            <input type="file" onChange={handleFileUpload} />
            <img src="..\uploads\1718518031862-menu1_2.jpg" alt="Uploaded" />
        </div>

    );
};

export default Test;

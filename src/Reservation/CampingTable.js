// CampingTable.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CampingTable = ({ camps }) => {

    const navigate = useNavigate();

    const onclick = () => {
        console.log(camps)
        navigate('/detailAndReview/'+camps[0].campGroundNo)
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>이름</th>
                    <th>유형</th>
                    <th>위치</th>
                </tr>
            </thead>
            <tbody>
                {camps.map(camp => (
                    <tr key={camp.index} onClick={onclick}>
                    <td>{camp.name}</td>
                    <td>{camp.type}</td>
                    <td>{camp.location}</td>
                </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CampingTable;
// CampingTable.js
import React from 'react';

const CampingTable = ({ camps }) => {
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
                    <tr key={camp.index}>
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
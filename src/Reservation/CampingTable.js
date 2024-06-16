// CampingTable.js
import { useNavigate } from 'react-router-dom';

const CampingTable = ({ camps }) => {

    const navigate = useNavigate();

    console.log(camps)
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
                {camps.map((camp,index) => (
                    <tr key={index} onClick={() => navigate('/detailAndReview/' + camps[index].campGroundNo)}>
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
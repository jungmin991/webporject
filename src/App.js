import './App.css';
import {Route, Routes} from 'react-router-dom';
import Main from './components/Main';
import Login from './components/Login';
import Register from './components/Register';
import RegistFacilities from "./Owner/CampGround/RegistFacilities";
import RegistCampGroundInfo from './Owner/CampGround/RegistCampGroundInfo';
import {useState} from "react";
import RegistCampGround3 from "./Owner/CampGround/RegistCampGround3";
import CampingForm from './Owner/CampingForm';
import CampingList from './Owner/CampingList';
import CampingSearchForm from "./Reservation/CampingSearchForm";
import RegistSite from "./Owner/CampGroundSite/RegistSite";
import SiteList from "./Owner/CampGroundSite/SiteList";
import ReservationList from "./Owner/CampGroundSite/ReservationList";

function App() {
    const [campGroundInfo, setCampGroundInfo] = useState({
            userNo: -1,
            facilitiesInfoNo: -1,
            mannerStartTime: null,
            mannerEndTime: null,
            campGroundImages: JSON.stringify(["1", "2"]),
            name: "",
            location: "",
            type: null,
            callNum: "",
            campingInfo: "",
            enterTime: null,
            leaveTime: null
        }
    );

    return (
        <div className='App'>
            <Routes>
                <Route path='/' element={<Main/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/host/:id' element={<CampingList/>}/>
                <Route path='/RegistCampGround1/:id' element={<RegistCampGroundInfo campGroundInfo={campGroundInfo} setCampGroundInfo={setCampGroundInfo} />}/>
                <Route path='/RegistCampGround2' element={<RegistFacilities campGroundInfo={campGroundInfo} setCampGroundInfo={setCampGroundInfo} />}/>;
                <Route path='/RegistCampGround3' element={<RegistCampGround3 campGroundInfo={campGroundInfo} setCampGroundInfo={setCampGroundInfo} />}/>;
                <Route path='/SearchCampGround' element={<CampingSearchForm/>}/>
                <Route path='/RegistSite/:campGroundNo' element={<RegistSite/>}/>
                <Route path='/SiteList/:campGroundNo' element={<SiteList/>}/>
                <Route path='/ReservationList/:hostNo' element={<ReservationList/>}/>
            </Routes>
        </div>
    );
}

export default App;

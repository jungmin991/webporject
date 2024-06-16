import './App.css';
import {Route, Routes} from 'react-router-dom';
import Login from './components/Main';
import Main from './components/Login';
import Register from './components/Register';
import RegistFacilities from "./Owner/CampGround/RegistFacilities";
import RegistCampGroundInfo from './Owner/CampGround/RegistCampGroundInfo';
import {useState} from "react";
import RegistCampGround3 from "./Owner/CampGround/RegistCampGround3";
import CampingList from './Owner/CampingList';
import CampingSearchForm from "./Reservation/CampingSearchForm";
import RegistSite from "./Owner/CampGroundSite/RegistSite";
import SiteList from "./Owner/CampGroundSite/SiteList";
import ReservationList from "./Owner/CampGroundSite/ReservationList";
import MyReservationList from "./Guest/MyReservationList";
import Review from "./Guest/Review";
import CampingSiteList from './Owner/CampingSiteList';
import CampingSiteItem from './Owner/CampingSiteItem';
import Test from "./Test";
import DetailAndReview from './Reservation/DetailAndReview';

function App() {
    const [campGroundInfo, setCampGroundInfo] = useState({
            userNo: -1,
            facilitiesInfoNo: -1,
            mannerStartTime: null,
            mannerEndTime: null,
            campGroundImages: "",
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
                <Route path='/' element={<Login/>}></Route>
                <Route path='/Main' element={<Main/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/host/:id' element={<CampingList/>}/>
                <Route path='/RegistCampGround1/:id' element={<RegistCampGroundInfo campGroundInfo={campGroundInfo}
                                                                                    setCampGroundInfo={setCampGroundInfo}/>}/>
                <Route path='/RegistCampGround2' element={<RegistFacilities campGroundInfo={campGroundInfo}
                                                                            setCampGroundInfo={setCampGroundInfo}/>}/>;
                <Route path='/RegistCampGround3' element={<RegistCampGround3 campGroundInfo={campGroundInfo}
                                                                             setCampGroundInfo={setCampGroundInfo}/>}/>;
                <Route path='/SearchCampGround/:guestNo' element={<CampingSearchForm/>}/>
                <Route path='/RegistSite/:hostNo/:campGroundNo' element={<RegistSite/>}/>
                <Route path='/SiteList/:campGroundNo' element={<SiteList/>}/>
                <Route path='/ReservationList/:hostNo' element={<ReservationList/>}/>
                <Route path='/MyReservationList/:guestNo' element={<MyReservationList/>}/>
                <Route path='/Review/:guestNo/:campGroundNo' element={<Review/>}/>
                <Route path='/RegistCampGround1/:id' element={<RegistCampGroundInfo campGroundInfo={campGroundInfo} setCampGroundInfo={setCampGroundInfo} />}/>
                <Route path='/RegistCampGround2' element={<RegistFacilities campGroundInfo={campGroundInfo} setCampGroundInfo={setCampGroundInfo} />}/>;
                <Route path='/RegistCampGround3' element={<RegistCampGround3 campGroundInfo={campGroundInfo} setCampGroundInfo={setCampGroundInfo} />}/>;
                <Route path='/showSiteList/:id/:groundNum' element={<CampingSiteList/>}/>
                <Route path='/showSiteItem' element={<CampingSiteItem/>}/>
                <Route path='/detailAndReview/:id' element={<DetailAndReview/>}/>
            </Routes>
        </div>
    );
}

export default App;

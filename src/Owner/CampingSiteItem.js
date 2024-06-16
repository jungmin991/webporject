export default function CampingSiteItem({site}){
    return (
        <div className="camping-item">
            <div className="camping-item-img">
                <img src={"/uploads/"+site.campGroundImages} alt="camping-img" />
            </div>
            <div>{site.siteName}</div>
            <div className="camping-item-info">
                <div className="camping-item-title">가격 {site.price}</div>
                <div className="camping-item-location">최대 인원 수 {site.peopleNum}</div>
            </div>
        </div>
    );
}
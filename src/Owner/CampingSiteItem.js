export default function CampingSiteItem({site}){
    return (
        <div className="camping-item">
            <div className="camping-item-img">
                <img src={site.img} alt="camping-img" />
            </div>
            <div>{site.siteName}</div>
            <div className="camping-item-info">
                <div className="camping-item-title">{site.price}</div>
                <div className="camping-item-location">{site.peopleNum}</div>
            </div>
        </div>
    );
}
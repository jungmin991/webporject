export default function CampingItem({camping}) {
    return (
        <div className="camping-item">
            <div className="camping-item-img">
                <img src={camping.img} alt="camping-img" />
            </div>
            <div className="camping-item-info">
                <div className="camping-item-title">{camping.name}</div>
                <div className="camping-item-location">{camping.location}</div>
            </div>
        </div>
    );
}
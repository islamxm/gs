import './OrgItem.scss';

const OrgItem = ({image, name}) => {

    return (
        <div className="OrgItem">
            <div className="OrgItem__img">
                <img src={image} alt="" />
            </div>
            <div className="OrgItem__name">
                {name}
            </div>
        </div>
    )
}

export default OrgItem;
import { useEffect } from 'react';
import './OrgItem.scss';
import { useNavigate, useParams } from 'react-router-dom';

const OrgItem = ({
    Address,
    CountTimeStepsPreorder,
    Description,
    Disabled,
    FriTime,
    ID,
    IIkoID,
    IIkoIDTerminal,
    IsHaveDelivery,
    IsHaveLocalOrder,
    ItemOrder,
    Lattitude,
    LocalOrderSale,
    Longitude,
    MinPriceForLocalSale,
    MonTime,
    Name,
    OrganisationBrand,
    Phone,
    SatTime,
    SunTime,
    ThuTime,
    ThumbnailPicture,
    TimeStep,
    TimetableDescription,
    Timezone,
    TueTime,
    WedTime
}) => {
    const nav = useNavigate()
    const {brandId} = useParams()
    

    return (
        <div className="OrgItem" onClick={() => nav(`/organizations/${brandId}/${ID}`)}>
            <div className="OrgItem__img">
                <img src={ThumbnailPicture} alt="" />
            </div>
            <div className="OrgItem__name">
                {Name}
            </div>
        </div>
    )
}

export default OrgItem;
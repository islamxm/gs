import { useEffect } from 'react';
import './OrgItem.scss';
import { useNavigate, useParams } from 'react-router-dom';
import {Col} from 'antd';
import { Draggable } from 'react-beautiful-dnd';
import pl from '../../../../../assets/img/pl-org.png';

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
    WedTime,
    colSpan,
    index
}) => {
    const nav = useNavigate()
    const {brandId} = useParams()

    const url = new URLSearchParams(window.location.search)
    

    return (
        <div className="OrgItem draggable" onClick={() => {
            if(brandId) {
                nav(`/organizations/${brandId}/${ID}?${url.getAll('p').map(item => `p=${item}`).join('&')}&p=${Name}`)
            } else {
                nav(`/organizations/nobrand/${ID}?${url.getAll('p').map(item => `p=${item}`).join('&')}&p=${Name}`)
            }
        }}>
                    <div className="OrgItem__img">
                        <img src={ThumbnailPicture ? ThumbnailPicture : pl} alt="" />
                    </div>
                    <div className="OrgItem__name">
                        {Name}
                    </div>
                </div>
        
        
    )
}

export default OrgItem;
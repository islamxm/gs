import './CatItem.scss';
import Button from '../../../../../components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const CatItem = ({
    AllowedDeliveryTypes,
    CanOverwriteByIIko,
    Disabled,
    HiddenInOrganisations,
    ID,
    IIkoID,
    ItemOrder,
    Name,
    Link,
    selectEdit,
}) => {
    const nav = useNavigate()



    return (
        <div className="CatItem">
            <div className="CatItem__main" onClick={() => nav(Link)}>
                <div className="CatItem__main_name">
                    {Name}
                </div>
            </div>
            <div className="CatItem__action">
                <Button
                    onClick={() => selectEdit({ID, IIkoID, ItemOrder, Name, HiddenInOrganisations, Disabled, CanOverwriteByIIko, AllowedDeliveryTypes})}
                    justify={'center'}
                    styles={{width: '100%'}}
                    text={'Изменить'}/>
            </div>
        </div>
    )
    
}

export default CatItem;
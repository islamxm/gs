import './CatItem.scss';
import Button from '../../../../../components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


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
    const [tm, setTm] = useState(false)

    const clickHandle = () => {
        setTimeout(() => {
            setTm(true)
        }, 200)
    
    }

    const checkClick = () => {
        if(tm) {
            setTm(false)
            return;
        } else {
            nav(Link)
        }
    }

    return (
        <div className="CatItem">
            <div className="CatItem__main" onMouseUp={checkClick} onMouseDown={clickHandle}>
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
import './SubCard.scss';
import Button from '../../../../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import pl from '../../../../../assets/img/pl-plate.png'
import { useState } from 'react';


const SubCard = ({
    ThumbnailPicture,
    ID,
    IIkoID,
    ItemOrder,
    Name,
    Link,
    AllowedDeliveryTypes,
    CanOverwriteByIIko,
    Disabled,
    HiddenInOrganisations,
    Pictures,
    selectEdit,
    
}) => {
    const nav = useNavigate()
    const [tm, setTm] = useState(null)

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
        <div className="SubCard draggable">
            <div className="SubCard__main" onMouseUp={checkClick} onMouseDown={clickHandle}>
                <div className="SubCard__img">
                    <img src={ThumbnailPicture ? ThumbnailPicture : pl} alt="" />
                </div>
                <div className="SubCard__name">
                    {Name}
                </div>
            </div>
            <div className="SubCard__action">
                <Button 
                    onClick={() => selectEdit({
                        ThumbnailPicture,
                        Pictures,
                        ID,
                        IIkoID,
                        ItemOrder,
                        Name,
                        AllowedDeliveryTypes,
                        CanOverwriteByIIko,
                        Disabled,
                        HiddenInOrganisations
                    })} 
                    text={'Изменить'}
                    />
            </div>

        </div>  
    )
}

export default SubCard;
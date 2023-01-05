import './MiniSub.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {Tooltip} from 'antd';
import Button from '../Button/Button';
import pl from '../../assets/img/pl-plate.png';

const MiniSub = ({
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
        <Tooltip
            placement='bottom'
            title={Name}
            >
            <div className="MiniSub" onMouseUp={checkClick} onMouseDown={clickHandle}>
                <div className="MiniSub__main">
                    <div className="MiniSub__main_img">
                        <img src={ThumbnailPicture ? ThumbnailPicture: pl} alt={Name} />
                    </div>
                    <div className="MiniSub__main_name">
                        {Name}
                    </div>
                </div>
                <div className="MiniSub__action">
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
        </Tooltip>
        
    )
}

export default MiniSub;
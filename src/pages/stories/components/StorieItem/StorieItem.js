import './StorieItem.scss';
import img from '../../../../assets/img/org.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const StorieItem = ({
    AllowedDeliveryTypes,
    ButtonActionItemID,
    ButtonText,
    ButtonTypeAction,
    Disabled,
    HiddenInOrganisations,
    HideInApp,
    ID,
    ItemOrder,
    images,
    selectStorie,
    openStorie
}) => {
    const nav = useNavigate()
    const [tm, setTm] = useState(false)
    const [time, setTime] = useState()
    

    const clickHandle = () => {
        setTime(setTimeout(() => {
            setTm(true)
        }, 200))
    
    }

    const checkClick = () => {
        if(tm) {
            setTm(false)
            return;
        } else {
            clearTimeout(time)
            // setTm(false)
            selectStorie({
                AllowedDeliveryTypes,
                ButtonActionItemID,
                ButtonText,
                ButtonTypeAction,
                Disabled,
                HiddenInOrganisations,
                HideInApp,
                ID,
                ItemOrder,
                images,
            })
            openStorie()
            // 
            // nav(Link)
        }
    }

    return (
        <div className="StorieItem" onDrag={e => console.log(e)} onMouseUp={checkClick} onMouseDown={clickHandle}>
            <div className="StorieItem__img">
                <img src={images[0]?.PictureThumbnail} alt="" />
            </div>
        </div>
    )
}

export default StorieItem;
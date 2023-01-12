import './MiniStorie.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


const MiniStorie = ({
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
    const [time, setTime] = useState();


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
        }
    }
    return (
        <div className="MiniStorie" onMouseUp={checkClick} onMouseDown={clickHandle}>
            <div className="MiniStorie__img">
                <img src={images[0]?.PictureThumbnail} alt="" />
            </div>
        </div>
    )
}

export default MiniStorie;
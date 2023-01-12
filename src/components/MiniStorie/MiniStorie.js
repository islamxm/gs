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
    selectStorie
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
           console.log('clicked')
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
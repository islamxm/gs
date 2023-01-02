import { useState } from 'react';
import './MiniPlate.scss';
import pl from '../../../../../assets/img/pl-plate.png'
import { Tooltip } from 'antd';

const MiniPlate = ({
    AllowedDeliveryTypes,
    Calories,
    CanOverwriteByIIko,
    Carbohydrates,
    CategoryID,
    Composition,
    CountAdditions,
    Disabled,
    Fats,
    HiddenInOrganisations,
    ID,
    IIkoID,
    IsHit,
    IsNew,
    IsSubCategory,
    ItemOrder,
    MaxCount,
    Name,
    ParentID,
    Pictures,
    Prices,
    Proteins,
    ThumbnailPicture,
    editPlate
}) => {

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
            editPlate(ID, Name)
        }
    }


    return (
        <div className="MiniPlate" onMouseUp={checkClick} onMouseDown={clickHandle}>
            <div className="MiniPlate__img">
                <img src={ThumbnailPicture ? ThumbnailPicture : pl} alt={Name} />
            </div>
            <div className="MiniPlate__body">
                <Tooltip
                    trigger={'hover'}
                    placement={'bottom'}
                    title={Name}
                    >
                    <div className="MiniPlate__body_name">{Name}</div>
                </Tooltip>
                
                <div className="MiniPlate__body_prices">
                    <div className="MiniPlate__body_prices_actual">
                    {Number(Prices[0]?.SalePrice) > 0 ? Prices[0]?.SalePrice : Prices[0]?.Price}₽
                    </div>
                    {
                        Number(Prices[0]?.SalePrice) > 0 ? (
                            <div className="MiniPlate__body_prices_main">{Prices[0]?.Price}₽</div>
                        ) : null
                    }    
                </div>
            </div>
        </div>
    )
}

export default MiniPlate;
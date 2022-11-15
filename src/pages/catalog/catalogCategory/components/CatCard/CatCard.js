import './CatCard.scss';
import img from '../../../../../assets/img/org.png';

const CatCard = ({
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
    return (
        <div className="CatCard draggable" onClick={() => editPlate(ID)}>
            <div className="CatCard__img">
                <img src={ThumbnailPicture} alt="" />
            </div>
            <div className="CatCard__body">
                <div className="CatCard__body_name">
                    {Name}
                </div>
                <div className="CatCard__body_price">
                    <div className="CatCard__body_price_actual">{Number(Prices[0]?.SalePrice) > 0 ? Prices[0]?.SalePrice : Prices[0]?.Price}₽</div>
                    {
                        Number(Prices[0]?.SalePrice) > 0 ? (
                            <div className="CatCard__body_price_main">{Prices[0]?.Price}₽</div>
                        ) : null
                    }                    
                </div>
            </div>
        </div>
    )
}

export default CatCard;
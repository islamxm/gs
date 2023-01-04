import './DishItem.scss';
import img from '../../../../assets/img/org.png';
import pl from '../../../../assets/img/pl-plate.png';

const DishItem = ({
    style,
    ID,
    Name,
    ThumbnailPicture,
    Price
}) => {
    return (
        <div className="DishItem" style={style}>
            <div className="DishItem__img">
                <img src={ThumbnailPicture ? ThumbnailPicture : pl} alt={Name} />
            </div>
            <div className="DishItem__body">
                <div className="DishItem__body_name">
                    {Name}
                </div>
                <div className="DishItem__body_price">
                    {Price ? Price : 0}₽
                </div>

            </div>
        </div>
    )
}

export default DishItem;
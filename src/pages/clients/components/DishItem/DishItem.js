import './DishItem.scss';
import img from '../../../../assets/img/org.png';


const DishItem = ({
    style,
    image,
    name,
    price
}) => {
    return (
        <div className="DishItem" style={style}>
            <div className="DishItem__img">
                <img src={img} alt="" />
            </div>
            <div className="DishItem__body">
                <div className="DishItem__body_name">
                    Название Блюда
                </div>
                <div className="DishItem__body_price">
                    500₽
                </div>

            </div>
        </div>
    )
}

export default DishItem;
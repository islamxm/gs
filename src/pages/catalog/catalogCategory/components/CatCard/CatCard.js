import './CatCard.scss';
import img from '../../../../../assets/img/org.png';

const CatCard = () => {
    return (
        <div className="CatCard">
            <div className="CatCard__img">
                <img src={img} alt="" />
            </div>
            <div className="CatCard__body">
                <div className="CatCard__body_name">
                    Название Блюда
                </div>
                <div className="CatCard__body_price">
                    <div className="CatCard__body_price_actual">500₽</div>
                    <div className="CatCard__body_price_main">500₽</div>
                </div>
            </div>
        </div>
    )
}

export default CatCard;
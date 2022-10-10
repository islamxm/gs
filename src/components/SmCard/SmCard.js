import './SmCard.scss';
import img from '../../assets/img/org.png';


const SmCard = ({name, price, image, style}) => {
    return (
        <div className="SmCard" style={style}>
            <div className="SmCard__img">
                <img src={img} alt="" />
            </div>
            <div className="SmCard__body">
                <div className="SmCard__body_name">{name}</div>
                {
                    price ? (
                        <div className="SmCard__body_price">{price}</div>
                    ) : null
                }
                
            </div>
        </div>
    )
}

export default SmCard;
import './StorieItem.scss';
import img from '../../../../assets/img/org.png';


const StorieItem = () => {
    return (
        <div className="StorieItem">
            <div className="StorieItem__img">
                <img src={img} alt="" />
            </div>
        </div>
    )
}

export default StorieItem;
import './StorieCatItem.scss';
import img from '../../../../assets/img/org.png';

const StorieCatItem = ({style}) => {
    return (
        <div className="StorieCatItem" style={style}>
            <div className="StorieCatItem__img">
                <img src={img} alt="" />
            </div>
            <div className="StorieCatItem__name">
                Название категории
            </div>
        </div>
    )
}

export default StorieCatItem;
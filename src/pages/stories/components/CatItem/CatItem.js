import './CatItem.scss';
import img from '../../../../assets/img/org.png';

const CatItem = ({style}) => {
    return (
        <div className="CatItem" style={style}>
            <div className="CatItem__img">
                <img src={img} alt="" />
            </div>
            <div className="CatItem__name">
                Название категории
            </div>
        </div>
    )
}

export default CatItem;
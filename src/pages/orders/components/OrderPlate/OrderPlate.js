import './OrderPlate.scss';
import img from '../../../../assets/img/org.png';


const OrderPlate = ({mod, comment}) => {
    return (
        <div className="OrderPlate">
            <div className="OrderPlate__main">
                <div className="OrderPlate__main_img">
                    <img src={img} alt="" />
                </div>
                <div className="OrderPlate__main_info">
                    <div className="OrderPlate__main_info_top">
                        <div className="OrderPlate__main_info_top_name">1 x Название Блюда</div>
                        <div className="OrderPlate__main_info_top_ms">100 г</div>
                    </div>
                    <div className="OrderPlate__main_info_price">
                        Цена: 500₽
                    </div>
                </div>
            </div>
            <div className="OrderPlate__body">
                <div className="OrderPlate__body_part">
                    <div className="OrderPlate__body_part_name">Модификаторы</div>
                    <div className="OrderPlate__body_part_value">
                    дывдыв фв фыв ыфв ыфв ыфвф выфвфв ыфв ыфвы выфв фы выфв ыфв ыфв ви оыфвоырфовлрфыов рфлоыволыф 
                    </div>
                </div>
                <div className="OrderPlate__body_part">
                    <div className="OrderPlate__body_part_name">Комментарий</div>
                    <div className="OrderPlate__body_part_value">дывдыв фв фыв ыфв ыфв ыфвф выфвфв ыфв ыфвы выфв фы выфв ыфв ыфв ви оыфвоырфовлрфыов рфлоыволыф </div>
                </div>
            </div>
        </div>
    )
}

export default OrderPlate;
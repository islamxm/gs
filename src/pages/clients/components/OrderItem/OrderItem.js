import './OrderItem.scss';
import checkStatus from '../../../orders/helpers/checkStatus';
import checkDelivery from '../../../orders/helpers/checkDelivery';



const OrderItem = ({
    style, 
    BonusesRecieved,
    BonusesSpent,
    DateCreated,
    DeliveryAddress,
    DeliveryType,
    ID,
    OrderDate,
    Price,
    Status
}) => {
    return (
        <div className="OrderItem" style={style}>
            <div className="OrderItem__head">Заказ №{ID}</div>
            <div className="OrderItem__body">
                <div className="OrderItem__body_item">
                    <div className="OrderItem__body_item_name">Заказано {OrderDate == 'now' ? 'Как можно скорее' : OrderDate}</div>
                    <div className="OrderItem__body_item_value">{Status}</div>
                </div>
                <div className="OrderItem__body_item">
                    <div className="OrderItem__body_item_name">Доставка</div>
                    <div className="OrderItem__body_item_value">{DeliveryAddress}</div>
                </div>
                <div className="OrderItem__body_item">
                    <div className="OrderItem__body_item_name">Статус</div>
                    <div className="OrderItem__body_item_value">{Status}</div>
                </div>
                <div className="OrderItem__body_item">
                    <div className="OrderItem__body_item_name">Бонусов потрачено</div>
                    <div className="OrderItem__body_item_value">{BonusesSpent}</div>
                </div>
            </div>
            <div className="OrderItem__price">
                {Price}₽
            </div>
        </div>
    )
}

export default OrderItem;
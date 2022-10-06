import './OrderItem.scss';

const OrderItem = ({
    style, 
    orderNumber, 
    date, 
    type, 
    address, 
    status, 
    bonus, 
    price
}) => {
    return (
        <div className="OrderItem" style={style}>
            <div className="OrderItem__head">Заказ №134</div>
            <div className="OrderItem__body">
                <div className="OrderItem__body_item">
                    <div className="OrderItem__body_item_name">Заказано 03.03.2022 08:32</div>
                    <div className="OrderItem__body_item_value">Как можно скорее</div>
                </div>
                <div className="OrderItem__body_item">
                    <div className="OrderItem__body_item_name">Доставка</div>
                    <div className="OrderItem__body_item_value">ул. Ленина, д. 102, кв. 14, этаж 3</div>
                </div>
                <div className="OrderItem__body_item">
                    <div className="OrderItem__body_item_name">Статус</div>
                    <div className="OrderItem__body_item_value">В ожидании</div>
                </div>
                <div className="OrderItem__body_item">
                    <div className="OrderItem__body_item_name">Бонусов потрачено</div>
                    <div className="OrderItem__body_item_value">34</div>
                </div>
            </div>
            <div className="OrderItem__price">
                2 345₽
            </div>
        </div>
    )
}

export default OrderItem;
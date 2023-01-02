import './OrdersInfo.scss';
import Input from '../../../../components/Input/Input';
import { useState } from 'react';

const OrdersInfo = ({
    total,
    price,
    onSearch,
    value,
    setValue
}) => {




    return (
        <div className="OrdersInfo">
            <div className="OrdersInfo__item OrdersInfo__item-input">
                <Input
                    maskType={String}
                    placeholder={'Поиск'}
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    />
            </div>
            <div className="OrdersInfo__item">
            Всего заказов: {total}
            </div>
            <div className="OrdersInfo__item">
            На сумму: {price} ₽
            </div>
        </div>
    )
}

export default OrdersInfo;
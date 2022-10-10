import './OrderInfo.scss';

import {  Modal } from 'antd';
import Input from '../../../../components/Input/Input';
import {Row, Col} from 'antd';
import Pl from '../../../../components/Pl/Pl';
import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';
import { useState } from 'react';
import DropCollapse from '../../../../components/DropCollapse/DropCollapse';
import OrderPlate from '../../components/OrderPlate/OrderPlate';
import OrderExList from '../../components/OrderExList/OrderExList';

const dataMock = [
    {
        label: 'Клиент',
        value: 'Иван'
    },
    {
        label: 'Цена',
        value: '2 434₽'
    },
    {
        label: 'Цена со скидкой',
        value: '2 134₽'
    },
    {
        label: 'Бонусов потрачено',
        value: '67'
    },
    {
        label: 'Бонусов у клиента',
        value: '340'
    },
    {
        label: 'Тип доставки',
        value: 'Самовывоз'
    },
    {
        label: 'Ресторан',
        value: 'Ресторан 1',
    },
    {
        label: 'Дата заказа',
        value: '03.03.2022 08:10'
    },
    {
        label: 'Дата подачи',
        value: 'Как можно быстрее'
    },
    {
        label: 'Комментарий',
        value: 'дывдыв фв фыв ыфв ыфв ыфвф выфвфв ыфв ыфвы выфв фы выфв ыфв ыфв ви оыфвоырфовлрфыов рфлоыволыф '
    },
    {
        label: 'Промокод',
        value: 'FREE'
    },
    {
        label: 'Подарок',
        value: 'Подарок 1'
    },
    {
        label: 'Способ оплаты',
        value: 'Наличными'
    },
    {
        label: 'Сдача с',
        value: '2 000₽'
    }
]

const exMock = [
    {value: '1 x Васаби'},
    {value: '1 x Имбирь'},
]

const plMock = [
    {value: '1 x Вилки'},
    {value: '1 x Ложки'}
]


const OrderInfo = ({visible, close, order}) => {

    const closeHandle = () => {
        close();
    }


    return (
        <Modal className='Modal OrderInfo' width={1200} open={visible} onCancel={closeHandle}>
            <h2 className="Modal__head">Заказ {order}</h2>
            <div className="Modal__form">
                <Row gutter={[30, 0]}>
                    <Col span={8}>
                        <div className="OrderInfo__main panel">
                            {
                                dataMock?.length > 0 ? (
                                    dataMock.map((item, index) => (
                                        <div className="OrderInfo__main_item">
                                            <div className="OrderInfo__main_item_name">{item.label}</div>
                                            <div className="OrderInfo__main_item_value">{item.value}</div>
                                        </div>
                                    ))
                                ) : null
                            }
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className="OrderInfo__md">
                            <Col span={24}>
                                <Row style={{display: 'flex', alignItems: 'flex-start', flexWrap: 'nowrap'}}>
                                    <span style={{color: '#989898', width: '100px', fontWeight: '600', paddingTop: 20}}>Статус</span>
                                    <DropCollapse styles={{width: '100%'}} beforeIcon value={'Новый'}/>
                                </Row>
                                <Row style={{display: 'flex', alignItems: 'flex-start', flexWrap: 'nowrap'}}>
                                    <span style={{color: '#989898', width: '100px', fontWeight: '600', paddingTop: 20}}>Оплата</span>
                                    <DropCollapse styles={{width: '100%'}} beforeIcon value={'Оплачено'}/>
                                </Row>
                            </Col>
                            <Col span={24}>
                                <div style={{fontWeight: 600, color: '#989898', marginBottom: '15px'}}>Блюда заказа</div>
                                <OrderPlate/>
                                <OrderPlate/>
                            </Col>
                        </div>
                    </Col>
                    <Col span={8}>
                        <OrderExList list={exMock} name={'Дополнения к заказу'}/>
                        <OrderExList list={plMock} name={'Столовые приборы'}/>
                    </Col>
                </Row>
            </div>
        </Modal>
    )
}

export default OrderInfo;
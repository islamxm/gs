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
import { useEffect } from 'react';
import checkPay from '../../helpers/checkPay';
import checkDelivery from '../../helpers/checkDelivery';
import { useSelector } from 'react-redux';
import anService from '../../../../services/anService';
import checkStatus from '../../helpers/checkStatus';


const anl = new anService();

const statuses = [
    {
        value: 'Новый',
        ID: 1
    },
    {
        value: 'Не оплачен',
        ID: 2
    },
    {
        value: 'В работе',
        ID: 3
    },
    {
        value: 'Отменен',
        ID: 4
    },
    {
        value: 'Завершен',
        ID: 5
    },
    {
        value: 'Оплачено',
        ID: 6
    },
    
]

const pays = [
    {
        value: 'Оплачено',
        ID: '1'
    },
    {
        value: 'Не оплачено',
        ID: '0'
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


const OrderInfo = ({visible, close, order, data, updateList}) => {
    const {token} = useSelector(state => state)
    const [dataL, setDataL] = useState(null)
    const [orderPlates, setOrderPlates] = useState([])

    useEffect(() => {
        if(data) {
            console.log(data)
            setDataL(data)
            setOrderPlates(data.Plates)
        }
    }, [data])


    const closeHandle = () => {
        close();
    }

    const editStatus = (status, index, id) => {
   
        anl.editOrderStatus(token, {OrderID: dataL?.ID, Status: id}).then(res => {
            if(res.error === false) {
                setDataL(state => {
                    return {
                        ...state,
                        Status: id
                    }
                })
                updateList()
            } else {
                console.log('error when pay status edit')
            }
        })
    }

    const editPay = (value, index, id) => {
        anl.editOrderPaidStatus(token, {OrderID: dataL?.ID, Status: id}).then(res => {
            if(res.error === false) {
                setDataL(state => {
                    return {
                        ...state,
                        IsPaid: id
                    }
                })
                updateList()
            } else {
                console.log('error when pay status edit')
            }
        })
    
    }
    


    return (
        <Modal className='Modal OrderInfo' width={dataL?.Additions.length == 0 &&  dataL?.Cutlery.length == 0 ? 800 : 1200} open={visible} onCancel={closeHandle}>
            <h2 className="Modal__head">Заказ №{dataL?.ID}</h2>
            <div className="Modal__form">
                <Row gutter={[30, 0]}>
                    <Col span={dataL?.Additions.length == 0 &&  dataL?.Cutlery.length == 0 ? 12 : 8}>
                        <div className="OrderInfo__main panel">
                            {
                                dataL?.UserName != '0' && dataL?.UserName != '' ? (
                                    <div className="OrderInfo__main_item">
                                        <div className="OrderInfo__main_item_name">Клиент</div>
                                        <div className="OrderInfo__main_item_value">{dataL?.UserName}</div>
                                    </div>
                                ) : null
                            }
                            {
                                dataL?.UserPhone != '0' && dataL?.UserPhone != '' ? (
                                    <div className="OrderInfo__main_item">
                                        <div className="OrderInfo__main_item_name">Телефон</div>
                                        <div className="OrderInfo__main_item_value">{dataL?.UserPhone}</div>
                                    </div>
                                ) : null
                            }
                            {
                                dataL?.Price != '0' && dataL?.Price != '' ? (
                                    <div className="OrderInfo__main_item">
                                        <div className="OrderInfo__main_item_name">Цена</div>
                                        <div className="OrderInfo__main_item_value">{dataL?.Price}₽</div>
                                    </div>
                                ) : null
                            }
                            {
                                dataL?.SalePrice != '0' && dataL?.SalePrice != '' ? (
                                    <div className="OrderInfo__main_item">
                                        <div className="OrderInfo__main_item_name">Цена со скидкой</div>
                                        <div className="OrderInfo__main_item_value">{dataL?.SalePrice}₽</div>
                                    </div>
                                ) : null
                            }
                            {
                                dataL?.BonusesSpent != '0' && dataL?.BonusesSpent != '' ? (
                                    <div className="OrderInfo__main_item">
                                        <div className="OrderInfo__main_item_name">Бонусов потрачено</div>
                                        <div className="OrderInfo__main_item_value">{dataL?.BonusesSpent}</div>
                                    </div>
                                ) : null
                            }
                            {
                                dataL?.BonusesHad != '0' && dataL?.BonusesHad != '' ? (
                                    <div className="OrderInfo__main_item">
                                        <div className="OrderInfo__main_item_name">Бонусов у клиента</div>
                                        <div className="OrderInfo__main_item_value">{dataL?.BonusesHad}</div>
                                    </div>
                                ) : null
                            }
                            <div className="OrderInfo__main_item">
                                <div className="OrderInfo__main_item_name">Тип доставки</div>
                                <div className="OrderInfo__main_item_value">{checkDelivery(Number(dataL?.DeliveryType))}</div>
                            </div>
                            <div className="OrderInfo__main_item">
                                <div className="OrderInfo__main_item_name">Ресторан</div>
                                <div className="OrderInfo__main_item_value">{dataL?.OrganisationID}</div>
                            </div>
                            {
                                dataL?.DateCreated ? (
                                    <div className="OrderInfo__main_item">
                                        <div className="OrderInfo__main_item_name">Дата заказа</div>
                                        <div className="OrderInfo__main_item_value">{dataL?.DateCreated}</div>
                                    </div>
                                ) : null
                            }
                            
                            <div className="OrderInfo__main_item">
                                <div className="OrderInfo__main_item_name">Дата подачи</div>
                                <div className="OrderInfo__main_item_value">{dataL?.OrderDate == 'now' ? 'как можно быстрее' : dataL?.OrderDate}</div>
                            </div>
                            {
                                dataL?.Comment != '0' && dataL?.Comment != '' ? (
                                    <div className="OrderInfo__main_item">
                                        <div className="OrderInfo__main_item_name">Комментарий</div>
                                        <div className="OrderInfo__main_item_value">{dataL?.Comment}</div>
                                    </div>
                                ) : null
                            }
                            {
                                dataL?.Promocode != '0' && dataL?.Promocode != '' ? (
                                    <div className="OrderInfo__main_item">
                                        <div className="OrderInfo__main_item_name">Промокод</div>
                                        <div className="OrderInfo__main_item_value">{dataL?.Promocode}</div>
                                    </div>
                                ) : null
                            }
                            {
                                dataL?.GiftID != '0' && dataL?.GiftID != ''  ? (
                                    <div className="OrderInfo__main_item">
                                        <div className="OrderInfo__main_item_name">Подарок</div>
                                        <div className="OrderInfo__main_item_value">{dataL?.GiftID}</div>
                                    </div>
                                ) : null
                            }
                            
                            <div className="OrderInfo__main_item">
                                <div className="OrderInfo__main_item_name">Способ оплаты</div>
                                <div className="OrderInfo__main_item_value">{checkPay(Number(dataL?.PayType))}</div>
                            </div>
                            {
                                dataL?.CountCashChange != '0' && dataL?.CountCashChange != '' ? (
                                    <div className="OrderInfo__main_item">
                                        <div className="OrderInfo__main_item_name">Сдача с</div>
                                        <div className="OrderInfo__main_item_value">{dataL?.CountCashChange}₽</div>
                                    </div>
                                ) : null
                            }
                            {
                                dataL?.CountPaidAdditions != '0' && dataL?.CountPaidAdditions != '' ? (
                                    <div className="OrderInfo__main_item">
                                        <div className="OrderInfo__main_item_name">Количество платных дополнений</div>
                                        <div className="OrderInfo__main_item_value">{dataL?.CountPaidAdditions}</div>
                                    </div>
                                ) : null
                            }
                        </div>
                    </Col>
                    <Col span={dataL?.Additions.length == 0 &&  dataL?.Cutlery.length == 0 ? 12 : 8}>
                        <div className="OrderInfo__md">
                            <Col span={24}>
                                <Row style={{display: 'flex', alignItems: 'flex-start', flexWrap: 'nowrap'}}>
                                    <span style={{color: '#989898', width: '100px', fontWeight: '600', paddingTop: 20}}>Статус</span>
                                    <DropCollapse 
                                        selectItem={editStatus}
                                        list={statuses} 
                                        shadow={true} 
                                        styles={{width: '100%'}} 
                                        beforeIcon 
                                        value={checkStatus(Number(dataL?.Status)).name}/>
                                </Row>
                                <Row style={{display: 'flex', alignItems: 'flex-start', flexWrap: 'nowrap'}}>
                                    <span style={{color: '#989898', width: '100px', fontWeight: '600', paddingTop: 20}}>Оплата</span>
                                    <DropCollapse 
                                        selectItem={editPay}
                                        list={pays} 
                                        shadow={true} 
                                        styles={{width: '100%'}} 
                                        beforeIcon 
                                        value={dataL?.IsPaid == '1' ? 'Оплачено' : 'Не оплачено'}/>
                                </Row>
                            </Col>
                            {
                                orderPlates?.length > 0 ? (
                                    <Col span={24}>
                                        <div style={{fontWeight: 600, color: '#989898', marginBottom: '15px'}}>Блюда заказа</div>
                                        {
                                            orderPlates?.length > 0 ? (
                                                orderPlates.map((item, index) => (
                                                    <OrderPlate
                                                        key={index}
                                                        {...item}
                                                        />
                                                ))
                                            ) : null
                                        }
                                    </Col>
                                ) : null
                            }
                            
                        </div>
                    </Col>
                    {
                        dataL?.Additions.length == 0 && dataL?.Cutlery.length == 0 ? (
                            null
                        ) : (
                            <Col span={8}>
                                {
                                    dataL?.Additions.length > 0 ? (
                                        <OrderExList list={dataL?.Additions} name={'Дополнения к заказу'}/>
                                    ) : null
                                }
                                {
                                    dataL?.Cutlery.length > 0 ? (
                                        <OrderExList list={dataL?.Cutlery} name={'Столовые приборы'}/>
                                    ) : null
                                }
                                
                            </Col>
                        )
                    }
                    
                </Row>
            </div>
        </Modal>
    )
}

export default OrderInfo;
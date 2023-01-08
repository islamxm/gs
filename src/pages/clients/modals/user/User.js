import './User.scss';
import {  Modal } from 'antd';
import Input from '../../../../components/Input/Input';
import {Row, Col} from 'antd';
import Pl from '../../../../components/Pl/Pl';
import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';
import { useState } from 'react';
import {BsLightningCharge} from 'react-icons/bs';
import OrderItem from '../../components/OrderItem/OrderItem';
import DishItem from '../../components/DishItem/DishItem';
import { useEffect } from 'react';
import anService from '../../../../services/anService';
import { useSelector } from 'react-redux';
import Discount from '../discount/Discount';
import moment from 'moment';
import Push from '../push/Push';
import Email from '../email/Email';
import { useCallback } from 'react';


const anl = new anService();


const User = ({
    visible, 
    close, 
    updateList,
    data
}) => {
    const {token} = useSelector(state => state)
    const [discount, setDiscount] = useState(false)
    const [push, setPush] = useState(false)
    const [email, setEmail] = useState(false)
    const [sale, setSale]= useState(0)
    const [message, setMessage] = useState('')
    const [date, setDate] = useState('')
    const [addLoad, setAddLoad] = useState(false)
    const [removeLoad, setRemoveLoad] = useState(false)
    const [pushLoad, setPushLoad] = useState(false)
    const [emailLoad, setEmailLoad] = useState(false)


    const closeDiscount = () => setDiscount(false)
    const openDiscount = () => setDiscount(true)
    
    const closePush = () => setPush(false)
    const openPush = () => setPush(true)

    const closeEmail = () => setEmail(false)
    const openEmail = () => setEmail(true)

    useEffect(() => {
        if(data) {
            setSale(data.PersonalSale)
            setMessage(data.PersonalSaleMessage)
            setDate(data.PersonalSaleDeadline)
        }
    }, [data])

    const addDiscount = useCallback((body) => {
        setAddLoad(true)
        anl.setPersonalSale(token, {
            ...body,
            StopDate: moment(body.StopDate).format('YYYY-MM-DD'),
            UserID: data.ID
        }).then(res => {
            console.log(res)
            if(!res.error) {
                closeDiscount()
                setMessage(body.Message)
                setSale(body.Sale)
                setDate(moment(body.StopDate).format('YYYY-MM-DD'))
                updateList()
            }
        }).finally(_ => setAddLoad(false))
    }, [data])

    const removeDiscount = () => {
        setRemoveLoad(true)
        anl.removePersonalSale(token, data.ID).then(res => {
            if(!res.error) {
                setMessage('')
                setSale(0)
                setDate('')
                updateList()
            }
        }).finally(_ => setRemoveLoad(false))
    }

    const closeHandle = () => {
        close();
        setSale(0)
        setMessage('')
        setDate('')
    }

   

    const sendPush = (body) => {
        setPushLoad(true)
        anl.sendPushToUsers(token, {
            UsersID: [data.ID],
            ...body 
        }).then(res => {
            if(!res.error) {
                closePush()
            } else {
                //handle error
            }
        }).finally(_ => {
            setPushLoad(false)
        })
    }


    const sendMail = (body) => {
        setEmailLoad(true)
        anl.sendMailToUsers(token, {
            UsersID: [data.ID],
            ...body
        }).then(res => {
            if(!res.error) {
                closeEmail()
            } else {
                //handle error
            }
        })
    }


    


    return (
        <Modal className='Modal' width={700} open={visible} onCancel={closeHandle}>
            <Discount
                load={addLoad}
                visible={discount}
                close={closeDiscount}
                onSave={addDiscount}
                updateList={updateList}
                />
            <Push
                load={pushLoad}
                visible={push}
                close={closePush}
                onSave={sendPush}
                />
            <Email
                visible={email}
                close={closeEmail}
                onSave={sendMail}
                load={emailLoad}
                />
            <div className="User">
                <Row
                    gutter={[20, 20]}
                    >
                    <Col span={24}>
                        <div className="User__name">
                            {data?.Name ? data.Name : 'Не указано'} <div className="User__name_badge">{data?.Bonuses} <BsLightningCharge/></div>
                        </div>
                    </Col>
                    <Col span={24}>
                        <div className="User__body">
                            <Row gutter={[10, 10]}>
                                <Col span={24}>
                                    <div className="User__body_info">
                                        <Row gutter={[10,10]}>
                                            <Col span={24}>
                                                <div className="User__body_info_item">
                                                    <div className="User__body_info_item_label">E-mail</div>
                                                    <Input maskType={String} shadow readOnly value={data?.Email ? data.Email : 'Не указано'}/>
                                                </div>
                                            </Col>
                                            <Col span={24}>
                                                <div className="User__body_info_item">
                                                    <div className="User__body_info_item_label">Телефон</div>
                                                    <Input maskType={String}  shadow readOnly value={data?.Phone ? data.Phone : 'Не указано'}/>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                                {
                                    sale != 0 ? (
                                        <Col span={24}>
                                            <div className="User__body_discount">
                                                <div className="User__body_discount_label">Персональная скидка</div>
                                                
                                                <div className="User__body_discount_item">
                                                    <div className="User__body_discount_item_value">
                                                    {sale}% до {date} {message}
                                                    </div>
                                                    <div className="User__body_discount_item_action">
                                                        <Button 
                                                            load={removeLoad}
                                                            onClick={removeDiscount} 
                                                            before={<BsTrash/>} 
                                                            variant={'danger'} 
                                                            text={'Удалить'}/>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </Col>
                                    ) : (
                                        null
                                    )
                                }
                                {
                                    data?.LastOrders?.length > 0 ? (
                                        <Col span={24}>
                                            <div className="User__body_list">
                                                <div className="User__body_list_head">Последние заказы:</div>
                                                <div className="User__body_list_in">
                                                    {
                                                        data?.LastOrders.map((item, index) => (
                                                            <div className="User__body_list_item" style={{width: 260}}>
                                                                <OrderItem
                                                                    {...item}
                                                                    />
                                                            </div>
                                                        ))  
                                                    }
                                                    
                                                    
                                                </div>
                                            </div>
                                        </Col>
                                    ) : null
                                }
                                {
                                    data?.PersonalRecomendations?.length > 0 ? (
                                        <Col span={24}>
                                            <div className="User__body_list">
                                                <div className="User__body_list_head">Персональные рекомендации</div>
                                                <div className="User__body_list_in">
                                                    {
                                                        data.PersonalRecomendations.map((item, index) => (
                                                            <div className="User__body_list_item" style={{width: 260}}>
                                                                <DishItem
                                                                    {...item}
                                                                    />
                                                            </div>
                                                        ))
                                                    }
                                                    
                                                    
                                                </div>
                                            </div>
                                        </Col>
                                    ) : null
                                }
                                {
                                    data?.FavoritePlates?.length > 0 ? (
                                        <Col span={24}>
                                            <div className="User__body_list">
                                                <div className="User__body_list_head">Блюда в избранном</div>
                                                <div className="User__body_list_in">
                                                    {
                                                        data.FavoritePlates.map((item, index) => (
                                                            <div className="User__body_list_item" style={{width: 260}}>
                                                                <DishItem
                                                                    {...item}
                                                                    />
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </Col>
                                    ) : null
                                }
                            </Row>
                            
                        </div>
                    </Col>
                    <Col span={24}>
                        <div className="User__action">
                            <Button
                                onClick={openPush} 
                                styles={{marginRight: 15}} 
                                text={'Отправить Push-уведомление'} 
                                justify={'center'}/>
                            <Button
                                onClick={openEmail} 
                                styles={{marginRight: 15}} 
                                text={'Отправить E-mail'} 
                                justify={'center'}/>
                            {
                                sale == 0 ? (
                                    <Button onClick={openDiscount}  text={'Сделать скидку'} justify={'center'}/>
                                ) : null
                            }
                            
                        </div>
                    </Col>
                </Row>
                
                
                
            </div>
        </Modal>
    )
}

export default User;
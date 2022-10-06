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


const User = ({visible, close, name, bonus, phone, addDiscount}) => {

    const closeHandle = () => {
        close();
    }


    return (
        <Modal className='Modal' width={700} open={visible} onCancel={closeHandle}>
            <div className="User">
                <div className="User__name">
                    {name} <div className="User__name_badge">{bonus} <BsLightningCharge/></div>
                </div>
                <div className="User__body">
                    <div className="User__body_info">
                        <div className="User__body_info_item">
                            <div className="User__body_info_item_label">E-mail</div>
                            <Input shadow readOnly value={'example@example.com'}/>
                        </div>
                        <div className="User__body_info_item">
                            <div className="User__body_info_item_label">Телефон</div>
                            <Input shadow readOnly value={phone}/>
                        </div>
                    </div>
                    <div className="User__body_discount">
                        <div className="User__body_discount_label">Персональная скидка</div>
                        <div className="User__body_discount_item">
                            <div className="User__body_discount_item_value">
                            20% до 02.10.2022 (Просим прощения за холодное блюдо...
                            </div>
                            <div className="User__body_discount_item_action">
                                <Button before={<BsTrash/>} variant={'danger'} text={'Удалить'}/>
                            </div>
                        </div>
                        {/* <div className="User__body_discount_empty">

                        </div> */}
                    </div>
                    <div className="User__body_list">
                        <div className="User__body_list_head">Последние заказы:</div>
                        <div className="User__body_list_in">
                            <div className="User__body_list_item" style={{width: 260}}>
                                <OrderItem/>
                            </div>
                            <div className="User__body_list_item" style={{width: 260}}>
                                <OrderItem/>
                            </div>
                            <div className="User__body_list_item" style={{width: 260}}>
                                <OrderItem/>
                            </div>
                        </div>
                    </div>
                    <div className="User__body_list">
                        <div className="User__body_list_head">Персональные рекомендации</div>
                        <div className="User__body_list_in">
                            <div className="User__body_list_item" style={{width: 260}}>
                                <DishItem/>
                            </div>
                            <div className="User__body_list_item" style={{width: 260}}>
                                <DishItem/>
                            </div>
                            <div className="User__body_list_item" style={{width: 260}}>
                                <DishItem/>
                            </div>
                        </div>
                    </div>
                    <div className="User__body_list">
                        <div className="User__body_list_head">Блюда в избранном</div>
                        <div className="User__body_list_in">
                            <div className="User__body_list_item" style={{width: 260}}>
                                <DishItem/>
                            </div>
                            <div className="User__body_list_item" style={{width: 260}}>
                                <DishItem/>
                            </div>
                            <div className="User__body_list_item" style={{width: 260}}>
                                <DishItem/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="User__action">
                    <Button styles={{marginRight: 15}} text={'Отправить Push-уведомление'} justify={'center'}/>
                    <Button styles={{marginRight: 15}} text={'Отправить E-mail'} justify={'center'}/>
                    <Button onClick={addDiscount}  text={'Сделать скидку'} justify={'center'}/>
                </div>
            </div>
        </Modal>
    )
}

export default User;
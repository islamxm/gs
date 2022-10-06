import './Discount.scss';

import {  Modal } from 'antd';
import Input from '../../../../components/Input/Input';
import {Row, Col} from 'antd';
import Pl from '../../../../components/Pl/Pl';
import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';
import { useState } from 'react';


const Discount = ({visible, close}) => {

    const closeHandle = () => {
        close();
    }


    return (
        <Modal className='Modal' width={600} open={visible} onCancel={closeHandle}>
            <h2 className="Modal__head">Персональная скидка</h2>
            <div className="Modal__form">
                <div className="Modal__form_row">
                    <Input placeholder={'Скидка (%)'}/>
                </div>
                <div className="Modal__form_row">
                    <Input placeholder={'Сообщение пользователю'}/>
                </div>
                <div className="Modal__form_row">
                    тут должен быть datepicker
                </div>
                <div className="Modal__form_action">
                    <Button text={'Сделать скидку'}/>
                </div>
            </div>
        </Modal>
    )
}

export default Discount;
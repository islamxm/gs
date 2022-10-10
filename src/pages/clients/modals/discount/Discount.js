import './Discount.scss';

import {  Modal } from 'antd';
import Input from '../../../../components/Input/Input';
import {Row, Col} from 'antd';
import Pl from '../../../../components/Pl/Pl';
import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';
import { useEffect, useState } from 'react';

import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru';

registerLocale('ru', ru);


const Discount = ({visible, close}) => {

    const [date, setDate] = useState(null);

    const closeHandle = () => {
        close();
    }


    return (
        <Modal className='Modal Discount' width={600} open={visible} onCancel={closeHandle}>
            <h2 className="Modal__head">Персональная скидка</h2>
            <div className="Modal__form">
                <div className="Modal__form_row">
                    <Input placeholder={'Скидка (%)'}/>
                </div>
                <div className="Modal__form_row">
                    <Input placeholder={'Сообщение пользователю'}/>
                </div>
                <div className="Modal__form_row gs-datepicker">
                    <DatePicker selected={date} onChange={(d) => setDate(d)} locale={'ru'} placeholderText="Дата окончания"/>
                </div>
                <div className="Modal__form_action">
                    <Button text={'Сделать скидку'}/>
                </div>
            </div>
        </Modal>
    )
}

export default Discount;
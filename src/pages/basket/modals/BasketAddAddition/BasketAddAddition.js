import {  Modal } from 'antd';
import Input from '../../../../components/Input/Input';
import {Row, Col} from 'antd';
import Pl from '../../../../components/Pl/Pl';
import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';
import { useState } from 'react';

const BasketAddAddition  = ({visible, close}) => {

    const handleClose = () => {
        close();
    }
    
    return (
        <Modal width={600} className='Modal' open={visible} onCancel={handleClose}>
            <h2 className="Modal__head">Добавить дополнение</h2>
            <form className="Modal__form">
                <div className="Modal__form_row">
                    <Input placeholder={'Название дополнения'}/>
                </div>
                <div className="Modal__form_row">
                    <Input placeholder={'Максимальное количество'}/>
                </div>
                <div className="Modal__form_action">
                    <Button type={'button'} styles={{paddingTop: 15, paddingBottom: 15}} before={<BsTrash/>} justify={'flex-start'} text={'Сохранить'}/>
                </div>
            </form>
        </Modal>
    )
}

export default BasketAddAddition;
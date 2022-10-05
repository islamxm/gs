import './AddMassModal.scss';
import { Modal } from 'antd';
import Input from '../../../../components/Input/Input';
import {Row, Col} from 'antd';
import Pl from '../../../../components/Pl/Pl';
import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';
import { useState } from 'react';

const AddMassModal = ({visible, close}) => {

    const closeHandle = () => {
        close();
    }

    return (
        <Modal className='Modal' width={700} open={visible} onCancel={closeHandle}>
            <h2 className="Modal__head">Добавить массу</h2>
            <div className="Modal__form">
                <div className="Modal__form_row">
                    <Input placeholder={'Масса'}/>
                </div>
                <div className="Modal__form_row">
                    <Input placeholder={'Цена'}/>
                </div>
                <div className="Modal__form_row">
                    <Input placeholder={'Цена со скидкой'}/>
                </div>
                <div className="Modal__form_action">
                    <Button type={'button'}  before={<BsTrash/>} justify={'flex-start'} text={'Сохранить'}/>
                </div>
            </div>
        </Modal>
    )
}

export default AddMassModal;
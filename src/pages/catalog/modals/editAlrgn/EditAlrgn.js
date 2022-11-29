
import { Modal } from 'antd';
import Input from '../../../../components/Input/Input';
import {Row, Col} from 'antd';
import Pl from '../../../../components/Pl/Pl';
import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';
import { useState } from 'react';


const EditAlrgn = ({visible, close}) => {

    const closeHandle = () => {
        close()
    }

    return (
        <Modal className='Modal' open={visible} onCancel={closeHandle} width={600}>
            <h2 className="Modal__head">Изменить аллерген</h2>
            <div className="Modal__form">
                <div className="Modal__form_row">
                    <Input placeholder={'Название аллергена'}/>
                </div>
                <div className="Modal__form_action">
                    <Button 
                        before={<BsTrash/>} 
                        text={'Сохранить'} 
                        justify={'flex-start'}/>
                    <Button 
                        before={<BsTrash size={20}/>} 
                        text={'Удалить аллерген'} 
                        justify={'flex-start'} 
                        variant={'danger'} 
                        styles={{marginTop: 15}}/>
                </div>
            </div>
        </Modal>
    )
}

export default EditAlrgn;
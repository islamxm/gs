import {  Modal } from 'antd';
import Input from '../../../../components/Input/Input';
import {Row, Col} from 'antd';
import Pl from '../../../../components/Pl/Pl';
import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';
import DropCollapse from '../../../../components/DropCollapse/DropCollapse';
import { useState } from 'react';


const promoTypes = [
    {value: 'Скидка (%)'},
    {value: 'Скидка (₽)'},
    {value: 'Подарок'}
]

const BasketAddPromo = ({visible, close}) => {
    const handleClose = () => {
        close();
    }

    
    return (
        <Modal width={600} className='Modal' open={visible} onCancel={handleClose}>
            <h2 className="Modal__head">Добавить промокод</h2>
            <form className="Modal__form">
                <div className="Modal__form_row">
                    <Input placeholder={'Промокод'}/>
                </div>
                <div className="Modal__form_row">
                    <Input placeholder={'Минимальная сумма заказа'}/>
                </div>
                <div style={{fontWeight: 600, color: '#989898', marginBottom: 10}}>Тип промокода</div>
                <div className="Modal__form_row">
                    <DropCollapse list={promoTypes} value={promoTypes[0].value} beforeIcon/>
                </div>
                <div className="Modal__form_row">
                    <Input placeholder={'Скидка'}/>
                </div>
                <div className="Modal__form_action">
                    <Button 
                        type={'button'} 
                        styles={{paddingTop: 15, paddingBottom: 15}} 
                        before={<BsTrash/>} 
                        justify={'flex-start'} 
                        text={'Сохранить'}/>
                    
                </div>
            </form>
        </Modal>
    )
}

export default BasketAddPromo;
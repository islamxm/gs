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

const BasketEditGift = ({visible, close}) => {
    const [prevImg, setPrevImg] = useState(null);
    const handleClose = () => {
        close();
    }
    const imgHandle = (e) => {
        setPrevImg(URL.createObjectURL(e.target.files[0]))
    }

    
    return (
        <Modal width={600} className='Modal' open={visible} onCancel={handleClose}>
            <h2 className="Modal__head">Добавить подарок</h2>
            <form className="Modal__form">
                <div className="Modal__form_row">
                    <div className="Modal__form_upload">
                        {
                            prevImg ? (
                                <div className="Modal__form_upload_prev">
                                    <img src={prevImg} alt="" />
                                </div>
                            ) : (
                                <>
                                <input onChange={imgHandle} type="file" id='uploadBrandImg'/>
                                <label htmlFor='uploadBrandImg' className="Modal__form_upload_label">

                                    <span className="Modal__form_upload_label_text">
                                    Выбрать картинку
                                    </span>

                                </label>
                                </>
                            )
                        }
                        
                    </div>
                </div>
                <div className="Modal__form_row">
                    <Input placeholder={'Название подарка'}/>
                </div>
                <div className="Modal__form_row">
                    <Input placeholder={'Минимальная сумма заказа'}/>
                </div>
                
                <div className="Modal__form_action">
                    <Button 
                        type={'button'} 
                        styles={{paddingTop: 15, paddingBottom: 15, marginBottom: 10}} 
                        before={<BsTrash/>} 
                        justify={'flex-start'} 
                        text={'Сохранить'}/>
                    <Button 
                        type={'button'} 
                        styles={{paddingTop: 15, paddingBottom: 15}} 
                        before={<BsTrash/>} 
                        justify={'flex-start'} 
                        text={'Удалить дополнение'}
                        variant={'danger'}/>
                    
                </div>
            </form>
        </Modal>
    )
}

export default BasketEditGift;
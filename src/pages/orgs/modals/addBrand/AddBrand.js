import './AddBrand.scss';
import {  Modal } from 'antd';
import Input from '../../../../components/Input/Input';
import {Row, Col} from 'antd';
import Pl from '../../../../components/Pl/Pl';
import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';
import { useState } from 'react';

const AddBrand  = ({visible, close}) => {
    const [prevImg, setPrevImg] = useState(null);

    const handleClose = () => {
        setPrevImg('')
        close();
    }

    const imgHandle = (e) => {
        setPrevImg(URL.createObjectURL(e.target.files[0]))
    }
    
    return (
        <Modal width={740} className='Modal' open={visible} onCancel={handleClose}>
            <h2 className="Modal__head">Добавить бренд</h2>
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
                                        Выбрать логотип
                                    </span>

                                </label>
                                </>
                            )
                        }
                        
                    </div>
                </div>
                <div className="Modal__form_row">
                    <Input placeholder={'Название категории'}/>
                </div>
                <div className="Modal__form_action">
                    <Button type={'button'} styles={{paddingTop: 20, paddingBottom: 20}} before={<BsTrash/>} justify={'flex-start'} text={'Сохранить'}/>
                </div>
            </form>
        </Modal>
    )
}

export default AddBrand;
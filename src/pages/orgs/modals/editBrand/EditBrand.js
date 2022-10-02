import './EditBrand.scss';

import {  Modal } from 'antd';
import Input from '../../../../components/Input/Input';
import {Row, Col} from 'antd';
import Pl from '../../../../components/Pl/Pl';
import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';
import { useState } from 'react';
import brandImg from '../../../../assets/img/org-brand.png';

const EditBrand  = ({visible, close, name, image}) => {
    const [prevImg, setPrevImg] = useState(brandImg);

    const handleClose = () => {
        setPrevImg('')
        close();
    }

    const imgHandle = (e) => {
        setPrevImg(URL.createObjectURL(e.target.files[0]))
    }

    const deleteBrand = () => {

    }
    
    return (
        <Modal width={740} className='Modal' open={visible} onCancel={handleClose}>
            <h2 className="Modal__head">Изменить бренд</h2>
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
                    <Input value={name} placeholder={'Название категории'}/>
                </div>
                <div className="Modal__form_action">
                    <Button 
                        type={'button'} 
                        styles={{paddingTop: 20, paddingBottom: 20, marginBottom: 20}} 
                        before={<BsTrash/>} 
                        justify={'flex-start'} 
                        text={'Сохранить'}/>

                    <Button 
                        onClick={deleteBrand}
                        type={'button'} 
                        styles={{paddingTop: 20, paddingBottom: 20}} 
                        before={<BsTrash/>} 
                        justify={'flex-start'} 
                        text={'Удалить бренд'}
                        variant={'danger'}/>
                </div>
            </form>
        </Modal>
    )
}

export default EditBrand;
import { Modal } from 'antd';
import './CreateCategory.scss';
import { useState, useEffect } from 'react';
import Input from '../../../../components/Input/Input';
import Button from '../../../../components/Button/Button';
import DropCollapse from '../../../../components/DropCollapse/DropCollapse';
import Checkbox from '../../../../components/Checkbox/Checkbox';
import {BsTrash} from 'react-icons/bs';
import Pl from '../../../../components/Pl/Pl';

// orgsMock = [
//     {
//         value: 'Ресторан 1'
//     },
    
// ]

const CreateCategory = ({visible,close}) => {
    const [prevImg, setPrevImg] = useState(null);
    const [orgs, setOrgs] = useState([])

    const handleClose = () => {
        setPrevImg('')
        close();
    }

    const imgHandle = (e) => {
        setPrevImg(URL.createObjectURL(e.target.files[0]))
    }

    
    return (
        <Modal className='Modal' open={visible} width={700} onCancel={handleClose}>
            <h2 className="Modal__head">Добавить категорию</h2>
            <form className="Modal__form">
                <div className="Modal__form_row">
                    <div className="Modal__form_upload" style={{padding: 0, height: 275}}>
                        {
                            prevImg ? (
                                <div className="Modal__form_upload_prev">
                                    <img src={prevImg} alt="" />
                                </div>
                            ) : (
                                <>
                                <input onChange={imgHandle} type="file" id='uploadCategoryImg'/>
                                <label htmlFor='uploadCategoryImg' className="Modal__form_upload_label" style={{padding: 0, maxWidth: 'unset'}}>

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
                    <Input placeholder={'Название категории'}/>
                </div>
                <div className="Modal__form_row">
                    <Input placeholder={'ID в iIko'}/>
                </div>
                <div className="Modal__form_row">
                    <Checkbox  id={'fff'} text={'Скрыть в организациях'}/>
                </div>
                <div className="Modal__form_row">
                    <DropCollapse afterIcon value={'Ресторан 1'} list={[{value: 'Ресторан 1'}, {value: 'Ресторан 2'}]}/>
                </div>
                <div className="Modal__form_row">
                    <Pl text={'Добавить организацию'} style={{backgroundColor: '#fff'}}/>
                </div>
                <div className="Modal__form_action">
                    <Button type={'button'} styles={{paddingTop: 20, paddingBottom: 20}} before={<BsTrash/>} justify={'flex-start'} text={'Сохранить'}/>
                </div>
            </form>
        </Modal>
    )
}

export default CreateCategory;
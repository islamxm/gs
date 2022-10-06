import {  Modal } from 'antd';
import Input from '../../../../components/Input/Input';
import {Row, Col} from 'antd';
import Pl from '../../../../components/Pl/Pl';
import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';
import { useState } from 'react';
import DropCollapse from '../../../../components/DropCollapse/DropCollapse';
import Checkbox from '../../../../components/Checkbox/Checkbox';
import PicItem from '../../components/PicItem/PicItem';
import StorieCatItem from '../../components/StorieCatItem/StorieCatItem';


const SelectCat = ({visible, close}) => {

    return (
        <Modal className='Modal' open={visible} onCancel={close} width={500}>
            <h2 className="Modal__head">Выбрать категорию</h2>
            <div className="Modal__form">
                <div className="Modal__form_row">
                    <Input placeholder={'Поиск категории'}/>
                </div>
                <div className="Modal__form_row" style={{overflowX: 'auto', display: 'flex'}}>
                    <StorieCatItem style={{marginRight: 20}}/>
                    <StorieCatItem style={{marginRight: 20}}/>
                    <Pl text={'Выбрать другую'} style={{backgroundColor: '#fff', height: 'unset'}}/>
                </div>
                <div className="Modal__form_action">
                    <Button text={'Сохранить'} before={<BsTrash/>}/>
                </div>
            </div>
        </Modal>
    )
}

export default SelectCat;
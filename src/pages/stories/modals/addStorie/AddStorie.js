import './AddStorie.scss';

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

const actionsOnBtn = [
    {
        value: 'Открыть категорию',
    },
    {
        value: 'Не показывать кнопку'
    },
    {
        value: 'Открыть подкатегорию'
    },
    {
        value: 'Открыть блюдо'
    }
]


const AddStorie = ({visible, close, selectCat}) => {


    const closeHandle = () => {
        close();
    }


    return (
        <Modal className="Modal" open={visible} width={1000} onCancel={closeHandle}>
            <h2 className="Modal__head">
                Добавить сториз
            </h2>
            <div className="Modal__form">
                <Row gutter={[30, 0]}>
                    <Col span={12}>
                        <Row className="row-custom">
                            <div className="panel" style={{display: 'flex', overflowX: 'auto'}}>
                                
                                <PicItem style={{marginRight: 20}}/>
                                <PicItem style={{marginRight: 20}}/>
                                <PicItem style={{marginRight: 20}}/>
                                <Pl 
                                    style={{height: 200, width: 150, backgroundColor: '#F8F8F8', flex: '0 0 auto'}} 
                                    text={'Добавить картинку сториза'}/>
                            </div>
                        </Row>
                        <Row className="row-custom">
                            <Checkbox text={'Показывать для доставки'} id={'wwww'}/>
                        </Row>
                        <Row className="row-custom">
                            <Checkbox text={'Показывать для самовывоза'} id={'eee'}/>
                        </Row>
                        <Row className="row-custom">
                            <Checkbox text={'Скрыть в организациях'} id={'rrr'}/>
                        </Row>
                        <Row className="row-custom" style={{marginBottom: 0}}>
                            <DropCollapse value={'Ресторан 1'} beforeIcon/>
                        </Row>
                        <Row className="row-custom">
                            <Pl text={'Добавить организацию'} style={{backgroundColor: '#fff'}}/>
                        </Row>
                        <Row className="row-custom">
                            <Button styles={{width: '100%'}} text={'Сохранить'} before={<BsTrash/>}/>
                        </Row>
                        
                    </Col>
                    <Col span={12}>
                        <Row className='row-custom' style={{marginBottom: 0}}>
                            <h3 className="panel-label">Действие при нажатии на кнопку</h3>
                        </Row>
                        <Row className="row-custom" style={{marginBottom: 0}}>
                            <DropCollapse beforeIcon list={actionsOnBtn} value={actionsOnBtn[0].value}/>
                        </Row>
                        <Row className="row-custom">
                            <Pl onClick={selectCat} text={'Выбрать категорию'} style={{justifyContent: 'flex-start', color: '#7B99FF', backgroundColor: '#fff'}}/>
                        </Row>
                        <Row className='row-custom'>
                            <Input placeholder={'Текст на кнопке'}/>
                        </Row>

                    </Col>
                </Row>
            </div>

        </Modal>
    )
}

export default AddStorie;
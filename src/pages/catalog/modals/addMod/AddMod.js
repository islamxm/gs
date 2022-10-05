import './AddMod.scss';
import { Modal } from 'antd';
import Input from '../../../../components/Input/Input';
import {Row, Col} from 'antd';
import Pl from '../../../../components/Pl/Pl';
import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';
import { useState } from 'react';


const AddMod = ({visible, close}) => {

    const closeHandle = () => {
        close();
    }

    return (
        <Modal className='Modal' width={650} open={visible} onCancel={closeHandle}>
            <h2 className="Modal__head">Добавить группу модификаторов</h2>
            <div className="Modal__form">
                <div className="Modal__form_row">
                    <Input placeholder={'Название группы'}/>
                </div>
                <div className="AddMod">
                    <h3 className="AddMod__head panel-label">Список модификаторов</h3>
                    <div className="AddMod__body">
                        <div className="AddMod__body_list">
                            <div className="AddMod__body_item active">
                                <div className="AddMod__body_item_main panel">
                                    <Row gutter={[20, 0]}>
                                        <Col span={14}>
                                            <input type="text" className='AddMod__body_item_name' placeholder='Название'/>
                                        </Col>
                                        <Col span={10}>
                                            <input type="text" className='AddMod__body_item_value' placeholder='Цена'/>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="AddMod__body_item_action">
                                    <Button before={<BsTrash/>} variant={'danger'} text={'Удалить модификатор'} justify={'flex-start'} styles={{padding: 10}}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Pl text={'Добавить модификатор'} style={{backgroundColor: '#fff', marginBottom: 40}}/>
                </div>
                <div className="Modal__form_action">
                    <Button type={'button'}  before={<BsTrash/>} justify={'flex-start'} text={'Сохранить'}/>
                </div>
            </div>
        </Modal>
    )
}

export default AddMod;
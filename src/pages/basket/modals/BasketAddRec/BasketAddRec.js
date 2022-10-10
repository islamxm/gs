import {  Modal } from 'antd';
import Input from '../../../../components/Input/Input';
import {Row, Col} from 'antd';
import Pl from '../../../../components/Pl/Pl';
import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';
import DropCollapse from '../../../../components/DropCollapse/DropCollapse';
import { useState } from 'react';
import SmCard from '../../../../components/SmCard/SmCard';



const BasketAddRec = ({visible, close}) => {
    const handleClose = () => {
        close();
    }

    
    return (
        <Modal width={600} className='Modal' open={visible} onCancel={handleClose}>
            <h2 className="Modal__head">Добавить рекомендованное блюдо</h2>
            <form className="Modal__form">
                <div className="Modal__form_row">
                    <Input placeholder={'Поиск блюда'}/>
                </div>
                {/* <div className="Modal__form_row">
                    <Row gutter={[10, 0]}>
                        <Col span={16}>
                            <SmCard
                                name={'Название Блюда'}
                                price={'500₽'}
                                style={{width: '100%'}}/>
                        </Col>
                        <Col span={8}>
                            <Pl text={'Выбрать другое'} style={{width:'100%',backgroundColor: '#fff'}}/>
                        </Col>
                    </Row>
                   
                </div> */}
                <div className="Modal__form_row" style={{overflowX: 'auto', display: 'flex'}}>
                    <SmCard
                        name={'Название Блюда'}
                        price={'500₽'}
                        style={{marginRight: 10}}/>
                    <SmCard
                        name={'Название Блюда'}
                        price={'500₽'}
                        style={{marginRight: 10}}/>
                    <SmCard
                        name={'Название Блюда'}
                        price={'500₽'}
                        style={{marginRight: 10}}/>
                    
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

export default BasketAddRec;
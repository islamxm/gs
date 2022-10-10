import './BasketPage.scss';
import HeaderProfile from '../../components/HeaderProfile/HeaderProfile';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Col, Row } from 'antd';
import Input from '../../components/Input/Input';
import Pl from '../../components/Pl/Pl';
import BasketExList from './components/BasketExList/BasketExList';
import BasketCutleryList from './components/BasketCutleryList/BasketCutleryList';
import BasketPromo from './components/BasketPromo/BasketPromo';
import BasketRec from './components/BasketRec/BasketRec';
import Button from '../../components/Button/Button';
import { BsTrash } from 'react-icons/bs';
import Checkbox from '../../components/Checkbox/Checkbox';
import BasketOnlinePay from './components/BasketOnlinePay/BasketOnlinePay';
import BasketGift from './components/BasketGift/BasketGift';
import { useState } from 'react';
import BasketTable from './modals/BasketTable/BasketTable';
import BasketTableAdd from './modals/BasketTableAdd/BasketTableAdd';
import BasketTableEdit from './modals/BasketTableEdit/BasketTableEdit';





const BasketPage = () => {
    const [basketTable, setBasketTable] = useState(false);
    const [tableAdd, setTableAdd] = useState(false)
    const [tableEdit, setTableEdit] = useState(false);


    const openBasketTable = () => {
        setBasketTable(true)
    }
    const closeBasketTable = () => {
        setBasketTable(false)
    }

    const openTableAdd = () => {
        setTableAdd(true)
    }
    const closeTableAdd = () => {
        setTableAdd(false)
    }

    const openTableEdit = () => {
        setTableEdit(true)
    }
    const closeTableEdit = () => {
        setTableEdit(false)
    }



    return (
        <div className="BasketPage page">



            <HeaderProfile/>
            <BasketTable visible={basketTable} close={closeBasketTable} editTable={openTableEdit} addTable={openTableAdd}/>
            <BasketTableAdd visible={tableAdd} close={closeTableAdd}/>
            <BasketTableEdit visible={tableEdit} close={closeTableEdit}/>
            <div className="pageBody">
                <Sidebar/>
                <div className="spc"></div>
                <div className="BasketPage__body pageBody-content">
                    <Row gutter={[30, 0]}>
                        <Col span={12}>
                            <Row className='row-custom'>
                                <Input placeholder={'Цена за платное дополнение'}/>
                            </Row>
                            <Row className='row-custom'>
                                <Pl style={{
                                    backgroundColor: '#fff', 
                                    justifyContent: 'flex-start',
                                    height: 'unset',
                                    color: '#7B99FF'}} 
                                    text={'Таблица дополнений'}
                                    onClick={openBasketTable}
                                />
                            </Row>
                            <Row className='row-custom'>
                                <BasketExList/>
                            </Row>
                            <Row className='row-custom'>
                                <BasketCutleryList/>
                            </Row>
                            <Row className='row-custom'>
                                <BasketPromo/>
                            </Row>
                            <Row className="row-custom">
                                <Input placeholder={'Количество персональных рекомендаций'}/>
                            </Row>
                            <Row className="row-custom">
                                <BasketRec/>
                            </Row>
                            <Row className="row-custom">
                                <Button styles={{width: '100%'}} text={'Сохранить'} before={<BsTrash/>}/>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row className="row-custom">
                                <Input placeholder={'Процент бонусов для оплаты'}/>
                            </Row>
                            <Row className="row-custom">
                                <Input placeholder={'Максимальное количество бонусов для оплаты'}/>
                            </Row>
                            <Row className="row-custom">
                                <Checkbox text={'Оплата бонусами для доставки'} id="1"/>
                            </Row>
                            <Row className="row-custom">
                                <Checkbox text={'Оплата бонусами для доставки'} id="2"/>
                            </Row>
                            <Row className="row-custom">
                                <Input placeholder={'Процент получаемых бонусов'}/>
                            </Row>
                            <Row className="row-custom">
                                <Input placeholder={'Максимальный процент получаемых бонусов'}/>
                            </Row>
                            <Row className="row-custom">
                                <Checkbox text={'Получение бонусов при доставке'} id="3"/>
                            </Row>
                            <Row className="row-custom">
                                <Checkbox text={'Получение бонусов при самовывозе'} id="4"/>
                            </Row>
                            <Row className="row-custom">
                                <BasketOnlinePay/>
                            </Row>
                            <Row className="row-custom">
                                <BasketGift/>
                            </Row>
                            <Row className="row-custom">
                                <Checkbox text={'Промокоды при активной скидке'} id="5"/>
                            </Row>
                            <Row className="row-custom">
                                <Checkbox text={'Подарки при активной скидке'} id="6"/>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default BasketPage;
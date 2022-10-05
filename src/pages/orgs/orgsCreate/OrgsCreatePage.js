import './OrgsCreatePage.scss';
import Sidebar from '../../../components/Sidebar/Sidebar';
import HeaderProfile from '../../../components/HeaderProfile/HeaderProfile';
import { Row, Col } from 'antd';
import Pl from '../../../components/Pl/Pl';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import Text from '../../../components/Text/Text';
import Checkbox from '../../../components/Checkbox/Checkbox';
import DropCollapse from '../../../components/DropCollapse/DropCollapse';
import TimeSelect from './components/timeSelect/TimeSelect';
import { useEffect, useState } from 'react';
import {BsTrash} from 'react-icons/bs';
import useModal from '../../../hooks/useModal';
import SelectLocation from '../modals/selectLocation/SelectLocation';


const payMethodsMock = [
    {
        value: 'Оплата наличными',
        checkbox: true,
        // delete: true
    },
    {
        value: 'Оплата по карте при получении',
        // delete: true
    },
    {
        value: 'Оплата по карте в приложении',
        // delete: true
    }
]

const timezoneMock = [
    {value: 'Europe/Moscow'},
    {value: 'Europe/Minsk'},
    {value: 'Europe/Frankfurt'}
]

const timeSelectMock = [
    {
        name: 'ПН',
        values: {
            start: '08:00',
            end: '23:00'
        },
        rest: false
    },
    {
        name: 'ВТ',
        values: {
            start: '08:00',
            end: '23:00'
        },
        rest: false
    },
    {
        name: 'СР',
        values: {
            start: '08:00',
            end: '23:00'
        },
        rest: false
    },
    {
        name: 'ЧТ',
        values: {
            start: '08:00',
            end: '23:00'
        },
        rest: false
    },
    {
        name: 'ПТ',
        values: {
            start: '08:00',
            end: '23:00'
        },
        rest: false
    },
    {
        name: 'СБ',
        values: {
            start: '08:00',
            end: '23:00',
        },
        rest: false
    },
    {
        name: 'ВС',
        values: {
            start: 0,
            end: 0
        },
        rest: true
    },
]

const OrgsCreatePage = () => {

    

    
    const [selectLocationModal, setSelectLocationModal] = useState(false);


    const [image, setImage] = useState(null);
    //Часовой пояс
    const [tmz, setTmz] = useState('Europe/Moscow')

    //время работы по дням недели
    const [weekTimes, setWeekTimes] = useState(timeSelectMock)

    //Способы оплаты
    const [pm, setPm] = useState([]);

    const [delivery, setDelivery] = useState(false)


    const deletePayMethod = (index) => {
        setPm(state => {
            return state.filter((item, i) => i !== index)
        })
    }

    const addPayMethods = () => {
        setPm(state => [...state, payMethodsMock[0]])
    }

    const selectPayMethod = (value, index) => {
        let ur = pm;
        let p = ur.splice(index, 1, {value: value})
        setPm([...ur])
        
    }

    const selectTmz = (value, index) => {
        setTmz(value);
    }

    const openSelectLocation = () => {
        setSelectLocationModal(true)
    }
    const closeSelectLocation = () => {
        setSelectLocationModal(false)
    }

    const saveTime = (index, value) => {
        console.log(value)
        console.log(index)

        let ur = weekTimes;
        let rm = ur.splice(index, 1, value)
        setWeekTimes(ur);
    }






    return (
        <div className="OrgsCreatePage page">
            <HeaderProfile/>

            <SelectLocation visible={selectLocationModal} close={closeSelectLocation}/>
            <main className="Main">
                <div className="pageBody">
                    <Sidebar/>
                    <div className="OrgsCreatePage__body pageBody-content">
                        <Row gutter={[25, 25]} justify={'space-between'}>
                            <Col span={12}>
                                <Row className='row-custom'>
                                    <div className="panel">
                                        <Pl 
                                            style={{height: 250, backgroundColor: '#F8F8F8'}} 
                                            text={'Выбрать картинку'}/>
                                    </div>
                                </Row>
                                <Row className='row-custom'>
                                    <Input placeholder={'Название организации'}/>
                                </Row>
                                <Row className='row-custom'>
                                    <Text height={180} placeholder={'Описание'}/>
                                </Row>
                                <Row className='row-custom'>
                                    <Input placeholder={'Адрес'}/>
                                </Row>  
                                <Row className='row-custom'>
                                    <Input placeholder={'Телефон'}/>
                                </Row>  
                                <Row className='row-custom'>
                                    <Input placeholder={'Email'}/>
                                </Row> 
                                <Row className='row-custom'>
                                    <Input placeholder={'ID кассовой станции'}/>
                                </Row>  
                                <Row className='row-custom'>
                                    <Input placeholder={'ID в iIko'}/>
                                </Row>  
                                <Row className='row-custom'>
                                    <Input placeholder={'Минимальная сумма заказа'}/>
                                </Row>  
                                <Row className='row-custom'>
                                    <Input placeholder={'Скидка на самовывоз отсюда'}/>
                                </Row> 
                                <Row className='row-custom'>
                                    <Checkbox id={'1'} text={'Можно заказать отсюда'}/>
                                </Row>  
                                <Row className='row-custom'>
                                    <DropCollapse 
                                        afterIcon 
                                        label={'Часовой пояс'}
                                        list={timezoneMock}
                                        
                                        value={tmz}
                                        selectItem={selectTmz}
                                        />
                                </Row>
                                <Row className='row-custom'>
                                    <Input placeholder={'Описание времени работы'}/>
                                </Row> 
                                <Row className='row-custom'>
                                    <TimeSelect save={saveTime} list={weekTimes}/>
                                </Row> 
                                <Row className='row-custom'>
                                    <Checkbox id={'2'} text={'Есть предзаказ'}/>
                                </Row>  
                                <Row className='row-custom'>
                                    <Input placeholder={'Шаг выбора времени предзаказа (в минутах)'}/>
                                </Row> 
                                <Row className='row-custom'>
                                    <Input placeholder={'Максимальное количество шагов'}/>
                                </Row> 
                                <Row className='row-custom'>
                                    <Checkbox id={'3'} text={'Уведомления в телеграм-боте и на E-Mail'}/>
                                </Row>  
                                <Row className='row-custom'>
                                    <Input placeholder={'API-key бота'}/>
                                </Row> 
                                <Row className='row-custom'>
                                    <Input placeholder={'E-Mail'}/>
                                </Row>
                                <Row className='row-custom'>
                                    <Checkbox id={'4'} text={'Уведомлять о новых заказах'}/>
                                </Row> 
                                <Row className='row-custom'>
                                    <Checkbox id={'5'} text={'Уведомлять об ошибках iIko'}/>
                                </Row>  
                                <Row className='row-custom'>
                                    <Checkbox id={'6'} text={'Уведомлять об изменениях в заказах'}/>
                                </Row>  
                                <Row className='row-custom'>
                                    <Button styles={{width: '100%', paddingTop: 20, paddingBottom: 20}} before={<BsTrash/>} text={'Сохранить'} justify={'flex-start'}/>
                                </Row>      
                            </Col>
                            <Col span={12}>
                                <Row className='row-custom'>
                                    <div className="panel">
                                        <div className="panel-label">
                                            Местоположение на карте
                                        </div>
                                        <Pl 
                                            onClick={openSelectLocation}
                                            style={{height: 200, backgroundColor: '#F8F8F8'}} 
                                            text={'Выбрать на карте'}/>
                                    </div>
                                </Row>
                                <Row className='row-custom'>
                                    <Checkbox onChange={() => setDelivery(!delivery)} checked={delivery} id={'7'} text={'Есть доставка'}/>
                                </Row>  
                                {
                                    delivery ? (
                                        <Row className='row-custom' gutter={[30, 30]}>
                                            <Col span={12} >
                                                <div className="panel" style={{height: 275}}>
                                                    <Pl text={'Добавить полигон доставки'}/>
                                                </div>
                                            </Col>
                                            
                                        </Row>  
                                    ) : null
                                }
                                <Row className='row-custom'>
                                    {
                                        pm && pm.length > 0 ? (
                                            pm.map((item, index) => (
                                                <DropCollapse
                                                    key={index}
                                                    beforeIcon 
                                                    list={payMethodsMock}
                                                    value={item.value}
                                                    styles={{marginBottom: 15}}
                                                    del={deletePayMethod}
                                                    selectItem={selectPayMethod}
                                                    index={index}
                                                    checkbox={item.checkbox}
                                                    />
                                            ))
                                        ) : null
                                    }
                                    {
                                        pm?.length !== 3 ? (
                                            <div className="panel" style={{padding: 0}}>
                                                <Pl onClick={addPayMethods} text={'Добавить способ оплаты'}/>
                                            </div>
                                        ) : null
                                    }
                                    
                                </Row>  
                            </Col>
                        </Row>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default OrgsCreatePage;
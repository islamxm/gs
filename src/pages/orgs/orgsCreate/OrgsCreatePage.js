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
        value: '08:00 - 20:30'
    },
    {
        name: 'ВТ',
        value: '08:00 - 20:30'
    },
    {
        name: 'СР',
        value: '08:00 - 20:30'
    },
    {
        name: 'ЧТ',
        value: '08:00 - 20:30'
    },
    {
        name: 'ПТ',
        value: '08:00 - 20:30'
    },
    {
        name: 'СБ',
        value: '08:00 - 20:30'
    },
    {
        name: 'ВС',
        value: 'Выходной'
    },
]

const OrgsCreatePage = () => {
    // Название организации
    const [name, setName] = useState('')

    //Описание
    const [descr, setDescr] = useState('')

    //Адрес
    const [adress, setAdress] = useState('')

    //Телефон
    const [phone, setPhone] = useState('')

    //Email
    const [email, setEmail] = useState('')

    //ID кассовой станции
    const [IDkassa, setIDkassa] = useState('')

    //ID в iIko
    const [IDilko, setIDilko] = useState('')

    //Минимальная сумма заказа
    const [minSum, setMinSum] = useState('')

    //Скидка на самовывоз отсюда
    const [discountPickup, setDiscountPickup] = useState('')

    //Можно заказать отсюда
    const [isOrder, setIsOrder] = useState(false)

    //Часовой пояс
    const [tmz, setTmz] = useState('Europe/Moscow')

    //Описание времени работы
    const [timeDescr, setTimeDescr] = useState('')

    //время работы по дням недели
    const [weekTimes, setWeekTimes] = useState(timeSelectMock)

    //Есть предзаказ
    const [preorder, setPreorder] = useState(false)

    //Шаг выбора времени предзаказа (в минутах)
    const [preorderTime, setPreorderTime] = useState('')

    //Максимальное количество шагов
    const [maxStep, setMaxStep] = useState('')

    //Уведомления в телеграм-боте и на E-Mail
    const [push, setPush] = useState('')

    //API-key бота
    const [apiBot, setApiBot] = useState('')

    //E-Mail
    const [emailPush, setEmailPush] = useState('')

    //Уведомлять о новых заказах
    const [notNew, setNotNew] = useState(false)

    //Уведомлять об ошибках iIko
    const [notIlkoError, setNotIlkoError] = useState(false)

    //Уведомлять об изменениях в заказах
    const [notOrderChange, setNotOrderChange] = useState(false)

    //Местоположение на карте
    const [location, setLocation] = useState('')

    //Есть доставка
    const [delivery, setDelivery] = useState(false)

    //Добавить полигон доставки
    const [polygons, setPolygons] = useState([])

    //Способы оплаты
    const [pm, setPm] = useState([]);

    const [selectedPm, setSelectedPm] = useState([])


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




    return (
        <div className="OrgsCreatePage page">
            <HeaderProfile/>
            <main className="Main">
                <div className="pageBody">
                    <Sidebar/>
                    <div className="OrgsCreatePage__body pageBody-content">
                        <Row gutter={[60, 60]} justify={'space-between'}>
                            <Col span={12}>
                                <Row className='row-custom'>
                                    <div className="panel">
                                        {/* <div className="panel-label"></div> */}
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
                                    <TimeSelect list={weekTimes}/>
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
                                            style={{height: 200, backgroundColor: '#F8F8F8'}} 
                                            text={'Выбрать на карте'}/>
                                    </div>
                                </Row>
                                <Row className='row-custom'>
                                    <Checkbox id={'7'} text={'Есть доставка'}/>
                                </Row>  
                                <Row className='row-custom' gutter={[30, 30]}>
                                    <Col span={12} >
                                        <div className="panel" style={{height: 275}}>
                                            <Pl text={'Добавить полигон доставки'}/>
                                        </div>
                                    </Col>
                                    
                                </Row>  
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
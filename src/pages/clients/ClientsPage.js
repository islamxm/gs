import './ClientsPage.scss';
import HeaderProfile from '../../components/HeaderProfile/HeaderProfile';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Table } from 'antd';
import Input from '../../components/Input/Input';
import Pl from '../../components/Pl/Pl';
import { useEffect, useState , useRef} from 'react';
import Button from '../../components/Button/Button';
import Checkbox from '../../components/Checkbox/Checkbox';
import Push from './modals/push/Push';
import Email from './modals/email/Email';
import User from './modals/user/User'; 

import { useDoubleTap } from 'use-double-tap';

const mock = [
    {
        id: '123',
        name: 'Иван',
        phone: '+7 977 524 73 08',
        orders: '12 заказов',
        sum: '1240 ₽',
        bonus: '120',
        date: '03.04.2022 09:30'
    },
    {
        id: '123',
        name: 'Андрей',
        phone: '+7 977 524 73 08',
        orders: '12 заказов',
        sum: '1240 ₽',
        bonus: '120',
        date: '03.04.2022 09:30'
    },
    {
        id: '123',
        name: 'Степан',
        phone: '+7 977 524 73 08',
        orders: '12 заказов',
        sum: '1240 ₽',
        bonus: '120',
        date: '03.04.2022 09:30'
    }
    
]


const ClientsPage = () => {
    const [selects, setSelects] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});
    const [push, setPush] = useState(false);
    const [email, setEmail] = useState(false);
    const [user, setUser] = useState(false);

    const openPush = () => {
        setPush(true)
    }

    const closePush = () => {
        setPush(false)
    }

    const openEmail = () => {
        setEmail(true)
    }

    const closeEmail = () => {
        setEmail(false)
    }

    const openUser = () => {
        setUser(true)
    }

    const closeUser = () => {
        setUser(false)
    }


    const selectItem = (e) => {
        e.classList.toggle('active');
    }

    const selectAll = (e) => {
        if(e.target.checked) {
            setSelects(mock);
            console.log('checked')
        } else {
            setSelects()

            console.log('not checled')
        }
    }

    const doubleClick = useDoubleTap((e) => {
        openUser()

    }, 150, {
        onSingleTap: (e) => {
            selectItem(e)
            
        }
    })

    const clickHandle = (e, name, bonus, phone) => {
        setSelectedUser({
            name,
            bonus,
            phone
        })
        doubleClick.onClick(e.currentTarget, name);
    }


    return (
        <div className="ClientsPage page">
            <Push  visible={push} close={closePush}/>
            <Email visible={email} close={closeEmail}/>
            <User 
                visible={user} 
                close={closeUser}
                name={selectedUser?.name}  
                bonus={selectedUser?.bonus}
                phone={selectedUser?.phone}
                />
            <HeaderProfile/>
            <main className="Main">
                <div className="pageBody">
                    <Sidebar/>
                    <div className="ClientsPage__body pageBody-content">
                        <div className="ClientsPage__body_top">
                            <div className="ClientsPage__body_top_search">
                                <Input placeholder={'Поиск'}/>
                            </div>
                            <div className="ClientsPage__body_top_all">
                                <Checkbox onChange={selectAll} id={'all'} text={'Выбрать всех'}/>
                            </div>
                        </div>
                        <div className="ClientsPage__body_table">
                            <table>
                                <tr>
                                    <th>ID</th>
                                    <th>Имя</th>
                                    <th>Телефон</th>
                                    <th>Кол-во заказов</th>
                                    <th>На сумму</th>
                                    <th>Бонусы</th>
                                    <th>Дата последнего заказа</th>
                                </tr>
                                <div className="spacer"></div>
                                {
                                    mock && mock.length > 0 ? (
                                        mock.map((item, index) => (
                                            <tr 
                                                onClick={(e) => clickHandle(e, item.name, item.bonus, item.phone)} 
                                                className={'row'} 
                                                key={index}>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.orders}</td>
                                                <td>{item.sum}</td>
                                                <td>{item.bonus} бонусов</td>
                                                <td>{item.date}</td>
                                            </tr>
                                        ))
                                    ) : null
                                }
                                
                                
                            </table>
                        </div>
                        <div className="ClientsPage__body_action">
                            <Button onClick={openPush} styles={{boxShadow: '0px 0px 43px rgba(255, 255, 255, 0.5)'}} justify={'center'} text={'Отправить Push-уведомление выбранным пользователям'}/>
                            <Button onClick={openEmail} styles={{boxShadow: '0px 0px 43px rgba(255, 255, 255, 0.5)'}} justify={'center'} text={'Отправить E-mail выбранным пользователям'}/>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default ClientsPage;
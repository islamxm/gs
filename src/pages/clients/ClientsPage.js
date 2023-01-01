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
import Discount from './modals/discount/Discount';
import {motion} from 'framer-motion';
import { useDoubleTap } from 'use-double-tap';
import { useSelector } from 'react-redux';
import orderBy from './helpers/orderBy';
import anService from '../../services/anService';
import orderTypes from '../orders/helpers/orderTypes';

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

const ans = new anService();


const ClientsPage = () => {
    const {token} = useSelector(state => state)
    const [selects, setSelects] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});
    const [push, setPush] = useState(false);
    const [email, setEmail] = useState(false);
    const [user, setUser] = useState(false);
    const [discount, setDiscount] = useState(false);

    const [OrderBy, setOrderBy] = useState(orderBy[0].name)
    const [OrderType, setOrderType] = useState(orderTypes.asc)
    const [Page, setPage] = useState(1)
    const [list, setList] = useState([])


    const getUsers = () => {
        if(token) {
            ans.getUsers(token, OrderBy, OrderType, Page).then(res => {
                console.log(res)

            })
        }
    }

    useEffect(() => {
        getUsers()
    }, [token, OrderBy, OrderType, Page])


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

    const openDiscount = () => {
        setDiscount(true)
    }

    const closeDiscount = () => {
        setDiscount(false)
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
        <motion.div 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}
            exit={{opacity: 0}}

            className="ClientsPage page">
            <Push  visible={push} close={closePush}/>
            <Email visible={email} close={closeEmail}/>
            <User 
                visible={user} 
                close={closeUser}
                name={selectedUser?.name}  
                bonus={selectedUser?.bonus}
                phone={selectedUser?.phone}
                addDiscount={openDiscount}
                />
            <Discount visible={discount} close={closeDiscount}/>
            <main className="Main">
                <div className="pageBody">
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
                            <table className='gs-table'>
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
        </motion.div>
    )
}

export default ClientsPage;
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
import * as _ from 'lodash';
import {Pagination} from 'antd';

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
    const [Page, setPage] = useState(0)
    const [list, setList] = useState([])
    const [pp, setPp] = useState([])


    const getUsers = () => {
        if(token) {
            const body = {
                OrderBy,
                OrderType
            }
            ans.getUsers(token, body).then(res => {
                console.log(res)
                const ss = _.chunk(res.Users, 30)
                setPp(ss)
            })
        }
    }

    useEffect(() => {
        getUsers()
    }, [token, OrderBy, OrderType])

    useEffect(() => {
        if(pp.length > 0) {
            setList(pp[Page])
        }
    }, [Page, pp])


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
            setSelects(pp.flat())
        } else {
            setSelects(null)
        }
    }

    const doubleClick = useDoubleTap((e, data) => {
        openUser()

    }, 150, {
        onSingleTap: (e) => {
 
            selectItem(e)
        }
    })

    useEffect(() => {
        console.log(selects)
    }, [selects])

    const clickHandle = (e, {...item}) => {
        if(e.currentTarget.classList.contains('active')) {
            setSelects(state => [
                ...state,
                item
            ])
        } else {
            const ff = selects;
            const rm = ff.splice(ff.findIndex(i => i.ID == item.ID), 1)
            setSelects([...ff])
        }
        setSelectedUser({
            ...item
        })
        doubleClick.onClick(e.currentTarget, item);
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
                                    list?.length > 0 ? (
                                        list.map((item, index) => (
                                            <tr 
                                                onClick={(e) => clickHandle(e, {...item})} 
                                                
                                                className={'row'} 
                                                key={item.ID}>
                                                <td>{item.ID}</td>
                                                <td>{item.Name}</td>
                                                <td>{item.Phone}</td>
                                                <td>{item.OrdersCount}</td>
                                                <td>{item.OrdersTotalPrice}</td>
                                                <td>{item.Bonuses} бонусов</td>
                                                <td>{item.date}</td>
                                            </tr>
                                        ))
                                    ) : null
                                }
                            </table>
                            <div className="ClientsPage__body_pag">
                                <Pagination
                                    onChange={e => setPage(e - 1)}
                                    total={pp.length + 1}
                                    current={Page}
                                    />
                            </div>
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
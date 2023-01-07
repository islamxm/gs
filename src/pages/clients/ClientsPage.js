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
import TablePag from '../../components/TablePag/TablePag';
import ClientsInfo from './components/ClientsInfo/ClientsInfo';
import Loader from '../../components/Loader/Loader';
import {BsChevronDown} from 'react-icons/bs';

const ans = new anService();


const ClientsPage = () => {
    const {token} = useSelector(state => state)
    const [selects, setSelects] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});
    const [push, setPush] = useState(false);
    const [email, setEmail] = useState(false);
    const [user, setUser] = useState(false);
    const [discount, setDiscount] = useState(false);
    const [firstFetch, setFirstFetch] = useState(true)
    const [pushLoad, setPushLoad] = useState(false)
    const [emailLoad, setEmailLoad] = useState(false)
    const [loading, setLoading] = useState(false)

    const [OrderBy, setOrderBy] = useState(orderBy[0].name)
    const [OrderType, setOrderType] = useState(false)
    const [Search, setSearch] = useState('') 
    const [Page, setPage] = useState(0)
    const [list, setList] = useState([])
    const [fullList, setFullList] = useState([])
    const [pp, setPp] = useState([])
    const [shiftDown, setShiftDown] = useState(false)
    const [ctrlDown, setCtrlDown] = useState(false)
    const [lastSelected, setLastSelected] = useState(null)


    const keyDownHandle = (e) => {
        console.log(e.keyCode)
        console.log(e.code)
        if(e.keyCode == 16 && e.code == 'ShiftLeft') {
            console.log('shift pressed')
            setShiftDown(true)
            setCtrlDown(false)
        } else if((e.keyCode == 91 && e.code == 'MetaLeft') || (e.keyCode == 17 && e.code == 'ControlLeft')) {
            console.log('control pressed')
            setCtrlDown(true)
            setShiftDown(false)
        } else {
            setCtrlDown(false)
            setShiftDown(false)
        }
    }

    const keyUpHandle = (e) => {
        setCtrlDown(false)
        setShiftDown(false)
    }


    useEffect(() => {
        window.addEventListener('keydown', keyDownHandle)
        window.addEventListener('keyup', keyUpHandle)
        return () => {
            window.removeEventListener('keydown', keyDownHandle)
            window.removeEventListener('keyup', keyUpHandle)
        }
    }, [])

    


    const getUsers = () => {
        if(token) {
            setLoading(true)
            const body = {
                OrderBy,
                OrderType: OrderType ? 'ASC' : 'DESC',
                Search
            }
            ans.getUsers(token, body).then(res => {
                const ss = _.chunk(res.Users, 30)
                setPp(ss)
                setFullList(res.Users)

            }).finally(_ => {
                setFirstFetch(false)
                setLoading(false)
            })
        }
    }

    useEffect(() => {
        getUsers()
    }, [token, OrderBy, OrderType, Search])

    useEffect(() => {
        if(pp?.length > 0) {
            setList(pp[Page])
        } else {
            setList([])
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

  


  

    const selectAll = (e) => {
        if(e.target.checked) {
            setSelects(pp.flat())
        } else {
            setSelects([])
        }
    }

    // const doubleClick = useDoubleTap((e, item) => {
    //     openUser()
    // }, 150, {
    //    onSingleTap: (e, item) => {
    //    }
    // })


    const fdf = (e, item) => {
        setSelectedUser(item)
        openUser()
        // if(e.currentTarget.classList.contains('active')) {
        //     const mm = selects;
        //     const rm = mm.splice(mm.findIndex(i => i.ID == item.ID), 1)
        //     setSelects([...mm])
        // } else {
        //     setSelects(state => [...state, item])
        // }
        // doubleClick.onClick()
        
    }

    const clickHandle = (e, item) => {
        e.preventDefault()
        if(!ctrlDown && !shiftDown) {
            setSelectedUser(item)
            openUser()
        }
        if(ctrlDown && !shiftDown) {
            if(e.currentTarget.classList.contains('active')) {
                const mm = selects;
                const rm = mm.splice(mm.findIndex(i => i.ID == item.ID), 1)
                setSelects([...mm])
                setLastSelected(null)
            } else {    
                setSelects(state => [...state, item])
                setLastSelected(item)
            }
        }
        if(!ctrlDown && shiftDown) {

            if(lastSelected !== null) {
                const mm = [...fullList];
                const firstIndex = mm.findIndex(i => i.ID == item.ID);
                const secondIndex = mm.findIndex(i => i.ID == lastSelected.ID);
                let rm = [];
                if(firstIndex > secondIndex) {
                    rm = mm.splice(secondIndex, firstIndex - secondIndex + 1)
                }
                if(secondIndex > firstIndex) {
                    rm = mm.splice(firstIndex, secondIndex - firstIndex + 1)

                }
                const res = [...selects, ...rm].reduce((o, i) => {
                    if(!o.find(v => v.ID == i.ID)) {
                        o.push(i)
                    }
                    return o;
                }, [])

                setSelects(res)
            }
        }
    }   


    const sendPush = (body) => {
        setPushLoad(true)
        ans.sendPushToUsers(token, {
            ...body,
            UsersID: selects.map(item => item.ID)
        }).then(res => {
            if(!res.error) {
                closePush()
            } else {
                //handle error
            }
        })
    }
    
    const sendEmail = (body) => {
        setEmailLoad(true)
        ans.sendMailToUsers(token, {
            ...body,
            UsersID: selects.map(item => item.ID)
        }).then(res => {
            if(!res.error) {
                closeEmail()
            } else {
                //handle error
            }
        })
    }

    
    

    return (
        <motion.div 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}
            exit={{opacity: 0}}

            className="ClientsPage page">
            <Push
                onSave={sendPush}
                load={pushLoad}  
                visible={push} 
                close={closePush}/>
            <Email
                onSave={sendEmail}
                load={emailLoad} 
                visible={email} 
                close={closeEmail}/>
            <User 
                data={selectedUser}
                visible={user} 
                close={closeUser}
                name={selectedUser?.name}  
                bonus={selectedUser?.bonus}
                phone={selectedUser?.phone}
                addDiscount={openDiscount}
                />
            {/* <Discount visible={discount} close={closeDiscount}/> */}
            <main className="Main">
                <div className="pageBody">
                    <div className="ClientsPage__body pageBody-content">
                        <ClientsInfo
                            value={Search}
                            setValue={setSearch}
                            selectAll={selectAll}
                            />
                        <div className="ClientsPage__body_table">
                            {
                                !firstFetch ? (
                                    <>
                                        <table className='gs-table'>
                                            {
                                                loading ? (
                                                    <div className="gs-table__load">
                                                        <Loader/>
                                                    </div>
                                                ) : null
                                            }
                                            {/* <tr>
                                                <th>ID</th>
                                                <th>Имя</th>
                                                <th>Телефон</th>
                                                <th>Кол-во заказов</th>
                                                <th>На сумму</th>
                                                <th>Бонусы</th>
                                                <th>Дата последнего заказа</th>
                                            </tr> */}
                                            <tr>
                                                {
                                                    orderBy?.length > 0 ? (
                                                        orderBy.map((item, index) => (
                                                            <th 
                                                                key={index}
                                                                onClick={() => {
                                                                    setOrderBy(item.name)
                                                                    setOrderType(state => !state)
                                                                }}
                                                                >
                                                                <div className={"gs-table__head" + ( OrderBy == item.name ? ' active ' : '') + (OrderType ? ' asc ' : '')}>
                                                                    <div className={"gs-table__head_label"}> 
                                                                    {item.label}
                                                                    </div>
                                                                    <div className="gs-table__head_icon">
                                                                        <BsChevronDown/>
                                                                    </div>
                                                                    
                                                                </div>
                                                            </th>
                                                        ))
                                                    ) : null
                                                }
                                            
                                            </tr>
                                            <div className="spacer"></div>
                                            {
                                                list?.length > 0 ? (
                                                    list.map((item, index) => (
                                                        <tr 
                                                            
                                                            onClick={(e) => clickHandle(e, item)}
                                                            className={'row' + (selects.find(i => i.ID == item.ID) ? ' active ' : '')} 
                                                            key={item.ID}>
                                                            <td>{item.ID}</td>
                                                            <td>{item.Name ? item.Name : 'Не указано'}</td>
                                                            <td>{item.Phone ? item.Phone : 'Не указано'}</td>
                                                            <td>{item.OrdersCount}</td>
                                                            <td>{item.OrdersTotalPrice}₽</td>
                                                            <td>{item.Bonuses} бонусов</td>
                                                            <td>{item.LastOrderDate ? item.LastOrderDate : 'Не указано'}</td>
                                                        </tr>
                                                    ))
                                                ) : null
                                            }
                                        </table>
                                        {
                                            pp.length <= 1  ? (
                                                null
                                            ) : (
                                                <TablePag
                                                    style={{padding: '40px 0'}}
                                                    total={pp.length}
                                                    current={Page + 1}
                                                    onChange={e => setPage(e - 1)}
                                                    pageSize={1}
                                                    jumpToStart={e => setPage(0)}
                                                    jumpToEnd={e => setPage(pp.length - 1)}
                                                    />
                                            )
                                        }
                                    </>
                                ) : (
                                    <Loader/>
                                )
                            }
                            
                            
                        </div>
                        
                        <div className="ClientsPage__body_action">
                            <Button 
                                disabled={selects.length == 0}
                                onClick={openPush} 
                                styles={{boxShadow: '0px 0px 43px rgba(255, 255, 255, 0.5)'}} 
                                justify={'center'} 
                                text={'Отправить Push-уведомление выбранным пользователям'}/>
                            <Button 
                                disabled={selects.length == 0}
                                onClick={openEmail} 
                                styles={{boxShadow: '0px 0px 43px rgba(255, 255, 255, 0.5)'}} 
                                justify={'center'} 
                                text={'Отправить E-mail выбранным пользователям'}/>
                        </div>
                    </div>
                </div>
            </main>
        </motion.div>
    )
}

export default ClientsPage;
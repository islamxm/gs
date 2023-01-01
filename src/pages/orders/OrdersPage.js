import './OrdersPage.scss';
import HeaderProfile from '../../components/HeaderProfile/HeaderProfile';
import Sidebar from '../../components/Sidebar/Sidebar';
import Loader from '../../components/Loader/Loader';
import useContent from '../../hooks/useContent';
import { useEffect, useState } from 'react';
import OrderInfo from './modals/OrderInfo/OrderInfo';
import useModal from '../../hooks/useModal';
import {motion} from 'framer-motion';
import orderBy from './helpers/orderBy';
import orderTypes from './helpers/orderTypes';
import { useSelector } from 'react-redux';
import anService from '../../services/anService';
import {BsChevronDown} from 'react-icons/bs';
import checkStatus from './helpers/checkStatus';
import checkPay from './helpers/checkPay';
import checkDelivery from './helpers/checkDelivery';
import { Pagination } from 'antd';
import {DoubleLeftOutlined, DoubleRightOutlined} from '@ant-design/icons';

import * as _ from 'lodash';

const statusConst = {
    new: 'NEW',
    notpay: 'NOTPAY',
    process: 'PROCESS',
    canceled: 'CANCELED',
    complete: 'COMPLETE'
}






const ans = new anService();


const OrdersPage = () => {
    const {token} = useSelector(state => state)
    const {loading, view, error, setLoading, setView} = useContent();
    const {visible, hideModal, showModal} = useModal();
    const [list, setList] = useState([])
    const [selected, setSelected] = useState(null);
    const [pp, setPp] = useState([])
    const [OrderBy, setOrderBy] = useState(orderBy[0].name)
    const [OrderType, setOrderType] = useState(orderTypes.asc)
    const [page, setPage] = useState(0)

    const getOrders = () => {
        if(token) {
            setLoading(true)
            setPage(1)
            const body = {
                OrderBy,
                OrderType,
            }
            ans.getOrders(token, body).then(res => {
                const pp = _.chunk(res.Orders, 30)
                setPp(pp)
                setPage(0)     
            }).finally(_ => setLoading(false))
        }
    }

    useEffect(() => {
  
        if(pp?.length > 0) {
            setList(pp[page])
        }
    }, [page, pp])

    const selectItem = (item) => {
        setSelected(item)
        showModal()
    }
  

    useEffect(() => {
        getOrders()
    }, [token, OrderBy, OrderType])

    
    return (
        <motion.div 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}
            exit={{opacity: 0}}
            className="OrdersPage page">
            <OrderInfo 
                updateList={getOrders}
                data={selected} 
                visible={visible} 
                close={hideModal}/>
            <main className="Main">
                <div className="pageBody">
                    <div className="OrdersPage__body pageBody-content">
                        <div className="OrdersPage__body_table">
                            {
                                !loading ? (
                                    <>
                                        <table className="gs-table">
                                        
                                                <tr>
                                                    {
                                                        orderBy?.length > 0 ? (
                                                            orderBy.map((item, index) => (
                                                                <th 
                                                                    key={index}
                                                                    onClick={() => setOrderBy(item.name)}
                                                                    >
                                                                    <div className={"gs-table__head" + ( OrderBy == item.name ? ' active ' : '')}>
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
                                                    list && list.length > 0 ? (
                                                        list.map((item, index) => (
                                                            <tr 
                                                                onClick={() => selectItem({...item})}
                                                                className={'row'} 
                                                                key={index}>
                                                                <td>{item.ID}</td>
                                                                <td>{item.UserName}</td>
                                                                <td>{<div style={{color: checkStatus(Number(item.Status))?.color}}>{checkStatus(Number(item.Status))?.name}</div>}</td>
                                                                <td>{item.Price} ₽</td>
                                                                <td>{checkDelivery(Number(item.DeliveryType))}</td>
                                                                <td>{checkPay(Number(item.PayType))}</td>
                                                                <td>{item.DateCreated}</td>
                                                            </tr>
                                                        ))
                                                    ) : null
                                                }
                                            </table>
                                            <div className="OrdersPage__pag">
                                                <button 
                                                    onClick={() => setPage(0)}
                                                    className="OrdersPage__pag_jm OrdersPage__pag_jm-start">
                                                <DoubleLeftOutlined />
                                                </button>
                                                <Pagination 
                                                defaultCurrent={page + 1}
                                                current={page + 1}
                                                total={pp.length}
                                                pageSize={1}
                                                onChange={e => setPage(e - 1)}
                                                />
                                                <button
                                                    onClick={() => setPage(pp.length - 1)}
                                                    className="OrdersPage__pag_jm OrdersPage__pag_jm-end">
                                                <DoubleRightOutlined />
                                                </button>
                                            </div>
                                        
                                    </>
                                    
                                ) : <Loader/>
                            }
                        </div>
                    </div>
                </div>
            </main>
        </motion.div>
    )
}

export default OrdersPage;
import './OrdersPage.scss';
import HeaderProfile from '../../components/HeaderProfile/HeaderProfile';
import Sidebar from '../../components/Sidebar/Sidebar';
import Loader from '../../components/Loader/Loader';
import useContent from '../../hooks/useContent';
import { useEffect } from 'react';
import OrderInfo from './modals/OrderInfo/OrderInfo';
import useModal from '../../hooks/useModal';

const statusConst = {
    new: 'NEW',
    notpay: 'NOTPAY',
    process: 'PROCESS',
    canceled: 'CANCELED',
    complete: 'COMPLETE'
}

const filterStatus = (status) => {
    switch(status) {
        case statusConst.new:
            return (<div className='gs-table-status gs-table-status-new'>Новый</div>)
        case statusConst.notpay:
            return (<div className='gs-table-status gs-table-status-notpay'>Не оплачен</div>)
        case statusConst.process:
            return (<div className='gs-table-status gs-table-status-process'>В работе</div>)
        case statusConst.complete:
            return (<div className='gs-table-status'>Завершен</div>)
        case statusConst.canceled:
            return (<div className='gs-table-status'>Отменен</div>)
        default:
            return (<div className='gs-table-status'>Завершен</div>)
    }
}


const mock = [
    {
        id: 1,
        name: 'Alex',
        status: statusConst.new,
        sum: '1240 ₽',
        delivery: 'Самовывоз',
        payment: 'Картой при получении',
        date: '03.04.2022 09:30'
    },
    {
        id: 1,
        name: 'Alex',
        status: statusConst.notpay,
        sum: '1240 ₽',
        delivery: 'Самовывоз',
        payment: 'Картой при получении',
        date: '03.04.2022 09:30'
    },
    {
        id: 1,
        name: 'Alex',
        status: statusConst.process,
        sum: '1240 ₽',
        delivery: 'Самовывоз',
        payment: 'Картой при получении',
        date: '03.04.2022 09:30'
    },
    {
        id: 1,
        name: 'Alex',
        status: statusConst.canceled,
        sum: '1240 ₽',
        delivery: 'Самовывоз',
        payment: 'Картой при получении',
        date: '03.04.2022 09:30'
    },
    {
        id: 1,
        name: 'Alex',
        status: statusConst.complete,
        sum: '1240 ₽',
        delivery: 'Самовывоз',
        payment: 'Картой при получении',
        date: '03.04.2022 09:30'
    },
]





const OrdersPage = () => {
    const {loading, view, error, setLoading, setView} = useContent();
    const {visible, hideModal, showModal} = useModal();

    useEffect(() => {
        setLoading(true)
        const tim = setTimeout(() => {
            setLoading(false);
        }, 1000)

        return () => {
            clearTimeout(tim);
        }
    }, [])

    
    return (
        <div className="OrdersPage page">
            <OrderInfo visible={visible} close={hideModal}/>
            <HeaderProfile/>
            <main className="Main">
                <div className="pageBody">
                    <Sidebar/>
                    <div className="spc"></div>
                    <div className="OrdersPage__body pageBody-content">
                        <div className="OrdersPage__body_table">
                            {
                                !loading ? (
                                    <table className="gs-table">
                                        <tr>
                                            <th>ID</th>
                                            <th>Имя</th>
                                            <th>Статус</th>
                                            <th>Сумма</th>
                                            <th>Тип доставки</th>
                                            <th>Тип оплаты</th>
                                            <th>Дата заказа</th>
                                        </tr>
                                        <div className="spacer"></div>
                                        {
                                            mock && mock.length > 0 ? (
                                                mock.map((item, index) => (
                                                    <tr 
                                                        onClick={showModal}
                                                        className={'row'} 
                                                        key={index}>
                                                        <td>{item.id}</td>
                                                        <td>{item.name}</td>
                                                        <td>{filterStatus(item.status)}</td>
                                                        <td>{item.sum}</td>
                                                        <td>{item.delivery}</td>
                                                        <td>{item.payment}</td>
                                                        <td>{item.date}</td>
                                                    </tr>
                                                ))
                                            ) : null
                                        }
                                    </table>
                                ) : <Loader/>
                            }
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default OrdersPage;
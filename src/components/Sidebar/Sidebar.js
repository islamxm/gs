import './Sidebar.scss';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import catService from '../../services/catService';
import { useEffect, useState } from 'react';

const cs = new catService();

const Sidebar = () => {
    const {token} = useSelector(state => state)
    const location = useLocation();


    const [cats, setCats] = useState([])


    useEffect(() => {
        if(token) {
            cs.getCats(token, {OrganisationID: 0}).then(res => {
                setCats(res)
            })
        }
    }, [token])


    return (
        <div className="Sidebar">
            
            <div className="Sidebar__head">МЕНЮ</div>
            <div className="Sidebar__list">
                <div className={"Sidebar__item" + (location.pathname.includes('/organizations') ? ' active ' : '')}>
                    <div className="Sidebar__item_head">
                        <Link to={'/organizations'}>Организации</Link>
                    </div>
                </div>
                <div className={"Sidebar__item"}>
                    <div className="Sidebar__item_head">
                        <Link to={'/catalog'} className={"Sidebar__item_head_nl" + (location.pathname == '/catalog' ? ' active ' : '')}>Каталог</Link>
                    </div>
                    <div className="Sidebar__item_submenu">
                        {
                            cats && cats?.length > 0 ? (
                                cats.map((item, index) => (
                                    <Link key={index} to={`/catalog/${item.ID}`} className={'Sidebar__item_submenu_item' + (location.pathname.match(`/catalog/${item.ID}`) ? ' active ' : '')}>{item.Name}</Link>
                                ))
                            ) : null
                        }
                    </div>
                </div>
                <div className={"Sidebar__item" + (location.pathname.includes('/stories') ? ' active ' : '')}>
                    <div className="Sidebar__item_head">
                        <Link to={'/stories'}>Сториз</Link>
                    </div>
                </div>
                <div className={"Sidebar__item"}>
                    <div className="Sidebar__item_head">
                        <a className='Sidebar__item_head_nl'>Аналитика</a>
                    </div>
                    <div className="Sidebar__item_submenu">
                        <Link to={'/clients'} className={'Sidebar__item_submenu_item' + (location.pathname.includes('/clients') ? ' active ' : '')}>Клиенты</Link>
                        <Link to={'/orders'} className={'Sidebar__item_submenu_item' + (location.pathname.includes('/orders') ? ' active ' : '')}>Заказы</Link>
                        <Link to={'/statistic'} className={'Sidebar__item_submenu_item' + (location.pathname.includes('/statistic') ? ' active ' : '')}>Статистика</Link>
                    </div>
                </div>
                <div className={"Sidebar__item"}>
                    <div className="Sidebar__item_head">
                        <a className='Sidebar__item_head_nl'>Настройки</a>
                    </div>
                    <div className="Sidebar__item_submenu">
                        <Link to={'/basket'} className={'Sidebar__item_submenu_item' + (location.pathname.includes('/basket') ? ' active ' : '')}>Корзина</Link>
                        <Link to={'/integr'} className={'Sidebar__item_submenu_item' + (location.pathname.includes('/integr') ? ' active ' : '')}>Интеграции</Link>
                        <Link to={'/settings'} className={'Sidebar__item_submenu_item' + (location.pathname.includes('/settings') ? ' active ' : '')}>Все настройки</Link>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;
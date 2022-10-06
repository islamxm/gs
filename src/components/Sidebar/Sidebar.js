import './Sidebar.scss';
import { Link, NavLink, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();



    return (
        <div className="Sidebar">
            
            <div className="Sidebar__head">МЕНЮ</div>
            <div className="Sidebar__list">
                <div className={"Sidebar__item" + (location.pathname.includes('/organizations') ? ' active ' : '')}>
                    <div className="Sidebar__item_head">
                        <Link to={'/organizations'}>Организации</Link>
                    </div>
                </div>
                <div className={"Sidebar__item" + (location.pathname.includes('/catalog') ? ' active ' : '')}>
                    <div className="Sidebar__item_head">
                        <Link to={'/catalog'}>Категории</Link>
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
            </div>
        </div>
    )
}

export default Sidebar;
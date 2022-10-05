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
            </div>
        </div>
    )
}

export default Sidebar;
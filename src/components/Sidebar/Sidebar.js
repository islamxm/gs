import './Sidebar.scss';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="Sidebar">
            
            <div className="Sidebar__head">МЕНЮ</div>
            <div className="Sidebar__list">
                <div className="Sidebar__item active"><Link to={'/'}>Организации</Link></div>
                <div className="Sidebar__item"><Link to={'/'}>Сториз</Link></div>
            </div>
        </div>
    )
}

export default Sidebar;
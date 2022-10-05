import { Link } from 'react-router-dom';
import './Header.scss';
import logo from '../../assets/img/logo.svg';

const Header = () => {
    return (
        <header className="Header">
            <div className="Header__in">
                <Link to={'/organizations'} className="Header__logo">
                    <img src={logo} alt="Logo" />
                </Link>
            </div>
        </header>
    )
}

export default Header;
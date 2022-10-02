import './HeaderProfile.scss';
import logo from '../../assets/img/logo.svg';
import {BsChevronCompactLeft, BsChevronCompactDown} from 'react-icons/bs';


const HeaderProfile = () => {

    return (
        <header className="HeaderProfile">
            <div className="HeaderProfile__in">
                <div className="HeaderProfile__logo">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="HeaderProfile__main">
                    <div className="HeaderProfile__main_nav">
                        <span className="HeaderProfile__main_nav_icon">
                            <BsChevronCompactLeft/>
                        </span>
                        <span className="HeaderProfile__main_nav_text">Раздел</span>
                    </div>
                    <div className="HeaderProfile__main_user">
                        <span className="HeaderProfile__main_user_name">Alex</span>
                        <span className="HeaderProfile__main_user_icon">
                            <BsChevronCompactDown/>
                        </span>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default HeaderProfile;
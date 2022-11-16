import './HeaderProfile.scss';
import logo from '../../assets/img/logo.svg';
import {BsChevronCompactLeft, BsChevronCompactDown} from 'react-icons/bs';
import { Dropdown } from 'antd';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import {useLocation} from 'react-router-dom';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const HeaderProfile = () => {
    const {sidebarOpen, settings, user} = useSelector(state => state)
    const loc = useLocation()


    useEffect(() => {
        console.log('settings', settings)
        console.log('user', user)
    }, [settings, user])

    const updateHead = (path) => {
        if(path == ('/')) {
            return (
                <Link to={'/organizations'}>Организации</Link>
            )
        }
        if(path.includes('organizations')) {
            return (
                <Link to={'/organizations'}>Организации</Link>
            )
        }
        if(path.includes('catalog')) {
            return (
                <Link to={'/catalog'}>Каталог</Link>
            )
        }
        if(path.includes('stories')) {
            return 'Сториз'
        }
        if(path.includes('clients')) {
            return 'Клиенты'
        }
        if(path.includes('orders')) {
            return 'Заказы'
        }
        if(path.includes('statistic')) {
            return 'Статистика'
        }
        if(path.includes('basket')) {
            return 'Корзина'
        }
        if(path.includes('integr')) {
            return 'Интеграции'
        }
        if(path.includes('allsettings')) {
            return 'Все настройки'
        }
        if(path.includes('trash')) {
            return 'Удаленные обьекты'
        }
    }


    return (
        <header className="HeaderProfile">
            <div className="HeaderProfile__in">
                <div className={"HeaderProfile__logo" + (!sidebarOpen ? ' hide ' : '')}>
                    <img src={logo} alt="Logo" />
                </div>
                <div className="HeaderProfile__main">
                    {/* breadcrumbs */}
                    <div className="HeaderProfile__main_nav">
                        {/* <Link to={-1} className={"HeaderProfile__main_nav_icon"}>
                            <BsChevronCompactLeft/>
                        </Link> */}
                        <div className="HeaderProfile__main_nav_head">
                            {
                                updateHead(loc?.pathname)
                            }
                        </div>
                    </div>

                    <Dropdown
                        placement='bottom'
                        trigger={['click']}
                        overlay={<ProfileMenu/>}
                    >
                        <div className="HeaderProfile__main_user">
                            <span className="HeaderProfile__main_user_name">{user?.Name}</span>
                            <span className="HeaderProfile__main_user_icon">
                                <BsChevronCompactDown/>
                            </span>
                        </div>
                    </Dropdown>
                    
                </div>
            </div>
        </header>
    )
}

export default HeaderProfile;
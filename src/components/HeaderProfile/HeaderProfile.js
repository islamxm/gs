import './HeaderProfile.scss';
import logo from '../../assets/img/logo.svg';
import {BsChevronCompactLeft, BsChevronCompactDown} from 'react-icons/bs';
import { Dropdown } from 'antd';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import {useLocation} from 'react-router-dom';
import { useEffect } from 'react';

const HeaderProfile = () => {
    const loc = useLocation()

    useEffect(() => {
        console.log(loc)
    }, [loc])

    return (
        <header className="HeaderProfile">
            <div className="HeaderProfile__in">
                <div className="HeaderProfile__logo">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="HeaderProfile__main" style={{justifyContent: 'flex-end'}}>
                    {/* <div className="HeaderProfile__main_nav">
                        <span className="HeaderProfile__main_nav_icon">
                            <BsChevronCompactLeft/>
                        </span>
                        <span className="HeaderProfile__main_nav_text">Раздел</span>
                    </div> */}
                    <Dropdown
                        placement='bottom'
                        trigger={['click']}
                        overlay={<ProfileMenu/>}
                    >
                        <div className="HeaderProfile__main_user">
                            <span className="HeaderProfile__main_user_name">Alex</span>
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
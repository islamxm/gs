import './ProfileMenu.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { tokenUpdate } from '../../store/actions';

const LOCAL_STORAGE = window.localStorage;


const ProfileMenu = () => {
    const {token} = useSelector(state => state)
    const dispatch = useDispatch()
    const nav = useNavigate()

    const logout = () => {
        dispatch(tokenUpdate(null))
        LOCAL_STORAGE.removeItem('gs-token')
        nav('/auth', {replace: true})
    }

    return (
        <div className="ProfileMenu">
            <div className="ProfileMenu__item">Все настройки</div>
            <div className="ProfileMenu__item danger">Выйти</div>
        </div>
    )
}

export default ProfileMenu;
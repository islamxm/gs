import './Notfound.scss';
import { useNavigate } from 'react-router-dom';
import elon from '../../assets/img/elon.png';
import Button from '../../components/Button/Button';
import {BsChevronLeft} from 'react-icons/bs';

const Notfound = () => {
    const nav = useNavigate();
    

    return (
        <div className="Notfound">
            <div className="Notfound__icon">
                <img src={elon} alt="" />
            </div>
            <div className="Notfound__text">Такой страницы либо нет либо в разработке</div>
            <div className="Notfound__action">
                <Button onClick={() => nav(-1)} text={'Вернуться назад'} before={<BsChevronLeft/>} justify={'center'} styles={{ paddingTop: 20, paddingBottom: 20}}/>
            </div>
        </div>
    )
}

export default Notfound;
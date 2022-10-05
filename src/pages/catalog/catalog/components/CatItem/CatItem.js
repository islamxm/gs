import './CatItem.scss';
import Button from '../../../../../components/Button/Button';
import img from '../../../../../assets/img/org.png';
import { Link } from 'react-router-dom';


const CatItem = ({link}) => {
    if(link) {
        return (
            <Link to={'/catalog/categoryName'} className="CatItem">
                <div className="CatItem__main">
                    <div className="CatItem__main_img">
                        <img src={img} alt="" />
                    </div>
                    <div className="CatItem__main_name">
                    Название Категории
                    </div>
                </div>
                <div className="CatItem__action">
                    <Button
                        justify={'center'}
                        styles={{width: '100%'}}
                        text={'Изменить'}/>
                </div>
            </Link>
        ) 
    } else {
        return (
            <div className="CatItem">
                <div className="CatItem__main">
                    <div className="CatItem__main_img">
                        <img src={img} alt="" />
                    </div>
                    <div className="CatItem__main_name">
                    Название Категории
                    </div>
                </div>
                <div className="CatItem__action">
                    <Button
                        justify={'center'}
                        styles={{width: '100%'}}
                        text={'Изменить'}/>
                </div>
            </div>
        )
    }
    
}

export default CatItem;
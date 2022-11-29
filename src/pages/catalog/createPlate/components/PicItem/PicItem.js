import './PicItem.scss';
import Button from '../../../../../components/Button/Button';
import { BsTrash } from 'react-icons/bs';
import img from '../../../../../assets/img/org.png';

const PicItem = ({image, remove, style}) => {
    return (
        <div className="PicItem" style={style}>
            <div className="PicItem__img">
                <img src={image} alt="" />
            </div>
            <div className="PicItem__action">
                <Button 
                    onClick={remove} 
                    styles={{width: '100%'}} 
                    variant={'danger'} 
                    before={<BsTrash size={20}/>} 
                    text={'Удалить'} 
                    justify={'center'}/>
            </div>
        </div>
    )
}

export default PicItem;
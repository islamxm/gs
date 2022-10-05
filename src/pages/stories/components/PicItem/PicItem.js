import './PicItem.scss';
import img from '../../../../assets/img/org.png';
import Button from '../../../../components/Button/Button';
import { BsTrash } from 'react-icons/bs';



const PicItem = ({image, remove, style}) => {
    return (
        <div className="PicItem" style={style}>
            <div className="PicItem__img">
                <img src={img} alt="" />
            </div>
            <div className="PicItem__action">
                <Button styles={{width: '100%', padding: 10}} variant={'danger'} text={'Удалить'} before={<BsTrash/>} justify={'center'}/>
            </div>
        </div>  
    )
}

export default PicItem;
import './PicItem.scss';
import Button from '../../../../../components/Button/Button';
import { BsTrash } from 'react-icons/bs';
import img from '../../../../../assets/img/org.png';

const PicItem = ({image, remove}) => {
    return (
        <div className="PicItem">
            <div className="PicItem__img">
                <img src={img} alt="" />
            </div>
            <div className="PicItem__action">
                <Button styles={{width: '100%'}} variant={'danger'} before={<BsTrash/>} text={'Удалить'} justify={'center'}/>
            </div>
        </div>
    )
}

export default PicItem;
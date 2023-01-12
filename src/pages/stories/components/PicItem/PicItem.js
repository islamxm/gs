import './PicItem.scss';
import img from '../../../../assets/img/org.png';
import Button from '../../../../components/Button/Button';
import { BsTrash } from 'react-icons/bs';



const PicItem = ({
    style,
    BundleID,
    Disabled,
    ID,
    ItemOrder,
    Picture,
    PictureThumbnail,
    onDelete
}) => {
    return (
        <div className="PicItem" style={style}>
            <div className="PicItem__img">
                <img src={PictureThumbnail} alt="" />
            </div>
            <div className="PicItem__action">
                <Button onClick={() => onDelete(ID)} styles={{width: '100%', padding: 10}} variant={'danger'} text={'Удалить'} before={<BsTrash/>} justify={'center'}/>
            </div>
        </div>  
    )
}

export default PicItem;
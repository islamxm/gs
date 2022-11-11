import './BrandItem.scss';
import Button from '../../../../../components/Button/Button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const BrandItem = ({
    ID,
    ItemOrder,
    Disabled,
    LogoUrl,
    MarkerID,
    editModal
}) => {


    const nav = useNavigate()
    

    return (
        <div className="BrandItem draggable">
             <Link to={`/organizations/${ID}`} className="BrandItem__img">
                    <img src={LogoUrl} alt="" />
                </Link>
            <div className="BrandItem__action">
                <Button
                    onClick={() => editModal(ID, ItemOrder, LogoUrl, MarkerID)}
                    text={'Изменить'}
                    justify={'center'}/>
            </div>
        </div>
    )
}

export default BrandItem;
import './BrandItem.scss';
import Button from '../../../../../components/Button/Button';
import img from '../../../../../assets/img/org-brand.png';
import { Link } from 'react-router-dom';
import useModal from '../../../../../hooks/useModal';
import EditBrand from '../../../modals/editBrand/EditBrand';



const BrandItem = ({link, image}) => {
    const {visible, showModal, hideModal} = useModal();

    const editModal = () => {
        showModal();
    }

    return (
        <div className="BrandItem">
            <EditBrand name={'Мой бренд'} visible={visible} close={hideModal}/>
            <Link to={'/organizations/item'} className="BrandItem__img">
                <img src={image} alt="" />
            </Link>
            <div className="BrandItem__action">
                <Button
                    onClick={editModal}
                    text={'Изменить'}
                    justify={'center'}/>
            </div>
        </div>
    )
}

export default BrandItem;
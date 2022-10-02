import './OrgsItem.scss';
import Button from '../../../../../components/Button/Button';
import img from '../../../../../assets/img/org-brand.png';
import { Link } from 'react-router-dom';
import useModal from '../../../../../hooks/useModal';
import EditBrand from '../../../modals/editBrand/EditBrand';



const OrgsItem = ({link}) => {
    const {visible, showModal, hideModal} = useModal();

    const editModal = () => {
        showModal();
    }

    return (
        <div className="OrgsItem">
            <EditBrand name={'Мой бренд'} visible={visible} close={hideModal}/>
            <Link to={link ? link : '/'} className="OrgsItem__img">
                <img src={img} alt="" />
            </Link>
            <div className="OrgsItem__action">
                <Button
                    onClick={editModal}
                    text={'Изменить'}
                    justify={'center'}/>
            </div>
        </div>
    )
}

export default OrgsItem;
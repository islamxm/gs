import './ConfirmModal.scss';
import { Modal } from 'antd';


const ConfirmModal = ({visible, close, text}) => {


    const closeHandle = () => {

    }

    return (
        <Modal className='Modal ConfirmModal' open={visible} onCancel={closeHandle}>

        </Modal>
    )
}

export default ConfirmModal;
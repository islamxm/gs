import Input from '../../../../components/Input/Input';
import './BasketExList.scss';
import Pl from '../../../../components/Pl/Pl';
import BasketAddAddition from '../../modals/BasketAddAddition/BasketAddAddition';
import BasketEditAddition from '../../modals/BasketEditAddition/BasketEditAddition';
import useModal from '../../../../hooks/useModal';
import { useState } from 'react';

const mock = [
    {value: 'Васаби'},
    {value: 'Имбирь'}
]


const BasketExList = ({list}) => {
    const {visible, hideModal, showModal} = useModal()
    const [addAddition, setAddAddition] = useState(false);
    const [editAddition, setEditAddition] = useState(false);

    const openAddAddition = () => {
        setAddAddition(true)
    }
    const closeAddAddition = () => {
        setAddAddition(false)
    }
    const openEditAddition = () => {
        setEditAddition(true)
    }
    const closeEditAddition = () => {
        setEditAddition(false)
    }
    

    return (
        <div className="BasketExList">
            <BasketAddAddition visible={addAddition} close={closeAddAddition}/>
            <BasketEditAddition visible={editAddition} close={closeEditAddition}/>
            <h3 className="BasketExList__head" style={{fontWeight: 600, color: '#989898', marginBottom: 10, fontSize: '16px'}}>
            Список дополнений
            </h3>
            <div className="BasketExList__list">
                {
                    mock.map((item, index) => (
                        <Input onClick={openEditAddition} style={{marginBottom: 10}} value={item.value} readOnly/>
                    ))
                }
            </div>
            <div className="BasketExList__action">
                <Pl onClick={openAddAddition} style={{backgroundColor: '#fff'}} text={'Добавить дополнение'}/>
            </div>
        </div>
    )
}

export default BasketExList;
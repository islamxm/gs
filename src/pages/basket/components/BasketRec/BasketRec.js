import './BasketRec.scss';
import Input from '../../../../components/Input/Input';
import Pl from '../../../../components/Pl/Pl';
import { useState } from 'react';
import BasketAddRec from '../../modals/BasketAddRec/BasketAddRec';
import BasketEditRec from '../../modals/BasketEditRec/BasketEditRec';

const mock = [
    {value: 'Блюдо 1'},
    {value: 'Блюдо 2'},
]

const BasketRec = () => {
    const [addRec, setAddRec] = useState(false)
    const [editRec, setEditRec] = useState(false)

    const openAddRec = () => {
        setAddRec(true)
    }
    const closeAddRec = () => {
        setAddRec(false)
    }
    const openEditRec = () => {
        setEditRec(true)
    }
    const closeEditRec = () => {
        setEditRec(false)
    }

    return (
        <div className="BasketRec">
            <BasketAddRec visible={addRec} close={closeAddRec}/>
            <BasketEditRec visible={editRec} cloes={closeEditRec}/>
            <h3 className="BasketRec__head" style={{fontWeight: 600, color: '#989898', marginBottom: 10, fontSize: '16px'}}>
            Общие рекомендации
            </h3>
            <div className="BasketRec__list">
                {
                    mock.map((item, index) => (
                        <Input style={{marginBottom: 10}} value={item.value} readOnly/>
                    ))
                }
            </div>
            <div className="BasketRec__action">
                <Pl onClick={openAddRec} style={{backgroundColor: '#fff'}} text={'Добавить блюдо'}/>
            </div>
        </div>  
    )
}

export default BasketRec;
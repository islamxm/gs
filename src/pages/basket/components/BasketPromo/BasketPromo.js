import './BasketPromo.scss';
import Input from '../../../../components/Input/Input';
import Pl from '../../../../components/Pl/Pl';
import { useState } from 'react';
import BasketAddPromo from '../../modals/BasketAddPromo/BasketAddPromo';
import BasketEditPromo from '../../modals/BasketEditPromo/BasketEditPromo';


const mock = [
    {value: 'FREE'},
    {value: 'GIFT'},
]

const BasketPromo = () => {
    const [addPromo, setAddPromo] = useState(false);
    const [editPromo, setEditPromo] = useState(false);

    const openAddPromo = () => {
        setAddPromo(true)
    }
    const closeAddPromo = () => {
        setAddPromo(false)
    }
    const openEditPromo = () => {
        setEditPromo(true)
    }
    const closeEditPromo = () => {
        setEditPromo(false)
    }


    return (
        <div className="BasketPromo">
            <BasketAddPromo visible={addPromo} close={closeAddPromo}/>
            <BasketEditPromo visible={editPromo} close={closeEditPromo}/>
            <h3 className="BasketPromo__head" style={{fontWeight: 600, color: '#989898', marginBottom: 10, fontSize: '16px'}}>
                Список дополнений
            </h3>
            <div className="BasketPromo__list">
                {
                    mock.map((item, index) => (
                        <Input onClick={openEditPromo} style={{marginBottom: 10}} value={item.value} readOnly/>
                    ))
                }
            </div>
            <div className="BasketPromo__action">
                <Pl onClick={openAddPromo} style={{backgroundColor: '#fff'}} text={'Добавить промокод'}/>
            </div>
        </div>
    )
}

export default BasketPromo;
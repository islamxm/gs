import '../addMod/AddMod.scss';
import { Modal } from 'antd';
import Input from '../../../../components/Input/Input';
import {Row, Col} from 'antd';
import Pl from '../../../../components/Pl/Pl';
import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import catService from '../../../../services/catService';
import DropCollapse from '../../../../components/DropCollapse/DropCollapse';
import Checkbox from '../../../../components/Checkbox/Checkbox';
import { useEffect } from 'react';
import SaveIcon from '../../../../icons/SaveIcon/SaveIcon';

const cs = new catService();


// const ModItem = ({list}) => {
    
//     return (
        
//     )
// }


const countModList = [
    {
        value: 'Выбор нескольких модификаторов',
    },
    {
        value: 'Выбор одного из модификаторов',
    }
]





const AddModItem = ({visible, close, update, data}) => {
    const [Name, setName] = useState('')
    const [Price, setPrice] = useState('')
    const [IIkoID, setIIkoID] = useState('')

    useEffect(() => {
        if(data) {
            setName(data.Name)
            setPrice(data.Price)
            setIIkoID(data.IIkoID)
        }
    }, [data])

    const closeHandle = () => {
        setName('')
        setPrice('')
        setIIkoID('')
        close()
    }

    const onSave = () => {
        if(!data) {
            update(state => {
                return [
                    ...state,
                    {
                        IIkoID,
                        Name,
                        Price
                    }
                ]
            })
            closeHandle()
        } else {
            update(state => {
                let m = state;
                const rm = m.splice(data.index, 1, {
                    IIkoID,
                    Name,
                    Price
                })
                return [...m]
                // if(state.find(item => item.ID == data.ID)) {
                //     let r = m.splice(state.findIndex(item => item.ID == data.ID), 1, {
                //         IIkoID,
                //         Name,
                //         Price
                //     })
    
                //     return m;
                // } else {
                //     return [
                //         ...state,
                //         {
                //             IIkoID,
                //             Name,
                //             Price
                //         }
                //     ]
                // }
                
            })
            closeHandle()
        }
    }
    
    return (
        <Modal className='Modal' width={650} open={visible} onCancel={closeHandle}>
            {
                data ? (
                    <h2 className="Modal__head">Редактировать модификатор</h2>
                ) : (
                    <h2 className="Modal__head">Добавить модификатор</h2>
                )
            }
            
            <div className="Modal__form">
                <div className="AddMod">
                    <div className="AddMod__body">
                        <div className="AddMod__body_list">
                            <div className="AddMod__body_item active">
                                <div className="AddMod__body_item_main panel">
                                    <Row gutter={[20, 0]}>
                                        <Col span={14}>
                                            <input
                                                onChange={e => setName(e.target.value)}
                                                value={Name} 
                                                type="text" 
                                                className='AddMod__body_item_name' 
                                                placeholder='Название'/>
                                        </Col>
                                        <Col span={10}>
                                            <input
                                                value={Price}
                                                onChange={e => setPrice(e.target.value)} 
                                                type="text" 
                                                className='AddMod__body_item_value' 
                                                placeholder='Цена'/>
                                        </Col>
                                    </Row>
                                </div>
                              
                            </div>
                            
                        </div>
                    </div>

                </div>
                <div className="Modal__form_action">
                    <Button
                        disabled={!Name || !Price} 
                        type={'button'} 
                        onClick={onSave}  
                        before={<SaveIcon color={'#fff'} size={20}/>} 
                        justify={'flex-start'} 
                        text={'Сохранить'}/>
                </div>
            </div>
        </Modal>
    )
}

export default AddModItem;
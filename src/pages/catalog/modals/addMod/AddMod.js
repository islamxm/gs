import './AddMod.scss';
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
import AddModItem from '../addModItem/AddModItem';
import { useParams } from 'react-router-dom';
import SaveIcon from '../../../../icons/SaveIcon/SaveIcon'
import { useEffect } from 'react';
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





const AddMod = ({visible, close, plateId, update}) => {
    const {token} = useSelector(state => state)
    const [mods, setMods] = useState([])
    const [IsRequired, setIsRequired] = useState('0')
    const [Title, setTitle] = useState('')
    const [Type, setType] = useState({label: 'Выбор нескольких модификаторов', value: '2'})
    const [modCreateModal, setModCreateModal] = useState(false)
    const [saveLoad, setSaveLoad] = useState(false)
    const [selected, setSelected] = useState(null)

    const closeHandle = () => {
        setMods([])
        setIsRequired('0')
        setTitle('')
        setType({label: 'Выбор нескольких модификаторов', value: '2'})
        setSelected(null)
        close();
    }


    const onSave = () => {
        setSaveLoad(true)
        cs.addMod(token, {
            IIkoID: '',
            ItemID: plateId,
            Title,
            Type: Type.value,
            IsRequired,
            Modificators: mods
        }).then(res => {
            update(res)
        }).finally(_ => {
            setSaveLoad(false)
            closeHandle()
        })
    }

    const addMod = () => {
        setModCreateModal(true)
    }

    const removeMod = (index) => {
        let r = [...mods]
        let m = r.splice(index, 1)
        setMods([...r])
        setModCreateModal(false)
        setSelected(null)
        
    }

    const selectType = (value) => {
        setMods([])
        if(value == 'Выбор нескольких модификаторов') {
            setType({
                label: 'Выбор нескольких модификаторов',
                value: '2'
            })
        } else {
            setType({
                label: 'Выбор одного из модификаторов',
                value: '1'
            }) 
        }
    }

    useEffect(() => {
        if(!modCreateModal) {
            setSelected(null)
        }
    }, [modCreateModal])

    const editItem = (item, index) => {
        setSelected({
            ...item,
            index: index
        })
        addMod()
    }

    return (
        <Modal className='Modal' width={650} open={visible} onCancel={closeHandle}>
            <AddModItem
                onDelete={removeMod}
                data={selected} 
                update={setMods} 
                visible={modCreateModal} 
                close={() => setModCreateModal(false)}/>
            <h2 className="Modal__head">Добавить группу модификаторов</h2>
            <div className="Modal__form">
                <div className="Modal__form_row">
                    <Input
                        shadow={true}
                        value={Title}
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder={'Название группы'}/>
                </div>
                <div className="Modal__form_row">
                    <DropCollapse
                        shadow={true}
                        list={countModList}
                        selectItem={selectType}
                        afterIcon 
                        value={Type.label}/>
                </div>
                <div className="Modal__form_row">
                    <Checkbox
                        shadow={true}
                        checked={IsRequired == '1'}
                        onChange={(e) => {
                            if(e.target.checked) {
                                setIsRequired('1')
                            } else {
                                setIsRequired('0')
                            }
                        }}
                        id={'isRequiredMod'}
                        text={'Обязательная группа'}/>
                </div>
                <div className="AddMod">
                    <h3 className="AddMod__head panel-label">Список модификаторов</h3>
                    <div className="AddMod__body">
                        <div className="AddMod__body_list">
                            {
                                mods && mods.length > 0 ? (
                                    mods.map((item, index) => (
                                        <div className="AddMod__body_item active" key={index}>
                                            <div onClick={() => editItem(item, index)} className="AddMod__body_item_main panel">
                                                <Row gutter={[20, 0]}>
                                                    <Col span={14}>
                                                        <div className="AddMod__body_item_name">
                                                            {item.Name}
                                                        </div>
                                                    </Col>
                                                    <Col span={10}>
                                                        <div className="AddMod__body_item_value">
                                                            {item.Price}₽
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                            {/* <div className="AddMod__body_item_action">
                                                <Button
                                                    onClick={() => removeMod(index)} 
                                                    before={<BsTrash size={20}/>} 
                                                    variant={'danger'} 
                                                    text={'Удалить модификатор'} 
                                                    justify={'flex-start'} 
                                                    styles={{padding: 10}}/>
                                            </div> */}
                                        </div>
                                    ))
                                ) : null
                            }
                            
                        </div>
                    </div>
                    {
                        mods.length >= 1 && Type.value == '1' ? (
                            null
                        ) : (
                            <Pl shadow={true} text={'Добавить модификатор'} onClick={addMod} style={{backgroundColor: '#fff', marginBottom: 40}}/>
                        )
                    }
                    
                </div>
                <div className="Modal__form_action">
                    <Button 
                        load={saveLoad}
                        onClick={onSave}
                        disabled={mods.length == 0}
                        type={'button'}  
                        before={<SaveIcon color={'#fff'} size={20}/>} 
                        justify={'flex-start'} 
                        text={'Сохранить'}/>
                </div>
            </div>
        </Modal>
    )
}

export default AddMod;
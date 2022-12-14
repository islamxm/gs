import '../addMod/AddMod.scss';


import { Modal } from 'antd';
import Input from '../../../../components/Input/Input';
import {Row, Col} from 'antd';
import Pl from '../../../../components/Pl/Pl';
import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import AddModItem from '../addModItem/AddModItem';
import DropCollapse from '../../../../components/DropCollapse/DropCollapse';
import Checkbox from '../../../../components/Checkbox/Checkbox';
import catService from '../../../../services/catService';
import SaveIcon from '../../../../icons/SaveIcon/SaveIcon';


const cs = new catService()

const countModList = [
    {
        value: 'Выбор нескольких модификаторов',
    },
    {
        value: 'Выбор одного из модификаторов',
    }
]


const EditMod = ({visible, close, selected, plateId, update}) => {
    const {token} = useSelector(state => state)
    const [groupModId, setGroupModId] = useState('')
    const [mods, setMods] = useState([])
    const [IsRequired, setIsRequired] = useState('0')
    const [Title, setTitle] = useState('')
    const [Type, setType] = useState({label: 'Выбор нескольких модификаторов', value: '2'})
    const [modCreateModal, setModCreateModal] = useState(false)
    const [edit, setEdit] = useState(false)
    const [saveLoad, setSaveLoad] = useState(false)
    const [delLoad, setDelLoad] = useState(false)
   

    useEffect(() => {
        console.log(selected)
        if(selected) {
            console.log(selected?.Title)
            setGroupModId(selected?.ID)
            setMods(selected?.Modificators)
            setIsRequired(selected?.IsRequired)
            setTitle(selected?.Title)
            setType({
                label: selected?.Type == '2' ? 'Выбор нескольких модификаторов' : 'Выбор одного из модификаторов',
                value: selected?.Type
            })
        }
    }, [selected])

    const closeHandle = () => {
        close();
        setGroupModId(null)
        setMods([])
        setIsRequired('0')
        setTitle('')
        setType({label: 'Выбор нескольких модификаторов', value: '2'})
        setEdit(null)
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

    const addMod = () => {
        setModCreateModal(true)
    }

    const editMod = ({...item}) => {
        console.log(item)
        setEdit(item)
        addMod()
    }

    const removeMod = (index) => {
        let r = [...mods]
        let m = r.splice(index, 1)
        setMods([...r])
        setModCreateModal(false)
        setEdit(null)
    }


    const onSave = () => {
        console.log({
            ID: groupModId,
            IIkoID: '',
            ItemID: plateId,
            Title,
            Type,
            IsRequired,
            Modificators: mods
        })
        setSaveLoad(true)
        cs.editMod(token, {
            ID: groupModId,
            IIkoID: '',
            ItemID: plateId,
            Title,
            Type,
            IsRequired,
            Modificators: mods
        }).then(res => {
            update(res)
        }).finally(_ => {
            setSaveLoad(false)
            closeHandle()
        })
    }

    const onDelete = () => {
        setDelLoad(true)
        cs.deleteMod(token, {ItemID: plateId, groupModificatorID: groupModId}).then(res => {
            console.log(res)
            // update(res)
        }).finally(_ => {
            setDelLoad(false)
            closeHandle()
        })
    }

    return (
        <Modal className='Modal' width={650} open={visible} onCancel={closeHandle}>
            <AddModItem 
                update={setMods} 
                data={edit} 
                visible={modCreateModal}
                onDelete={removeMod} 
                close={() => setModCreateModal(false)}/>
            <h2 className="Modal__head">Добавить группу модификаторов</h2>
            <div className="Modal__form">
                <div className="Modal__form_row">
                    <Input
                        shadow={true}
                        value={Title}
                        maskType={String}
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
                        checked={IsRequired == '1' ? true : false}
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
                                            <div className="AddMod__body_item_main panel" onClick={() => editMod({...item})}>
                                                <Row gutter={[20, 10]}>
                                                    <Col span={12}>
                                                        <div className="AddMod__body_item_value">
                                                            {item.Name}
                                                        </div>
                                                    </Col>
                                                    <Col span={12}>
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
                        disabled={mods.length == 0}
                        load={saveLoad}
                        onClick={onSave}
                        type={'button'}  
                        before={<SaveIcon color={'#fff'} size={20}/>} 
                        justify={'flex-start'} 
                        text={'Сохранить'}/>
                    <Button 
                        load={delLoad}
                        styles={{marginTop: 10}}
                        onClick={onDelete}
                        variant={'danger'}
                        type={'button'}  
                        before={<BsTrash size={20}/>} 
                        justify={'flex-start'} 
                        text={'Удалить группу'}/>
                </div>
            </div>
        </Modal>
    )
}

export default EditMod;
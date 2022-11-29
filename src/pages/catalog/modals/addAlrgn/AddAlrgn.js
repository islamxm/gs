
import { Modal } from 'antd';
import Input from '../../../../components/Input/Input';
import {Row, Col} from 'antd';
import Pl from '../../../../components/Pl/Pl';
import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import catService from '../../../../services/catService';

const cs = new catService()

const AddAlrgn = ({visible, close, data, update, plateId}) => {
    const {token} = useSelector(state => state);
    const [Name, setName] = useState('')
    const [saveLoad, setSaveLoad] = useState(false)
    const [delLoad, setDelLoad] = useState(false)

    useEffect(() => {
        if(data) {
            setName(data.Name)
        }
    }, [data])

    const closeHandle = () => {
        setName('')
        close()
    }

    const onSave = () => {
        setSaveLoad(true)
        if(!data) {
            cs.addAllergens(token, {ItemID: plateId, Name}).then(res => {
                update(res)
            }).finally(_ => {
                setSaveLoad(false)
                closeHandle()
            })
        } else {
            cs.editAllergens(token, {ID: data.ID, Name}).then(res => {
                update(res)
            }).finally(_ => {
                setSaveLoad(false)
                closeHandle()
            })
        }
    }

    const onDelete = () => {
        setDelLoad(true)
        cs.deleteAllergens(token, {ID: data.ID}).then(res => {
            update(res)
        }).finally(_ => {
            setDelLoad(false)
            closeHandle()
        })
    }

    return (
        <Modal className='Modal' open={visible} onCancel={closeHandle} width={600}>
            <h2 className="Modal__head">Добавить аллерген</h2>
            <div className="Modal__form">
                <div className="Modal__form_row">
                    <Input
                        value={Name}
                        onChange={(e) => setName(e.target.value)} 
                        placeholder={'Название аллергена'}/>
                </div>
                <div className="Modal__form_action">
                    <Button
                        onClick={onSave}
                        disabled={!Name}
                        load={saveLoad} 
                        before={<BsTrash/>} 
                        text={'Сохранить'} 
                        justify={'flex-start'}/>
                    {
                        data ? (
                            <Button
                                styles={{marginTop: 10}}
                                onClick={onDelete}
                                load={delLoad} 
                                variant={'danger'}
                                before={<BsTrash size={20}/>} 
                                text={'Удалить аллерген'} 
                                justify={'flex-start'}/>
                        ) : null
                    }
                </div>
            </div>
        </Modal>
    )
}

export default AddAlrgn;
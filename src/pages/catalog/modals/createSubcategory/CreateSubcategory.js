import './CreateSubcategory.scss';
import { Modal } from 'antd';
import { useState, useEffect } from 'react';
import Input from '../../../../components/Input/Input';
import Button from '../../../../components/Button/Button';
import DropCollapse from '../../../../components/DropCollapse/DropCollapse';
import Checkbox from '../../../../components/Checkbox/Checkbox';
import {BsTrash} from 'react-icons/bs';
import Pl from '../../../../components/Pl/Pl';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import catService from '../../../../services/catService';
import {Row, Col} from 'antd';
import PlUpload from '../../../../components/PlUpload/PlUpload';
import SaveIcon from '../../../../icons/SaveIcon/SaveIcon';
const cs = new catService()

const CreateSubcategory = ({visible, close, update, data}) => {
    const {token} = useSelector(state => state)
    const {categoryId, subcategoryId} = useParams();
    const [saveLoad, setSaveLoad] = useState(false)
    const [delLoad, setDelLoad] = useState(false)
    const [Name, setName] = useState('')
    const [IIkoID, setIIkoID] = useState('')
    const [CanOverwriteByIIko, setCanOverwriteByIIko] = useState('0')
    const [ID, setID] = useState(null)


    const closeHandle = () => {
        setName('')
        setIIkoID('')
        setCanOverwriteByIIko('0')
        setID(null)
        close();
    }

    useEffect(() => {
        if(data) {
            console.log(data)
            setName(data?.Name)
            setIIkoID(data?.IIkoID)
            setCanOverwriteByIIko(data?.CanOverwriteByIIko)
            setID(data?.ID)
        }
    }, [data])

    

    const onSubmit = () => {
        setSaveLoad(true)
        const body = new FormData();
        body.append('Name', Name)
        body.append('IIkoID', IIkoID)
        body.append('IsSubCategory', '1')
        body.append('ParentID', subcategoryId ? subcategoryId : 0)
        body.append('CategoryID', categoryId)

        if(!data) {
            cs.addProd(token, body).then(res => {
                console.log(res)
            }).finally(_ => {
                update()
                setSaveLoad(false)
                closeHandle()
            })
        } else {
            body.append('ID', ID)
            body.append('CanOverwriteByIIko', CanOverwriteByIIko)

            cs.editProd(token, body).then(res => {
                console.log(res)
            }).finally(_ => {
                update()
                setSaveLoad(false)
                closeHandle()
            })
        }
        
    }

    const onDelete = () => {
        setDelLoad(true)
        cs.delProd(token, {
            ID: ID,
            Delete: 'hard'
        }).then(res => {
            console.log(res)
        }).finally(_ => {
            update()
            setDelLoad(false)
            closeHandle()
        })
    }

    return (
        <Modal open={visible} onCancel={closeHandle} className="Modal">
            <h2 className="Modal__head">
                {
                    data ? (
                        'Редактировать подкатегорию'
                    ) : (
                        'Добавить подкатегорию'
                    )
                }
            </h2>
            <div className="Modal__form">
                <Row gutter={[0, 20]}>
                    <Col span={24}>
                        <Input
                            value={Name}
                            onChange={e => setName(e.target.value)} 
                            placeholder={'Название категории'}/>
                    </Col>
                    <Col span={24}>
                        <Input
                            value={IIkoID}
                            onChange={e => setIIkoID(e.target.value)} 
                            placeholder={'ID в iIko'}/>
                    </Col>
                    {
                        data ? (
                            <Col span={24}>   
                                <Checkbox
                                    checked={CanOverwriteByIIko == '1' ? true : false}
                                    id={'overriteSubcategoryIiko'}
                                    text={'Разрешить iiko перезаписывать подкатегорию'}
                                    shadow
                                    onChange={e => {
                                        if(e.target.checked) {
                                            setCanOverwriteByIIko('1')
                                        } else {
                                            setCanOverwriteByIIko('0')
                                        }
                                    }}
                                    />
                            </Col>
                        ) : null
                    }
                    
                    <Col span={24}>
                        <Row gutter={[0, 20]}>
                            <Col span={24}>
                                <Button
                                    disabled={!Name}
                                    load={saveLoad}
                                    styles={{width: '100%'}}
                                    onClick={onSubmit} 
                                    type={'button'}  
                                    before={<SaveIcon size={16} color={'#fff'}/>} 
                                    justify={'flex-start'} 
                                text={'Сохранить'}/>
                            </Col>
                            {
                                data ? (
                                    <Button
                                        load={delLoad}
                                        styles={{width: '100%'}}
                                        onClick={onDelete} 
                                        type={'button'}  
                                        variant={'danger'}
                                        before={<BsTrash/>} 
                                        justify={'flex-start'} 
                                        text={'Удалить подкатегорию'}/>
                                ) : null
                            }
                        </Row>
                        
                        
                    </Col>
                </Row>
            </div>
        </Modal>
    )
}

export default CreateSubcategory;
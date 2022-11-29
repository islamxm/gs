import './CreateSubcategory.scss';
import { message, Modal } from 'antd';
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
    const [Picture, setPicture] = useState(null)
    const [IIkoID, setIIkoID] = useState('')
    const [CanOverwriteByIIko, setCanOverwriteByIIko] = useState('0')
    const [ID, setID] = useState(null)
    const [prev, setPrev] = useState(null)


    const closeHandle = () => {
        setName('')
        setIIkoID('')
        setCanOverwriteByIIko('0')
        setID(null)
        close();
        setPicture(null)
        setPrev(null)
    }

    useEffect(() => {
        if(data) {
            setName(data?.Name)
            setIIkoID(data?.IIkoID)
            setCanOverwriteByIIko(data?.CanOverwriteByIIko)
            setID(data?.ID)
            setPicture(data?.Pictures[0])
            setPrev(data?.Pictures[0]?.Picture)
        }
    }, [data])

    
    const addImg = (e) => {
        if(ID) {
            console.log(ID)
            const body = new FormData();
            body.append('Picture', e.target.files[0])
            body.append('ItemID', ID)
            cs.addPlateImg(token, body).then(res => {
                if(res) {
                    setPicture(res[0])
                    setPrev(res[0].Picture)
                }
            })
        } else {
            setPicture(e.target.files[0])
            setPrev(URL.createObjectURL(e.target.files[0]))
        }
        
    }

    const deleteImg = (id) => {
        if(id) {
            cs.deletePlateImg(token, {ID: id}).then(res => {
                if(res.error == '0') {
                    setPicture(null)
                    setPrev(null)
                } else {
                    message.error('Произошла ошибка')
                }
            })
        } else {
            setPicture(null)
            setPrev(null)
        }
        
    }


    


    const onSubmit = () => {
        setSaveLoad(true)
        const body = new FormData();
        body.append('Name', Name)
        body.append('IIkoID', IIkoID)
        body.append('IsSubCategory', '1')
        body.append('ParentID', subcategoryId ? subcategoryId : 0)
        body.append('CategoryID', categoryId)
        body.append('Picture', Picture)
        
        if(!data) {
            cs.addProd(token, body).then(res => {
                
            }).finally(_ => {
                update()
                setSaveLoad(false)
                closeHandle()
            })
        } else {
            body.append('ID', ID)
            body.append('CanOverwriteByIIko', CanOverwriteByIIko)

            cs.editProd(token, body).then(res => {

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

        }).finally(_ => {
            update()
            setDelLoad(false)
            closeHandle()
        })
    }

    return (
        <Modal open={visible} onCancel={closeHandle} className="Modal CreateSubcategory">
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
                        <div className="CreateSubcategory__upload">
                            {
                                Picture ? (
                                    <button onClick={() => deleteImg(Picture?.ID)} className="CreateSubcategory__upload_btn">
                                        <BsTrash/>
                                    </button>
                                ) : null
                            }
                            <PlUpload
                            id={'uploadSubCatImg'}
                            text={'Выбрать картинку'}
                            onChange={addImg}
                            accept={'.png, .jpg, .jpeg'}
                            style={{backgroundColor: '#F8F8F8', height: 250}}
                            prev={prev ? prev : null}
                            />
                        </div>
                        
                    </Col>
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
                                    before={<SaveIcon size={20} color={'#fff'}/>} 
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
                                        before={<BsTrash size={20}/>} 
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
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
import ConfirmModal from '../../../../components/ConfirmModal/ConfirmModal';



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
    const [HideInApp, setHideInApp] = useState('0')
    const [deleteConfirm, setDeleteConfirm] = useState(false)

    const closeHandle = () => {
        setName('')
        setIIkoID('')
        setCanOverwriteByIIko('0')
        setID(null)
        close();
        setPicture(null)
        setPrev(null)
        setHideInApp('0')
    }

    useEffect(() => {
        if(data) {
            console.log(data)
            setHideInApp(data?.HideInApp)
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
                    message.error('?????????????????? ????????????')
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
        body.append('HideInApp', HideInApp)
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

    
    const openDeleteConfirm = () => setDeleteConfirm(true)
    const closeDeleteConfirm = () => setDeleteConfirm(false)
    const deleteConfirmAccept = () => {
        onDelete()
        closeDeleteConfirm()
    }

    return (
        <Modal open={visible} onCancel={closeHandle} className="Modal CreateSubcategory">
            <ConfirmModal
                visible={deleteConfirm}
                close={closeDeleteConfirm}
                cancel={deleteConfirmAccept}
                text={'?????????????? ?????????????????????????'}
                />
            <h2 className="Modal__head">
                {
                    data ? (
                        '?????????????????????????? ????????????????????????'
                    ) : (
                        '???????????????? ????????????????????????'
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
                            shadow={true}
                            id={'uploadSubCatImg'}
                            text={'?????????????? ????????????????'}
                            onChange={addImg}
                            accept={'.png, .jpg, .jpeg'}
                            style={{backgroundColor: '#F8F8F8', height: 250}}
                            prev={prev ? prev : null}
                            />
                        </div>
                        
                    </Col>
                    {
                        data?.ID && data?.IIkoID ? (
                            <Col span={24}>
                                <Row gutter={[20, 20]}>
                                    <Col span={12}>
                                        <div className="def-label">ID ?? ??????????????</div>
                                        <div className="def-value">{data.ID}</div>
                                    </Col>
                                    <Col span={12}>
                                        <div className="def-label">ID ?? iIko</div>
                                        <div className="def-value">{data.IIkoID}</div>
                                    </Col>
                                </Row>
                            </Col>    
                        ) : null
                    }
                    <Col span={24}>
                        <Input
                            maskType={String}
                            shadow={true}
                            value={Name}
                            onChange={e => setName(e.target.value)} 
                            placeholder={'???????????????? ????????????????????????'}/>
                    </Col>
                    <Col span={24}>
                        <Input
                            maskType={String}
                            shadow={true}
                            value={IIkoID}
                            onChange={e => setIIkoID(e.target.value)} 
                            placeholder={'ID ?? iIko'}/>
                    </Col>
                    {
                        data ? (
                            <Col span={24}>   
                                <Checkbox
                                    shadow={true}
                                    checked={CanOverwriteByIIko == '1' ? true : false}
                                    id={'overriteSubcategoryIiko'}
                                    text={'?????????????????? iiko ???????????????????????????? ????????????????????????'}
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
                        <Checkbox
                            shadow={true}
                            checked={HideInApp == '1'}
                            id={'HideInApp'}
                            text={'???????????? ?? ????????????????????'}
                            onChange={e => {
                                if(e.target.checked) {
                                    setHideInApp('1')
                                } else {
                                    setHideInApp('0')
                                }
                            }}
                            />
                    </Col>
                     
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
                                text={'??????????????????'}/>
                            </Col>
                            {
                                data ? (
                                    <Button
                                        load={delLoad}
                                        styles={{width: '100%'}}
                                        onClick={openDeleteConfirm} 
                                        type={'button'}  
                                        variant={'danger'}
                                        before={<BsTrash size={20}/>} 
                                        justify={'flex-start'} 
                                        text={'?????????????? ????????????????????????'}/>
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
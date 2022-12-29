import { Modal } from 'antd';
import './CreateCategory.scss';
import { useState, useEffect } from 'react';
import Input from '../../../../components/Input/Input';
import Button from '../../../../components/Button/Button';
import DropCollapse from '../../../../components/DropCollapse/DropCollapse';
import Checkbox from '../../../../components/Checkbox/Checkbox';
import {BsTrash} from 'react-icons/bs';
import Pl from '../../../../components/Pl/Pl';
import { useSelector, useDispatch } from 'react-redux';
import catService from '../../../../services/catService';
import orgService from '../../../../services/orgService';
import { catalogUpdate } from '../../../../store/actions';
import SaveIcon from '../../../../icons/SaveIcon/SaveIcon';
import ConfirmModal from '../../../../components/ConfirmModal/ConfirmModal';
const os = new orgService()
const cs = new catService()

const CreateCategory = ({visible,close, updateList, editItem, setSelectedCat}) => {
    const {token} = useSelector(state => state)
    const dispatch = useDispatch();
    const [Name, setName] = useState('')
    const [ID, setID] = useState('')
    const [IIkoID, setIIkoID] = useState('')
    const [load, setLoad] = useState(false)
    const [delLoad, setDelLoad] = useState(false)
    const [orgs, setOrgs] = useState([])
    const [orgsList, setOrgsList] = useState([])
    const [CanOverwriteByIIko, setCanOverwriteByIIko] = useState('0')
    const [ItemOrder, setItemOrder] = useState(0)
    const [AllowedDeliveryTypes, setAllowedDeliveryTypes] = useState(1)
    const [isHideInOrg, setIsHideInOrg] = useState(false)
    const [HideInApp, setHideInApp] = useState('0')

    const handleClose = () => {
        setSelectedCat(null)
        setName('')
        setIsHideInOrg(false)
        setOrgsList([])
        setIIkoID('')
        setID('')
        setHideInApp('0')
        close();
    }

 

    useEffect(() => {
        if(token) {
            os.getOrgs(token).then(res => {
              
                setOrgs(res.map(item => {
                    return {
                        value: item.Name,
                        ID: item.ID
                    }
                }))
            })
        }
    }, [token])


    useEffect(() => {
        if(editItem && orgs?.length > 0) {
            setHideInApp(editItem?.HideInApp)
            setName(editItem.Name)
            setIIkoID(editItem.IIkoID)
            setIsHideInOrg(editItem.HiddenInOrganisations && editItem.HiddenInOrganisations != '/' ? true : false)
            if(editItem.HiddenInOrganisations && editItem.HiddenInOrganisations != '/') {
                let array = editItem.HiddenInOrganisations.split('//')
                setOrgsList(array.map((item, index) => {
                    if(index == 0) { 
                        return {
                            ID: item.replace(/\//g,''),
                            value: orgs.find(i => i.ID == item.replace(/\//g,''))?.value
                        }
                    }
                    if(index == array.length - 1) {
                        return {
                            ID: item.replace(/\//g,''),
                            value: orgs.find(i => i.ID == item.replace(/\//g,''))?.value
                        }
                    }
                    return {
                        ID: item,
                        value: orgs.find(i => i.ID == item)?.value
                    }
                }))
            } else {
                setOrgsList([])
            }
            setCanOverwriteByIIko(editItem.CanOverwriteByIIko)
            setItemOrder(editItem.ItemOrder)
            setAllowedDeliveryTypes(editItem.AllowedDeliveryTypes)
            setID(editItem.ID)
        }
    }, [editItem, orgs])

    

    const addOrg = () => {
        setOrgsList(state => [...state, orgs[0]])
    }  
    
    const delOrg = (index) => {
        const pr = orgsList;
        const m = pr.splice(index, 1)
        setOrgsList([...pr])
    }

    const selectOrg = (value, index, ID) => {
        let ur = orgsList;
        let p = ur.splice(index, 1, {value: value, ID})
        setOrgsList([...ur])
    }

    const switchHiddenOrg = (e) => {
        setIsHideInOrg(e.target.checked)
        if(!e.target.checked) {
            setOrgsList([])
        } else {
            setOrgsList([orgs[0]])
        }
    }

  


    const createCat = () => {
        setLoad(true)
        console.log(orgsList)
        const data = {
            // OrganisationID: '',
            IIkoID,
            CanOverwriteByIIko,
            Name,
            HiddenInOrganisations: orgsList.length > 0 ? orgsList.map(item => `/${item.ID}`).join('/') + '/' : '',
            AllowedDeliveryTypes,
            HideInApp
        }
        cs.addCat(token, data).then(res => {
            dispatch(catalogUpdate(res))
            updateList(res)
        }).finally(_ => {
            setLoad(false)
            handleClose()
        })
    }

    const deleteCat = () => {
        setDelLoad(true)
        cs.delCat(token, {ID}).then(res => {
            updateList(res)
            dispatch(catalogUpdate(res))
        }).finally(_ => {
            setDelLoad(false)
            handleClose()
        })
    }

    const editCat = () => {
        setLoad(true)
        const data = {
            ID,
            IIkoID,
            CanOverwriteByIIko,
            ItemOrder,
            Name,
            HiddenInOrganisations: orgsList.map(item => `/${item.ID}`).join('/') + '/',
            AllowedDeliveryTypes,
            HideInApp
        }
        cs.editCat(token, data).then(res => {
            updateList(res)
        }).finally(_ => {
            setLoad(false)
            handleClose()
        })
    }

    const [deleteConfirm, setDeleteConfirm] = useState(false)

    const openDeleteConfirm = () => setDeleteConfirm(true)
    const closeDeleteConfirm = () => setDeleteConfirm(false)
    const deleteConfirmAccept = () => {
        deleteCat()
    }

    return (
        <Modal className='Modal' open={visible} width={700} onCancel={handleClose}>
            <ConfirmModal
                text={'Удалить категорию'}
                visible={deleteConfirm}
                cancel={deleteConfirmAccept}
                close={closeDeleteConfirm}
                />
            <h2 className="Modal__head">
                {
                    editItem ? (
                        'Редактировать категорию'
                    ) : (
                        'Добавить категорию'
                    )
                }
            </h2>
            <form className="Modal__form">
                <div className="Modal__form_row">
                    <Checkbox
                        shadow={true}
                        checked={CanOverwriteByIIko == '1'}
                        onChange={e => {
                            if(e.target.checked) {
                                setCanOverwriteByIIko('1')
                            } else {
                                setCanOverwriteByIIko('0')
                            }
                        }}
                        id={'CanOverwriteByIIko'}
                        text={'Разрешить iiko перезаписывать категорию'}
                        />
                </div>
                <div className="Modal__form_row">
                    <Input
                        maskType={String}
                        shadow={true}
                        value={Name}
                        onChange={(e) => setName(e.target.value)} 
                        placeholder={'Название категории'}/>
                </div>
                <div className="Modal__form_row">
                    <Input
                        maskType={String}
                        shadow={true}
                        value={IIkoID}
                        onChange={(e) => setIIkoID(e.target.value)} 
                        placeholder={'ID в iIko'}/>
                </div>
                <div className="Modal__form_row">
                    <Checkbox shadow={true} checked={HideInApp == '1'} onChange={(e) => {
                        if(e.target.checked) {
                            setHideInApp('1')
                        } else {
                            setHideInApp('0')
                        }
                    }} id={'HideInApp'} text={'Скрыть в приложении'}/>
                </div>
                <div className="Modal__form_row">
                    <Checkbox shadow={true} checked={isHideInOrg} onChange={(e) => {
                        setIsHideInOrg(e.target.checked)
                        if(!e.target.checked) {
                            setOrgsList([])
                        }
                    }} id={'HiddenInOrganisations'} text={'Скрыть в организациях'}/>
                </div>
                
                
                {
                    isHideInOrg ? (
                        <>
                        <div className="Modal__form_row">
                            {
                                orgsList && orgsList.length > 0 ? (
                                    orgsList.map((item, index) => (
                                        <DropCollapse 
                                            shadow
                                            key={index}
                                            selectItem={selectOrg} 
                                            afterIcon 
                                            del={delOrg}
                                            index={index}
                                            value={item.value} 
                                            list={orgs}
                                            ID={item.ID}/>
                                    ))
                                ) : null
                            }
                        
                        </div>
                        {
                            orgsList && orgsList.length >= 10 ? (
                                null
                            ) : (
                                <div className="Modal__form_row">
                                    <Pl shadow={true} onClick={addOrg} text={'Добавить организацию'} style={{backgroundColor: '#fff'}}/>
                                </div>
                            )
                        }
                        </>
                        
                    ) : null
                }
                
                
                <div className="Modal__form_action">
                    {
                        editItem ? (
                            <>
                            <Button 
                                onClick={editCat} 
                                load={load} 
                                disabled={!Name}
                                type={'button'} 
                                before={<SaveIcon size={20} color={"#fff"}/>} 
                                justify={'flex-start'} 
                                text={'Сохранить'}
                                />
                            <Button 
                                onClick={openDeleteConfirm} 
                                styles={{marginTop: 20}} 
                                load={delLoad} 
                                type={'button'} 
                                before={<BsTrash size={20}/>} 
                                justify={'flex-start'} 
                                text={'Удалить'}
                                variant={'danger'}
                                />
                            </>
                            
                        ) : (
                            <Button 
                                onClick={createCat} 
                                load={load} 
                                disabled={!Name}
                                type={'button'} 
                                before={<SaveIcon color={'#fff'} size={20}/>} 
                                justify={'flex-start'} 
                                text={'Создать'}
                                />
                        )
                    }
                   
                </div>
            </form>
        </Modal>
    )
}

export default CreateCategory;
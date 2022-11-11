import { Modal } from 'antd';
import './CreateCategory.scss';
import { useState, useEffect } from 'react';
import Input from '../../../../components/Input/Input';
import Button from '../../../../components/Button/Button';
import DropCollapse from '../../../../components/DropCollapse/DropCollapse';
import Checkbox from '../../../../components/Checkbox/Checkbox';
import {BsTrash} from 'react-icons/bs';
import Pl from '../../../../components/Pl/Pl';
import { useSelector } from 'react-redux';
import catService from '../../../../services/catService';
import orgService from '../../../../services/orgService';
// orgsMock = [
//     {
//         value: 'Ресторан 1'
//     },
    
// ]
const os = new orgService()
const cs = new catService()

const CreateCategory = ({visible,close, updateList, editItem, setSelectedCat}) => {
    const {token} = useSelector(state => state)
    const [Name, setName] = useState('')
    const [ID, setID] = useState('')
    const [IIkoID, setIIkoID] = useState('')
    const [load, setLoad] = useState(false)
    const [delLoad, setDelLoad] = useState(false)
    const [orgs, setOrgs] = useState([])
    const [orgsList, setOrgsList] = useState([])
    const [CanOverwriteByIIko, setCanOverwriteByIIko] = useState(0)
    const [ItemOrder, setItemOrder] = useState(0)
    const [AllowedDeliveryTypes, setAllowedDeliveryTypes] = useState(1)
    const [isHideInOrg, setIsHideInOrg] = useState(false)

    const handleClose = () => {
        setSelectedCat(null)
        setName('')
        setIsHideInOrg(false)
        setOrgsList([])
        setIIkoID('')
        setID('')
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
            setName(editItem.Name)
            setIIkoID(editItem.IIkoID)
            setIsHideInOrg(editItem.HiddenInOrganisations ? true : false)
            if(editItem.HiddenInOrganisations) {
                let array = editItem.HiddenInOrganisations.split('//')
                setOrgsList(array.map((item, index) => {
                    if(index == 0) {
                        
                        return {
                            ID: item.slice(1, 2),
                            value: orgs.find(i => i.ID == item.slice(1,2))?.value
                        }
                    }
                    if(index == array.length - 1) {
                        return {
                            ID: item.slice(0, -1),
                            value: orgs.find(i => i.ID == item.slice(0,-1))?.value
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
            console.log(editItem)
        }
    }, [editItem, orgs])

    

    const addOrg = () => {
        setOrgsList(state => [...state, orgs[0]])
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
        const data = {
            // OrganisationID: '',
            IIkoID,
            CanOverwriteByIIko,
            ItemOrder,
            Name,
            HiddenInOrganisations: orgsList.map(item => `/${item.ID}`).join('/') + '/',
            AllowedDeliveryTypes
        }
        cs.addCat(token, data).then(res => {
            console.log(res)
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
            AllowedDeliveryTypes
        }
        cs.editCat(token, data).then(res => {
            updateList(res)
        }).finally(_ => {
            setLoad(false)
            handleClose()
        })
    }


    return (
        <Modal className='Modal' open={visible} width={700} onCancel={handleClose}>
            <h2 className="Modal__head">Добавить категорию</h2>
            <form className="Modal__form">
                <div className="Modal__form_row">
                    <Input
                        value={Name}
                        onChange={(e) => setName(e.target.value)} 
                        placeholder={'Название категории'}/>
                </div>
                <div className="Modal__form_row">
                    <Input
                        value={IIkoID}
                        onChange={(e) => setIIkoID(e.target.value)} 
                        placeholder={'ID в iIko'}/>
                </div>
                <div className="Modal__form_row">
                    <Checkbox checked={isHideInOrg} onChange={(e) => switchHiddenOrg(e)} id={'HiddenInOrganisations'} text={'Скрыть в организациях'}/>
                </div>
                {
                    isHideInOrg ? (
                        <>
                        <div className="Modal__form_row">
                            {
                                orgsList && orgsList.length > 0 ? (
                                    orgsList.map((item, index) => (
                                        <DropCollapse 
                                            key={index}
                                            selectItem={selectOrg} 
                                            afterIcon 
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
                                    <Pl onClick={addOrg} text={'Добавить организацию'} style={{backgroundColor: '#fff'}}/>
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
                                before={<BsTrash/>} 
                                justify={'flex-start'} 
                                text={'Сохранить'}
                                />
                            <Button 
                                onClick={deleteCat} 
                                styles={{marginTop: 20}} 
                                load={delLoad} 
                                type={'button'} 
                                before={<BsTrash/>} 
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
                                before={<BsTrash/>} 
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
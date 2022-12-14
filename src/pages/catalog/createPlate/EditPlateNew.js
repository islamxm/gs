import './CreatePlatePage.scss';
import HeaderProfile from '../../../components/HeaderProfile/HeaderProfile';
import Sidebar from '../../../components/Sidebar/Sidebar';
import { Row, Col } from 'antd';
import Pl from '../../../components/Pl/Pl';
import PicItem from './components/PicItem/PicItem';
import Input from '../../../components/Input/Input';
import Checkbox from '../../../components/Checkbox/Checkbox';
import Text from '../../../components/Text/Text';
import DropCollapse from '../../../components/DropCollapse/DropCollapse';
import Button from '../../../components/Button/Button';
import { BsTrash } from 'react-icons/bs';
import ExMass from './components/ExMass/ExMass';
import Mod from './components/Mod/Mod';
import DefList from './components/DefList/DefList';
import catService from '../../../services/catService';
import orgService from '../../../services/orgService';
import { useSelector, useDispatch } from 'react-redux';
import AddAlrgn from '../modals/addAlrgn/AddAlrgn';
import EditAlrgn from '../modals/editAlrgn/EditAlrgn';
import { useEffect, useState } from 'react';
import PlUpload from '../../../components/PlUpload/PlUpload';
import { useParams } from 'react-router-dom';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import weektimes from './components/weektimes';
import TimeSelect from '../../orgs/orgsCreate/components/timeSelect/TimeSelect';
import timeTransform from './components/timeTransform';
import RecList from './components/RecList/RecList';
import {motion} from 'framer-motion';
import Loader from '../../../components/Loader/Loader';
import checkNumValue from '../../../funcs/checkNumValue';
import SaveIcon from '../../../icons/SaveIcon/SaveIcon';
import ConfirmModal from '../../../components/ConfirmModal/ConfirmModal';
import { updateBackFunc } from '../../../store/actions';
import DialogModal from '../../../components/DialogModal/DialogModal';


const LOCAL_STORAGE = window.localStorage;



const delTypes = {
    onlyDelivery: 0,
    onlyLocal: 1,
    both: 2,
    none: 3
}

const cs = new catService();
const os = new orgService();

const EditPlateNew = () => {
    const {token, settings} = useSelector(state => state)
    const dispatch = useDispatch()
    const {categoryId, subcategoryId, plateId} = useParams()
    const [createdId, setCreatedId] = useState(null)
    const [saveLoad, setSaveLoad] = useState(false)
    const [delLoad, setDelLoad] = useState(false) 
    const [pageLoad, setPageLoad] = useState(true)
    const nav = useNavigate();

    const [ID, setID] = useState(null)
    const [IIkoID, setIIkoID] = useState('')
    const [CanOverwriteByIIko, setCanOverwriteByIIko] = useState(0)
    const [ItemOrder, setItemOrder] = useState(0)
    const [ParentID, setParentID] = useState(0)
    const [IsSubCategory, setIsSubCategory] = useState(0)
    const [MaxCount, setMaxCount] = useState(99)
    const [Name, setName] = useState('')
    const [IsHit, setIsHit] = useState(0)
    const [IsNew, setIsNew] = useState(0)
    const [Composition, setComposition] = useState('')
    const [Calories, setCalories] = useState('')
    const [Carbohydrates, setCarbohydrates] = useState('')
    const [Fats, setFats] = useState('')
    const [Proteins, setProteins] = useState('')
    const [CountAdditions, setCountAdditions] = useState('')
    const [AllowedDeliveryTypes, setAllowedDeliveryTypes] = useState(['0'])
    const [Picture, setPicture] = useState([])
    const [Mass, setMass] = useState('')
    const [Price, setPrice] = useState('')
    const [SalePrice, setSalePrice] = useState('')
    const [orgs, setOrgs] = useState([])
    const [orgsList, setOrgsList] = useState([])
    const [isHideInOrg, setIsHideInOrg] = useState(false)
    const [picPrevs, setPicPrevs] = useState([])
    const [weekTimes, setWeekTimes] = useState(weektimes)
    const [IsDynamicTimetable, setIsDynamicTimetable] = useState(0)
    const [HideInApp, setHideInApp] = useState('0')


    const [massList, setMassList] = useState([])
    const [modList, setModList] = useState([])
    const [alList, setAlList] = useState([])
    const [recList, setRecList] = useState([])


    // modals
    const [addAllergen, setAddAllergen] = useState(false);
    const [editAllergen, setEditAllergen] = useState(false);

    // useEffect(() => {
    //     dispatch()
    // }, [])
    

    useEffect(() => {
        
        if(plateId && token && categoryId) {
           
            cs.getProds(token, {CategoryID: categoryId}).then(res => {
                console.log(res)
                const thisPlate = res.find(item => item.ID == plateId);
                if(thisPlate?.Pictures?.length > 0 || thisPlate?.Name) {
                    LOCAL_STORAGE.setItem('gs-creating-plate', '1')
                } else {
                    LOCAL_STORAGE.removeItem('gs-creating-plate')
                }
                setHideInApp(thisPlate?.HideInApp)
                setID(thisPlate?.ID)
                setIIkoID(thisPlate?.IIkoID)
                setCanOverwriteByIIko(thisPlate?.CanOverwriteByIIko)
                setItemOrder(thisPlate?.ItemOrder)
                setParentID(thisPlate?.ParentID)
                setIsSubCategory(thisPlate?.IsSubCategory)
                setMaxCount(thisPlate?.MaxCount != '0' ? thisPlate?.MaxCount : '')
                setName(thisPlate?.Name)
                setIsHit(thisPlate?.IsHit)
                setComposition(thisPlate?.Composition != '0' ? thisPlate?.Composition : '')
                setCalories(thisPlate?.Calories != '0' ? thisPlate?.Calories : '')
                setCarbohydrates(thisPlate?.Carbohydrates != '0' ? thisPlate?.Carbohydrates : '')
                setFats(thisPlate?.Fats != '0' ? thisPlate?.Fats : '') 
                setProteins(thisPlate?.Proteins != '0' ? thisPlate?.Proteins : '')
                setCountAdditions(thisPlate?.CountAdditions != '0' ? thisPlate?.CountAdditions : '')
                setAllowedDeliveryTypes([thisPlate?.AllowedDeliveryTypes.toString()])
                setPicture(thisPlate?.Pictures)
                setPicPrevs(thisPlate?.Pictures.map(item => item.Picture))
                setMass(thisPlate?.Prices[0]?.Mass != '0' ? thisPlate?.Prices[0]?.Mass : '')
                setPrice(thisPlate?.Prices[0]?.Price != '0' ? thisPlate?.Prices[0]?.Price : '')
                setSalePrice(thisPlate?.Prices[0]?.SalePrice != '0' ? thisPlate?.Prices[0]?.SalePrice : '')
                setIsHideInOrg(thisPlate?.HiddenInOrganisations ? true : false)
                setIsDynamicTimetable(thisPlate?.IsDynamicTimetable)
                if(thisPlate?.HiddenInOrganisations && thisPlate?.HiddenInOrganisations != '/') {
                    let array = thisPlate.HiddenInOrganisations.split('//')
                    setOrgsList(array.map((item, index) => {
                        if(index == 0) {
                            return {
                                ID: item.replace(/\//g,''),
                                value: orgs.find(i => i.ID == item.replace(/\//g,''))?.value
                            }
                        }
                        if(index == array.length - 1) {
                            return {
                                ID: item.slice(0, -1),
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
                setWeekTimes([
                    timeTransform(thisPlate?.MonTime, 0), 
                    timeTransform(thisPlate?.TueTime, 1), 
                    timeTransform(thisPlate?.WedTime, 2),
                    timeTransform(thisPlate?.ThuTime, 3),
                    timeTransform(thisPlate?.FriTime, 4),
                    timeTransform(thisPlate?.SatTime, 5),
                    timeTransform(thisPlate?.SunTime, 6),
                ]);
                
            }).finally(_ => setPageLoad(false))

            cs.getPriceMass(token, {ItemID: plateId}).then(res => {
                setMassList(res)
            })
            cs.getMods(token, {ID: plateId}).then(res => {
                setModList(res)
            })
            cs.getAllergens(token, {ItemID: plateId}).then(res => {
                setAlList(res)
            })
        }
    }, [plateId, token, categoryId, orgs, subcategoryId])

    const openAddAllergen = () => {
        setAddAllergen(true)
    }

    const closeAddAllergen = () => {
        setAddAllergen(false)
    }

    const openEditAllergen = () => {
        setEditAllergen(true)
    }

    const closeEditAllergen = () => {
        setEditAllergen(false)
    }

    const deleteImage = (ID) => {
        cs.deletePlateImg(token, {ID: ID}).then(res => {
         
            if(res.error == 0) {
                message.success('???????????????? ??????????????')
                const rm = Picture;
                const m = rm.splice(rm.findIndex(item => item.ID == ID), 1)
                setPicture([...rm])

            } else {
                message.error('?????????????????? ????????????, ?????????????????? ??????????')
            }
        })
    }

    const uploadImages = (e) => {
        const pics = new FormData();
        pics.append('ItemID', ID)
        if(e.target.files.length + Picture.length > 10) {
            message.error('?????????? ?????????????????? ???? ?????????? 10 ??????????????????????')
        } else {
            const uploadedPics = [...e.target.files];
            uploadedPics.forEach((i, index) => {
                if(index == 0) {
                    pics.append('image', i)
                } else {
                    pics.append(`image_${index}`, i)
                }
            })
            cs.addPlateImg(token, pics).then(res => {
                if(!res?.error) {
                    setPicture(res)
                    message.success('???????????????? ??????????????????')
                } else {
                    message.error('?????????????????? ????????????, ?????????????????? ?????? ??????')
                }
            })
        }
    } 

    //???????????????? ???????????? ??????????????????????
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
        // if(!e.target.checked) {
        //     setOrgsList([])
        // } else {
        //     setOrgsList([orgs[0]])
        // }
    }
    const saveTime = (index, value) => {
        let ur = weekTimes;
        let rm = ur.splice(index, 1, value)
        setWeekTimes([...ur]);
    }
    //?????????????? ??????????
    const editPlate = () => {
        LOCAL_STORAGE.setItem('gs-creating-plate', '1')
        const data = new FormData()
        let weekArray = []
        if(weekTimes.length > 0) {
            weekArray = weekTimes.map(item => {
                if(!item.enabled && !item.disabled) {
                    return (
                        `${60 * (Number(item.values.start.slice(0,2)) + Number(item.values.start.slice(3,5)) / 100)}-${60 * (Number(item.values.end.slice(0,2)) + (Number(item.values.end.slice(3,5)) / 100))}`
                    )
                } else {
                    if (item.enabled) {
                        return 'Enabled'
                    }
                    if(item.disabled) {
                        return 'Disabled'
                    }
                }
                
            }) 
        }
        data.append('HideInApp', HideInApp)
        data.append('ID', ID)
        data.append('IIkoID', IIkoID)
        data.append('CanOverwriteByIIko',CanOverwriteByIIko)
        data.append('ItemOrder', ItemOrder)
        data.append('ParentID', subcategoryId ? subcategoryId : 0)
        data.append('CategoryID', categoryId)
        data.append('IsSubCategory', IsSubCategory)
        //data.append('MaxCount', MaxCount)
        checkNumValue(data, 'MaxCount', MaxCount)
        data.append('Name', Name)
        data.append('IsHit', IsHit)
        data.append('IsNew', IsNew)
        // data.append('Composition', Composition)
        checkNumValue(data, 'Composition', Composition)
        // data.append('Calories', Calories)
        checkNumValue(data, 'Calories', Calories)
        //data.append('Carbohydrates', Carbohydrates)
        checkNumValue(data, 'Carbohydrates', Carbohydrates)
        // data.append('Fats', Fats)
        checkNumValue(data, 'Fats', Fats)
        // data.append('Proteins', Proteins)
        checkNumValue(data, 'Proteins', Proteins)
        // data.append('CountAdditions', CountAdditions)
        checkNumValue(data, 'CountAdditions', CountAdditions)
        // data.append('Price', Price)
        checkNumValue(data, 'Price', Price)
        // data.append('SalePrice', SalePrice)
        checkNumValue(data, 'SalePrice', SalePrice)
        // data.append('Mass', Mass)
        checkNumValue(data, 'Mass', Mass)
        data.append('IsDynamicTimetable', IsDynamicTimetable)
        data.append('MonTime', weekArray[0])
        data.append('TueTime', weekArray[1])
        data.append('WedTime', weekArray[2])
        data.append('ThuTime', weekArray[3])
        data.append('FriTime', weekArray[4])
        data.append('SatTime', weekArray[5])
        data.append('SunTime', weekArray[6])
        
        if(orgsList.length > 0) {
            data.append('HiddenInOrganisations', orgsList.map(item => `/${item.ID}`).join('/') + '/')
          
        } else {
            data.append('HiddenInOrganisations', '')
        }
        // if(AllowedDeliveryTypes.length == 0) {
        //     data.append('AllowedDeliveryTypes', '3')
        // } else {
        //     if(AllowedDeliveryTypes.length == 2) {
        //         data.append('AllowedDeliveryTypes', '2')
        //     } else {
        //         data.append('AllowedDeliveryTypes', AllowedDeliveryTypes[0])
        //     }
        // }
        data.append('AllowedDeliveryTypes', AllowedDeliveryTypes.join(''))

        cs.editProd(token, data).then(res => {
            if(res) {
                nav(-1, {replace: true})
            }
        }).finally(_ => setSaveLoad(false))
    }
    const deletePlate = () => {
        setDelLoad(true)
        cs.delProd(token, {ID: plateId}).then(res => {
            if(res) {
                message.success('?????????? ?????????????? ??????????????')
                nav(-1, {replace: true})
            } else {
                message.error('?????????????????? ????????????')
            }
        }).finally(_ => {
            setDelLoad(false)
        })
    }
    useEffect(() => {
        if(Picture?.length == 0 || !Name) {
            LOCAL_STORAGE.removeItem('gs-creating-plate')
        } else {
            LOCAL_STORAGE.setItem('gs-creating-plate', '1')
        }
    }, [Picture, Name])

    

    useEffect(() => {
        return () => {
            if(LOCAL_STORAGE.getItem('gs-creating-plate')) {
                
            } else {
                cs.delProd(token, {ID: plateId, Delete: 'hard'}).then(res => {
                    console.log(res)
                }).finally(_ => {
                    window.location.reload()
                    LOCAL_STORAGE.removeItem('gs-creating-plate')
                })
            }
        }
    }, [])



    const [deleteConfirm, setDeleteConfirm] = useState(false)
    const openDeleteConfirm = () => setDeleteConfirm(true)
    const closeDeleteConfirm = () => setDeleteConfirm(false)
    const deleteConfirmAccept = () => {
        deletePlate()
    }

    

    // const [dm, setDm] = useState(false)
    // const openDm = () => setDm(true)
    // const closeDm = () => setDm(false)
    // const acceptDm = () => {}
    // const cancelDm = () => {}

    // useEffect(() => {
    //     dispatch(updateBackFunc(openDm))
    // }, [])


    if(pageLoad) {
        return (
            <div className="page">
                <main className="Main">
                    <div className="pageBody">
                        <Loader/>
                    </div>
                </main>
            </div>
        )
    }
    
    return (
        <motion.div 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}
            exit={{opacity: 0}}
            className="CreatePlatePage page">
            {/* <AddAlrgn visible={addAllergen} close={closeAddAllergen}/>
            <EditAlrgn visible={editAllergen} close={closeEditAllergen}/> */}
            {/* <HeaderProfile/> */}
            <ConfirmModal
                visible={deleteConfirm}
                close={closeDeleteConfirm}
                cancel={deleteConfirmAccept}
                text={'?????????????? ???????????'}
                />
            <main className="Main">
                <div className="pageBody">
                    <div className="CreatePlatePage__body pageBody-content">
                        
                        <Row gutter={[25, 25]} justify={'space-between'}>
                            <Col span={12}>
                                <Row className="row-custom">
                                    <div className="panel" style={{display: 'flex', overflowX:'auto'}}>
                                        {
                                            Picture && Picture.length > 0 ? (
                                                Picture.map((item, index) => (
                                                    <PicItem
                                                        key={index}
                                                        image={item.Picture}
                                                        remove={() => deleteImage(item.ID)}
                                                        />
                                                ))
                                            ) : null
                                        }
                                        {
                                            Picture?.length < 10 ? (
                                                <PlUpload accept={'.png, .jpg, .jpeg, .webp'} multiple={true} id={'editPlatePics'} onChange={(e) => uploadImages(e)} style={{width: 200, height: 200, flex: '0 0 auto', backgroundColor: '#F8F8F8'}} text={'???????????????? ????????????????'}/>
                                            ) : null
                                        }
                                        
                                    </div>
                                </Row>
                                {
                                    IIkoID && ID ? (
                                        <Row className='row-custom' gutter={[20,20]}>
                                            <Col span={12}>
                                                <div className="def-label">ID ?? ??????????????</div>
                                                <div className="def-value">{ID}</div>
                                            </Col>
                                            {
                                                settings?.IsHaveIIko == '1' ? (
                                                    <Col span={12}>
                                                        <div className="def-label">ID ?? iIko</div>
                                                        <div className="def-value">{IIkoID}</div>
                                                    </Col>
                                                ) : (
                                                    <Col span={12}>
                                                        <div className="def-label">ID ?? RKeeper</div>
                                                        <div className="def-value">{IIkoID}</div>
                                                    </Col>
                                                )
                                            }
                                            
                                        </Row>
                                    ) : null
                                }
                                {
                                    settings?.IsHaveIIko == '1' ? (
                                        <Row className="row-custom">
                                            <Checkbox
                                                id={'editOverwriteIiko'}
                                                text={'?????????????????? iiko ???????????????????????????? ??????????'}
                                                checked={CanOverwriteByIIko == '1'}
                                                onChange={e => {
                                                    if(e.target.checked) {
                                                        setCanOverwriteByIIko('1')
                                                    } else {
                                                        setCanOverwriteByIIko('0')
                                                    }
                                                }}
                                                />
                                        </Row>
                                    ) : null
                                }
                                
                                <Row className="row-custom">
                                    <Input
                                        maskType={String}
                                        value={Name}
                                        onChange={(e) => setName(e.target.value)}  
                                        placeholder={'???????????????? ??????????'}/>
                                </Row>
                                {
                                    settings?.IsHaveIIko == '1' ? (
                                        <Row className="row-custom">
                                            <Input 
                                                maskType={String}
                                                value={IIkoID}
                                                onChange={(e) => setIIkoID(e.target.value)}
                                                placeholder={'ID ?? iIko'}/>
                                        </Row>
                                    ) : null
                                }
                                
                                <Row className="row-custom">
                                    <Checkbox 
                                        checked={IsNew} 
                                        id={'IsNew'} 
                                        text={'??????: ??????????'}
                                        onChange={(e) => {
                                            if(e.target.checked) {
                                                setIsNew(1)
                                            } else {
                                                setIsNew(0)
                                            }
                                        }}
                                        />
                                </Row>
                                <Row className="row-custom">
                                    <Checkbox 
                                        checked={IsHit == '1'}
                                        id={'IsHit'} 
                                        text={'??????: ??????'}
                                        onChange={(e) => {
                                            if(e.target.checked) {
                                                setIsHit('1')
                                            } else {
                                                setIsHit('0')
                                            }
                                        }}
                                        />
                                </Row>
                                <Row className="row-custom">
                                    <Text
                                        value={Composition}
                                        placeholder={'????????????'}
                                        onChange={(e) => setComposition(e.target.value)}/>
                                </Row>
                                <Row className="row-custom">
                                    <Input
                                        scale={5}
                                        value={Price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder={'????????'}/>
                                </Row>
                                <Row className="row-custom">
                                    <Input
                                        scale={5}
                                        value={SalePrice}
                                        onChange={(e) => setSalePrice(e.target.value)} 
                                        placeholder={'???????? ???? ??????????????'}/>
                                </Row>
                                <Row className="row-custom">
                                    <Input
                                        maskType={String}
                                        value={Mass}
                                        onChange={(e) => setMass(e.target.value)}
                                        placeholder={'??????????'}/>
                                </Row>
                                <Row className="row-custom" style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
                                    <Input 
                                        maskType={String}
                                        value={Calories}
                                        onChange={(e) => setCalories(e.target.value)}
                                        style={{width: '48%', marginBottom: 20}} placeholder={'??????????????'}/>
                                    <Input 
                                        maskType={String}
                                        value={Proteins}
                                        onChange={(e) => setProteins(e.target.value)}
                                        style={{width: '48%', marginBottom: 20}} placeholder={'??????????'}/>
                                    <Input
                                        maskType={String}
                                        value={Fats}
                                        onChange={(e) => setFats(e.target.value)} 
                                        style={{width: '48%'}} placeholder={'????????'}/>
                                    <Input
                                        maskType={String}
                                        value={Carbohydrates} 
                                        onChange={(e) => setCarbohydrates(e.target.value)}
                                        style={{width: '48%'}} 
                                        placeholder={'????????????????'}/>
                                </Row>
                                <Row className="row-custom">
                                    <Checkbox 
                                        checked={AllowedDeliveryTypes.find(item => item == delTypes.onlyDelivery.toString()|| item == '2') }
                                        onChange={(e) => {
                                            if(e.target.checked) {
                                                if(AllowedDeliveryTypes.find(item => item == delTypes.onlyLocal.toString())) {
                                                    setAllowedDeliveryTypes(['2'])
                                                } else{
                                                    setAllowedDeliveryTypes(['0'])
                                                }
                                                // setAllowedDeliveryTypes(state => [...state, '0'].filter(item => item == '3'))
                                            } else {
                                                if(AllowedDeliveryTypes.find(item => item == delTypes.onlyLocal.toString())) {
                                                    setAllowedDeliveryTypes(['1'])
                                                } else{
                                                    setAllowedDeliveryTypes(['3'])
                                                }
                                                // setAllowedDeliveryTypes(state => state.filter(item => item != '0'))
                                            }
                                        }}
                                        id={'deliveryTrue'} 
                                        text={'???????????????? ?? ????????????????'}
                                        />
                                </Row>
                                <Row className="row-custom">
                                    <Checkbox
                                        checked={AllowedDeliveryTypes.find(item => item == delTypes.onlyLocal.toString() || item == '2') } 
                                        onChange={(e) => {
                                            if(e.target.checked) {
                                                if(AllowedDeliveryTypes.find(item => item == delTypes.onlyDelivery.toString())) {
                                                    setAllowedDeliveryTypes(['2'])
                                                } else {
                                                    setAllowedDeliveryTypes(['1'])
                                                }
                                                // setAllowedDeliveryTypes(state => [...state, '1'])
                                            } else {
                                                if(AllowedDeliveryTypes.find(item => item == delTypes.onlyDelivery.toString())) {
                                                    setAllowedDeliveryTypes(['0'])
                                                } else {
                                                    setAllowedDeliveryTypes(['3'])
                                                }
                                                //setAllowedDeliveryTypes(state => state.filter(item => item != '1'))
                                            }
                                        }}
                                        id={'onlyLocal'} 
                                        text={'???????????????? ?? ???????????? ?? ??????????????????'}/>
                                </Row>
                                <Row className="row-custom">
                                    <Input
                                        value={CountAdditions}
                                        onChange={(e) => setCountAdditions(e.target.value)} 
                                        placeholder={'???????????????????? ????????????????????'}/>
                                </Row>
                                {
                                    orgs && orgs.length > 0 ?(
                                        <Row className="row-custom">
                                            <Checkbox
                                                checked={isHideInOrg} onChange={(e) => switchHiddenOrg(e)}  
                                                id={'ttt'} 
                                                text={'???????????? ?? ????????????????????????'}/>
                                        </Row>
                                    ) : null
                                }
                                
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
                                                    <Pl onClick={addOrg} text={'???????????????? ??????????????????????'} style={{backgroundColor: '#fff'}}/>
                                                </div>
                                            )
                                        }
                                        </>
                                        
                                    ) : null
                                }
                                <Row className='row-custom'>
                                    <Checkbox
                                        checked={IsDynamicTimetable == '1'} 
                                        onChange={(e) => {
                                            if(e.target.checked) {
                                                setIsDynamicTimetable('1')
                                            } else {
                                                setIsDynamicTimetable('0')
                                            }
                                        }}
                                        text={'???????????????????????? ????????????????????'} 
                                        id={'dynamicTimetable'}/>
                                </Row>
                                {
                                    IsDynamicTimetable == '1' ? (
                                        <Row className='row-custom'>
                                            <TimeSelect plate={true} save={saveTime} list={weekTimes}/>
                                        </Row>
                                    ) : null
                                }
                                <Row className='row-custom'>
                                    <Checkbox
                                        id={'HideInApp'}
                                        text={'???????????? ?? ????????????????????'}
                                        checked={HideInApp == '1'}
                                        onChange={e => {
                                            if(e.target.value) {
                                                setHideInApp('1')
                                            } else {
                                                setHideInApp('0')
                                            }
                                        }}
                                        >

                                    </Checkbox>
                                </Row>

                                <Row className="row-custom">
                                    <Button
                                        disabled={!Name}
                                        onClick={editPlate} 
                                        text={'??????????????????'} 
                                        justify={'flex-start'} 
                                        before={<SaveIcon color={'#fff'} size={20}/>} 
                                        load={saveLoad}
                                        styles={{width: '100%'}}/>
                                </Row>
                                <Row className="row-custom">
                                    <Button
                                        onClick={openDeleteConfirm}
                                        variant={'danger'}
                                        load={delLoad}
                                        text={'?????????????? ??????????'} 
                                        justify={'flex-start'} 
                                        before={<BsTrash size={20}/>} 
                                        styles={{width: '100%'}}/>
                                </Row>

                            </Col>
                            {
                                plateId ? (
                                    <Col span={12}>
                                        <Row className='row-custom'>
                                            <ExMass plateId={plateId} list={massList}/>
                                        </Row>
                                        <Row className='row-custom'>
                                            <Mod plateId={plateId} list={modList}/>
                                        </Row>
                                        <Row className='row-custom'>
                                            <DefList plateId={plateId} editModal={openEditAllergen} openModal={openAddAllergen} head={'???????????? ????????????????????'} addText={'???????????????? ????????????????'}/>
                                        </Row>
                                        <Row className='row-custom'>
                                            <RecList plateId={plateId} head={'???????????? ????????????????????????'} addText={'???????????????? ??????????'}/>
                                        </Row>
                                    </Col>
                                ) : null
                            }
                        </Row>
                    </div>
                </div>
            </main>
        </motion.div>
    )
}

export default EditPlateNew;
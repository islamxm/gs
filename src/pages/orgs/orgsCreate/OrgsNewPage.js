import './OrgsCreatePage.scss';
import Sidebar from '../../../components/Sidebar/Sidebar';
import HeaderProfile from '../../../components/HeaderProfile/HeaderProfile';
import { Row, Col, message } from 'antd';
import Pl from '../../../components/Pl/Pl';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import Text from '../../../components/Text/Text';
import Checkbox from '../../../components/Checkbox/Checkbox';
import DropCollapse from '../../../components/DropCollapse/DropCollapse';
import TimeSelect from './components/timeSelect/TimeSelect';
import { useEffect, useState } from 'react';
import {BsTrash} from 'react-icons/bs';
import useModal from '../../../hooks/useModal';
import SelectLocation from '../modals/selectLocation/SelectLocation';
import { useSelector } from 'react-redux';
import orgService from '../../../services/orgService';
import { useLocation, useParams } from 'react-router-dom';
import { Wrapper } from '@googlemaps/react-wrapper';
import Map from '../../../components/Map/Map';
import PlUpload from '../../../components/PlUpload/PlUpload';
import timezones from './components/timezones';
import paymethods from './components/paymethods';
import weektimes from './components/weektimes';
import timeTransform from './components/timeTransform';
import { useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion';
import PayMethods from '../../../components/PayMethods/PayMethods';
import SaveIcon from '../../../icons/SaveIcon/SaveIcon';
import PolygonModal from '../modals/PolygonModal/PolygonModal';
import MapPolygon from '../../../components/MapPolygon/MapPolygon';
import LocationModal from '../modals/LocationModal/LocationModa';
import MapMarker from '../../../components/MapMarker/MapMarker';
import checkNumValue from '../../../funcs/checkNumValue';
import MapPolygonPic from '../../../components/MapPolygonPic/MapPolygonPic';
import UploadKml from './components/UploadKml/UploadKml';
import ConfirmModal from '../../../components/ConfirmModal/ConfirmModal';

const os = new orgService();
const pmValueFind = (value) => {
    switch(value) {
        case '0':
            return '???????????? ??????????????????'
        case '1':
            return '???????????? ???? ?????????? ?? ????????????????????'
        case '2':
            return '???????????? ???? ?????????? ?????? ??????????????????'
    }
}




const LOCAL_STORAGE = window.localStorage;


const OrgsNewPage = () => {
    const {token, settings} = useSelector(state => state)
    const {brandId, orgId} = useParams();
    const loc = useLocation()
    const [createdId, setCreatedId] = useState('')
    const nav = useNavigate()
    const [editPolygon, setEditPolygon] = useState()

    //GLOBAL VALUES
    const [coords, setCoords] = useState({lat: 55.7522200,lng: 37.6155600})
    const [ThumbnailPrev, setThumbnailPrev] = useState(null)
    const [weekTimes, setWeekTimes] = useState(weektimes)

    //VALUES
    
    const [OrganisationBrand, setOrganisationBrand] = useState('')
    const [ItemOrder, setItemOrder] = useState(0)
    const [Name, setName] = useState('')
    const [Description, setDescription] = useState('')
    const [ThumbnailPicture, setThumbnailPicture] = useState(null)
    const [Address, setAddress] = useState('')
    const [Phone, setPhone] = useState('')
    const [MinPriceForLocalSale, setMinPriceForLocalSale] = useState('')
    const [LocalOrderSale, setLocalOrderSale] = useState('')
    const [IsHaveDelivery, setIsHaveDelivery] = useState('0')
    const [IsHaveLocalOrder, setIsHaveLocalOrder] = useState('0')
    const [TimetableDescription, setTimetableDescription] = useState('')
    const [Lattitude, setLattitude] = useState('0')
    const [Longitude, setLongitude] = useState('0')
    const [BotToken, setBotToken] = useState('')
    const [Email, setEmail] = useState('')
    const [IsNeedToNotify, setIsNeedToNotify] = useState('0')
    const [NotifyWhenNewOrder, setNotifyWhenNewOrder] = useState('0')
    const [NotifyWhenIIkoErrors, setNotifyWhenIIkoErrors] = useState('0')
    const [NotifyWhenOrderChanges, setNotifyWhenOrderChanges] = useState('0')
    const [Timezone, setTimezone] = useState(timezones[0].value)
    const [CountTimeStepsPreorder, setCountTimeStepsPreorder] = useState('');
    const [TimeStep, setTimeStep] = useState('');
    const [Disabled, setDisabled] = useState('0')
    const [HavePreorder, setHavePreorder]= useState('0')
    const [CountTimeStepsReservation, setCountTimeStepsReservation] = useState('')
    const [TimeStepReservation, setTimeStepReservation] = useState('')
    const [HaveReservation, setHaveReservation] = useState('0')
    const [NotifyWhenNewReservation, setNotifyWhenNewReservation] = useState('0')
    const [HideInApp, setHideInApp] = useState('0')


    //?????????????????????? ?? ?????????????????????? ???? ???????????????? ??????????
    const [IIkoID, setIIkoID] = useState('')
    const [IIkoIDTerminal, setIIkoIDTerminal] = useState('')
    const [RKeeperLogin, setRKeeperLogin] = useState('')
    const [RKeeperIP, setRKeeperIP] = useState('') 
    const [RKeeperPort, setRKeeperPort] = useState('')
    const [PrimehillToken,setPrimehillToken] = useState('')
    const [CanOverwrite, setCanOverwrite] = useState('0')
    


    const [polList, setPolList] = useState([])

    //MODALS
    const [selectLocationModal, setSelectLocationModal] = useState(false);
    const [selectPolyModal, setSelectPolyModal] = useState(false)
    const [saveLoad, setSaveLoad] = useState(false)
    const [delLoad, setDelLoad] = useState(false)
    
    //?????????????? ????????????
    const [pm, setPm] = useState([]);
    const [delivery, setDelivery] = useState(false)

    const [saved, setSaved] = useState(true)


    useEffect(() => {
        console.log(settings)
    }, [settings])


    //?????????????????? ???????????? ?????? ????????????????????????????
    useEffect(() => {
        if(orgId && brandId != 'nobrand' && token && settings.IsHaveBrands == '1') {
            console.log('with brand')
            os.getOrgs(token, {BrandID: brandId}).then(res => {
                const thisOrg = res.find(item => item.ID == orgId)
                console.log(thisOrg)
                if(thisOrg?.ThumbnailPicture || thisOrg?.Name) {
                    LOCAL_STORAGE.setItem('gs-creating-org', '1')
                } else {
                    LOCAL_STORAGE.removeItem('gs-creating-org')
                }
                setIIkoID(thisOrg?.IIkoID)
                setIIkoIDTerminal(thisOrg?.IIkoIDTerminal)
                setOrganisationBrand(thisOrg?.OrganisationBrand)
                setItemOrder(thisOrg?.ItemOrder)
                setName(thisOrg?.Name)
                setDescription(thisOrg?.Description)
                setThumbnailPrev(thisOrg?.ThumbnailPicture)
                setAddress(thisOrg?.Address)
                setPhone(thisOrg?.Phone)
                setMinPriceForLocalSale(thisOrg?.MinPriceForLocalSale != '0' ? thisOrg.MinPriceForLocalSale : '')
                setLocalOrderSale(thisOrg?.LocalOrderSale != '0' ? thisOrg.LocalOrderSale : '')
                setIsHaveDelivery(thisOrg?.IsHaveDelivery)
                setIsHaveLocalOrder(thisOrg?.IsHaveLocalOrder)
                setTimetableDescription(thisOrg?.TimetableDescription)
                setLattitude(thisOrg?.Lattitude)
                setLongitude(thisOrg?.Longitude)
                setCanOverwrite(thisOrg?.CanOverwrite)
                if(thisOrg?.Lattitude != undefined && thisOrg?.Longitude != undefined && thisOrg?.Lattitude != '' && !thisOrg?.Lattitude != '') {
                    setCoords({lat:Number(thisOrg.Lattitude), lng: Number(thisOrg.Longitude)})
                } else {
                    setCoords({lat: 55.7522200,lng: 37.6155600})
                }
                
                setBotToken(thisOrg?.BotToken)
                setEmail(thisOrg?.Email)
                setIsNeedToNotify(thisOrg?.IsNeedToNotify)
                setNotifyWhenNewOrder(thisOrg?.NotifyWhenNewOrder)
                setNotifyWhenIIkoErrors(thisOrg?.NotifyWhenIIkoErrors)
                setNotifyWhenOrderChanges(thisOrg?.NotifyWhenOrderChanges)
                setTimezone(thisOrg?.Timezone)
                setCountTimeStepsPreorder(thisOrg?.CountTimeStepsPreorder != '0' ? thisOrg.CountTimeStepsPreorder : '')
                setDisabled(thisOrg?.Disabled)
                setTimeStep(thisOrg?.TimeStep)
                setHavePreorder(thisOrg?.HavePreorder)
                setCountTimeStepsReservation(thisOrg?.CountTimeStepsReservation != '0' ? thisOrg.CountTimeStepsReservation : '')
                setTimeStepReservation(thisOrg?.TimeStepReservation != '0' ? thisOrg.TimeStepReservation : '')
                setHaveReservation(thisOrg?.HaveReservation)
                setNotifyWhenNewReservation(thisOrg?.NotifyWhenNewReservation)
                setWeekTimes([
                    timeTransform(thisOrg?.MonTime, 0), 
                    timeTransform(thisOrg?.TueTime, 1), 
                    timeTransform(thisOrg?.WedTime, 2),
                    timeTransform(thisOrg?.ThuTime, 3),
                    timeTransform(thisOrg?.FriTime, 4),
                    timeTransform(thisOrg?.SatTime, 5),
                    timeTransform(thisOrg?.SunTime, 6),
                ]);
                setRKeeperLogin(thisOrg?.RKeeperLogin)
                setRKeeperIP(thisOrg?.RKeeperIP)
                setRKeeperPort(thisOrg?.RKeeperPort)
                setPrimehillToken(thisOrg?.PrimehillToken)
                setHideInApp(thisOrg?.HideInApp)

            })
            os.getPols(token, {OrganisationID: orgId}).then(res => {
                if(res?.length > 0) {
                    setDelivery(true)
                    setPolList(res.map(item => {
                        return {
                            ...item,
                            Coordinates: item.Coordinats.split(' ').map(item => {
                                
                                return {
                                    lat: Number(item.slice(0, item.indexOf(','))),
                                    lng: Number(item.slice(item.indexOf(',') + 1, item.length))
                                }
                            }),
                            Coordinats: null
                        }
                    }))
                } else {
                    setDelivery(false)
                }
            })
            os.getPay(token, {OrganisationID: orgId}).then(res => {
                
                setPm(res.map(item => {
                    return {
                        ...item,
                        value: pmValueFind(item.PaymentType)
                    }
                }))
            })
        }
        if(orgId && brandId == 'nobrand' && token && settings?.IsHaveBrands == '0') {
            console.log('no brand')
            os.getOrgs(token).then(res => {
                const thisOrg = res.find(item => item.ID == orgId)
                if(thisOrg?.ThumbnailPicture || thisOrg?.Name) {
                    LOCAL_STORAGE.setItem('gs-creating-org', '1')
                } else {
                    LOCAL_STORAGE.removeItem('gs-creating-org')
                }
               
                setIIkoID(thisOrg?.IIkoID)
                setIIkoIDTerminal(thisOrg?.IIkoIDTerminal)
                setOrganisationBrand(thisOrg?.OrganisationBrand)
                setItemOrder(thisOrg?.ItemOrder)
                setName(thisOrg?.Name)
                setDescription(thisOrg?.Description)
                setThumbnailPrev(thisOrg?.ThumbnailPicture)
                setAddress(thisOrg?.Address)
                setPhone(thisOrg?.Phone)
                setMinPriceForLocalSale(thisOrg?.MinPriceForLocalSale != '0' ? thisOrg.MinPriceForLocalSale : '')
                setLocalOrderSale(thisOrg?.LocalOrderSale != '0' ? thisOrg.LocalOrderSale : '')
                setIsHaveDelivery(thisOrg?.IsHaveDelivery)
                setIsHaveLocalOrder(thisOrg?.IsHaveLocalOrder)
                setTimetableDescription(thisOrg?.TimetableDescription)
                setLattitude(thisOrg?.Lattitude)
                setLongitude(thisOrg?.Longitude)
                setCanOverwrite(thisOrg?.CanOverwrite)
                if(thisOrg?.Lattitude && thisOrg?.Longitude) {
                    setCoords({lat:Number(thisOrg.Lattitude), lng: Number(thisOrg.Longitude)})
                } else {
                    setCoords({lat: 55.7522200,lng: 37.6155600})
                }
                
                setBotToken(thisOrg?.BotToken)
                setEmail(thisOrg?.Email)
                setIsNeedToNotify(thisOrg?.IsNeedToNotify)
                setNotifyWhenNewOrder(thisOrg?.NotifyWhenNewOrder)
                setNotifyWhenIIkoErrors(thisOrg?.NotifyWhenIIkoErrors)
                setNotifyWhenOrderChanges(thisOrg?.NotifyWhenOrderChanges)
                setTimezone(thisOrg?.Timezone)
                setCountTimeStepsPreorder(thisOrg?.CountTimeStepsPreorder != '0' ? thisOrg.CountTimeStepsPreorder : '')
                setDisabled(thisOrg?.Disabled)
                setTimeStep(thisOrg?.TimeStep)
                setHavePreorder(thisOrg?.HavePreorder)
                setCountTimeStepsReservation(thisOrg?.CountTimeStepsReservation != '0' ? thisOrg.CountTimeStepsReservation : '')
                setTimeStepReservation(thisOrg?.TimeStepReservation != '0' ? thisOrg.TimeStepReservation : '')
                setHaveReservation(thisOrg?.HaveReservation)
                setNotifyWhenNewReservation(thisOrg?.NotifyWhenNewReservation)
                setWeekTimes([
                    timeTransform(thisOrg?.MonTime, 0), 
                    timeTransform(thisOrg?.TueTime, 1), 
                    timeTransform(thisOrg?.WedTime, 2),
                    timeTransform(thisOrg?.ThuTime, 3),
                    timeTransform(thisOrg?.FriTime, 4),
                    timeTransform(thisOrg?.SatTime, 5),
                    timeTransform(thisOrg?.SunTime, 6),
                ]);
                setRKeeperLogin(thisOrg?.RKeeperLogin)
                setRKeeperIP(thisOrg?.RKeeperIP)
                setRKeeperPort(thisOrg?.RKeeperPort)
                setPrimehillToken(thisOrg?.PrimehillToken)
                setHideInApp(thisOrg?.HideInApp)

            })
            os.getPols(token, {OrganisationID: orgId}).then(res => {
                if(res?.length > 0) {
                    setDelivery(true)
                    setPolList(res.map(item => {
                        return {
                            ...item,
                            Coordinates: item.Coordinats.split(' ').map(item => {
                                
                                return {
                                    lat: Number(item.slice(0, item.indexOf(','))),
                                    lng: Number(item.slice(item.indexOf(',') + 1, item.length))
                                }
                            }),
                            Coordinats: null
                        }
                    }))
                } else {
                    setDelivery(false)
                }
            })
            os.getPay(token, {OrganisationID: orgId}).then(res => {
                
                setPm(res.map(item => {
                    return {
                        ...item,
                        value: pmValueFind(item.PaymentType)
                    }
                }))
            })
        }
    }, [orgId, brandId, token, settings, orgId])


    const addPayMethods = () => {
        const cs = pm;
        let csN = paymethods.map(i => Number(i.PaymentType))
        let pmN = cs.map(i => Number(i.PaymentType))
        let dif = csN.filter(n => pmN.indexOf(n) === -1);

        if(dif.length > 0) {
            const addItem = paymethods.find(i => Number(i.PaymentType) == dif[0])
            os.addPay(token, {
                OrganisationID: createdId ? createdId : orgId,
                Payments: [
                    {
                        PaymentType: addItem.PaymentType,
                        IsNeedToChangeCash: addItem.IsNeedToChangeCash ? '1' : '0'  
                    }
                ],
            }).then(res => {
                setPm(res.map(item => {
                    return {
                        ...item,
                        value: pmValueFind(item.PaymentType)
                    }
                }))
            })
        }
    }

    const deletePayMethod = (index, id) => {
        os.deletePay(token, {
            ID: id
        }).then(res => {
            setPm(res.map(item => {
                return {
                    ...item,
                    value: pmValueFind(item.PaymentType)
                }
            }))
        })
    }

    //?????????? ????????????????
    const selectTmz = (value, index) => {
        setTimezone(value);
    }

    //?????????????? ?????????????? ????????????????????????????
    const openSelectLocation = () => {
        setSelectLocationModal(true)
    }

    //?????????????? ?????????????? ????????????????????????????
    const closeSelectLocation = () => {
        setSelectLocationModal(false)
    }

    //?????????????? ?????????????? ???????????????? ????????????????
    const openSelectPoly = () => {
        setSelectPolyModal(true)
    }

    //?????????????? ?????????????? ???????????????? ????????????????
    const closeSelectPoly = () => {
        setEditPolygon(null)
        setSelectPolyModal(false)
    }

    //?????????????????? ??????????
    const saveTime = (index, value) => {
        let ur = weekTimes;
        let rm = ur.splice(index, 1, value)
        setWeekTimes([...ur]);
    }

    //?????????????? ????????????????????????????
    const setLocation = (coords) => {
        setLattitude(coords.lat)
        setLongitude(coords.lng)
        setCoords({lat: coords.lat, lng: coords.lng})
    }

    //???????????????? ??????????????????????
    const uploadImage = (e) => {
        
        setThumbnailPrev(URL.createObjectURL(e.target.files[0]))
        setThumbnailPicture(e.target.files[0])
    }

    //???????????????????? ??????????????????
    const orgSubmit = () => {
        LOCAL_STORAGE.setItem('gs-creating-org', '1')
        let weekArray = []
        if(weekTimes.length > 0) {
            weekArray = weekTimes.map(item => {
                if(!item.rest) {
                    return (
                        `${60 * (Number(item.values.start.slice(0,2)) + Number(item.values.start.slice(3,5)) / 100)}-${60 * (Number(item.values.end.slice(0,2)) + (Number(item.values.end.slice(3,5)) / 100))}`
                    )
                }
                return 'Closed'
            }) 
        }
        const data = new FormData()
        data.append('IIkoID', IIkoID)
        data.append('IIkoIDTerminal', IIkoIDTerminal)
        data.append('OrganisationBrand', brandId != 'nobrand' && brandId ? brandId : 0)
        data.append('ItemOrder', ItemOrder)
        data.append('Name', Name)
        data.append('Description', Description)
        if(ThumbnailPicture) {
            data.append('ThumbnailPicture', ThumbnailPicture)
        }
        data.append('HaveReservation', HaveReservation)
        //data.append('CountTimeStepsReservation', CountTimeStepsReservation)
        checkNumValue(data, 'CountTimeStepsReservation', CountTimeStepsReservation)

        // data.append('TimeStepReservation', TimeStepReservation)
        checkNumValue(data, 'TimeStepReservation', TimeStepReservation)

        data.append('HavePreorder', HavePreorder)
        data.append('Address', Address)
        data.append('Phone', Phone)
        data.append('Email', Email)

        //data.append('MinPriceForLocalSale', MinPriceForLocalSale)
        checkNumValue(data, 'MinPriceForLocalSale', MinPriceForLocalSale)

        data.append('LocalOrderSale', LocalOrderSale)
        checkNumValue(data, 'LocalOrderSale', LocalOrderSale)

        data.append('Lattitude', coords.lat)
        data.append('Longitude', coords.lng)

        data.append('IsHaveDelivery', IsHaveDelivery)
        data.append('IsHaveLocalOrder', IsHaveLocalOrder)
        data.append('TimetableDescription', TimetableDescription)
        data.append('MonTime', weekArray[0])
        data.append('TueTime', weekArray[1])
        data.append('WedTime', weekArray[2])
        data.append('ThuTime', weekArray[3])
        data.append('FriTime', weekArray[4])
        data.append('SatTime', weekArray[5])
        data.append('SunTime', weekArray[6])
        data.append('Timezone', Timezone)

        //data.append('CountTimeStepsPreorder', CountTimeStepsPreorder)
        checkNumValue(data, 'CountTimeStepsPreorder', CountTimeStepsPreorder)

        //data.append('TimeStep', TimeStep)
        checkNumValue(data, 'TimeStep',TimeStep)
        
        data.append('Disabled', Disabled)
        data.append('IsNeedToNotify', IsNeedToNotify)
        data.append('BotToken', BotToken)
        data.append('NotifyWhenIIkoErrors', NotifyWhenIIkoErrors)
        data.append('NotifyWhenNewOrder', NotifyWhenNewOrder)
        data.append('NotifyWhenOrderChanges', NotifyWhenOrderChanges)
        data.append('NotifyWhenNewReservation', NotifyWhenNewReservation);


        data.append('RKeeperLogin', RKeeperLogin)
        data.append('RKeeperIP', RKeeperIP)
        data.append('RKeeperPort', RKeeperPort)
        data.append('PrimehillToken', PrimehillToken)
        data.append('CanOverwrite', CanOverwrite)
        data.append('HideInApp', HideInApp)
        
        setSaveLoad(true) 
        if(!orgId) {
            os.addOrg(token, data).then(res => {
                if(res?.error) {
                    message.error(res.message)
                } else {
                    message.success('?????????????????????? ??????????????')
                    setCreatedId(res)
                }
            }).finally(_ => {
                setSaveLoad(false)
            })
        }
        if(orgId) {
            console.log('work')
            data.append('ID', orgId)    
            os.editOrg(token, data).then(res => {

                if(res?.error) {
                    message.error(res.message)
                } else {
                    nav(-1, {replace: true})
                    message.success('?????????????????????? ?????????????? ????????????????')
                } 
            }).finally(_ => {
                setSaveLoad(false)
            })
        }
    }
    
    //????????????????
    const deleteOrg = () => {
        setDelLoad(true)
        os.deleteOrg(token, {ID: orgId}).then(res => {
            
            if(res?.error) {
                message.error(res.message)
            } else {
                nav(-1, {replace: true})
                message.success('?????????????????????? ??????????????')
            }
        }).finally(_ => {
            setDelLoad(false)
        })
    }

    //?????????????????? ????????????????
    const editPolygonFunc = ({...item}) => {
        setEditPolygon(item)
        openSelectPoly()
    }

    const addPay = (item, selected) => {
        if(item.PaymentType != selected.PaymentType && !pm.find(i => i.PaymentType == item.PaymentType)) {
            os.addPay(token, {
                OrganisationID: createdId ? createdId : orgId,
                Payments: [
                    {
                        PaymentType: item.PaymentType,
                        IsNeedToChangeCash: item.IsNeedToChangeCash
                    }
                ]
            }).then(res => {
                if(res) {
                    message.success('?????????? ???????????? ?????????????? ????????????????')
                }
                setPm(res.map(item => {
                    return {
                        ...item,
                        value: pmValueFind(item.PaymentType)
                    }
                }))
            })
        } else {
            message.info('???????????? ?????????? ???????????? ?????? ????????????')
        }
    }

    const deletePay = (selected) => {
        os.deletePay(token, {ID: selected.ID}).then(res => {
            if(res) {
                setPm(res.map(item => {
                    return {
                        ...item,
                        value: pmValueFind(item.PaymentType)
                    }
                }))
                message.success('?????????? ???????????? ????????????')
            }
            
        })
    }

    const editPay = (e, selected) => {
        os.editPay(token, {
            ID: selected.ID,
            IsNeedToChangeCash: selected.IsNeedToChangeCash == '1' ? '0' : '1',
            Disabled: '0'
        }).then(res => {
            if(res) {
                setPm(res.map(item => {
                    return {
                        ...item,
                        value: pmValueFind(item.PaymentType)
                    }
                }))
            }
        })
    }
    
    useEffect(() => {
        if(!ThumbnailPrev || !Name) {
            LOCAL_STORAGE.removeItem('gs-creating-org')
        } else {
            LOCAL_STORAGE.setItem('gs-creating-org', '1')
        }
    }, [ThumbnailPrev, Name])

    useEffect(() => {
        return () => {
            if(LOCAL_STORAGE.getItem('gs-creating-org')) {

            } else {
                os.deleteOrg(token, {ID: orgId, Delete: 'hard'}).then(res => {
                    // console.log(res)
                }).finally(_ => {
                    window.location.reload()
                    LOCAL_STORAGE.removeItem('gs-creating-org')
                })
            }
        }
    }, [])

    const updatePolList = () => {
        os.getPols(token, {OrganisationID: orgId}).then(res => {
            if(res?.length > 0) {
                setDelivery(true)
                setPolList(res.map(item => {
                    return {
                        ...item,
                        Coordinates: item.Coordinats.split(' ').map(item => {
                            return {
                                lat: Number(item.slice(0, item.indexOf(','))),
                                lng: Number(item.slice(item.indexOf(',') + 1, item.length))
                            }
                        }),
                        Coordinats: null,
                    }
                }))
            } else {
                setDelivery(false)
            }
        })
    }



    const [confirmDelete, setConfirmDelete] = useState(false)

    const openDeleteConfirm = () => {
        setConfirmDelete(true)
    }

    const closeDeleteConfirm = () => {
        setConfirmDelete(false)
    }

    const deleteWithoutSave = () => {
        deleteOrg()
    }


    return (
        <motion.div 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}
            exit={{opacity: 0}}
            className="OrgsCreatePage page">
            
            <LocationModal
                setLocation={setLocation}
                visible={selectLocationModal}
                close={closeSelectLocation}
                coords={coords}
                />

            {/* ?????????? ?????? ???????????????????? (??????????????) */}
            
            {/* ?????????????? ?????? ???????????????????? */}
            <ConfirmModal 
                text={'?????????????? ???????????????????????'}
                cancel={deleteWithoutSave}
                visible={confirmDelete}
                close={closeDeleteConfirm}
                />
            <PolygonModal
                data={editPolygon}
                orgId={createdId ? createdId : orgId}
                setPolList={setPolList}
                visible={selectPolyModal}
                close={closeSelectPoly}
                />
            {/* <HeaderProfile/> */}
            <main className="Main">
                <div className="pageBody">
                    <div className="OrgsCreatePage__body pageBody-content">
                        <Row gutter={[25, 25]} justify={'space-between'}>
                            <Col span={12}>
                                <Row className='row-custom'>
                                    <div className="panel">
                                        <PlUpload
                                            style={{height: 250, backgroundColor: '#F8F8F8'}}
                                            text={'?????????????? ????????????????'}
                                            id={'OrgPic'}
                                            accept={'.png, .jpeg, .bmp'}
                                            prev={ThumbnailPrev}
                                            onChange={uploadImage}
                                        />
                                    </div>
                                </Row>
                                <Row className="row-custom">
                                    <Col span={24}>
                                        <Checkbox
                                            id={'CanOverwrite'}
                                            text={'?????????????????? iiko ???????????????????????????? ??????????????????????'}
                                            checked={CanOverwrite == '1'}
                                            onChange={e => {
                                                if(e.target.checked) {
                                                    setCanOverwrite('1')
                                                } else {
                                                    setCanOverwrite('0')
                                                }
                                            }}
                                            />
                                    </Col>
                                </Row>
                                <Row className='row-custom'>
                                    <Input maskType={String} value={Name} onChange={(e) => setName(e.target.value)} placeholder={'???????????????? ??????????????????????'}/>
                                </Row>
                                <Row className='row-custom'>
                                    <Text value={Description} onChange={(e) => setDescription(e.target.value)} height={180} placeholder={'????????????????'}/>
                                </Row>
                                <Row className='row-custom'>
                                    <Input maskType={String} value={Address} onChange={(e) => setAddress(e.target.value)} placeholder={'??????????'}/>
                                </Row>  
                                <Row className='row-custom'>
                                    <Input maskType={'+{7}(000)000-00-00'} value={Phone} onChange={(e) => setPhone(e.target.value)} placeholder={'??????????????'}/>
                                </Row>  
                                <Row className='row-custom'>
                                    <Input maskType={String} value={Email} onChange={(e) => setEmail(e.target.value)} placeholder={'Email'}/>
                                </Row>

                                {
                                    settings?.IsHaveIIko == '1' ? (
                                        <>
                                            <Row className='row-custom'>
                                                <Input maskType={String} value={IIkoIDTerminal} onChange={(e) => setIIkoIDTerminal(e.target.value)} placeholder={'ID ???????????????? ??????????????'}/>
                                            </Row>  
                                        </>
                                        
                                    ) : null 
                                } 
                                {
                                    settings?.IsHaveIIko == '1' ? (
                                        <Row className='row-custom'>
                                            <Input maskType={String} value={IIkoID} onChange={(e) => setIIkoID(e.target.value)} placeholder={'ID ?? iIko'}/>
                                        </Row> 
                                    ) : (
                                        <Row className='row-custom'>
                                            <Input maskType={String} value={IIkoID} onChange={(e) => setIIkoID(e.target.value)} placeholder={'ID ?? RKeeper'}/>
                                        </Row> 
                                    )
                                }
                                {
                                    settings?.IsHaveRKeeper == '1' ? (
                                        <>
                                            <Row className='row-custom'>
                                                <Input maskType={String} value={RKeeperLogin} onChange={(e) => setRKeeperLogin(e.target.value)} placeholder={'?????????? RKeeper'}/>
                                            </Row>  
                                            <Row className='row-custom'>
                                                <Input maskType={String} value={RKeeperIP} onChange={(e) => setRKeeperIP(e.target.value)} placeholder={'IP RKeeper'}/>
                                            </Row> 
                                            <Row className='row-custom'>
                                                <Input maskType={String} value={RKeeperPort} onChange={(e) => setRKeeperPort(e.target.value)} placeholder={'???????? RKeeper'}/>
                                            </Row> 
                                            
                                        </>
                                    ) : null
                                }
                                {
                                    settings?.IsHavePrimehill == '1' ? (
                                        <Row className='row-custom'>
                                            <Input maskType={String} value={PrimehillToken} onChange={(e) => setPrimehillToken(e.target.value)} placeholder={'?????????? PrimeHill'}/>
                                        </Row> 
                                    ) : null
                                }
                                 
                                <Row className='row-custom'>
                                    <Input scale={5} value={MinPriceForLocalSale} onChange={(e) => setMinPriceForLocalSale(e.target.value)} placeholder={'?????????????????????? ?????????? ????????????'}/>
                                </Row>  
                                <Row className='row-custom'>
                                    <Input value={LocalOrderSale} onChange={(e) => setLocalOrderSale(e.target.value)} placeholder={'???????????? ???? ?????????????????? ????????????'}/>
                                </Row> 
                                <Row className='row-custom'>
                                    <Checkbox 
                                        checked={IsHaveLocalOrder == '1'} 
                                        onChange={(e) => {
                                            if(e.target.checked) {
                                                setIsHaveLocalOrder('1')
                                            } else {
                                                setIsHaveLocalOrder('0')
                                            }
                                        }} 
                                        id={'IsHaveLocalOrder'} 
                                        text={'?????????? ???????????????? ????????????'}/>
                                </Row>  
                                <Row className='row-custom'>
                                    <Input
                                        value={Timezone}
                                        onChange={e => setTimezone(e.target.value)}
                                        maskType={String}
                                        placeholder={'?????????????? ????????'}
                                        />
                                </Row>
                                <Row className='row-custom'>
                                    <Input 
                                        maskType={String}
                                        value={TimetableDescription} 
                                        onChange={(e) => setTimetableDescription(e.target.value)} 
                                        placeholder={'???????????????? ?????????????? ????????????'}
                                        />
                                </Row> 
                                <Row className='row-custom'>
                                    <TimeSelect 
                                        save={saveTime} 
                                        list={weekTimes}
                                        />
                                </Row>
                                <Row className='row-custom'>
                                    <Checkbox
                                        checked={HideInApp == '1'}
                                        onChange={e => {
                                            if(e.target.checked) {
                                                setHideInApp('1')
                                            } else {
                                                setHideInApp('0')
                                            }
                                        }}
                                        id="HideInApp"
                                        text={'???????????? ?? ????????????????????'}
                                        />
                                </Row>
                                <Row className='row-custom'>
                                    <Checkbox 
                                        checked={IsNeedToNotify == '1'}
                                        onChange={e => {
                                            if(e.target.checked) {
                                                setIsNeedToNotify('1')
                                            } else {
                                                setIsNeedToNotify('0')
                                            }
                                        }}
                                        id={'3'} 
                                        text={'?????????????????????? ?? ????????????????-???????? ?? ???? E-Mail'}/>
                                </Row>  
                                {
                                    IsNeedToNotify == '1' ? (
                                        <>
                                            <Row className='row-custom'>
                                                <Input value={BotToken} onChange={(e) => setBotToken(e.target.value)} placeholder={'API-key ????????'}/>
                                            </Row> 
                                            <Row className='row-custom'>
                                                <Checkbox 
                                                    checked={NotifyWhenNewOrder == '1'} 
                                                    onChange={(e) => {
                                                        if(e.target.checked) {
                                                            setNotifyWhenNewOrder('1')
                                                        } else {
                                                            setNotifyWhenNewOrder('0')
                                                        }
                                                    }} 
                                                    id={'NotifyWhenNewOrder'} 
                                                    text={'???????????????????? ?? ?????????? ??????????????'}
                                                    />
                                            </Row> 
                                            <Row className='row-custom'>
                                                <Checkbox
                                                    checked={NotifyWhenNewReservation == '1'}
                                                    onChange={e => {
                                                        if(e.target.checked) {
                                                            setNotifyWhenNewReservation('1')
                                                        } else {
                                                            setNotifyWhenNewReservation('0')
                                                        }
                                                    }}
                                                    id="NotifyWhenNewReservation"
                                                    text={'???????????????????? ?? ?????????? ????????????'}
                                                    />
                                            </Row>
                                            {
                                                settings?.IsHaveIIko == '1' || settings?.IsHaveIIko == '1' ? (
                                                    <Row className='row-custom'>
                                                        <Checkbox 
                                                            checked={NotifyWhenIIkoErrors == '1'} 
                                                            onChange={(e) => {
                                                                if(e.target.checked) {
                                                                    setNotifyWhenIIkoErrors('1')
                                                                } else {
                                                                    setNotifyWhenIIkoErrors('0')
                                                                }
                                                            }} 
                                                            id={'NotifyWhenIIkoErrors'} 
                                                            text={
                                                                settings?.IsHaveIIko == '1' ? 
                                                                '???????????????????? ???? ?????????????? Iiko' : 
                                                                '???????????????????? ???? ?????????????? RKeeper'
                                                            }
                                                            />
                                                    </Row> 
                                                ) : null
                                }
                                 
                                <Row className='row-custom'>
                                    <Checkbox 
                                        checked={NotifyWhenOrderChanges == '1'} 
                                        onChange={(e) => {
                                            if(e.target.checked) {
                                                setNotifyWhenOrderChanges('1')
                                            } else {
                                                setNotifyWhenOrderChanges('0')
                                            }
                                        }} 
                                        id={'NotifyWhenOrderChanges'} 
                                        text={'???????????????????? ???? ???????????????????? ?? ??????????????'}
                                        />
                                </Row>  
                                        </>
                                    ) : null
                                }  
                                <Row className='row-custom'>
                                    <Button 
                                        styles={{width: '100%'}} 
                                        onClick={orgSubmit} 
                                        
                                        disabled={!Name} 
                                        load={saveLoad}
                                        before={<SaveIcon size={20} color={'#fff'}/>} 
                                        text={'??????????????????'} 
                                        type={'button'}
                                        justify={'flex-start'}/>
                                    {
                                        orgId ? (
                                            <Button 
                                            styles={{width: '100%', marginTop: 10}} 
                                            onClick={openDeleteConfirm} 
                                            disabled={false} 
                                            load={delLoad} 
                                            before={<BsTrash size={20}/>} 
                                            text={'??????????????'} 
                                            type={'button'}
                                            variant={'danger'}
                                            justify={'flex-start'}/>
                                        ) : null
                                    }
                                </Row>      
                            </Col>
                            <Col span={12}>
                                <Row className='row-custom'>
                                    <div className="panel">
                                        <div className="panel-label">
                                            ???????????????????????????? ???? ??????????
                                        </div>
                                        {
                                            coords ? (
                                                <div style={{height: 250}} onClick={openSelectLocation}>
                                                    <MapMarker 
                                                    id="location-map"
                                                    readOnly
                                                    coords={coords} 
                                                    />

                                                </div>
                                                
                                            ) : (
                                            <Pl 
                                                onClick={openSelectLocation}
                                                style={{height: 200, backgroundColor: '#F8F8F8'}} 
                                                text={'?????????????? ???? ??????????'}/>
                                            )
                                        }
                                    </div>
                                </Row>
                                {
                                    createdId || orgId ? (
                                        <>
                                            <Row className='row-custom'>
                                                <Col span={12}>
                                                <Checkbox 
                                                    onChange={e => {
                                                        if(e.target.checked) {
                                                            setIsHaveDelivery('1')
                                                        } else {
                                                            setIsHaveDelivery('0')
                                                        }
                                                    }} 
                                                    checked={IsHaveDelivery == '1'} 
                                                    id={'IsHaveDelivery'} 
                                                    text={'???????? ????????????????'}/>
                                                </Col>     

                                                {
                                                    IsHaveDelivery == '1' ? (
                                                        <Col span={12}>
                                                            <UploadKml 
                                                                openMap={openSelectPoly} 
                                                                updatePolList={updatePolList}
                                                                />
                                                        </Col>
                                                    ) : null
                                                }
                                            </Row> 
                                            {
                                                IsHaveDelivery == '1' ? (
                                                    <Row className='row-custom' gutter={[30, 30]}>
                                                        {
                                                            polList && polList.length > 0 ? (
                                                                polList.map((item, index) => (
                                                                    <Col span={12} key={index}>
                                                                        <div onClick={() => {
                                                                            editPolygonFunc({...item})
                                                                        }} className="panel" style={{height: 275}}>
                                                                            <MapPolygonPic
                                                                                name={item?.Name}
                                                                                polygonCoords={item?.Coordinates}
                                                                                color={item?.Color}
                                                                                />
                                                                        </div>
                                                                    </Col>
                                                                ))
                                                            ) : null
                                                        }
                                                        <Col span={12} >
                                                            <div className="panel" style={{height: 275}}>
                                                                <Pl 
                                                                    onClick={openSelectPoly}
                                                                    text={'???????????????? ?????????????? ????????????????'}/>
                                                            </div>
                                                        </Col>
                                                    </Row>  
                                                ) : null
                                            }
                                            <Row className='row-custom'>
                                                {
                                                    pm && pm.length > 0 ? (
                                                        pm.map((item, index) => (
                                                            
                                                            <PayMethods
                                                                selected={item}
                                                                list={paymethods}
                                                                onCashbackChange={editPay}
                                                                onChange={addPay}
                                                                onDelete={deletePay}
                                                            />
                                                        ))
                                                    ) : null
                                                }
                                                {
                                                    pm?.length < 3 ? (
                                                        <div className="panel" style={{padding: 0}}>
                                                            <Pl onClick={addPayMethods} text={'???????????????? ???????????? ????????????'}/>
                                                        </div>
                                                    ) : null
                                                }
                                    
                                            </Row>  
                                        </>
                                    ) : null
                                }
                               
                                <Row className='row-custom'>
                                    <Checkbox 
                                        onChange={(e) => {
                                            if(e.target.checked) {
                                                setHavePreorder('1')
                                            } else {
                                                setHavePreorder('0')
                                                setCountTimeStepsPreorder('')
                                                setTimeStep('')
                                            }
                                        }} 
                                        checked={HavePreorder == '1'} 
                                        id={'preOrder'} 
                                        text={'???????? ??????????????????'}/>
                                </Row>
                                {
                                    HavePreorder == '1' ? (
                                        <>
                                            <Row className='row-custom'>
                                                <Input 
                                                    value={CountTimeStepsPreorder} 
                                                    onChange={(e) => setCountTimeStepsPreorder(e.target.value)} 
                                                    placeholder={'?????? ???????????? ?????????????? ???????????????????? (?? ??????????????)'}/>
                                            </Row> 
                                            <Row className='row-custom'>
                                                <Input 
                                                    value={TimeStep} 
                                                    onChange={(e) => setTimeStep(e.target.value)} 
                                                    placeholder={'???????????????????????? ???????????????????? ??????????'}/>
                                            </Row> 
                                        </>
                                    ) : null
                                }  
                                

                                <Row className='row-custom'>
                                    <Checkbox 
                                        checked={HaveReservation == '1'}
                                        onChange={e => {
                                            if(e.target.checked) {
                                                setHaveReservation('1')
                                            } else {
                                                setHaveReservation('0')
                                                setCountTimeStepsReservation('')
                                                setTimeStepReservation('')
                                            }
                                        }}
                                        id={HaveReservation}
                                        text={'???????? ???????????????????????? ??????????????'}/>
                                </Row>  
                                {
                                    HaveReservation == '1' ? (
                                        <>
                                            <Row className='row-custom'>
                                                <Input 
                                                    value={CountTimeStepsReservation} 
                                                    onChange={(e) => setCountTimeStepsReservation(e.target.value)} 
                                                    placeholder={'?????? ???????????? ?????????????? ???????????????????????? (?? ??????????????)'}/>
                                            </Row> 
                                            <Row className='row-custom'>
                                                <Input 
                                                    value={TimeStepReservation} 
                                                    onChange={(e) => setTimeStepReservation(e.target.value)} 
                                                    placeholder={'???????????????????????? ???????????????????? ??????????'}/>
                                            </Row> 
                                        </>
                                    ) : null
                                }
                                
                            </Col>
                        </Row>
                    </div>
                </div>
            </main>
        </motion.div>
    )
}

export default OrgsNewPage;
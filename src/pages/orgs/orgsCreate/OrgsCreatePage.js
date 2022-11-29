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
import checkEmptyValue from '../../../funcs/checkEmptyValue';
import checkNumValue from '../../../funcs/checkNumValue';
import UploadKml from './components/UploadKml/UploadKml';
import MapPolygonPic from '../../../components/MapPolygonPic/MapPolygonPic';

const os = new orgService();
const pmValueFind = (value) => {
    switch(value) {
        case '0':
            return 'Оплата наличными'
        case '1':
            return 'Оплата по карте в приложении'
        case '2':
            return 'Оплата по карте при получении'
    }
}




const LOCAL_STORAGE = window.localStorage;


const OrgsCreatePage = () => {
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
    const [IIkoID, setIIkoID] = useState('')
    const [IIkoIDTerminal, setIIkoIDTerminal] = useState('')
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

    
    const [RKeeperLogin, setRKeeperLogin] = useState('')
    const [RKeeperIP, setRKeeperIP] = useState('') 
    const [RKeeperPort, setRKeeperPort] = useState('')
    const [PrimehillToken,setPrimehillToken] = useState('')



    const [polList, setPolList] = useState([])

    //MODALS
    const [selectLocationModal, setSelectLocationModal] = useState(false);
    const [selectPolyModal, setSelectPolyModal] = useState(false)
    const [saveLoad, setSaveLoad] = useState(false)
    const [delLoad, setDelLoad] = useState(false)
    
    //Способы оплаты
    const [pm, setPm] = useState([]);
    const [delivery, setDelivery] = useState(false)


    //получение данных при редактировании
    useEffect(() => {
        if(orgId && brandId != 'nobrand' && token && settings.IsHaveBrands == '1') {
            os.getOrgs(token, {BrandID: brandId}).then(res => {
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
               
                
                if(thisOrg.Lattitude && thisOrg.Longitude) {
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
                            Coordinats: null,
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
                
                if(thisOrg.Lattitude && thisOrg.Longitude) {
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
                            Coordinats: null,
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

    const addPayMethods = () => {
        const cs = pm;
        os.addPay(token, {
            OrganisationID: createdId ? createdId : orgId,
            Payments: [
                {
                    PaymentType: paymethods[pm.length].PaymentType,
                    IsNeedToChangeCash: paymethods[pm.length].IsNeedToChangeCash ? '1' : '0'
                }
            ]
        }).then(res => {
           
            setPm(res.map(item => {
                return {
                    ...item,
                    value: pmValueFind(item.PaymentType)
                }
            }))
        })
        
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

    //выбор таймзоны
    const selectTmz = (value, index) => {
        setTimezone(value);
    }

    //открыть модалку местоположения
    const openSelectLocation = () => {
        setSelectLocationModal(true)
    }

    //закрыть модалку местоположения
    const closeSelectLocation = () => {
        setSelectLocationModal(false)
    }

    //открыть модалку создания полигона
    const openSelectPoly = () => {
        setSelectPolyModal(true)
    }

    //закрыть модалку создания полигона
    const closeSelectPoly = () => {
        setEditPolygon(null)
        setSelectPolyModal(false)
    }

    //сохранить время
    const saveTime = (index, value) => {
       

        let ur = weekTimes;
        let rm = ur.splice(index, 1, value)
        setWeekTimes([...ur]);
    }

    //выбрать местоположение
    const setLocation = (coords) => {
        setLattitude(coords.lat)
        setLongitude(coords.lng)
        setCoords({lat: coords.lat, lng: coords.lng})
    }


    //добавить изображение
    const uploadImage = (e) => {
        
        setThumbnailPrev(URL.createObjectURL(e.target.files[0]))
        setThumbnailPicture(e.target.files[0])
    }

    //сохранение изменений
    const orgSubmit = () => {
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
        // checkEmptyValue(data, 'IIkoID', IIkoID)
        // checkEmptyValue(data, 'IIkoIDTerminal', IIkoIDTerminal)
        // checkEmptyValue(data, 'OrganisationBrand', brandId != 'nobrand' && brandId ? brandId : 0)
        // checkEmptyValue(data, 'ItemOrder', ItemOrder)
        // checkEmptyValue(data, 'Name', Name)
        // checkEmptyValue(data, 'Description', Description)
        // checkEmptyValue(data, 'HaveReservation', HaveReservation)
        // checkEmptyValue(data, 'CountTimeStepsReservation', CountTimeStepsReservation)
        // checkEmptyValue(data, 'TimeStepReservation', TimeStepReservation)
        // checkEmptyValue(data, 'HavePreorder', HavePreorder)
        // checkEmptyValue(data, 'Address', Address)
        // checkEmptyValue(data, 'Phone', Phone)
        // checkEmptyValue(data, 'Email', Email)
        // checkEmptyValue(data, 'MinPriceForLocalSale', MinPriceForLocalSale)
        // checkEmptyValue(data, 'LocalOrderSale', LocalOrderSale)
        // checkEmptyValue(data, 'IsHaveDelivery', IsHaveDelivery)
        // checkEmptyValue(data, 'IsHaveLocalOrder', IsHaveLocalOrder)
        // checkEmptyValue(data, 'TimetableDescription', TimetableDescription)
        // checkEmptyValue(data, 'TimetableDescription', TimetableDescription)
        // checkEmptyValue(data, 'Timezone', Timezone)
        // checkEmptyValue(data, 'Timezone', Timezone)
        // checkEmptyValue(data, 'CountTimeStepsPreorder', CountTimeStepsPreorder)
        // checkEmptyValue(data, 'TimeStep', TimeStep)
        // checkEmptyValue(data, 'Disabled', Disabled)
        // checkEmptyValue(data, 'IsNeedToNotify', IsNeedToNotify)
        // checkEmptyValue(data, 'BotToken', BotToken)
        // checkEmptyValue(data, 'NotifyWhenIIkoErrors', NotifyWhenIIkoErrors)
        // checkEmptyValue(data, 'NotifyWhenNewOrder', NotifyWhenNewOrder)
        // checkEmptyValue(data, 'NotifyWhenOrderChanges', NotifyWhenOrderChanges)
        // checkEmptyValue(data, 'NotifyWhenNewReservation', NotifyWhenNewReservation)
        // checkEmptyValue(data, 'RKeeperLogin', RKeeperLogin)
        // checkEmptyValue(data, 'RKeeperIP', RKeeperIP)
        // checkEmptyValue(data, 'RKeeperPort', RKeeperPort)
        // checkEmptyValue(data, 'PrimehillToken', PrimehillToken)


        data.append('IIkoID', IIkoID)
        data.append('IIkoIDTerminal', IIkoIDTerminal)
        data.append('OrganisationBrand', brandId != 'nobrand' && brandId ? brandId : 0)
        data.append('ItemOrder', ItemOrder)
        data.append('Name', Name)
        data.append('Description', Description)
        if(ThumbnailPicture) {
            data.append('ThumbnailPicture', ThumbnailPicture)
        }
        checkNumValue(data, 'HaveReservation', HaveReservation)
        // data.append('HaveReservation', HaveReservation)
        checkNumValue(data, 'CountTimeStepsReservation', CountTimeStepsReservation)
        // data.append('CountTimeStepsReservation', CountTimeStepsReservation)
        // data.append('TimeStepReservation', TimeStepReservation)
        checkNumValue(data, 'TimeStepReservation', TimeStepReservation)
        data.append('HavePreorder', HavePreorder)
        data.append('Address', Address)
        data.append('Phone', Phone)
        data.append('Email', Email)
        
        // data.append('MinPriceForLocalSale', MinPriceForLocalSale)
        checkNumValue(data, 'MinPriceForLocalSale', MinPriceForLocalSale);
        // data.append('LocalOrderSale', LocalOrderSale)
        checkNumValue(data, 'LocalOrderSale', LocalOrderSale)
        data.append('Lattitude', coords?.lat)
        data.append('Longitude', coords?.lng)
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
        // data.append('CountTimeStepsPreorder', CountTimeStepsPreorder)
        checkNumValue(data, 'CountTimeStepsPreorder', CountTimeStepsPreorder)
        // data.append('TimeStep', TimeStep)
        checkNumValue(data, 'TimeStep', TimeStep)
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

        // for(var pair of data.entries()) {
        //     console.log(pair[0]+ ': '+ pair[1]);
        // }  

        setSaveLoad(true) 
        if(!orgId) {
            os.addOrg(token, data).then(res => {
                if(res?.error) {
                    message.error(res.message)
                } else {
                    message.success('Организация создана')
                    setCreatedId(res)
                }
            }).finally(_ => {
                setSaveLoad(false)
            })
        }
        if(orgId) {
            data.append('ID', orgId)    
            os.editOrg(token, data).then(res => {
                if(res?.error) {
                    message.error(res.message)
                } else {
                    nav(-1, {replace: true})
                    message.success('Организация успешно изменена')
                } 
            }).finally(_ => {
                setSaveLoad(false)
            })
        }
    }
    

    //удаление
    const deleteOrg = () => {
        setDelLoad(true)
        os.deleteOrg(token, {ID: orgId}).then(res => {
            
            if(res?.error) {
                message.error(res.message)
            } else {
                nav(-1, {replace: true})
                message.success('Организация удалена')
            }
        }).finally(_ => {
            setDelLoad(false)
        })
    }

    //изменение полигона
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
                    message.success('Метод оплаты успешно добавлен')
                }
                setPm(res.map(item => {
                    return {
                        ...item,
                        value: pmValueFind(item.PaymentType)
                    }
                }))
            })
        } else {
            message.info('Данный метод оплаты уже выбран')
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
                message.success('Метод оплаты удален')
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
                                            text={'Выбрать картинку'}
                                            id={'OrgPic'}
                                            accept={'.png, .jpeg, .bmp'}
                                            prev={ThumbnailPrev}
                                            onChange={uploadImage}
                                        />
                                    </div>
                                </Row>
                                <Row className='row-custom'>
                                    <Col span={24}>
                                        <div className="def-label">ID в системе</div>
                                        <div className="def-value">{orgId}</div>
                                    </Col>
                                </Row>
                                <Row className='row-custom'>
                                    <Input value={Name} onChange={(e) => setName(e.target.value)} placeholder={'Название организации'}/>
                                </Row>
                                <Row className='row-custom'>
                                    <Text value={Description} onChange={(e) => setDescription(e.target.value)} height={180} placeholder={'Описание'}/>
                                </Row>
                                <Row className='row-custom'>
                                    <Input value={Address} onChange={(e) => setAddress(e.target.value)} placeholder={'Адрес'}/>
                                </Row>  
                                <Row className='row-custom'>
                                    <Input value={Phone} onChange={(e) => setPhone(e.target.value)} placeholder={'Телефон'}/>
                                </Row>  
                                <Row className='row-custom'>
                                    <Input value={Email} onChange={(e) => setEmail(e.target.value)} placeholder={'Email'}/>
                                </Row> 
                                {
                                    settings?.IsHaveIIko == '1' ? (
                                        <>
                                            <Row className='row-custom'>
                                                <Input value={IIkoIDTerminal} onChange={(e) => setIIkoIDTerminal(e.target.value)} placeholder={'ID кассовой станции'}/>
                                            </Row>  
                                            <Row className='row-custom'>
                                                <Input value={IIkoID} onChange={(e) => setIIkoID(e.target.value)} placeholder={'ID в iIko'}/>
                                            </Row> 
                                        </>
                                    ) : null
                                }
                                {
                                    settings?.IsHaveRKeeper == '1' ? (
                                        <>
                                            <Row className='row-custom'>
                                                <Input value={RKeeperLogin} onChange={(e) => setRKeeperLogin(e.target.value)} placeholder={'Логин RKeeper'}/>
                                            </Row>  
                                            <Row className='row-custom'>
                                                <Input value={RKeeperIP} onChange={(e) => setRKeeperIP(e.target.value)} placeholder={'IP RKeeper'}/>
                                            </Row>  
                                            <Row className='row-custom'>
                                                <Input value={RKeeperPort} onChange={(e) => setRKeeperPort(e.target.value)} placeholder={'Порт RKeeper'}/>
                                            </Row>  
                                        </>
                                    ) : null
                                }
                                {
                                    settings?.IsHavePrimehill == '1' ? (
                                        <Row className='row-custom'>
                                            <Input value={PrimehillToken} onChange={(e) => setPrimehillToken(e.target.value)} placeholder={'Токен PrimeHill'}/>
                                        </Row>  
                                    ) : null
                                }                                 
                                <Row className='row-custom'>
                                    <Input value={MinPriceForLocalSale} onChange={(e) => setMinPriceForLocalSale(e.target.value)} placeholder={'Минимальная сумма заказа'}/>
                                </Row>  
                                <Row className='row-custom'>
                                    <Input value={LocalOrderSale} onChange={(e) => setLocalOrderSale(e.target.value)} placeholder={'Скидка на самовывоз отсюда'}/>
                                </Row> 
                                <Row className='row-custom'>
                                    <Checkbox 
                                        checked={IsHaveDelivery == '1'} 
                                        onChange={(e) => {
                                            if(e.target.checked) {
                                                setIsHaveDelivery('1')
                                            } else {
                                                setIsHaveDelivery('0')
                                            }
                                        }} 
                                        id={'IsHaveDelivery'} 
                                        text={'Можно заказать отсюда'}/>
                                </Row>  
                                <Row className='row-custom'>
                                    <DropCollapse 
                                        afterIcon 
                                        label={'Часовой пояс'}
                                        list={timezones}
                                        value={Timezone}
                                        selectItem={selectTmz}
                                        />
                                </Row>
                                <Row className='row-custom'>
                                    <Input 
                                        value={TimetableDescription} 
                                        onChange={(e) => setTimetableDescription(e.target.value)} 
                                        placeholder={'Описание времени работы'}
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
                                        checked={IsNeedToNotify == '1'}
                                        onChange={e => {
                                            if(e.target.checked) {
                                                setIsNeedToNotify('1')
                                            } else {
                                                setIsNeedToNotify('0')
                                            }
                                        }}
                                        id={'3'} 
                                        text={'Уведомления в телеграм-боте и на E-Mail'}/>
                                </Row>  
                                <Row className='row-custom'>
                                    <Input value={BotToken} onChange={(e) => setBotToken(e.target.value)} placeholder={'API-key бота'}/>
                                </Row> 
                                {/* <Row className='row-custom'>
                                    <Input
                                        value={Email}
                                        onChange={(e) => setEmail(e.target.value)} 
                                        placeholder={'E-Mail'}/>
                                </Row> */}
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
                                        text={'Уведомлять о новых заказах'}
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
                                        text={'Уведомлять о новых бронях'}
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
                                                    'Уведомлять об ошибках Iiko' : 
                                                    'Уведомлять об ошибках RKeeper'
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
                                        text={'Уведомлять об изменениях в заказах'}
                                        />
                                </Row>  
                                <Row className='row-custom'>
                                    <Button 
                                        styles={{width: '100%'}} 
                                        onClick={orgSubmit} 
                                        disabled={!Name} 
                                        load={saveLoad}
                                        before={<SaveIcon size={20} color={'#fff'}/>} 
                                        text={'Сохранить'} 
                                        type={'button'}
                                        justify={'flex-start'}/>
                                    {
                                        orgId ? (
                                            <Button 
                                            styles={{width: '100%', marginTop: 10}} 
                                            onClick={deleteOrg} 
                                            disabled={false} 
                                            load={delLoad} 
                                            before={<BsTrash size={20}/>} 
                                            text={'Удалить'} 
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
                                            Местоположение на карте
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
                                                text={'Выбрать на карте'}/>
                                            )
                                        }
                                    </div>
                                </Row>
                                {
                                    createdId || orgId ? (
                                        <>
                                            <Row gutter={[10, 10]} className='row-custom'>
                                                <Col span={12}>
                                                    <Checkbox 
                                                        onChange={(e) => 
                                                        setDelivery(e.target.checked)} 
                                                        checked={delivery} 
                                                        id={'isDelivery'} 
                                                        text={'Есть доставка'}/>
                                                </Col>
                                                <Col span={12}>
                                                    <UploadKml 
                                                        openMap={openSelectPoly} 
                                                        updatePolList={updatePolList}
                                                        />
                                                </Col>
                                                
                                            </Row> 
                                            {
                                                delivery ? (
                                                    // <Row className='row-custom' gutter={[30, 30]}>
                                                    //     {
                                                    //         polList && polList.length > 0 ? (
                                                    //             polList.map((item, index) => (
                                                    //                 <Col span={12} key={index}>
                                                    //                     <div onClick={() => {
                                                    //                         editPolygonFunc({...item})
                                                    //                     }} className="panel" style={{height: 275}}>
                                                    //                         <MapPolygon 
                                                    //                             // id={`polygon-item-${index}`}
                                                    //                             id={'polygon-item'}
                                                    //                             readOnly
                                                    //                             polygonCoords={item?.Coordinates} 
                                                    //                             color={item?.Color}
                                                    //                             // center={item.Coordinates[0]}
                                                    //                             />
                                                    //                     </div>
                                                    //                 </Col>
                                                    //             ))
                                                    //         ) : null
                                                    //     }
                                                    //     <Col span={12} >
                                                    //         <div className="panel" style={{height: 275}}>
                                                    //             <Pl 
                                                    //                 onClick={openSelectPoly}
                                                    //                 text={'Добавить полигон доставки'}/>
                                                    //         </div>
                                                    //     </Col>
                                                    // </Row>  
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
                                                                    text={'Добавить полигон доставки'}/>
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
                                                                key={index}
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
                                                    pm?.length < 1 ? (
                                                        <div className="panel" style={{padding: 0}}>
                                                            <Pl onClick={addPayMethods} text={'Добавить способ оплаты'}/>
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
                                        text={'Есть предзаказ'}/>
                                </Row>
                                {
                                    HavePreorder == '1' ? (
                                        <>
                                            <Row className='row-custom'>
                                                <Input 
                                                    value={CountTimeStepsPreorder} 
                                                    onChange={(e) => setCountTimeStepsPreorder(e.target.value)} 
                                                    placeholder={'Шаг выбора времени предзаказа (в минутах)'}/>
                                            </Row> 
                                            <Row className='row-custom'>
                                                <Input 
                                                    value={TimeStep} 
                                                    onChange={(e) => setTimeStep(e.target.value)} 
                                                    placeholder={'Максимальное количество шагов'}/>
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
                                        text={'Есть бронирование столика'}/>
                                </Row>  
                                {
                                    HaveReservation == '1' ? (
                                        <>
                                            <Row className='row-custom'>
                                                <Input 
                                                    value={CountTimeStepsReservation} 
                                                    onChange={(e) => setCountTimeStepsReservation(e.target.value)} 
                                                    placeholder={'Шаг выбора времени бронирования (в минутах)'}/>
                                            </Row> 
                                            <Row className='row-custom'>
                                                <Input 
                                                    value={TimeStepReservation} 
                                                    onChange={(e) => setTimeStepReservation(e.target.value)} 
                                                    placeholder={'Максимальное количество шагов'}/>
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

export default OrgsCreatePage;
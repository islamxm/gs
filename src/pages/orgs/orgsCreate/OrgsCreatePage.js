import './OrgsCreatePage.scss';
import Sidebar from '../../../components/Sidebar/Sidebar';
import HeaderProfile from '../../../components/HeaderProfile/HeaderProfile';
import { Row, Col } from 'antd';
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
import { useParams } from 'react-router-dom';
import { Wrapper } from '@googlemaps/react-wrapper';
import Map from '../../../components/Map/Map';
import PlUpload from '../../../components/PlUpload/PlUpload';
import timezones from './components/timezones';
import paymethods from './components/paymethods';
import weektimes from './components/weektimes';
import timeTransform from './components/timeTransform';



const os = new orgService();



const LocationMap = ({coords, openSelectLocation}) => {
    return (
        <div onClick={openSelectLocation} style={{height: 200, borderRadius: 10, overflow: 'hidden'}}>
            <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                <Map readOnly coords={coords}/>
            </Wrapper>
        </div>
    )
}

const OrgsCreatePage = () => {
    const {token} = useSelector(state => state)
    const {brandId, orgId} = useParams();
    
    //GLOBAL VALUES
    const [coords, setCoords] = useState({})
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
    const [IsHaveDelivery, setIsHaveDelivery] = useState(0)
    const [IsHaveLocalOrder, setIsHaveLocalOrder] = useState(0)
    const [TimetableDescription, setTimetableDescription] = useState('')
    const [Lattitude, setLattitude] = useState(0)
    const [Longitude, setLongitude] = useState(0)
    const [BotToken, setBotToken] = useState('')
    const [Email, setEmail] = useState('')
    const [IsNeedToNotify, setIsNeedToNotify] = useState(0)
    const [NotifyWhenNewOrder, setNotifyWhenNewOrder] = useState(0)
    const [NotifyWhenIIkoErrors, setNotifyWhenIIkoErrors] = useState(0)
    const [NotifyWhenOrderChanges, setNotifyWhenOrderChanges] = useState(0)
    const [Timezone, setTimezone] = useState()
    const [CountTimeStepsPreorder, setCountTimeStepsPreorder] = useState('');
    const [TimeStep, setTimeStep] = useState('');
    const [Disabled, setDisabled] = useState(0)



    //MODALS
    const [selectLocationModal, setSelectLocationModal] = useState(false);
    const [saveLoad, setSaveLoad] = useState(false)
    
    //Способы оплаты
    const [pm, setPm] = useState([]);
    const [delivery, setDelivery] = useState(false)



    useEffect(() => {
        if(orgId && brandId) {
            os.getOrgs(token, {BrandID: brandId}).then(res => {
                const thisOrg = res.find(item => item.ID == orgId)
                setIIkoID(thisOrg.IIkoID)
                setIIkoIDTerminal(thisOrg.IIkoIDTerminal)
                setOrganisationBrand(thisOrg.OrganisationBrand)
                setItemOrder(thisOrg.ItemOrder)
                setName(thisOrg.Name)
                setDescription(thisOrg.Description)
                setThumbnailPrev(thisOrg.ThumbnailPicture)
                setAddress(thisOrg.Address)
                setPhone(thisOrg.Phone)
                setMinPriceForLocalSale(thisOrg.MinPriceForLocalSale)
                setLocalOrderSale(thisOrg.LocalOrderSale)
                setIsHaveDelivery(thisOrg.IsHaveDelivery)
                setIsHaveLocalOrder(thisOrg.IsHaveLocalOrder)
                setTimetableDescription(thisOrg.TimetableDescription)
                setLattitude(thisOrg.Lattitude)
                setLongitude(thisOrg.Longitude)
                setBotToken(thisOrg.BotToken)
                setEmail(thisOrg.Email)
                setIsNeedToNotify(thisOrg.IsNeedToNotify)
                setNotifyWhenNewOrder(thisOrg.NotifyWhenNewOrder)
                setNotifyWhenIIkoErrors(thisOrg.NotifyWhenIIkoErrors)
                setNotifyWhenOrderChanges(thisOrg.NotifyWhenOrderChanges)
                setTimezone(thisOrg.Timezone)
                setCountTimeStepsPreorder(thisOrg.CountTimeStepsPreorder)
                setDisabled(thisOrg.Disabled)
                setWeekTimes([
                    timeTransform(thisOrg.MonTime, 0), 
                    timeTransform(thisOrg.TueTime, 1), 
                    timeTransform(thisOrg.WedTime, 2),
                    timeTransform(thisOrg.ThuTime, 3),
                    timeTransform(thisOrg.FriTime, 4),
                    timeTransform(thisOrg.SatTime, 5),
                    timeTransform(thisOrg.SunTime, 6),
                ]);


            })
            os.getPay(token, {OrganisationID: orgId}).then(res => {
                console.log(res)
            })
        }
    }, [orgId, brandId])


    const deletePayMethod = (index) => {
        setPm(state => {
            return state.filter((item, i) => i !== index)
        })
    }

    const addPayMethods = () => {
        setPm(state => [...state, paymethods[0]])
    }
    
    const selectPayMethod = (value, index) => {
        let ur = pm;
        let p = ur.splice(index, 1, {value: value})
        setPm([...ur])
        
    }

    const selectTmz = (value, index) => {
        setTimezone(value);
    }

    const openSelectLocation = () => {
        setSelectLocationModal(true)
    }

    const closeSelectLocation = () => {
        setSelectLocationModal(false)
    }

    const saveTime = (index, value) => {
        console.log(value)
        console.log(index)

        let ur = weekTimes;
        let rm = ur.splice(index, 1, value)
        setWeekTimes([...ur]);
    }

    const setLocation = (coords) => {
        setLattitude(coords[0])
        setLongitude(coords[1])
        setCoords({lat: coords[0], lng: coords[1]})
    }

    const uploadImage = (e) => {
        
        setThumbnailPrev(URL.createObjectURL(e.target.files[0]))
        setThumbnailPicture(e.target.files[0])
    }

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
        data.append('IIkoID', IIkoID)
        data.append('IIkoIDTerminal', IIkoIDTerminal)
        data.append('OrganisationBrand', brandId)
        data.append('ItemOrder', ItemOrder)
        data.append('Name', Name)
        data.append('Description', Description)
        data.append('ThumbnailPicture', ThumbnailPicture)
        data.append('Address', Address)
        data.append('Phone', Phone)
        data.append('MinPriceForLocalSale', MinPriceForLocalSale)
        data.append('LocalOrderSale', LocalOrderSale)
        data.append('Lattitude', Lattitude)
        data.append('Longitude', Longitude)
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
        data.append('CountTimeStepsPreorder', CountTimeStepsPreorder)
        data.append('TimeStep', TimeStep)
        data.append('Disabled', Disabled)

        for (let key of data.entries()) {
            console.log(key[0] + ':' + key[1])
        }

        setSaveLoad(true) 

        if(!orgId) {
            //запрос на создание орг
            os.addOrg(token, data).then(res => {
                console.log(res)
            }).finally(_ => {
                setSaveLoad(false)
            })
        }
        
        // if(orgId) {
        //     os.editOrg()
        //     console.log('EDIT')
        // }
    }



    return (
        <div className="OrgsCreatePage page">
            <HeaderProfile/>

            <SelectLocation 
                coords={coords.lng && coords.lat ? coords : null} 
                setLocation={setLocation} 
                visible={selectLocationModal} 
                close={closeSelectLocation}/>
            <main className="Main">
                <div className="pageBody">
                    <Sidebar/>
                    <div className="spc"></div>
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
                                <Row className='row-custom'>
                                    <Input value={IIkoIDTerminal} onChange={(e) => setIIkoIDTerminal(e.target.value)} placeholder={'ID кассовой станции'}/>
                                </Row>  
                                <Row className='row-custom'>
                                    <Input value={IIkoID} onChange={(e) => setIIkoID(e.target.value)} placeholder={'ID в iIko'}/>
                                </Row>  
                                <Row className='row-custom'>
                                    <Input value={MinPriceForLocalSale} onChange={(e) => setMinPriceForLocalSale(e.target.value)} placeholder={'Минимальная сумма заказа'}/>
                                </Row>  
                                <Row className='row-custom'>
                                    <Input value={LocalOrderSale} onChange={(e) => setLocalOrderSale(e.target.value)} placeholder={'Скидка на самовывоз отсюда'}/>
                                </Row> 
                                <Row className='row-custom'>
                                    <Checkbox checked={IsHaveDelivery} onChange={(e) => setIsHaveDelivery(e.target.checked)} id={'1'} text={'Можно заказать отсюда'}/>
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
                                    <Input value={TimetableDescription} onChange={(e) => setTimetableDescription(e.target.value)} placeholder={'Описание времени работы'}/>
                                </Row> 
                                <Row className='row-custom'>
                                    <TimeSelect save={saveTime} list={weekTimes}/>
                                </Row> 
                                
                                <Row className='row-custom'>
                                    <Checkbox id={'3'} text={'Уведомления в телеграм-боте и на E-Mail'}/>
                                </Row>  
                                <Row className='row-custom'>
                                    <Input value={BotToken} onChange={(e) => setBotToken(e.target.value)} placeholder={'API-key бота'}/>
                                </Row> 
                                {/* <Row className='row-custom'>
                                    <Input placeholder={'E-Mail'}/>
                                </Row> */}
                                <Row className='row-custom'>
                                    <Checkbox checked={NotifyWhenNewOrder} onChange={(e) => setNotifyWhenNewOrder(e.target.checked)} id={'4'} text={'Уведомлять о новых заказах'}/>
                                </Row> 
                                <Row className='row-custom'>
                                    <Checkbox checked={NotifyWhenIIkoErrors} onChange={(e) => setNotifyWhenIIkoErrors(e.target.checked)} id={'5'} text={'Уведомлять об ошибках iIko'}/>
                                </Row>  
                                <Row className='row-custom'>
                                    <Checkbox checked={NotifyWhenOrderChanges} onChange={(e) => setNotifyWhenOrderChanges(e.target.value)} id={'6'} text={'Уведомлять об изменениях в заказах'}/>
                                </Row>  
                                <Row className='row-custom'>
                                    <Button styles={{width: '100%'}} onClick={orgSubmit} disabled={false} load={false} before={<BsTrash/>} text={'Сохранить'} justify={'flex-start'}/>
                                </Row>      
                            </Col>
                            <Col span={12}>
                                <Row className='row-custom'>
                                    <div className="panel">
                                        <div className="panel-label">
                                            Местоположение на карте
                                        </div>
                                        {
                                            coords.lng && coords.lat ? (
                                                <LocationMap coords={coords} openSelectLocation={openSelectLocation}/>
                                            ) : (
                                            <Pl 
                                                onClick={openSelectLocation}
                                                style={{height: 200, backgroundColor: '#F8F8F8'}} 
                                                text={'Выбрать на карте'}/>
                                            )
                                        }
                                        
                                    </div>
                                </Row>
                                <Row className='row-custom'>
                                    <Checkbox onChange={() => setDelivery(!delivery)} checked={delivery} id={'7'} text={'Есть доставка'}/>
                                </Row>  
                                {
                                    delivery ? (
                                        <Row className='row-custom' gutter={[30, 30]}>
                                            <Col span={12} >
                                                <div className="panel" style={{height: 275}}>
                                                    <Pl text={'Добавить полигон доставки'}/>
                                                </div>
                                            </Col>
                                            
                                        </Row>  
                                    ) : null
                                }
                                <Row className='row-custom'>
                                    {
                                        pm && pm.length > 0 ? (
                                            pm.map((item, index) => (
                                                <DropCollapse
                                                    key={index}
                                                    beforeIcon 
                                                    list={paymethods}
                                                    value={item.value}
                                                    styles={{marginBottom: 15}}
                                                    del={deletePayMethod}
                                                    selectItem={selectPayMethod}
                                                    index={index}
                                                    checkbox={item.checkbox}
                                                    />
                                            ))
                                        ) : null
                                    }
                                    {
                                        pm?.length !== 3 ? (
                                            <div className="panel" style={{padding: 0}}>
                                                <Pl onClick={addPayMethods} text={'Добавить способ оплаты'}/>
                                            </div>
                                        ) : null
                                    }
                                    
                                </Row>  
                                <Row className='row-custom'>
                                    <Checkbox id={'2'} text={'Есть предзаказ'}/>
                                </Row>  
                                <Row className='row-custom'>
                                    <Input value={CountTimeStepsPreorder} onChange={(e) => setCountTimeStepsPreorder(e.target.value)} placeholder={'Шаг выбора времени предзаказа (в минутах)'}/>
                                </Row> 
                                <Row className='row-custom'>
                                    <Input value={TimeStep} onChange={(e) => setTimeStep(e.target.value)} placeholder={'Максимальное количество шагов'}/>
                                </Row> 
                            </Col>
                        </Row>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default OrgsCreatePage;
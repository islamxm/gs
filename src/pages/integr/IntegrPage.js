import './IntegrPage.scss';
import HeaderProfile from '../../components/HeaderProfile/HeaderProfile';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Row, Col, message } from 'antd';
import IntegrPaySystem from './components/IntegrPaySystem/IntegrPaySystem';
import IntegrPhToken from './components/IntegrPhToken/IntegrPhToke';
import IntegrSms from './components/IntegrSms/IntegrSms';
import IntegrTgBot from './components/IntegrTgBot/IntegrTgBot';
import Button from '../../components/Button/Button';
import { BsSave, BsTrash } from 'react-icons/bs';
import IntegrIlko from './components/IntegrIlko/IntegrIlko';
import {motion} from 'framer-motion';
import pageEnterAnimProps from '../../funcs/pageEnterAnimProps';
import SaveIcon from '../../icons/SaveIcon/SaveIcon';
import Input from '../../components/Input/Input';
import DropCollapse from '../../components/DropCollapse/DropCollapse';
import Checkbox from '../../components/Checkbox/Checkbox';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import intService from '../../services/intService';
import Loader from '../../components/Loader/Loader';
import { catalogUpdate } from '../../store/actions';
import catService from '../../services/catService';

const paymentTypes = [
    {
        value: 'Stripe'
    },
    {
        value: 'Русский стандарт'
    }
]


const is = new intService()
const cs = new catService()

const IntegrPage = () => {
    const dispatch = useDispatch()
    const {token, settings} = useSelector(state => state)
    const [saveLoad, setSaveLoad] = useState(false)
    const [intLoad, setIntLoad] = useState(false)
    const [pageLoad, setPageLoad] = useState(true)
    const [AuthBotToken, setAuthBotToken] = useState('')
    const [AutoSaveOrganisations, setAutoSaveOrganisations] = useState('')
    const [AutoSavePlates, setAutoSavePlates] = useState('')
    const [CanCreateNewOrganisations, setCanCreateNewOrganisations] = useState('')
    const [CanCreateNewPlates, setCanCreateNewPlates] = useState('')
    const [PaymentSystemToken, setPaymentSystemToken] = useState('')
    const [PaymentSystemType, setPaymentSystemType] = useState('Stripe')
    const [SMSruToken, setSMSruToken] = useState('')
    const [iikoCloudApi, setiikoCloudApi] = useState('')


    const [iikoTargetGroup, setiikoTargetGroup] = useState('')
    const [iikoTargetID, setiikoTargetID] = useState('')

    useEffect(() => {
        if(token) {
            setPageLoad(true)
            is.getIntSettings(token).then(res => {
                if(res) {
                    console.log(res)
                    setAuthBotToken(res.AuthBotToken)
                    setAutoSaveOrganisations(res.AutoSaveOrganisations)
                    setAutoSavePlates(res.AutoSavePlates)
                    setCanCreateNewOrganisations(res.CanCreateNewOrganisations)
                    setCanCreateNewPlates(res.CanCreateNewPlates)
                    setPaymentSystemToken(res.PaymentSystemToken)
                    if(res.PaymentSystemType == 'Rus_Standart') {
                        setPaymentSystemType('Русский стандарт')
                    } else {
                        setPaymentSystemType(res.PaymentSystemType)
                    }
                    setSMSruToken(res.SMSruToken)
                    setiikoCloudApi(res.iikoCloudApi)
                    setiikoTargetGroup(res.iikoTargetGroup)
                    setiikoTargetID(res.iikoTargetID)
                }
            }).finally(_ => {
                setPageLoad(false)
            })
        }
    }, [token])


    const onSave = () => {
        setSaveLoad(true)
        const body = {
            AuthBotToken,
            AutoSaveOrganisations,
            AutoSavePlates,
            CanCreateNewOrganisations,
            CanCreateNewPlates,
            PaymentSystemToken,
            SMSruToken,
            iikoCloudApi,
            iikoTargetID,
            iikoTargetGroup,
            PaymentSystemType: PaymentSystemType == 'Русский стандарт' ? 'Rus_Standart' : PaymentSystemType
        }

        is.editIntSettings(token, body).then(res => {
            setAuthBotToken(res.AuthBotToken)
            setAutoSaveOrganisations(res.AutoSaveOrganisations)
            setAutoSavePlates(res.AutoSavePlates)
            setCanCreateNewOrganisations(res.CanCreateNewOrganisations)
            setCanCreateNewPlates(res.CanCreateNewPlates)
            setPaymentSystemToken(res.PaymentSystemToken)
            if(res.PaymentSystemType == 'Rus_Standart') {
                setPaymentSystemType('Русский стандарт')
            } else {
                setPaymentSystemType(res.PaymentSystemType)
            }
            
            setSMSruToken(res.SMSruToken)
            setiikoCloudApi(res.iikoCloudApi)
     
            setiikoTargetID(res.iikoTargetID)
            setiikoTargetGroup(res.iikoTargetGroup)
        }).finally(_ => {
            setSaveLoad(false)
            message.success('Настройки сохранены')
        })
    }

    const startInt = () => {
        setIntLoad(true)
        is.startInt(token).then(res => {
            console.log(res)
            if(res?.error == '1') {
                message.error(res?.message)
            } else {
                message.success(res?.message)
                cs.getCats(token).then(res => {
                    dispatch(catalogUpdate(res))
                })
            }
        }).finally(_ => setIntLoad(false))
    }
    

    const selectPm = (item) => {
        setPaymentSystemType(item)
    }

    if(pageLoad) {
        return (
            <div className="page">
                <div className="pageBody">
                <Loader/>
                </div>
            </div>
        )
    }

    return (
        <motion.div
            {...pageEnterAnimProps}
            className="IntegrPage page"
            >
                <div className="pageBody">
                    <div className="IntegrPage__body pageBody-content">
                        <Row gutter={[40, 0]}>
                            <Col span={12}>
                                <Row gutter={[0, 25]}>
                                    <Col span={24}>
                                        <Row gutter={[0, 10]}>
                                            <Col span={24}>
                                                <div className="def-label">Платежная система</div>
                                            </Col>
                                            <Col span={24}>
                                                <DropCollapse 
                                                    styles={{margin: 0}} 
                                                    value={PaymentSystemType} 
                                                    afterIcon
                                                    list={paymentTypes}
                                                    selectItem={selectPm}
                                                    />
                                            </Col>
                                            <Col span={24}>
                                                <Input 
                                                    maskType={String}
                                                    placeholder={'API key'}
                                                    value={PaymentSystemToken}
                                                    onChange={e => setPaymentSystemToken(e.target.value)}
                                                    />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={24}>
                                        <Row gutter={[0, 10]}>
                                            <Col span={24}>
                                                <div className="def-label">SMS.ru API key</div>
                                            </Col>
                                            <Col span={24}>
                                                <Input 
                                                    maskType={String}
                                                    placeholder={'API key'}
                                                    value={SMSruToken}
                                                    onChange={e => setSMSruToken(e.target.value)}
                                                    />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={24}>
                                        <Row gutter={[0,10]}>
                                            <Col span={24}>
                                                <div className="def-label">Токен бота телеграм для авторизации</div>
                                            </Col>
                                            <Col span={24}>
                                                <Input
                                                    maskType={String}
                                                    placeholder={'Token'}
                                                    value={AuthBotToken}
                                                    onChange={e => setAuthBotToken(e.target.value)}
                                                    />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={24}>
                                        <Button 
                                            load={saveLoad}
                                            onClick={onSave}
                                            text={'Сохранить'}
                                            before={<SaveIcon size={20} color={'#fff'}/>}
                                            styles={{width: '100%'}}
                                            />
                                    </Col>
                                </Row>
                                
                            </Col>
                            <Col span={12}>
                                <Row gutter={[0,25]}>
                                    <Col span={24}>
                                        <Row gutter={[0, 10]}>
                                            <Col span={24}>
                                                <div className="def-label">iIko Cloud API token</div>
                                            </Col>
                                            <Col span={24}>
                                                <Input 
                                                    maskType={String}
                                                    placeholder={'API key'}
                                                    value={iikoCloudApi}
                                                    onChange={e => setiikoCloudApi(e.target.value)}
                                                    />
                                            </Col>
                                        </Row>
                                    </Col>
                                    {
                                        settings?.IsHaveIIko == '1' ? (
                                            <>
                                            <Col span={24}>
                                                <Input
                                                    maskType={String}
                                                    placeholder={'ID точки продаж для выгрузки'}
                                                    value={iikoTargetID}
                                                    onChange={e => setiikoTargetID(e.target.value)}
                                                    />
                                            </Col>
                                            <Col span={24}>
                                                <Input
                                                    maskType={String}
                                                    placeholder={'ID группы для выгрузки'}
                                                    value={iikoTargetGroup}
                                                    onChange={e => setiikoTargetGroup(e.target.value)}
                                                    />
                                            </Col>
                                            </>
                                        ) : null
                                    }
                                    
                                    <Col span={24}>
                                        <Row gutter={[0, 10]}>
                                            <Col span={24}>
                                                <Checkbox 
                                                    text={'Автоматически загружать из iIko блюда'}
                                                    checked={AutoSavePlates == '1'}
                                                    onChange={e => {
                                                        if(e.target.checked) {
                                                            setAutoSavePlates('1')
                                                        } else {
                                                            setAutoSavePlates('0')
                                                        }
                                                    }}
                                                    id={'AutoSavePlates'}
                                                    />
                                            </Col>
                                            <Col span={24}>
                                                <Checkbox 
                                                    text={'Автоматически загружать из iIko организации'}
                                                    checked={AutoSaveOrganisations == '1'}
                                                    onChange={e => {
                                                        if(e.target.checked) {
                                                            setAutoSaveOrganisations('1')
                                                        } else {
                                                            setAutoSaveOrganisations('0')
                                                        }
                                                    }}
                                                    id={'AutoSaveOrganisations'}
                                                    />
                                            </Col>
                                            <Col span={24}>
                                                <Checkbox 
                                                    text={'Разрешить iIko создание новых организации'}
                                                    checked={CanCreateNewOrganisations == '1'}
                                                    onChange={e => {
                                                        if(e.target.checked) {
                                                            setCanCreateNewOrganisations('1')
                                                        } else {
                                                            setCanCreateNewOrganisations('0')
                                                        }
                                                    }}
                                                    id={'CanCreateNewOrganisations'}
                                                    />
                                            </Col>
                                            <Col span={24}>
                                                <Checkbox 
                                                    text={'Разрешить iIko создание новых блюд'}
                                                    checked={CanCreateNewPlates == '1'}
                                                    onChange={e => {
                                                        if(e.target.checked) {
                                                            setCanCreateNewPlates('1')
                                                        } else {
                                                            setCanCreateNewPlates('0')
                                                        }
                                                    }}
                                                    id={'CanCreateNewPlates'}
                                                    />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={24}>
                                        <Button 
                                            load={intLoad}
                                            onClick={startInt}
                                            text={'Синхронизировать все данные с iIko'}
                                            styles={{width: '100%'}}
                                            />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </div>

        </motion.div>
    )

}
export default IntegrPage;
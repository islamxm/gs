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
import { useSelector } from 'react-redux';
import intService from '../../services/intService';
import Loader from '../../components/Loader/Loader';

const is = new intService()


// const pmList = [
//     {
//         value: 'Stripe',
//     },
//     {
//         value: ''
//     }
// ]

const IntegrPage = () => {
    const {token} = useSelector(state => state)
    const [saveLoad, setSaveLoad] = useState(false)
    const [pageLoad, setPageLoad] = useState(true)
    const [AuthBotToken, setAuthBotToken] = useState('')
    const [AutoSaveOrganisations, setAutoSaveOrganisations] = useState('')
    const [AutoSavePlates, setAutoSavePlates] = useState('')
    const [CanCreateNewOrganisations, setCanCreateNewOrganisations] = useState('')
    const [CanCreateNewPlates, setCanCreateNewPlates] = useState('')
    const [PaymentSystemToken, setPaymentSystemToken] = useState('')
    // const [PaymentSystemType, setPaymentSystemType] = useState('')
    const [SMSruToken, setSMSruToken] = useState('')
    const [iikoCloudApi, setiikoCloudApi] = useState('')
    const [rKeeperApi, setrKeeperApi] = useState('')



    useEffect(() => {
        if(token) {
            // setPageLoad(true)
            is.getIntSettings(token).then(res => {
                if(res) {
                    setAuthBotToken(res.AuthBotToken)
                    setAutoSaveOrganisations(res.AutoSaveOrganisations)
                    setAutoSavePlates(res.AutoSavePlates)
                    setCanCreateNewOrganisations(res.CanCreateNewOrganisations)
                    setCanCreateNewPlates(res.CanCreateNewPlates)
                    setPaymentSystemToken(res.PaymentSystemToken)
                    // setPaymentSystemType(res.PaymentSystemType)
                    setSMSruToken(res.SMSruToken)
                    setiikoCloudApi(res.iikoCloudApi)
                    setrKeeperApi(res.rKeeperApi)
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
            iikoCloudApi
        }

        is.editIntSettings(token, body).then(res => {
            console.log(res)
            setAuthBotToken(res.AuthBotToken)
            setAutoSaveOrganisations(res.AutoSaveOrganisations)
            setAutoSavePlates(res.AutoSavePlates)
            setCanCreateNewOrganisations(res.CanCreateNewOrganisations)
            setCanCreateNewPlates(res.CanCreateNewPlates)
            setPaymentSystemToken(res.PaymentSystemToken)
            // setPaymentSystemType(res.PaymentSystemType)
            setSMSruToken(res.SMSruToken)
            setiikoCloudApi(res.iikoCloudApi)
            setrKeeperApi(res.rKeeperApi)
        }).finally(_ => {
            setSaveLoad(false)
            message.success('Настройки сохранены')
        })
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
                                            {/* <Col span={24}>
                                                <DropCollapse styles={{margin: 0}} value={PaymentSystemType} afterIcon/>
                                            </Col> */}
                                            <Col span={24}>
                                                <Input 
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
                                            before={<SaveIcon size={16} color={'#fff'}/>}
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
                                                    placeholder={'API key'}
                                                    value={iikoCloudApi}
                                                    onChange={e => setiikoCloudApi(e.target.value)}
                                                    />
                                            </Col>
                                        </Row>
                                    </Col>
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
                                            disabled={true}
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
    // return (
    //     <motion.div 
    //         initial={{opacity: 0}}
    //         animate={{opacity: 1}}
    //         transition={{duration: 0.5}}
    //         exit={{opacity: 0}}

    //         className="IntegrPage page">
    //         <div className="pageBody">
    //             <div className="IntegrPage__body pageBody-content">
    //                 <Row gutter={[30, 0]}>
    //                     <Col span={12}>
                            
    //                         <Row className='row-custom'>
    //                             <IntegrPaySystem/>
    //                         </Row>
    //                         <Row className="row-custom">
    //                             <IntegrPhToken/>
    //                         </Row>
    //                         <Row className="row-custom">
    //                             <IntegrSms/>
    //                         </Row>
    //                         <Row className="row-custom">
    //                             <IntegrTgBot/>
    //                         </Row>
    //                         <Row className="row-custom">
    //                             <Button 
    //                                 text={'Сохранить'}
    //                                 before={<BsTrash/>}
    //                                 styles={{width: '100%', marginTop: 30}}
    //                                 />
    //                         </Row>
    //                     </Col>
    //                     <Col span={12}>
    //                         <Row className="row-custom">
    //                             <IntegrIlko/>
    //                         </Row>
    //                     </Col>
    //                 </Row>
    //             </div>
    //         </div>
    //     </motion.div>
    // )
}
export default IntegrPage;
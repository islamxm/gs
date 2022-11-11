import './IntegrPage.scss';
import HeaderProfile from '../../components/HeaderProfile/HeaderProfile';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Row, Col } from 'antd';
import IntegrPaySystem from './components/IntegrPaySystem/IntegrPaySystem';
import IntegrPhToken from './components/IntegrPhToken/IntegrPhToke';
import IntegrSms from './components/IntegrSms/IntegrSms';
import IntegrTgBot from './components/IntegrTgBot/IntegrTgBot';
import Button from '../../components/Button/Button';
import { BsTrash } from 'react-icons/bs';
import IntegrIlko from './components/IntegrIlko/IntegrIlko';
import {motion} from 'framer-motion';

const IntegrPage = () => {
    return (
        <motion.div 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}
            exit={{opacity: 0}}

            className="IntegrPage page">
            <div className="pageBody">
                <div className="IntegrPage__body pageBody-content">
                    <Row gutter={[30, 0]}>
                        <Col span={12}>
                            
                            <Row className='row-custom'>
                                <IntegrPaySystem/>
                            </Row>
                            <Row className="row-custom">
                                <IntegrPhToken/>
                            </Row>
                            <Row className="row-custom">
                                <IntegrSms/>
                            </Row>
                            <Row className="row-custom">
                                <IntegrTgBot/>
                            </Row>
                            <Row className="row-custom">
                                <Button 
                                    text={'Сохранить'}
                                    before={<BsTrash/>}
                                    styles={{width: '100%', marginTop: 30}}
                                    />
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row className="row-custom">
                                <IntegrIlko/>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        </motion.div>
    )
}
export default IntegrPage;
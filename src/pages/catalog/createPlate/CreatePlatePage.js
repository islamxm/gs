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


const CreatePlatePage = () => {


    return (
        <div className="CreatePlatePage page">
            <HeaderProfile/>
            <main className="Main">
                <div className="pageBody">
                    <Sidebar/>
                    <div className="CreatePlatePage__body pageBody-content">
                        <Row gutter={[25, 25]} justify={'space-between'}>
                            <Col span={12}>
                                <Row className="row-custom">
                                    <div className="panel" style={{display: 'flex', overflowX:'auto'}}>
                                        {/* <PicItem/>
                                        <PicItem/>
                                        <PicItem/> */}
                                        <Pl style={{width: 200, height: 200, flex: '0 0 auto', backgroundColor: '#F8F8F8'}} text={'Добавить картинку'}/>
                                    </div>
                                </Row>
                                <Row className="row-custom">
                                    <Input placeholder={'Название блюда'}/>
                                </Row>
                                <Row className="row-custom">
                                    <Input placeholder={'ID в iIko'}/>
                                </Row>
                                <Row className="row-custom">
                                    <Checkbox id={'qqq'} text={'Тэг: Новое'}/>
                                </Row>
                                <Row className="row-custom">
                                    <Checkbox id={'www'} text={'Тэг: Хит'}/>
                                </Row>
                                <Row className="row-custom">
                                    <Text placeholder={'Состав'}/>
                                </Row>
                                <Row className="row-custom">
                                    <Input placeholder={'Цена'}/>
                                </Row>
                                <Row className="row-custom">
                                    <Input placeholder={'Цена со скидкой'}/>
                                </Row>
                                <Row className="row-custom">
                                    <Input placeholder={'Масса'}/>
                                </Row>
                                <Row className="row-custom" style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
                                    <Input style={{width: '48%', marginBottom: 20}} placeholder={'Калории'}/>
                                    <Input style={{width: '48%', marginBottom: 20}} placeholder={'Белки'}/>
                                    <Input style={{width: '48%'}} placeholder={'Жиры'}/>
                                    <Input style={{width: '48%'}} placeholder={'Углеводы'}/>
                                </Row>
                                <Row className="row-custom">
                                    <Checkbox id={'eee'} text={'Доступно к доставке'}/>
                                </Row>
                                <Row className="row-custom">
                                    <Checkbox id={'rrr'} text={'Доступно к заказу в ресторане'}/>
                                </Row>
                                <Row className="row-custom">
                                    <Input placeholder={'Количество дополнений'}/>
                                </Row>
                                <Row className="row-custom">
                                    <Checkbox id={'ttt'} text={'Скрыть в организациях'}/>
                                </Row>
                                <Row className="row-custom">
                                    <DropCollapse value={'Ресторан 1'} afterIcon/>
                                </Row>
                                <Row className="row-custom">
                                    <Pl text={'Добавить организацию'} style={{backgroundColor: '#fff'}}/>
                                </Row>
                                <Row className="row-custom">
                                    <Button text={'Сохранить'} justify={'flex-start'} before={<BsTrash/>} styles={{width: '100%'}}/>
                                </Row>
                            </Col>
                            <Col span={12}>
                                <Row className='row-custom'>
                                    <ExMass/>
                                </Row>
                                <Row className='row-custom'>
                                    <Mod/>
                                </Row>
                                <Row className='row-custom'>
                                    <DefList head={'Список аллергенов'} addText={'Добавить аллерген'}/>
                                </Row>
                                <Row className='row-custom'>
                                    <DefList head={'Список рекомендаций'} addText={'Добавить блюдо'}/>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default CreatePlatePage;
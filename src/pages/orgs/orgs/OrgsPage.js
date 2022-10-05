import './OrgsPage.scss';
import Sidebar from '../../../components/Sidebar/Sidebar';
import HeaderProfile from '../../../components/HeaderProfile/HeaderProfile';
import BrandItem from './components/BrandItem/BrandItem';
import OrgItem from './components/OrgItem/OrgItem';
import Pl from '../../../components/Pl/Pl';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import brandImg from '../../../assets/img/org-brand.png';
import orgImg from '../../../assets/img/org.png';
import useModal from '../../../hooks/useModal';
import AddBrand from '../modals/addBrand/AddBrand';


const orgMock = [
    {
        img: orgImg,
        title: 'Название ресторана'
    },
    {
        img: orgImg,
        title: 'Название ресторана'
    },
]

const brandsMock = [
    {
        img: brandImg,
    },
    {
        img: brandImg
    }
]

const OrgsPage = () => {
    const nav = useNavigate();
    const location = useLocation();
    const [list, setList] = useState([])
    const {visible, showModal, hideModal} = useModal()

  

    useEffect(() => {
        console.log(location)
        if(location.pathname == '/organizations/item') {
            setList(orgMock)
        } else {
            setList(brandsMock)
        }
        
    }, [location])


    const addBrand = () => {
        showModal();
    }

    if(location.pathname == '/organizations/item') {
        return (
            <div className="OrgsPage page">
            <HeaderProfile/>
            
            {/* <AddBrand visible={visible} close={hideModal}/> */}
            <main className="Main">
                <div className="pageBody">
                    <Sidebar/>
                    <div className="OrgsPage__body pageBody-content">
                        <div className="OrgsPage__body_list">
                            {
                                list && list.length > 0? (
                                    list.map((item, index) => (
                                        <div className="OrgsPage__body_item">
                                            <OrgItem image={item.img} name={item.title}/>
                                        </div>
                                    ))
                                ) : null
                            }
                            <div className="OrgsPage__body_item">
                                <Pl onClick={() => nav('/organizations/create')} style={{backgroundColor: '#fff'}} text={'Добавить ресторан'}/>
                            </div>
                        </div>
                        
                    </div>
                </div>
                
            </main>
        </div>
    
        )
    }

    if(location.pathname == '/organizations') {
        return (
            <div className="OrgsPage page">
            <HeaderProfile/>
            
            <AddBrand visible={visible} close={hideModal}/>
            <main className="Main">
                
                <div className="pageBody">
                    <Sidebar/>
                    <div className="OrgsPage__body pageBody-content">
                        <div className="OrgsPage__body_list">
                            {
                                list && list.length > 0? (
                                    list.map((item, index) => (
                                        <div className="OrgsPage__body_item">
                                            <BrandItem image={item.img}/>
                                        </div>
                                    ))
                                ) : null
                            }
                            <div className="OrgsPage__body_item">
                                <Pl onClick={addBrand} style={{backgroundColor: '#fff'}} text={'Добавить бренд'}/>
                            </div>
                        </div>
                        
                    </div>
                </div>
                
            </main>
        </div>
    
        )
    }
        
}

export default OrgsPage;
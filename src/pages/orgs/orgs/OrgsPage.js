import './OrgsPage.scss';
import BrandItem from './components/BrandItem/BrandItem';
import OrgItem from './components/OrgItem/OrgItem';
import Pl from '../../../components/Pl/Pl';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AddBrand from '../modals/addBrand/AddBrand';
import orgService from '../../../services/orgService';
import { useSelector } from 'react-redux';
import EditBrand from '../modals/editBrand/EditBrand';
import { useParams } from 'react-router-dom';
import Loader from '../../../components/Loader/Loader';
import { Row,Col } from 'antd';
import authService from '../../../services/dataService';
import { handleDragStart, handleDragOver, handleDrop, sortItems, handleDragEnd, handleDragLeave } from '../../../funcs/dragSort';
import {motion} from 'framer-motion';
import HeaderProfile from '../../../components/HeaderProfile/HeaderProfile';
import {
    GridContextProvider,
    GridDropZone,
    GridItem,
    swap
  } from "react-grid-drag";




const as = new authService();
const os = new orgService();

const OrgsPage = () => {
    const {brandId} = useParams()
    const {token, settings, user} = useSelector(state => state)
    const nav = useNavigate();
    const location = useLocation();
    const [list, setList] = useState([])
    const [loadList, setLoadList] = useState(false)
    const [selected, setSelected] = useState({})
    const [addBrandModal, setAddBrandModal] = useState(false)
    const [editBrandModal, setEditBrandModal] = useState(false)
    const [currentItem, setCurrentItem] = useState(null)
    const [gridHeight, setGridHeight] = useState(250)
    const [boxRow, setBoxRows]= useState(4)

    const windowResize = () => {
        if(window.innerWidth >= 1200) {
            setBoxRows(4)
        }
        if(window.innerWidth >= 768 && window.innerWidth < 1200) {
            setBoxRows(3)
        }
        if(window.innerWidth < 768) {
            setBoxRows(2)
        }
        
    }

    useEffect(() => {
        if(list?.length > 0) {
            if(list.length % boxRow == 0) {
                setGridHeight(Math.round(list.length / boxRow + list.length % boxRow) * 280 + 280)
            } else {
                setGridHeight(Math.round(list.length / boxRow + list.length % boxRow) * 280)
            }
            
        } else {
            setGridHeight(280)
        }
    }, [list, boxRow])
    useEffect(() => {
        windowResize()
        window.addEventListener('resize', windowResize)
        return () => window.removeEventListener('resize', windowResize)
    }, []) 

    const orderChange = (sourceId, sourceIndex, targetIndex, targetId) => {
        if(sourceIndex == list.length) {
            return;
        } else {
            const nextState = swap(list, sourceIndex, targetIndex);
            setList(nextState)
        }
    }
    

    useEffect(() => {
        
        if(token && brandId && settings?.IsHaveBrands == '1') {
            setLoadList(true)
            os.getOrgs(token, {BrandID: brandId})
                .then(res => {
                    setList(res)
                    
                })
                .finally(_ => setLoadList(false))
        }
        if(token && !brandId && settings?.IsHaveBrands == '1') {
            setLoadList(true)
            os.getBrands(token)
                .then(res => {
                    setList(res)
                    
                })
                .finally(_ => setLoadList(false))
        }
        if(token && !brandId && settings.IsHaveBrands == '0') {
            setLoadList(true)
            os.getOrgs(token)
            .then(res => {
                setList(res)
           
            })
            .finally(_ => setLoadList(false))

        }
    }, [location, token, brandId, settings])

    

    const openAddBrand = () => setAddBrandModal(true)
    const closeAddBrand = () => setAddBrandModal(false)
    const openEditBrand = (ID, ItemOrder, LogoUrl, MarkerID) => {
        const data = {
            ID,
            ItemOrder,
            LogoUrl,
            MarkerID
        }
        setSelected(data)
        setEditBrandModal(true)
    }
    const closeEditBrand = () => setEditBrandModal(false)


    useEffect(() => {
        if(brandId && token && list && list.length > 0) {
            as.orderSort(token, 'organisations', list.map(item => item.ID).join(',')).then(res => {
                
            })
        }
        if(!brandId && token && list && list.length > 0) {
            as.orderSort(token, 'brands', list.map(item => item.ID).join(',')).then(res => {
               
            })
        }
    }, [list, brandId, token])


    const createOrg = () => {
        if(brandId) {
            const data = new FormData()
            data.append('OrganisationBrand', brandId)
            os.addOrg(token, data).then(res => {
                nav(`/organizations/${brandId}/${res}/now?p=Добавить организацию`)
            })
        } else {
            const data = new FormData()
            data.append('OrganisationBrand', 0)
            os.addOrg(token).then(res => {
               
                nav(`/organizations/nobrand/${res}/now?p=Добавить организацию`)
                
            })
        }
    }


    // location.pathname != '/organizations' && 
    if(location.pathname.includes('/organizations/') && settings?.IsHaveBrands == '1') {
        return (
            <motion.div 
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.5}}
                exit={{opacity: 0}}

                className="OrgsPage page">
                    
            {/* <AddBrand visible={visible} close={hideModal}/> */}
            {/* Header */}
            {/* <HeaderProfile/> */}
            <main className="Main">
                <div className="pageBody">
                
                    {/* <div className="spc"></div> */}
                    <div className="OrgsPage__body pageBody-content">
                        
                        {
                            loadList ? (
                                <Loader/>
                            ) : (
                                <motion.div
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{duration: 0.5}}
                                    exit={{opacity: 0}}
                                    >
                                    <GridContextProvider
                                        onChange={orderChange}>
                                        <GridDropZone
                                            boxesPerRow={boxRow}
                                            style={{height: gridHeight}}
                                            rowHeight={280}
                                            >
                                            {
                                                list?.length > 0 ? (
                                                    list.map((item, index) => (
                                                        <GridItem
                                                            key={item.ID}
                                                            className={"ddd__item"}
                                                            >
                                                            <OrgItem {...item} index={index}/>
                                                        </GridItem>
                                                    ))
                                                ) : null
                                            }
                                            <GridItem
                                                className='ddd__item ddd__item-ds'
                                                >
                                                <Pl onClick={createOrg} 
                                                style={{backgroundColor: '#fff', minHeight: 223, width: '100%'}} 
                                                text={'Добавить ресторан'}/>
                                            </GridItem>
                                        </GridDropZone>
                                    </GridContextProvider>
                                   
                                </motion.div>
                                
                                
                            )
                        }
                        
                        
                    </div>
                </div>
            </main>
        </motion.div>
    
        )
    }

    if(settings?.IsHaveBrands == '0' && (location.pathname == '/' || location.pathname.includes('/organizations'))) {
        return (
            <motion.div 
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.5}}
                exit={{opacity: 0}}

                className="OrgsPage page">
                
                {/* Header */}
            {/* <HeaderProfile/> */}
            <main className="Main">
                <div className="pageBody">
                    
                    <div className="OrgsPage__body pageBody-content">
                        
                        {
                            loadList ? (
                                <Loader/>
                            ) : (
                                <motion.div
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{duration: 0.5}}
                                    exit={{opacity: 0}}
                                    >
                                    <GridContextProvider
                                        onChange={orderChange}
                                        >
                                        <GridDropZone
                                            boxesPerRow={boxRow}
                                            style={{height: gridHeight}}
                                            rowHeight={280}
                                            >
                                            {
                                                list?.length > 0 ? (
                                                    list.map((item, index) => (
                                                        <GridItem
                                                            className='ddd__item'
                                                            key={item.ID}
                                                            >
                                                            <OrgItem {...item} index={index}/>
                                                        </GridItem>
                                                    ))
                                                ) : null
                                            }
                                            <GridItem
                                                className='ddd__item ddd__item-ds'
                                                >
                                                <Pl 
                                                onClick={createOrg}
                                                style={{backgroundColor: '#fff', minHeight: 223, width: '100%'}} 
                                                text={'Добавить ресторан'}
                                                />
                                            </GridItem>
                                        </GridDropZone>
                                    </GridContextProvider> 
                                  
                                </motion.div>
                                
                                
                            )
                        }
                        
                        
                    </div>
                </div>
            </main>
        </motion.div>
    
        )
    }

    if(location.pathname == '/organizations' || (location.pathname == '/' && settings?.IsHaveBrands == '1')) {
        return (
            <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}
            exit={{opacity: 0}}

            className="OrgsPage page">
                
            <EditBrand updateList={setList} visible={editBrandModal} close={closeEditBrand} selected={selected}/>
            <AddBrand updateList={setList} visible={addBrandModal} close={closeAddBrand}/>


            {/* Header */}
            {/* <HeaderProfile/> */}
            <main className="Main">
                <div className="pageBody">
                    {/* <div className="spc"></div> */}
                    <div className="OrgsPage__body pageBody-content">
                        
                        {
                            loadList ? (
                                <Loader/>
                            ) : (
                                <motion.div
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{duration: 0.5}}
                                    exit={{opacity: 0}}
                                    >
                                    <GridContextProvider
                                        onChange={orderChange}
                                        >
                                        <GridDropZone
                                            boxesPerRow={boxRow}
                                            style={{height: gridHeight}}
                                            rowHeight={280}
                                            >
                                            {
                                                list?.length > 0 ? (
                                                    list.map((item, index) => (
                                                        <GridItem
                                                            className='ddd__item'
                                                            key={item.ID}
                                                            >
                                                            <BrandItem 
                                                            Disabled={item.Disabled}
                                                            ID={item.ID}
                                                            ItemOrder={item.ItemOrder}
                                                            LogoUrl={item.LogoUrl}
                                                            MarkerID={item.MarkerID}
                                                            editModal={openEditBrand}
                                                            />
                                                        </GridItem>
                                                    ))
                                                ) : null
                                            }
                                            <GridItem
                                                className='ddd__item ddd__item-ds'
                                                >
                                                <Pl onClick={openAddBrand} style={{backgroundColor: '#fff', height: 223}} text={'Добавить бренд'}/>
                                            </GridItem>
                                        </GridDropZone>   
                                    </GridContextProvider>
                                 
                                </motion.div>
                                
                                
                            )
                        }
                        
                        
                    </div>
                </div>
                
            </main>
        </motion.div>
    
        )
    }
        
}

export default OrgsPage;
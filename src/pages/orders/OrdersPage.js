import './OrdersPage.scss';
import HeaderProfile from '../../components/HeaderProfile/HeaderProfile';
import Sidebar from '../../components/Sidebar/Sidebar';


const OrdersPage = () => {
    return (
        <div className="OrdersPage page">
            <HeaderProfile/>
            <main className="Main">
                <div className="pageBody">
                    <Sidebar/>
                    <div className="OrdersPage__body pageBody-content">
                        
                    </div>
                </div>
            </main>
        </div>
    )
}

export default OrdersPage;
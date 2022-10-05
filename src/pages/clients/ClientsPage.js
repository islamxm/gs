import './ClientsPage.scss';
import HeaderProfile from '../../components/HeaderProfile/HeaderProfile';
import Sidebar from '../../components/Sidebar/Sidebar';

const ClientsPage = () => {
    return (
        <div className="ClientsPage page">
            <HeaderProfile/>
            <main className="Main">
                <div className="pageBody">
                    <Sidebar/>
                    <div className="ClientsPage__body pageBody-content"></div>
                </div>
            </main>
        </div>
    )
}

export default ClientsPage;
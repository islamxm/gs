import HeaderProfile from "../../components/HeaderProfile/HeaderProfile";
import Sidebar from "../../components/Sidebar/Sidebar";




const StatPage = () => {
    return (
        <div className="StatPage">
            <HeaderProfile/>
            <main className="Main">
                <div className="pageBody">
                    <Sidebar/>
                    <div className="StatPage__body pageBody-content">
                        
                    </div>
                </div>
            </main>
        </div>
    )
}

export default StatPage;
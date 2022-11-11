import HeaderProfile from "../../components/HeaderProfile/HeaderProfile";
import {motion} from 'framer-motion';



const StatPage = () => {
    return (
        <motion.div 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}
            exit={{opacity: 0}}

            className="StatPage">
            <main className="Main">
                <div className="pageBody">
                    
                    <div className="StatPage__body pageBody-content">
                        
                    </div>
                </div>
            </main>
        </motion.div>
    )
}

export default StatPage;
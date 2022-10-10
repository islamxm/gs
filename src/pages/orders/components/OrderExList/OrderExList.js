import './OrderExList.scss';
import Input from '../../../../components/Input/Input';

const OrderExList = ({name, list}) => {
    return (
        <div className="OrderExList">
            <div className="OrderExList__name">{name}</div>
            <div className="OrderExList__list">
                {
                    list && list.length > 0 ? (
                        list.map((item, index) => (
                            <div className="OrderExList__list_item">
                                <Input shadow readOnly value={item.value}/>
                            </div>
                        ))
                    ) : null
                }
                
            </div>
        </div>
    )
}

export default OrderExList;
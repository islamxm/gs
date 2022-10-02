import './TimeSelect.scss';

const TimeSelect = ({list}) => {
    return (
        <div className="TimeSelect">
            {
                list && list.length > 0 ? (
                    list.map((item, index) => (
                        <div className="TimeSelect__item">
                            <div className="TimeSelect__item_name">{item.name}</div>
                            <div className="TimeSelect__item_value">{item.value}</div>
                        </div>
                    ))
                ) : null
            }
        </div>
    )
}

export default TimeSelect;
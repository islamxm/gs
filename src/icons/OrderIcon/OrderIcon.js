const OrderIcon = ({color, size}) => {
    return (
        <div className="icon-gs" style={{height: size, width: size}}>
            <svg width={size} height={size} viewBox="0 0 169 169" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M149.509 41.0183V62.688H19.3481V41.0183C19.3481 28.9872 29.0573 19.3481 41.0181 19.3481H127.769C139.8 19.3481 149.509 29.0575 149.509 41.0183Z" stroke={color} stroke-width="10.5536" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M149.509 62.7578V127.838C149.509 139.869 139.8 149.508 127.839 149.508H41.0886C29.0575 149.508 19.4187 139.799 19.4187 127.838V62.7578H149.509Z" stroke={color}stroke-width="10.5536" stroke-linecap="round" stroke-linejoin="round"/>
            {/* <path d="M41.0185 48.2636C45.0208 48.2636 48.2653 45.0193 48.2653 41.017C48.2653 37.0147 45.0208 33.77 41.0185 33.77C37.0162 33.77 33.7717 37.0147 33.7717 41.017C33.7717 45.0193 37.0162 48.2636 41.0185 48.2636Z" fill="black"/> */}
            <path d="M62.9002 90.3374L48.4771 104.761" stroke={color} stroke-width="10.5536" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M62.9002 119.253L48.4771 104.759" stroke={color} stroke-width="10.5536" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M106.381 90.3374L120.804 104.761" stroke={color} stroke-width="10.5536" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M106.381 119.253L120.804 104.759" stroke={color} stroke-width="10.5536" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M89.2132 82.6694L79.6448 126.08" stroke={color} stroke-width="10.5536" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

        </div>
    )
}

export default OrderIcon;
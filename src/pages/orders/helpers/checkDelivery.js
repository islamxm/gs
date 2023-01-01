const checkDelivery = (type) => {
    switch (type) {
        case 1:
            return 'Самовывоз'
        case 2:
            return 'Доставка'
    }
}

export default checkDelivery;
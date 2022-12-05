const paymethods = [
    {
        value: 'Оплата наличными',
        PaymentType: 0,
        IsNeedToChangeCash: '0',
        checkbox: true,
        // delete: true
    },
    {
        value: 'Оплата по карте в приложении',
        PaymentType: 2,
        IsNeedToChangeCash: '0',
        // delete: true
    },
    {
        value: 'Оплата по карте при получении',
        PaymentType: 1,
        IsNeedToChangeCash: '0',
        // delete: true
    }
]

export default paymethods;
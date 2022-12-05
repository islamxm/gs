const weekItemName = (index) => {
    switch(index) {
        case 0:
            return 'ПН'
        case 1:
            return 'ВТ'
        case 2:
            return 'СР'
        case 3:
            return 'ЧТ'
        case 4:
            return 'ПТ'
        case 5:
            return 'СБ'
        case 6:
            return 'ВС'
        default:
            return ''
    }
}


const timeFormat = (time) => {
    const timeNum = time.toString()

    const hour = Number(timeNum) < 10 ? '0' + Number.parseInt(timeNum) : Number.parseInt(timeNum);
    const minutes = Number.isInteger(Number(timeNum)) ? '00' : (timeNum.split('.')[1] + '0').slice(0,2)

    return `${hour}:${minutes}`
}

const timeTransform = (time, index) => {
    if(time !== 'Closed') {
        return {
            name: weekItemName(index),
            values: {
                start: timeFormat(Number(time?.split('-')[0]) / 60),
                end: timeFormat(Math.floor(Number(time?.split('-')[1]) / 60) + ((Number(time?.split('-')[1]) % 60) / 100))
            },
            rest: ''
        }
    } else {
        return {
            name: weekItemName(index),
            values: {
                start: 0,
                end: 0
            },
            rest: 'Выходной'
        }
    }
    
}

export default timeTransform;
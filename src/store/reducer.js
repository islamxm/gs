const LOCAL_STORAGE = window.localStorage;

const gState = {
    token: LOCAL_STORAGE.getItem('gs-token') ? LOCAL_STORAGE.getItem('gs-token') : ''
}


const reducer = (state = gState, action) => {
    switch(action.type) {
        case 'TOKEN':
            return {
                ...state,
                token: action.token
            }
        default: 
            return state
    }
}

export default reducer;



const initialState = {

    favourites: [],

    movies: [],

    loading: true,

    error: '',

    message: ''
};












function userReducer(state = initialState, action) {

    switch (action.type) {

        case 'ADD_TO_FAVOURITES':
            return Object.assign({}, state, {
                favourites: action.payload,
                loading: false,
                error: ''
            });


        case 'REMOVE_FROM_FAVOURITES': {
            return Object.assign({}, state, {
                favourites: action.payload,
                loading: false,
                error: ''
            });
        }




        case 'SET_MOVIES': {
            console.log(action);
            return Object.assign({}, state, {
                movies: action.payload,
                loading: false,
                error: ''
            });
        }




        

        default:
            return state;
    }

}


export default userReducer;
const initialState = {
    userInfo:{}
};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                userInfo:action.data
            }
            break;
        default:
            return state;
    }
};

export default UserReducer;
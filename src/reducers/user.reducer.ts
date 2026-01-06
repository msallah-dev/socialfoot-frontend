import {
    FOLLOW_USER,
    GET_USER,
    NOFOLLOWEDS_USERS,
    UNFOLLOW_USER,
    UPDATE_USER,
    UPLOAD_PICTURE
} from "../actions/user.actions";
import type { UserState } from "../main";

const initialState: UserState = {
    email: '',
    name: '',
    created_at: '',
    update: {
        success: false,
        message: ''
    },
    blob: '',
    following: [],
    followers: [],
    noFollowing: []
};

export default function userReducer(state = initialState, action: any) {
    switch (action.type) {
        case GET_USER:
            return action.payload;

        case UPLOAD_PICTURE:
            return { ...state, blob: action.payload };

        case UPDATE_USER:
            return {
                ...state,
                email: action.payload.email,
                update: action.payload
            };

        case FOLLOW_USER:
            return {
                ...state,
                following: [...state.following, action.payload]
            };

        case UNFOLLOW_USER:
            return {
                ...state,
                following: state.following.filter((user) => user.followedId !== action.payload)
            };

        case NOFOLLOWEDS_USERS:
            return {
                ...state,
                noFollowing: action.payload
            };

        default:
            return state;
    }
}
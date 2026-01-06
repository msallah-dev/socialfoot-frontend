import { GET_POST_ERRORS } from "../actions/post.actions";
import { GET_USER_ERRORS_IMAGE, GET_USER_ERRORS_PASSWORD } from "../actions/user.actions";

const initialState = {
  userError: { image: '', password: '' },
  postError: { message: '', success: false, postId: null }
};

export default function errorReducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_POST_ERRORS:
      return {
        postError: {
          message: action.payload.message,
          success: action.payload.success,
          postId: action.payload.postId
        },
        userError: []
      };

    case GET_USER_ERRORS_IMAGE:
      return {
        userError: { image: action.payload, password: '' },
        postError: []
      }

    case GET_USER_ERRORS_PASSWORD:
      return {
        userError: { image: '', password: action.payload },
        postError: []
      }

    default:
      return state;
  }
}
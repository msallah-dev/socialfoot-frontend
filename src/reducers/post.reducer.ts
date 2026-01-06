import {
    ADD_COMMENT,
    DELETE_COMMENT,
    DELETE_POST,
    EDIT_COMMENT,
    GET_POSTS,
    LIKE_POST,
    UNLIKE_POST,
    UPDATE_POST
} from "../actions/post.actions";
import type { PostState } from "../main";

const initialState: PostState = {
    update: {},
    posts: [{
        content: '',
        video: '',
        user: {},
        comments: [{}],
        likes: []
    }]
};

export default function postReducer(state = initialState, action: any) {
    switch (action.type) {
        case GET_POSTS:
            return { ...state, posts: action.payload };

        case UPDATE_POST:
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if (post.id_post === action.payload.postId) {
                        return {
                            ...post,
                            content: action.payload.content,
                            video: action.payload.video
                        }
                    } else return post;
                })
            };

        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter((post: any) => post.id_post !== action.payload)
            };

        case LIKE_POST:
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if (post.id_post === action.payload.postId) {
                        return {
                            ...post,
                            likes: [...post.likes, action.payload.like]
                        };

                    } else return post;
                })
            };

        case UNLIKE_POST:
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if (post.id_post === action.payload.postId) {
                        return {
                            ...post,
                            likes: post.likes.filter((like: any) => Number(like.userId) !== action.payload.userId)
                        };

                    } else return post;
                })
            };

        case ADD_COMMENT:
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if (post.id_post === action.payload.post.id_post) {
                        return {
                            ...post,
                            comments: [...post.comments, action.payload]
                        }
                    } else return post;
                })
            };

        case EDIT_COMMENT:
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if (post.id_post === action.payload.postId) {
                        return {
                            ...post,
                            comments: post.comments.map((comment) => {
                                if (comment.id_commentaire === action.payload.commentId) {
                                    return {
                                        ...comment,
                                        content: action.payload.content
                                    }
                                } else return comment;
                            })
                        }
                    } else return post;
                })
            };

        case DELETE_COMMENT:
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if (post.id_post === action.payload.postId) {
                        return {
                            ...post,
                            comments: post.comments.filter((comment: any) => {
                                comment.id_commentaire !== action.payload.commentId
                            })
                        }
                    } else return post;
                })
            };

        default:
            return state;
    }
}
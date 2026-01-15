import axios from "axios";
import type { AppDispatch } from "../main"
import { getMessageError } from "../components/Utils";

export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const GET_POSTS = "GET_POSTS";
export const GET_POST_ERRORS = "GET_POST_ERRORS";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const SHARE_POST = "SHARE_POST";
export const UNSHARE_POST = "UNSHARE_POST";
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

export const getPosts = () => {
    return async (dispatch: AppDispatch) => {
        await axios({
            method: "get",
            url: `${import.meta.env.VITE_APP_API_URL}posts`,
            withCredentials: true,
        })
            .then((res) => {
                if (res.data.success) {
                    dispatch({ type: GET_POSTS, payload: res.data.data });
                } else {
                    dispatch({ type: GET_POSTS, payload: [] });
                }
            })
            .catch((err) => console.log(err));

    };
}

export const addPost = (content: string, file: File | null, video: string) => {
    return async (dispatch: AppDispatch): Promise<void> => {
        await axios({
            method: "post",
            url: `${import.meta.env.VITE_APP_API_URL}posts`,
            data: { content: content, video: video },
            withCredentials: true,
        })
            .then(async (res) => {
                const postId = res.data.data.id_post;
                if (file) {
                    const data = new FormData();
                    data.append('postId', postId);
                    data.append('file', file);
                    await axios({
                        method: "post",
                        url: `${import.meta.env.VITE_APP_API_URL}upload/post`,
                        data,
                        withCredentials: true,
                    })
                        .then((res) => {
                            if (res.data.error) {
                                dispatch({
                                    type: GET_POST_ERRORS,
                                    payload: { message: res.data.error, success: false, postId: postId }
                                });

                                return false;
                            } else if (res.data.success) {
                                dispatch({
                                    type: GET_POST_ERRORS,
                                    payload: { message: "", success: true, postId: postId }
                                });

                                return true;
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                            return false;
                        })
                } else {
                    dispatch({
                        type: GET_POST_ERRORS,
                        payload: { message: "", success: true, postId: postId }
                    });

                    return true;
                }
            })
            .catch((err) => {
                getMessageError(err.response.data.message);
                console.log(err);
                return false;
            });
    };
}

export const updatePost = (postId: number, text: string, video?: string | null) => {
    return async (dispatch: AppDispatch) => {
        await axios({
            method: "patch",
            url: `${import.meta.env.VITE_APP_API_URL}posts/${postId}`,
            data: { content: text, video: video },
            withCredentials: true,
        })
            .then((res) => {
                if (res.data.success) {
                    dispatch({
                        type: UPDATE_POST,
                        payload: { content: text, video: video, postId }
                    });
                    dispatch({
                        type: GET_POST_ERRORS,
                        payload: { success: true }
                    });
                } else {
                    dispatch({
                        type: GET_POST_ERRORS,
                        payload: { success: false }
                    });
                }

            })
            .catch((err) => {
                getMessageError(err.response.data.message);
                dispatch({
                    type: GET_POST_ERRORS,
                    payload: { success: false }
                });
                console.log(err)
            })
    }
}

export const deletePost = (postId: number) => {
    return async (dispatch: AppDispatch) => {
        await axios({
            method: "delete",
            url: `${import.meta.env.VITE_APP_API_URL}posts/${postId}`,
            withCredentials: true,
        })
            .then(async (res) => {
                if (res.data.success) {
                    // Supprimer la photo si y en a 
                    await axios({
                        method: "delete",
                        url: `${import.meta.env.VITE_APP_API_URL}posts/picture/post/${postId}.jpg`,
                        withCredentials: true,
                    })
                        .then((res) => console.log(res.data))
                        .catch((err) => console.log(err))

                    dispatch({ type: DELETE_POST, payload: postId });
                }
            })
            .catch((err) => console.log(err))
    };
}

export const likePost = (postId: number) => {
    return async (dispatch: AppDispatch) => {
        await axios({
            method: "post",
            url: `${import.meta.env.VITE_APP_API_URL}likes`,
            data: { postId: postId },
            withCredentials: true,
        })
            .then((res) => {
                if (res.data.success) {
                    dispatch({
                        type: LIKE_POST,
                        payload: { like: res.data.data, postId }
                    });
                }
            })
            .catch((err) => console.log(err))
    }
}

export const unlikePost = (postId: number, userId: number) => {
    return async (dispatch: AppDispatch) => {
        await axios({
            method: "delete",
            url: `${import.meta.env.VITE_APP_API_URL}likes/${postId}`,
            withCredentials: true,
        })
            .then((res) => {
                if (res.data.success)
                    dispatch({ type: UNLIKE_POST, payload: { postId, userId } });
            })
            .catch((err) => console.log(err))
    }
}

export const sharePost = (postId: number) => {
    return async (dispatch: AppDispatch) => {
        await axios({
            method: "post",
            url: `${import.meta.env.VITE_APP_API_URL}shares`,
            data: { postId: postId },
            withCredentials: true,
        })
            .then((res) => {
                if (res.data.success) {
                    dispatch({
                        type: SHARE_POST,
                        payload: { share: res.data.data, postId }
                    });
                }
            })
            .catch((err) => console.log(err))
    }
}

export const unsharePost = (postId: number, userId: number) => {
    return async (dispatch: AppDispatch) => {
        await axios({
            method: "delete",
            url: `${import.meta.env.VITE_APP_API_URL}shares/${postId}`,
            withCredentials: true,
        })
            .then((res) => {
                if (res.data.success)
                    dispatch({ type: UNSHARE_POST, payload: { postId, userId } });
            })
            .catch((err) => console.log(err))
    }
}

export const addComment = (postId: number, content: string) => {
    return async (dispatch: AppDispatch) => {
        await axios({
            method: "post",
            url: `${import.meta.env.VITE_APP_API_URL}comments/`,
            data: { content: content, postId: postId },
            withCredentials: true,
        })
            .then((res) => {
                if (res.data.success)
                    dispatch({ type: ADD_COMMENT, payload: res.data.data });
            })
            .catch((err) => console.log(err))
    }
}

export const editComment = (commentId: number, postId: number, content: string) => {
    return async (dispatch: AppDispatch) => {
        await axios({
            method: "patch",
            url: `${import.meta.env.VITE_APP_API_URL}comments/${commentId}`,
            data: { content: content },
            withCredentials: true,
        })
            .then((res) => {
                if (res.data.success)
                    dispatch({
                        type: EDIT_COMMENT,
                        payload: { content: res.data.data.content, postId, commentId }
                    });
            })
            .catch((err) => console.log(err))
    }
}

export const deleteComment = (commentId: number, postId: number) => {
    return async (dispatch: AppDispatch) => {
        await axios({
            method: "delete",
            url: `${import.meta.env.VITE_APP_API_URL}comments/${commentId}`,
            withCredentials: true,
        })
            .then((res) => {
                if (res.data.success)
                    dispatch({ type: DELETE_COMMENT, payload: { commentId, postId } });
            })
            .catch((err) => console.log(err))
    }
}
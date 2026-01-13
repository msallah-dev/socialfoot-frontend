import axios from "axios";
import type { AppDispatch } from "../main";
import { getMessageError } from "../components/Utils";

export const GET_USER = "GET_USER";
export const GET_USER_ERRORS_IMAGE = "GET_USER_ERRORS_IMAGE";
export const GET_USER_ERRORS_PASSWORD = "GET_USER_ERRORS_PASSWORD";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_USER = "UPDATE_USER";
export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";
export const NOFOLLOWEDS_USERS = "NOFOLLOWEDS_USERS";

export const getUser = () => {
    return async (dispatch: AppDispatch) => {
        await axios({
            method: "get",
            url: `${import.meta.env.VITE_APP_API_URL}users/profile`,
            withCredentials: true,
        })
            .then((res) => {
                if (res.data.success)
                    dispatch({ type: GET_USER, payload: res.data.data });
            })
            .catch((err) => console.log(err));
    };
};

export const uploadPicture = (data: FormData, userId: string) => {
    return async (dispatch: AppDispatch) => {
        await axios({
            method: "post",
            url: `${import.meta.env.VITE_APP_API_URL}upload/profil`,
            data,
            withCredentials: true,
        })
            .then(async (res) => {
                if (res.data.error) {
                    dispatch({ type: GET_USER_ERRORS_IMAGE, payload: res.data.error });
                } else {
                    dispatch({ type: GET_USER_ERRORS_IMAGE, payload: "" });

                    await axios({
                        method: "get",
                        url: `${import.meta.env.VITE_APP_API_URL}users/picture/profil/${userId}`,
                        responseType: "blob",
                        withCredentials: true,
                    })
                        .then((res) => res.data)
                        .then((blob) => {
                            dispatch({ type: UPLOAD_PICTURE, payload: URL.createObjectURL(blob) })
                        })
                        .catch((err) => console.log(err))
                }
            })
            .catch((err) => console.log(err));
    };
};

export const updateUser = (userId: number, email: string, newEmail: string, password: string, newPassword: string) => {
    return async (dispatch: AppDispatch) => {
        await axios({
            method: "post",
            url: `${import.meta.env.VITE_APP_API_URL}auth/check-password`,
            data: { email, password },
            withCredentials: true,
        })
            .then(async (res) => {
                if (res.data.success) {
                    await axios({
                        method: "patch",
                        url: `${import.meta.env.VITE_APP_API_URL}users/${userId}`,
                        data: { email: newEmail, password: newPassword },
                        withCredentials: true,
                    })
                        .then((res) => {
                            dispatch({ type: GET_USER_ERRORS_PASSWORD, payload: "" });

                            if (res.data.success) {
                                dispatch({
                                    type: UPDATE_USER,
                                    payload: {
                                        success: true,
                                        email: res.data.data.email,
                                        message: 'Modification effectuée avec succès'
                                    }
                                });
                            } else {
                                getMessageError(res.data.error);
                            }
                        })
                        .catch((err) => {
                            getMessageError(err.response.data.message);
                            console.log(err);
                        })

                } else {
                    dispatch({ type: GET_USER_ERRORS_PASSWORD, payload: res.data.error });
                }
            })
            .catch((err) => console.log(err))
    }

}

export const followUser = (idToFollow: number) => {
    return async (dispatch: AppDispatch) => {
        await axios({
            method: "post",
            url: `${import.meta.env.VITE_APP_API_URL}follows`,
            data: { followId: idToFollow },
            withCredentials: true,
        })
            .then((res) => {
                if (res.data.success)
                    dispatch({ type: FOLLOW_USER, payload: res.data.data });
            })
            .catch((err) => console.log(err))
    }
}

export const unfollowUser = (idToFollow: number) => {
    return async (dispatch: AppDispatch) => {
        await axios({
            method: "delete",
            url: `${import.meta.env.VITE_APP_API_URL}follows/${idToFollow}`,
            withCredentials: true,
        })
            .then((res) => {
                if (res.data.success)
                    dispatch({ type: UNFOLLOW_USER, payload: idToFollow });
            })
            .catch((err) => console.log(err))
    }
}

export const noFolloweds = () => {
    return async (dispatch: AppDispatch) => {
        await axios({
            method: "get",
            url: `${import.meta.env.VITE_APP_API_URL}follows/nofolloweds`,
            withCredentials: true,
        })
            .then((res) => {
                if (res.data.success)
                    dispatch({ type: NOFOLLOWEDS_USERS, payload: res.data.data });
            })
            .catch((err) => console.log(err))
    }
}
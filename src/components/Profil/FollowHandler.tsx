import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, Follow, RootState } from "../../main";
import { followUser, unfollowUser } from "../../actions/user.actions";

type FollowHandlerProps = {
    idToFollow: number;
    type: 'suggestion' | 'card';
};

const FollowHandler = ({ idToFollow, type }: FollowHandlerProps) => {
    const userData = useSelector((state: RootState) => state.userReducer);
    const [isFollowed, setIsFollowed] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const handleFollow = () => {
        dispatch(followUser(idToFollow));
        setIsFollowed(true);
    };

    const handleUnfollow = () => {
        dispatch(unfollowUser(idToFollow));
        setIsFollowed(false);
    };

    useEffect(() => {
        if (userData) {
            const isFollowed = userData.following.some(
                (user: Follow) => user.followed.id_user === idToFollow
            );

            setIsFollowed(isFollowed);
        }

    }, [userData, idToFollow]);

    return (
        <>
            {isFollowed && (
                <span onClick={handleUnfollow}>
                    {type === "suggestion" && <button className="unfollow-btn">Abonné</button>}
                    {type === "card" && <img src="./images/icons/checked.svg" alt="checked" />}
                </span>
            )}
            {!isFollowed && (
                <span onClick={handleFollow}>
                    {type === "suggestion" && <button className="follow-btn">Suivre</button>}
                    {type === "card" && <img src="./images/icons/check.svg" alt="check" />}
                </span>
            )}
        </>
    );
};

export default FollowHandler;
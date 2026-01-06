import { useEffect, useState } from "react";
import FollowHandler from "./FollowHandler";
import type { UserState } from "../../main";
import UserImage from "./UserImage";

const FriendsHint = ({ userData }: { userData: UserState }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [playOnce, setPlayOnce] = useState<boolean>(false);

    useEffect(() => {
        const notFriendList = () => {
            if (userData.noFollowing) {
                userData.noFollowing.sort(() => 0.5 - Math.random());

                if (window.innerHeight > 780) {
                    userData.noFollowing.length = 5;
                } else if (window.innerHeight > 720) {
                    userData.noFollowing.length = 4;
                } else if (window.innerHeight > 615) {
                    userData.noFollowing.length = 3;
                } else if (window.innerHeight > 540) {
                    userData.noFollowing.length = 1;
                }

                setIsLoading(false);
                setPlayOnce(true);
            }
        };

        if (!playOnce) notFriendList();

    }, [userData.noFollowing, playOnce]);

    return (
        <div className="get-friends-container">
            <h4>Suggestions</h4>
            {isLoading ? (
                <div className="icon">
                    <i className="fas fa-spinner fa-pulse"></i>
                </div>
            ) : (
                <ul>
                    {userData.noFollowing && userData.noFollowing.length > 0 &&
                        userData.noFollowing.map((user) => {
                            return (
                                <li className="user-hint" key={user.id_user}>
                                    <UserImage userId={user.id_user} blob="" />
                                    <p>{user.name}</p>
                                    <FollowHandler
                                        idToFollow={user.id_user}
                                        type={"suggestion"}
                                    />
                                </li>
                            );
                        })}
                </ul>
            )}
        </div>
    );
};

export default FriendsHint;
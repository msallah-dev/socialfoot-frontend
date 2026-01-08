import { useEffect, useState } from "react";
import FollowHandler from "./FollowHandler";
import type { User, UserState } from "../../main";
import UserImage from "./UserImage";

const FriendsHint = ({ userData }: { userData: UserState }) => {
    const [noFollowings, setNoFollowings] = useState<User[]>(userData.noFollowing);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [playOnce, setPlayOnce] = useState<boolean>(false);

    useEffect(() => {
        const notFriendList = () => {
            if (noFollowings) {
                noFollowings.sort(() => 0.5 - Math.random());

                if (window.innerHeight > 780) {
                    setNoFollowings(noFollowings.slice(0, 5));
                } else if (window.innerHeight > 720) {
                    setNoFollowings(noFollowings.slice(0, 4));
                } else if (window.innerHeight > 615) {
                    setNoFollowings(noFollowings.slice(0, 3));
                } else if (window.innerHeight > 540) {
                    setNoFollowings(noFollowings.slice(0, 1));
                }

                setIsLoading(false);
                setPlayOnce(true);
            }
        };

        if (!playOnce) notFriendList();

    }, [noFollowings, playOnce]);

    return (
        <div className="get-friends-container">
            <h4>Suggestions</h4>
            {isLoading ? (
                <div className="icon">
                    <i className="fas fa-spinner fa-pulse"></i>
                </div>
            ) : (
                <ul>
                    {noFollowings.map((user) => {
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
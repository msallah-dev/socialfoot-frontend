import { useContext, useMemo } from "react";
import { useSelector } from "react-redux";
import { StatusContext } from "../components/AppContext";
import LeftNav from '../components/LeftNav';
import Card from "../components/Post/Card";
import Trends from "../components/Trends";
import FriendsHint from "../components/Profil/FriendsHint";
import type { RootState } from "../main";

const Trending = () => {
    const status = useContext(StatusContext);
    const userData = useSelector((state: RootState) => state.userReducer);
    const trends = useSelector((state: RootState) => state.postReducer?.posts ?? []);

    const sortedTrends = useMemo(() => {
        return [...trends].sort((a, b) => b.likes.length - a.likes.length);
    }, [trends]);

    return (
        <div className="trending-page">
            <LeftNav />
            <div className="main">
                <ul>
                    {sortedTrends.map((trend) =>
                        trend.id_post && <Card post={trend} key={trend.id_post} />
                    )}
                </ul>
            </div>
            <div className="right-side">
                <div className="right-side-container">
                    <Trends />
                    {status && userData && <FriendsHint userData={userData} />}
                </div>
            </div>
        </div>
    );
};

export default Trending;
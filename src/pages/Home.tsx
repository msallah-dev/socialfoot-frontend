import { useContext } from "react";
import Log from "../components/Log";
import { StatusContext } from "../components/AppContext";
import LeftNav from "../components/LeftNav";
import Thread from "../components/Thread";
import NewPostForm from "../components/Post/NewPostForm";
import { useSelector } from "react-redux";
import type { RootState } from "../main";
import FriendsHint from "../components/Profil/FriendsHint";
import Trends from "../components/Trends";

const Home = () => {
    const status = useContext(StatusContext);
    const userData = useSelector((state: RootState) => state.userReducer);

    return (
        <div className="home">
            <LeftNav />
            <div className="main">
                <div className="home-header">
                    {
                        status && userData ?
                            <NewPostForm userData={userData} />
                            :
                            <Log signin={true} signup={false} />
                    }
                </div>
                <Thread />
            </div>
            <div className="right-side">
                <div className="right-side-container">
                    <div className="wrapper">
                        <Trends />
                        {
                            status && userData &&
                            <FriendsHint userData={userData} />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
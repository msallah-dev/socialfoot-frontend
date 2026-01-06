import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import type { AppDispatch, Post, RootState } from "../main";
import PostImage from "./Post/PostImage";
import UserImage from "./Profil/UserImage";
import { getPosts } from "../actions/post.actions";

const Trends = () => {
    const [trending, setTrending] = useState<Post[]>([]);
    const [loadTrend, setLoadTrend] = useState<boolean>(true);
    const dispatch = useDispatch<AppDispatch>();
    const trends = useSelector((state: RootState) => state.postReducer?.posts ?? []);

    useEffect(() => {
        if (loadTrend) {
            dispatch(getPosts());
            setLoadTrend(false);
        }

        if (trends?.length) {
            const sortedArray = [...trends].sort((a, b) => b.likes.length - a.likes.length);
            setTrending(sortedArray);
            trending.length = 3;
        }

    }, [trends, dispatch]);

    return (
        <div className="trending-container">
            <h4>Trending</h4>
            <NavLink to="/trending">
                <ul>
                    {trending.map((trend) => {
                        return (
                            trend.id_post &&
                            <li key={trend.id_post}>
                                <div>
                                    {!trend.video && trend.id_post && <PostImage postId={trend.id_post} blob="" />}
                                    {trend.video &&
                                        <iframe
                                            src={trend.video}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            title={trend.id_post ? String(trend.id_post) : ''}
                                        ></iframe>
                                    }
                                    {trend.user.id_user && !trend.video &&
                                        <UserImage userId={trend.user.id_user} blob="" />
                                    }
                                </div>
                                <div className="trend-content">
                                    <p>{trend.content}</p>
                                    <span>Lire</span>
                                </div>
                            </li>
                        );
                    })
                    }
                </ul>
            </NavLink>
        </div>
    );
};

export default Trends;
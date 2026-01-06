import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/post.actions";
import Card from "./Post/Card";
import type { AppDispatch, RootState } from "../main";

const Thread = () => {
    const [loadPost, setLoadPost] = useState<boolean>(true);
    const [count, setCount] = useState<number>(5);
    const dispatch = useDispatch<AppDispatch>();
    const posts = useSelector((state: RootState) => state.postReducer?.posts);

    const loadMore = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.documentElement.scrollHeight) {
            setLoadPost(true);
            setCount(count + 5);
        }
    }

    useEffect(() => {
        if (!loadPost) return;
        if (loadPost && posts?.length === 0) dispatch(getPosts());
        if (loadPost) setLoadPost(false);

        window.addEventListener('scroll', loadMore);
        return () => window.removeEventListener('scroll', loadMore);
    }, [loadPost, dispatch, posts]);

    const limitedPosts = useMemo(() => {
        if (!posts) return [];
        return posts.slice(0, Math.min(count, posts.length));

    }, [posts, count]);

    return (
        <div className="thread-container">
            <ul>
                {
                    limitedPosts.map((post: any) => {
                        return post.id_post && <Card post={post} key={post.id_post} />;
                    })
                }
            </ul>
        </div>
    );
};

export default Thread;

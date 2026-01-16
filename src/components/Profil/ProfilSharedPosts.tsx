import { useEffect, useMemo, useState } from "react";
import Card from "../Post/Card";
import LeftNav from "../LeftNav";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../main";
import { getPosts } from "../../actions/post.actions";

const ProfilSharedPosts = ({ userId }: { userId: number }) => {
    const [loadPostShared, setLoadPostShared] = useState<boolean>(true);
    const [count, setCount] = useState<number>(5);
    const dispatch = useDispatch<AppDispatch>();
    const posts = useSelector((state: RootState) => state.postReducer?.posts ?? []);

    const loadMore = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.documentElement.scrollHeight) {
            setLoadPostShared(true);
            setCount(count + 5);
        }
    }

    useEffect(() => {
        if (!Object.keys(posts[0].user).length) dispatch(getPosts());

        if (loadPostShared) setLoadPostShared(false);

        window.addEventListener('scroll', loadMore);
        return () => window.removeEventListener('scroll', loadMore);
    }, [posts, loadPostShared]);

    const limitedPostsShared = useMemo(() => {
        if (!posts || Object.keys(posts[0].user).length === 0) return [];

        const userShares = posts.filter(post =>
            post.shares.some(share => share.userId === userId)
        );

        return userShares.slice(0, Math.min(count, userShares.length));

    }, [posts, count]);

    return (
        <div className="profil-container-activite">
            <LeftNav />
            <div className="activite-container">
                <ul>
                    {
                        limitedPostsShared.map((post: any) => {
                            return post.id_post &&
                                <Card post={post} key={post.id_post} />;
                        })
                    }
                </ul>
            </div>
        </div>
    );
}

export default ProfilSharedPosts;
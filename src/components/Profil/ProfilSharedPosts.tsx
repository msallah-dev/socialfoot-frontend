import { useEffect, useMemo, useState } from "react";
import Card from "../Post/Card";
import LeftNav from "../LeftNav";

const ProfilSharedPosts = ({ postsShare }: { postsShare: [] }) => {
    const [loadPostShared, setLoadPostShared] = useState<boolean>(true);
    const [count, setCount] = useState<number>(5);

    const loadMore = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.documentElement.scrollHeight) {
            setLoadPostShared(true);
            setCount(count + 5);
        }
    }

    useEffect(() => {
        if (loadPostShared) setLoadPostShared(false);
        console.log(postsShare)

        window.addEventListener('scroll', loadMore);
        return () => window.removeEventListener('scroll', loadMore);
    }, [loadPostShared, postsShare]);

    const limitedPostsShared = useMemo(() => {
        if (!postsShare) return [];
        return postsShare.slice(0, Math.min(count, postsShare.length));

    }, [postsShare, count]);

    return (
        <div className="profil-container-activite">
            <LeftNav />
            <div className="activite-container">
                <ul>
                    {
                        limitedPostsShared.map((postShared: any) => {
                            return postShared.post.id_post &&
                                <Card post={postShared.post} key={postShared.post.id_post} />;
                        })
                    }
                </ul>
            </div>
        </div>
    );
}

export default ProfilSharedPosts;
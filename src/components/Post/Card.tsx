import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateParser, errors } from "../Utils";
import FollowHandler from "../Profil/FollowHandler";
import LikeButton from "./LikeButton";
import { updatePost } from "../../actions/post.actions";
import type { AppDispatch, RootState } from "../../main";
import UserImage from "../Profil/UserImage";
import PostImage from "./PostImage";
import DeleteCard from "./DeleteCard";
import CardComments from "./CardComments";
import ShareButton from "./ShareButton";

const Card = ({ post }: { post: any }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isUpdated, setIsUpdated] = useState<boolean>(false);
    const [textUpdate, setTextUpdate] = useState<string>('');
    const [video, setVideo] = useState<string>('');
    const [showComments, setShowComments] = useState<boolean>(false);
    const userData = useSelector((state: RootState) => state.userReducer);
    const errorPost = useSelector((state: RootState) => state.errorReducer?.postError);
    const dispatch = useDispatch<AppDispatch>();

    const updateItem = () => {
        errors('texte').innerHTML = "";

        if (textUpdate && post.video) {
            dispatch(updatePost(post.id_post, textUpdate, video));
        } else if (textUpdate) {
            dispatch(updatePost(post.id_post, textUpdate));
        }
    };

    useEffect(() => {
        if (userData) setIsLoading(false);

        if (errorPost?.success) {
            setIsUpdated(false);
            errorPost.success = false;
        }

        const handleVideo = () => {
            let findLink = textUpdate.split(" ");
            for (let i = 0; i < findLink.length; i++) {
                if (
                    findLink[i].includes("https://www.yout") ||
                    findLink[i].includes("https://yout")
                ) {
                    let embed = findLink[i].replace("watch?v=", "embed/");
                    setVideo(embed.split("&")[0]);
                    findLink.splice(i, 1);
                    setTextUpdate(findLink.join(" "));
                }
            }
        };

        handleVideo();

    }, [textUpdate, userData, errorPost]);

    return (
        <li className="card-container" key={post.id_post}>
            {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
            ) : (
                <>
                    <div className="card-left">
                        <UserImage userId={post.user.id_user} blob="" />
                    </div>
                    <div className="card-right">
                        <div className="card-header">
                            <div className="pseudo">
                                <h3> {post.user.name} </h3>
                                {userData?.id_user !== post.user.id_user && (
                                    <FollowHandler idToFollow={post.user.id_user} type={"card"} />
                                )}
                            </div>
                            <span>{dateParser(post.created_at)}</span>
                        </div>
                        {isUpdated === false && <p>{post.content}</p>}
                        {isUpdated && (
                            <div className="update-post">
                                <textarea
                                    defaultValue={post.content}
                                    onChange={(e) => setTextUpdate(e.target.value)}
                                />
                                <span className="texte error"></span>
                                <div className="button-container">
                                    <button className="btn" onClick={updateItem}>
                                        Valider modification
                                    </button>
                                </div>
                            </div>
                        )}

                        <PostImage postId={post.id_post} blob="" />

                        {post.video && (
                            <iframe
                                width="500"
                                height="300"
                                src={post.video}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title={post.id_post}
                            ></iframe>
                        )}

                        {userData?.id_user === post.user.id_user && (
                            <div className="button-container">
                                <div onClick={() => setIsUpdated(!isUpdated)}>
                                    <img src="./images/icons/edit.svg" alt="edit" />
                                </div>
                                <DeleteCard postId={post.id_post} />
                            </div>
                        )}
                        <div className="card-footer">
                            <div className="comment-icon">
                                <img
                                    onClick={() => setShowComments(!showComments)}
                                    src="./images/icons/message1.svg"
                                    alt="comment"
                                />
                                <span>{post.comments.length}</span>
                            </div>

                            <LikeButton post={post} />
                            <ShareButton post={post} />
                        </div>
                        {showComments && <CardComments post={post} />}
                    </div>
                </>
            )}
        </li>
    );
};

export default Card;

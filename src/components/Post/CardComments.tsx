import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getPosts } from "../../actions/post.actions";
import FollowHandler from "../Profil/FollowHandler";
import { dateParser } from "../Utils";
import EditDeleteComment from "./EditDeleteComment";
import type { AppDispatch, RootState } from "../../main";
import UserImage from "../Profil/UserImage";

const CardComments = ({ post }: { post: any }) => {
    const [text, setText] = useState<string>("");
    const userData = useSelector((state: RootState) => state.userReducer);
    const dispatch = useDispatch<AppDispatch>();

    const handleComment = async (e: any) => {
        e.preventDefault();

        if (text) {
            await dispatch(addComment(post.id_post, text));
            dispatch(getPosts());
            setText('');
        }
    };

    return (
        <div className="comments-container">
            {post.comments.map((comment: any) => {
                return (
                    <div
                        className={
                            userData?.id_user === comment.user.id_user
                                ? "comment-container client"
                                : "comment-container"
                        }
                        key={comment.id_commentaire}
                    >
                        <div className="left-part">
                            <UserImage userId={comment.user.id_user} blob="" />
                        </div>
                        <div className="right-part">
                            <span>{dateParser(comment.created_at)}</span>
                            <div className="comment-header">
                                <div className="pseudo">
                                    <h3>{comment.user.name}</h3>
                                    {userData?.id_user !== comment.user.id_user && (
                                        <FollowHandler
                                            idToFollow={comment.user.id_user}
                                            type={"card"}
                                        />
                                    )}
                                </div>

                            </div>
                            <p>{comment.content}</p>
                            <EditDeleteComment comment={comment} postId={post.id_post} />
                        </div>
                    </div>
                );
            })}
            {userData?.id_user && (
                <form action="" onSubmit={handleComment} className="comment-form">
                    <input
                        type="text"
                        name="text"
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                        placeholder="Laisser un commentaire"
                    />
                    <br />
                    <input type="submit" value="Envoyer" />
                </form>
            )}
        </div>
    );
};

export default CardComments;
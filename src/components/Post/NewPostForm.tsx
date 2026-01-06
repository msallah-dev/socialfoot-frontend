import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { errors, timestampParser } from "../Utils";
import { NavLink } from "react-router-dom";
import { addPost, deletePost, getPosts } from "../../actions/post.actions";
import type { AppDispatch, RootState, UserState } from "../../main";
import UserImage from "../Profil/UserImage";

const NewPostForm = ({ userData }: { userData: UserState }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [content, setContent] = useState<string>("");
    const [postPicture, setPostPicture] = useState<string>('');
    const [video, setVideo] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const errorPost = useSelector((state: RootState) => state.errorReducer?.postError);
    const dispatch = useDispatch<AppDispatch>();

    const handlePost = async () => {
        errors('content').innerHTML = "";
        
        if (content || postPicture || video) {
            dispatch(addPost(content, file, video));
        } else {
            alert("Veuillez entrer un contenu !")
        }
    };

    const handlePicture = (e: any) => {
        setPostPicture(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
        setVideo('');
    };

    const cancelPost = () => {
        setContent("");
        setPostPicture("");
        setVideo("");
        setFile(null);
    };

    useEffect(() => {
        if (userData) setIsLoading(false);
                    
        if (errorPost?.success) {
            dispatch(getPosts());
            cancelPost();
        } else if(errorPost?.postId) {
            dispatch(deletePost(errorPost.postId))
        }

        const handleVideo = () => {
            let findLink = content.split(" ");
            for (let i = 0; i < findLink.length; i++) {
                if (
                    findLink[i].includes("https://www.yout") ||
                    findLink[i].includes("https://yout")
                ) {
                    let embed = findLink[i].replace("watch?v=", "embed/");
                    setVideo(embed.split("&")[0]);
                    findLink.splice(i, 1);
                    setContent(findLink.join(" "));
                    setPostPicture('');
                }
            }
        };

        handleVideo();
    }, [userData, errorPost, content, video]);

    return (
        <div className="post-container">
            {isLoading ? (
                <i className="fas fa-spinner fa-pulse"></i>
            ) : (
                <>
                    <div className="data">
                        <p>
                            <span>{userData.following ? userData.following.length : 0}</span>{" "}
                            Abonnement
                            {userData.following && userData.following.length > 1 ? "s" : null}
                        </p>
                        <p>
                            <span>{userData.followers ? userData.followers.length : 0}</span>{" "}
                            Abonné
                            {userData.followers && userData.followers.length > 1 ? "s" : null}
                        </p>
                    </div>
                    <NavLink to="/profil">
                        <div className="user-info">
                            {userData.id_user && <UserImage userId={userData.id_user} blob="" />}
                        </div>
                    </NavLink>
                    <div className="post-form">
                        <textarea
                            name="content"
                            id="content"
                            placeholder="Quoi de neuf ?"
                            onChange={(e) => setContent(e.target.value)}
                            value={content}
                        />
                        <span className="content error"></span>
                        {content || postPicture || video.length > 20 ? (
                            <li className="card-container">
                                <div className="card-left">
                                    {userData.id_user && <UserImage userId={userData.id_user} blob="" />}
                                </div>
                                <div className="card-right">
                                    <div className="card-header">
                                        <div className="pseudo">
                                            <h3>{userData.name}</h3>
                                        </div>
                                        <span>{timestampParser(Date.now())}</span>
                                    </div>
                                    <div className="content">
                                        <p>{content}</p>
                                        {postPicture && <img src={postPicture} alt="" />}
                                        {video && (
                                            <iframe
                                                src={video}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                title={video}
                                            ></iframe>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ) : null}
                        <div className="footer-form">
                            <div className="icon">
                                {!video && (
                                    <>
                                        <img src="./images/icons/picture.svg" alt="img" />
                                        <input
                                            type="file"
                                            id="file-upload"
                                            name="file"
                                            accept=".jpg, .jpeg, .png"
                                            onChange={(e) => handlePicture(e)}
                                        />
                                    </>
                                )}
                                {video && (
                                    <button onClick={() => setVideo("")}>Supprimer video</button>
                                )}
                            </div>
                            {errorPost?.message && <p>{errorPost.message}</p>}
                            <div className="btn-send">
                                {content || postPicture || video.length > 20 ? (
                                    <button className="cancel" onClick={cancelPost}>
                                        Annuler publication
                                    </button>
                                ) : null}
                                <button className="send" onClick={handlePost}>
                                    Envoyer
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default NewPostForm;
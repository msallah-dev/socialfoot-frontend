import { useContext, useEffect, useState } from "react";
import { StatusContext } from "../AppContext";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useDispatch, useSelector } from "react-redux";
import { likePost, unlikePost } from "../../actions/post.actions";
import type { AppDispatch, RootState } from "../../main";
import UserImage from "../Profil/UserImage";
import FollowHandler from "../Profil/FollowHandler";

const LikeButton = ({ post }: { post: any }) => {
  const [liked, setLiked] = useState<boolean>(false);
  const [likersPopup, setLikersPopup] = useState<boolean>(false);
  const status = useContext(StatusContext);
  const userData = useSelector((state: RootState) => state.userReducer)
  const dispatch = useDispatch<AppDispatch>();

  const like = () => {
    dispatch(likePost(post.id_post));
    setLiked(true);
  };

  const unlike = () => {
    if (userData?.id_user) dispatch(unlikePost(post.id_post, userData.id_user))
    setLiked(false);
  };

  useEffect(() => {
    if (userData) {
      const like = post.likes.some((like: any) => {
        return Number(like.userId) === userData.id_user;
      });

      setLiked(like);
    }

  }, [userData, post.likes, liked]);

  return (
    <div className="like-container">
      {!status && (
        <Popup
          trigger={<img src="./images/icons/heart.svg" alt="like" />}
          position={["top center"]}
          closeOnDocumentClick
        >
          <div>Connectez-vous pour aimer ce post !</div>
        </Popup>
      )}
      {status && !liked && (
        <img src="./images/icons/heart.svg" onClick={like} alt="like" />
      )}
      {status && liked && (
        <img src="./images/icons/heart-filled.svg" onClick={unlike} alt="unlike" />
      )}
      <span onClick={() => setLikersPopup(true)}>{post.likes.length}</span>

      {post.likes.length > 0 && likersPopup && (
        <div className="popup-container">
          <div className="modal">
            <h3>Réactions</h3>
            <span className="cross" onClick={() => setLikersPopup(false)}>
              &#10005;
            </span>
            <ul>
              {post.likes.map((like: any) => {
                return (
                  <li key={like.user.id_user}>
                    <UserImage userId={like.user.id_user} blob="" />
                    {userData?.id_user === Number(like.user.id_user) ?
                      <h4>Vous</h4>
                      :
                      <h4>{like.user.name}</h4>
                    }

                    {status && userData?.id_user !== Number(like.user.id_user) &&
                      <div className="follow-handler">
                        <FollowHandler idToFollow={like.user.id_user} type={'suggestion'} />
                      </div>
                    }

                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}

    </div>
  );
};

export default LikeButton;
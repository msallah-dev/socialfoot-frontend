import { useContext, useEffect, useState } from "react";
import { StatusContext } from "../AppContext";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useDispatch, useSelector } from "react-redux";
import { likePost, unlikePost } from "../../actions/post.actions";
import type { AppDispatch, RootState } from "../../main";

const LikeButton = ({ post }: { post: any }) => {
  const [liked, setLiked] = useState<boolean>(false);
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
      <span>{post.likes.length}</span>
    </div>
  );
};

export default LikeButton;
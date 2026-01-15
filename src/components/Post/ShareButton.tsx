import { useContext, useEffect, useState } from "react";
import { StatusContext } from "../AppContext";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useDispatch, useSelector } from "react-redux";
import { sharePost, unsharePost } from "../../actions/post.actions";
import type { AppDispatch, RootState } from "../../main";
import UserImage from "../Profil/UserImage";
import FollowHandler from "../Profil/FollowHandler";

const ShareButton = ({ post }: { post: any }) => {
  const [shared, setShared] = useState<boolean>(false);
  const [sharedsPopup, setSharedsPopup] = useState<boolean>(false);
  const status = useContext(StatusContext);
  const userData = useSelector((state: RootState) => state.userReducer)
  const dispatch = useDispatch<AppDispatch>();

  const share = () => {
    if (window.confirm("Voulez-vous partager cette publication ?")) {
      dispatch(sharePost(post.id_post));
      setShared(true);
      alert("C’est fait ! Votre publication vient d’être partagée 🚀");
    }

  };

  const unshare = () => {
    if (window.confirm("Voulez-vous annuler le partage de cette publication ?")) {
      userData?.id_user && dispatch(unsharePost(post.id_post, userData.id_user))
      setShared(false);
      alert("C’est fait, la publication a bien été retirée");
    }
  }

  useEffect(() => {
    if (userData) {
      const share = post.shares.some((share: any) => {
        return Number(share.userId) === userData.id_user;
      });

      setShared(share);
    }

  }, [userData, post.shares, shared]);

  return (
    <div className="share-container">
      {!status && (
        <Popup
          trigger={<img src="./images/icons/share.svg" alt="share" />}
          position={["top center"]}
          closeOnDocumentClick
        >
          <div>Connectez-vous pour partager ce post !</div>
        </Popup>
      )}
      {status && !shared && (
        <img src="./images/icons/share.svg" onClick={share} alt="share" />
      )}
      {status && shared && (
        <img src="./images/icons/unlink.svg" onClick={unshare} alt="unshare" />
      )}
      <span onClick={() =>
        post.shares.length && setSharedsPopup(true)
      }>
        {post.shares.length}
      </span>

      {post.shares.length > 0 && sharedsPopup && (
        <div className="popup-container">
          <div className="modal">
            <h3>Partages</h3>
            <span className="cross" onClick={() => setSharedsPopup(false)}>
              &#10005;
            </span>
            <ul>
              {post.shares.map((share: any) => {
                return (
                  <li key={share.user.id_user}>
                    <UserImage userId={share.user.id_user} blob="" />
                    {userData?.id_user === Number(share.user.id_user) ?
                      <h4>Vous</h4>
                      :
                      <h4>{share.user.name}</h4>
                    }

                    {status && userData?.id_user !== Number(share.user.id_user) &&
                      <div className="follow-handler">
                        <FollowHandler idToFollow={share.user.id_user} type={'suggestion'} />
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

export default ShareButton;
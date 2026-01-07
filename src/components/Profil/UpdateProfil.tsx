import { useEffect, useState } from "react";
import LeftNav from "../LeftNav";
import { useDispatch, useSelector } from "react-redux";
import UploadImg from "./UploadImg";
import { dateParser, errors } from "../Utils";
import type { AppDispatch, Follow, RootState, UserState } from "../../main";
import { updateUser } from "../../actions/user.actions";
import FollowHandler from "./FollowHandler";
import UserImage from "./UserImage";

const UpdateProfil = ({ userData }: { userData: UserState }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [updateForm, setUpdateForm] = useState(false);
  const [followingPopup, setFollowingPopup] = useState(false);
  const [followersPopup, setFollowersPopup] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const errorImage = useSelector((state: RootState) => state.errorReducer?.userError.image);
  const errorPassword = useSelector((state: RootState) => state.errorReducer?.userError.password);

  const handleUpdate = async () => {
    errors('password').innerHTML = "";
    errors('email').innerHTML = "";

    if (userData.id_user)
      dispatch(updateUser(userData.id_user, userData.email, email, password, newPassword));
  };

  useEffect(() => {
    if (!email && userData.email) setEmail(userData.email)

    if (userData.update && userData.update.success) {
      setEmail("");
      setPassword("");
      setNewPassword("");
      setUpdateForm(false);
    }

  }, [userData, dispatch]);

  if (userData.id_user === undefined) {
    return <div>Chargement du profil...</div>;
  }

  return (
    <div className="profil-container">
      <LeftNav />
      <h1> Profil de {userData.name}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <UserImage userId={userData.id_user} blob={userData.blob} />
          <UploadImg />
          <p>{errorImage}</p>
        </div>
        <div className="right-part">
          <div className="bio-update">
            <span className="succes">{userData.update ? userData.update.message : ''}</span>
            <h3>E-mail</h3>
            {updateForm === false && (
              <>
                <p onClick={() => setUpdateForm(!updateForm)}>{userData.email}</p><br />
                <h3>Mot de passe</h3>
                <p onClick={() => setUpdateForm(!updateForm)}></p>
                <button onClick={() => setUpdateForm(!updateForm)}>
                  Modifier
                </button>
              </>
            )}
            {updateForm && (
              <>
                <input
                  type="text"
                  defaultValue={userData.email}
                  onChange={(e) => setEmail(e.target.value)}
                /><br />
                <span className="email error"></span><br />
                <h3>Mot de passe actuelle</h3>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                /><br />
                <span className="old-password error">{errorPassword}</span><br />
                <h3>Nouveau mot de passe</h3>
                <input
                  type="password"
                  onChange={(e) => setNewPassword(e.target.value)}
                /><br />
                <span className="password error"></span><br />
                <button onClick={handleUpdate}>Valider modifications</button>
              </>
            )}

          </div>
          <h4>Membre depuis le : {dateParser(userData.created_at)}</h4>
          <h5 onClick={() => setFollowingPopup(true)}>
            Abonnements : {userData.following ? userData.following.length : ""}
          </h5>
          <h5 onClick={() => setFollowersPopup(true)}>
            Abonnés : {userData.followers ? userData.followers.length : ""}
          </h5>
        </div>
      </div>
      {userData.following.length > 0 && followingPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Abonnements</h3>
            <span className="cross" onClick={() => setFollowingPopup(false)}>
              &#10005;
            </span>
            <ul>
              {userData.following.map((user: Follow) => {
                return (
                  <li key={user.followed.id_user}>
                    <UserImage userId={user.followed.id_user} blob="" />
                    <h4>{user.followed.name}</h4>
                    <div className="follow-handler">
                      <FollowHandler idToFollow={user.followed.id_user} type={'suggestion'} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}

      {userData.followers.length > 0 && followersPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Abonnés</h3>
            <span className="cross" onClick={() => setFollowersPopup(false)}>
              &#10005;
            </span>
            <ul>
              {userData.followers.map((user: Follow) => {
                return (
                  <li key={user.follower.id_user}>
                    <UserImage userId={user.follower.id_user} blob="" />
                    <h4>{user.follower.name}</h4>
                    <div className="follow-handler">
                      <FollowHandler idToFollow={user.follower.id_user} type={'suggestion'} />
                    </div>
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

export default UpdateProfil;

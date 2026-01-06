import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, editComment } from "../../actions/post.actions";
import type { AppDispatch, RootState } from "../../main";

const EditDeleteComment = ({ comment, postId }: { comment: any, postId: number }) => {
  const [isAuthor, setIsAuthor] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const userData = useSelector((state: RootState) => state.userReducer);
  const dispatch = useDispatch<AppDispatch>();

  const handleEdit = (e: any) => {
    e.preventDefault();

    if (text) {
      dispatch(editComment(comment.id_commentaire, postId, text));
      setText("");
      setEdit(false);
    }
  };

  const handleDelete = () => dispatch(deleteComment(comment.id_commentaire, postId));

  useEffect(() => {
    const checkAuthor = () => {
      if (userData?.id_user === comment.user.id_user) {
        setIsAuthor(true);
      }
    };

    checkAuthor();
  }, [userData, comment.user]);

  return (
    <div className="edit-comment">
      {isAuthor && edit === false && (
        <span onClick={() => setEdit(!edit)}>
          <img src="./images/icons/edit.svg" alt="edit-comment" />
        </span>
      )}
      {isAuthor && edit && (
        <form action="" onSubmit={handleEdit} className="edit-comment-form">
          <label htmlFor="text" onClick={() => setEdit(!edit)}>
            Editer
          </label>
          <br />
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            defaultValue={comment.content}
          />
          <br />
          <div className="btn">
            <span
              onClick={() => {
                if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
                  handleDelete();
                }
              }}
            >
              <img src="./images/icons/trash.svg" alt="delete" />
            </span>
            <input type="submit" value="Valider modification" />
          </div>
        </form>
      )}
    </div>
  );
};

export default EditDeleteComment;
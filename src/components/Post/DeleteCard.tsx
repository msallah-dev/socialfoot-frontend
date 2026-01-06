import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/post.actions";
import type { AppDispatch } from "../../main";

const DeleteCard = ({ postId }: { postId: number }) => {
    const dispatch = useDispatch<AppDispatch>();

    const deleteCard = () => dispatch(deletePost(postId));

    return (
        <div
            onClick={() => {
                if (window.confirm("Voulez-vous supprimer la publication ?")) {
                    deleteCard();
                }
            }}
        >
            <img src="./images/icons/trash.svg" alt="trash" />
        </div>
    );
};

export default DeleteCard;

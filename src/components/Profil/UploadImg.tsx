import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user.actions";
import type { AppDispatch, RootState } from "../../main";

const UploadImg = () => {
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const userData = useSelector((state: RootState) => state.userReducer);

  const handlePicture = (e: any) => {
    e.preventDefault();

    if (file) {
      const data = new FormData();
      if (userData && userData.id_user) {
        const userId = userData.id_user.toString();
        
        data.append("userId", userId);
        data.append("file", file);

        dispatch(uploadPicture(data, userId));
      }
    }

  };

  return (
    <form action="" onSubmit={handlePicture} className="upload-pic">
      <label htmlFor="file">Changer d'image</label>
      <input
        type="file"
        id="file"
        name="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />
      <br />
      <span>{file ? file.name : ''}</span><br />
      <input type="submit" value="Envoyer" />
    </form>
  );
};

export default UploadImg;

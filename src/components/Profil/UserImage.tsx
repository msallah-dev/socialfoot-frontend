import axios from "axios";
import { useEffect, useState } from "react";

const UserImage = ({ userId, blob }: { userId: number, blob: string }) => {
    const [imageSrc, setImageSrc] = useState<string>(blob);

    useEffect(() => {
        const getImage = async () => {
            await axios({
                method: "get",
                url: `${import.meta.env.VITE_APP_API_URL}users/picture/profil/${userId}`,
                responseType: "blob",
                withCredentials: true,
            })
                .then((res) => res.data)
                .then((blob) => {
                    if (blob && blob.size !== 0)
                        setImageSrc(URL.createObjectURL(blob));
                })
                .catch((err) => console.log(err))
        };

        if (userId && !blob) getImage();
        else setImageSrc(blob);

    }, [userId, blob])

    return (
        <img src={imageSrc ? imageSrc : 'images/icons/user.svg'} alt="user-pic" />
    );
}

export default UserImage;
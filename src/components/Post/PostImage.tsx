import axios from "axios";
import { useEffect, useState } from "react";

const PostImage = ({ postId, blob }: { postId: number, blob: string }) => {
    const [imageSrc, setImageSrc] = useState<string>(blob);

    useEffect(() => {
        const getImage = async () => {
            await axios({
                method: "get",
                url: `${import.meta.env.VITE_APP_API_URL}posts/picture/post/${postId}`,
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

        if (postId && !blob) getImage();
        else setImageSrc(blob);

    }, [postId, blob])

    return (
        <>
            {imageSrc && (<img src={imageSrc} alt="card-pic" className="card-pic" />)}
        </>
    );
}

export default PostImage;
import axios from "axios";
import cookie from "js-cookie";

const Logout = () => {
    const removeCookie = (key: string) => {
        if (typeof window !== "undefined") {
            cookie.remove(key, { path: "/" });
        }
    };

    const logout = async () => {
        await axios({
            method: "post",
            url: `${import.meta.env.VITE_APP_API_URL}auth/logout`,
            withCredentials: true,
        })
            .then((res) => {
                if (res.data.success) {
                    removeCookie("jwt");
                    window.location.href = "/";
                }
            })
            .catch((err) => console.log(err))
    }

    return (
        <li onClick={logout}>
            <img src="./images/icons/logout.svg" alt="logout" />
        </li>
    );
};

export default Logout;
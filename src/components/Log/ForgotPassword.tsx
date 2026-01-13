import { useState } from "react";
import { errors, getMessageError } from "../Utils";
import axios from "axios";

const ForgotPassword = () => {
    const [email, setEmail] = useState<string>("");
    const [resetMessage, setResetMessage] = useState<string>("");
    const [showResetMessage, setShowResetMessage] = useState<boolean>(false);

    const handleEmail = async (e: any) => {
        e.preventDefault();
        errors('email').innerHTML = "";

        await axios({
            method: "post",
            url: `${import.meta.env.VITE_APP_API_URL}auth/generate-link-forgot-password`,
            withCredentials: true,
            data: { email }
        })
            .then((res) => {
                setResetMessage(res.data.message);
                setShowResetMessage(true);
            })
            .catch((err) => {
                getMessageError(err.response.data.message);
                console.log(err)
            })

    }

    return (
        <form action="" onSubmit={handleEmail} id="forgot-password-form">
            {showResetMessage ? <span><h4>{resetMessage}</h4></span>
                :
                <>
                    <p>Saisissez l’adresse e‑mail associée à votre compte.</p>
                    <p>Nous vous enverrons un lien sécurisé </p>
                    <p>pour réinitialiser votre mot de passe</p>
                    <br />
                    <label htmlFor="forgot-password-email">E-mail</label>
                    <br />
                    <input
                        type="text"
                        name="forgot-password-email"
                        id="forgot-password-email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <div className="email error"></div>
                    <br />
                    <input type="submit" value="Recevoir le lien" />
                </>
            }
        </form>
    );

}

export default ForgotPassword;
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { errors, getMessageError } from "../Utils";

const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const [newPassword, setNewPassword] = useState<string>("");
    const [controlPassword, setControlPassword] = useState<string>("");
    const [passwordResetSuccess, setPasswordResetSuccess] = useState<string>("");
    const [userId, setUserId] = useState<number | null>(null);
    const [tokenIsValid, setTokenIsValid] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const checkToken = async () => {
            await axios({
                method: "get",
                url: `${import.meta.env.VITE_APP_API_URL}auth/check-token-forgot-password/${token}`,
                withCredentials: true
            })
                .then((res) => {
                    if (res.data.success) {
                        setUserId(res.data.data.id_user);
                        setTokenIsValid(true);
                    }
                    setIsLoading(false);
                })
                .catch((err) => {
                    setIsLoading(false);
                    console.log(err)
                })
        }

        checkToken();

    }, [token])

    const handleResetPassword = async (e: any) => {
        e.preventDefault();
        errors('password').innerHTML = "";
        errors('conf-password').innerHTML = "";

        if (newPassword !== controlPassword) {
            errors('conf-password').innerHTML = "Les mots de passe ne correspondent pas";
            return;
        }

        if (userId) await resetPassword();

    }

    const resetPassword = async () => {
        await axios({
            method: "patch",
            url: `${import.meta.env.VITE_APP_API_URL}auth/${userId}`,
            data: { password: newPassword, token },
        })
            .then(async (res) => {
                if (res.data.success) {
                    setPasswordResetSuccess(res.data.message);
                } else {
                    errors('error').innerHTML = res.data.error;
                }
            })
            .catch((err) => {
                getMessageError(err.response.data.message);
                console.log('Error: ', err);
            });
    }

    return (
        <div className="reset-home">
            <div className="main">
                {isLoading ? <div>Loading ...</div>
                    :
                    tokenIsValid ?
                        <div className="home-header">
                            < div className="connection-form">
                                {passwordResetSuccess !== "" ?
                                <div className="reset-success">
                                    <span><h3>{passwordResetSuccess}</h3></span>
                                    <span><a href="/">Se connecter</a></span>
                                    </div>
                                    :
                                    <div className="form-container">
                                        <form action="" onSubmit={handleResetPassword} id="reset-password-form">
                                            <label htmlFor="new-password">Nouveau mot de passe</label><br />
                                            <input
                                                type="password"
                                                name="new-password"
                                                id="new-password"
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                value={newPassword}
                                            />
                                            <div className="password error"></div>
                                            <br />
                                            <label htmlFor="conf-new-password">Confirmer le mot de passe</label><br />
                                            <input
                                                type="password"
                                                name="conf-new-password"
                                                id="conf-new-password"
                                                onChange={(e) => setControlPassword(e.target.value)}
                                                value={controlPassword}
                                            />
                                            <div className="conf-password error"></div>
                                            <br />
                                            <input type="submit" value="Confirmer la modification" />
                                            <br />
                                            <div className="error error"></div>
                                        </form>
                                    </div>
                                }
                            </div>
                        </div>
                        :
                        <div>
                            <h2>Ce lien a expiré</h2><br />
                            <h3>Pour des raisons de sécurité, le lien de réinitialisation n’est plus valide</h3>
                        </div>

                }
            </div >
        </div >
    );
}

export default ResetPasswordPage;
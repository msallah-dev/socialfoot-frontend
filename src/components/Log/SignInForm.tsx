import { useState } from "react";
import axios from "axios";
import { errors, getMessageError } from "../Utils";

const SignInForm = (props: any) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: any) => {
        e.preventDefault();
        errors('email').innerHTML = "";
        errors('password').innerHTML = "";

        await axios({
            method: "post",
            url: `${import.meta.env.VITE_APP_API_URL}auth/login`,
            withCredentials: true,
            data: {
                email,
                password,
            },
        })
            .then((res) => {
                console.log(res.data);
                if (res.data.errors) {
                    errors('email').innerHTML = res.data.errors.email;
                    errors('password').innerHTML = res.data.errors.password;
                } else {
                    window.location.href = "/";
                }
            })
            .catch((err) => {
                console.log(err);
                getMessageError(err.response.data.message);
            });
    }

    return (

        <form action="" onSubmit={handleLogin} id="sign-up-form">
            <label htmlFor="email">E-mail</label>
            <br />
            <input
                type="text"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <div className="email error"></div>
            <br />
            <label htmlFor="password">Mot de passe</label>
            <br />
            <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <div className="password error"></div>
            <br />
            <input type="submit" value="Se connecter" />
            {props.success &&
                <span>
                    <h4 className="success">
                        Enregistrement réussi, veuillez-vous connecter
                    </h4>
                </span>
            }
        </form>
    );
}

export default SignInForm;
import { useState } from "react";
import { errors, getMessageError, terms } from "../Utils";
import axios from "axios";

const SignUpForm = ({ onSuccess }: any) => {
    const [nom, setNom] = useState<string>('');
    const [prenom, setPrenom] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [age, setAge] = useState<number | null>(null);
    const [password, setPassword] = useState<string>('');
    const [controlPassword, setControlPassword] = useState<string>('');

    const handleRegister = async (e: any) => {
        e.preventDefault();

        resetErrors();

        if (password !== controlPassword || !terms().checked) {
            if (password !== controlPassword)
                errors('conf-password').innerHTML =
                    "Les mots de passe ne correspondent pas";

            if (!terms().checked)
                errors('terms').innerHTML = "Veuillez valider les conditions générales";

        } else {
            await axios({
                method: "post",
                url: `${import.meta.env.VITE_APP_API_URL}users`,
                data: {
                    name: nom,
                    prenom: prenom,
                    email: email,
                    age: age,
                    password: password
                },
            })
                .then((res) => {
                    console.log(res.data);
                    if(res.data.errors){
                        errors('email').innerHTML = res.data.errors.email;
                    }else{
                        onSuccess();
                    }
                })
                .catch((err) => {
                    console.log('Error: ', err);
                    getMessageError(err.response.data.message);
                });
        }

    }

    const resetErrors = () => {
        const errorDivs = document.querySelectorAll<HTMLDivElement>('.error');
        errorDivs.forEach(div => {
            div.innerHTML = '';
        });
    }

    return (
        <form action="" onSubmit={handleRegister} id="sign-up-form">
            <label htmlFor="nom">Nom</label><br />
            <input
                type="text"
                name="nom"
                id="nom"
                onChange={(e) => setNom(e.target.value)}
                value={nom}
            />
            <div className="nom error"></div>
            <br />

            <label htmlFor="prenom">Prenom</label><br />
            <input
                type="text"
                name="prenom"
                id="prenom"
                onChange={(e) => setPrenom(e.target.value)}
                value={prenom}
            />
            <div className="prenom error"></div>
            <br />

            <label htmlFor="email">E-mail</label><br />
            <input
                type="text"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <div className="email error"></div>
            <br />

            <label htmlFor="age">Âge</label><br />
            <input
                type="number"
                name="age"
                id="age"
                onChange={(e) => setAge(parseInt(e.target.value))}
                value={age ? age : ''}
            />
            <div className="age error"></div>
            <br />

            <label htmlFor="password">Mot de passe</label><br />
            <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <div className="password error"></div>
            <br />

            <label htmlFor="conf-password">Confirmer mot de passe</label><br />
            <input
                type="password"
                name="conf-password"
                id="conf-password"
                onChange={(e) => setControlPassword(e.target.value)}
                value={controlPassword}
            />
            <div className="conf-password error"></div>
            <br />

            <input type="checkbox" id="terms" />
            <label htmlFor="terms">
                J'accepte les{" "}
                <a href="/" target="_blank" rel="noopener noreferrer">
                    conditions générales
                </a>
            </label>
            <div className="terms error"></div>
            <br />

            <input type="submit" value="Valider inscription" />
        </form>
    );
}

export default SignUpForm;
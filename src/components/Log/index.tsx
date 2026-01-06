import { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const index = (props: any) => {
    const [signIn, setSignIn] = useState(props.signin);
    const [signUp, setSignUp] = useState(props.signup);
    const [success, setSuccess] = useState<boolean>(false);

    const handleModals = (e: any) => {
        if (e.target.id === 'register') {
            setSignIn(false);
            setSignUp(true);
        } else if (e.target.id === 'login') {
            setSignIn(true);
            setSignUp(false);
        }
    }

    return (
        <div className="connection-form">
            <div className="form-container">
                <ul>
                    <li
                        onClick={handleModals}
                        id='register'
                        className={signUp ? 'active-btn' : ''}
                    >
                        S'inscrire
                    </li>
                    <li
                        onClick={handleModals}
                        id='login'
                        className={signIn ? 'active-btn' : ''}
                    >
                        Se connecter
                    </li>
                </ul>
                {signIn && <SignInForm success={success} />}
                {signUp && <SignUpForm onSuccess={() => {
                    setSignIn(true);
                    setSignUp(false);
                    setSuccess(true);
                }} />}
            </div>
        </div>
    );
}

export default index;
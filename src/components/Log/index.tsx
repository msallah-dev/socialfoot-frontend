import { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import ForgotPassword from "./ForgotPassword";

const index = (props: any) => {
    const [signIn, setSignIn] = useState(props.signin);
    const [signUp, setSignUp] = useState(props.signup);
    const [forgotPassword, setForgotPassword] = useState<boolean>(props.forgotPassword);
    const [success, setSuccess] = useState<boolean>(false);

    const handleModals = (e: React.MouseEvent<HTMLElement>) => {
        const id = e.currentTarget.id;

        if (id === 'register') {
            setSignIn(false);
            setSignUp(true);
            setForgotPassword(false);
        } else if (id === 'login') {
            setSignIn(true);
            setSignUp(false);
            setForgotPassword(false);
        } else if (id === 'forgot') {
            setSignIn(false);
            setSignUp(false);
            setForgotPassword(true);
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
                {signIn && <SignInForm success={success} handleModals={handleModals} />}
                {signUp && <SignUpForm onSuccess={() => {
                    setSignIn(true);
                    setSignUp(false);
                    setSuccess(true);
                }} />}
                {forgotPassword && <ForgotPassword />}
            </div>
        </div>
    );
}

export default index;
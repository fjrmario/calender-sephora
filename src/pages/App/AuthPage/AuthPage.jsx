import FSignUpForm from "./SignUpForm";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";

const AuthPage =({setUser}) => {
    return (
        <>
    <h1>AuthPage</h1>
    <h2>LoginForm</h2>
    <LoginForm />
    <h2>FSignUpForm</h2>
    <FSignUpForm setUser={setUser} />
    </>
    )
}

export default AuthPage;
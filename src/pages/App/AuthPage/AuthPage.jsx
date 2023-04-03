import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";

export default function AuthPage({ setUser }) {
  return (
    <>
      <h1>AuthPage</h1>
      {/* <LoginForm /> // error here */}
      <h2>SignUpForm</h2>
      <SignUpForm setUser={setUser} />
    </>
  );
}

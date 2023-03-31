import { useState } from 'react';

export default function LoginForm() {
    const [error, setError] = useState("No error")
    
    const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    window.alert(data);

    try {
        const response = await fetch("/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer <token>",
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        const token = await response.json();
        if (token.token) {
            console.log(`token: ${token.token}`);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    const handleSecret = async() => {
        const token = ""
        try {
         const response = await fetch("/api/secret", {
           headers: {
             "Content-Type": "application/json",
             Authorization: `Bearer ${token}`
           },
         });
         const data = await response.json();
      console.log(data);
    } catch (error) {
        setError(error.message);
    }
  };

  return (
    <>
    <form onSubmit={handleLogin}>
      <fieldset>
        <legend>Login</legend>
        <label>
          Email: <input name="email" />
        </label>
        <label>
          Password: <input name="password" />
        </label>
        <button>Login</button>
      </fieldset>
    </form>
        <button onClick={handleSecret}>Secret</button>
    </>
  );
}

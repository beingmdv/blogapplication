import { useState } from "react";
const API = "https://blogapplication-ilnw.onrender.com";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function register(ev) {
        ev.preventDefault();
        try {
            const res = await fetch(`${API}/register`, {
                method: "POST",
                body: JSON.stringify({ username, password }),

                
                headers: { "Content-Type": "application/json" }
            });
            const data = await res.json().catch(() => ({}));
            if (res.ok) {
                alert("registration successful");
                setUsername("");
                setPassword("");
            } else {
                alert(data?.error || "registration failed");
            }
        } catch (e) {
            console.error(e);
            alert("server hi nhi mila ");
        }
    }

    return (
        <form className="register" onSubmit={register}>
            <h1>Register</h1>
            <input type="text" placeholder="username"
                value={username}
                onChange={ev => setUsername(ev.target.value)

                } />
            <input type="password"

                placeholder="password"
                value={password}
                onChange={ev => setPassword(ev.target.value)

                } />
            <button>Register</button>
        </form>
    );
}

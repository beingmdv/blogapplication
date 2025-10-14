import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";


import { UserContext } from "../Usercontext";
const API = "http://127.0.0.1:4000";

export default function Loginpage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);



  async function login(ev) {
    ev.preventDefault();
    try {
      const res = await fetch(`${API}/login`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {


        setUserInfo(data);
        
        setRedirect(true);


      } else {
        alert(data?.error || "login failed");
      }


    } catch (e) {
      console.error(e);
      alert("could not reach server. make sure backend is running.");
    }
  }

  if (redirect) return <Navigate to="/" />;

  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input type="text"


       placeholder="username"
        value={username} 
        onChange={ev => setUsername(ev.target.value)

        } />




      <input type="password" placeholder="password" 
      value={password} onChange={ev => setPassword(ev.target.value)

      } />
      <button>Login</button>
    </form>
  );
}
